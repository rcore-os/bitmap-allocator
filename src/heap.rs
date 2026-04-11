use alloc::boxed::Box;
use bit_field::BitField;
use core::{array::from_fn, ops::Range};

use crate::{BitAlloc, BitAlloc16};

/// Runtime allocator API for heap-backed bitmap allocators.
///
/// Unlike [`BitAlloc`], this trait does not require a `const DEFAULT`, so
/// implementations may use heap storage during construction.
pub trait BitAllocRuntime: Default {
    /// The bitmap has a total of CAP bits, numbered from 0 to CAP-1 inclusively.
    const CAP: usize;

    /// Allocate a free bit.
    fn alloc(&mut self) -> Option<usize>;

    /// Allocate a free block with a given size, and return the first bit position.
    ///
    /// If `base` is not `None`, the allocator will try to allocate the block at
    /// the given base.
    fn alloc_contiguous(
        &mut self,
        base: Option<usize>,
        size: usize,
        align_log2: usize,
    ) -> Option<usize>;

    /// Find an index not less than a given key, where the bit is free.
    fn next(&self, key: usize) -> Option<usize>;

    /// Free an allocated bit.
    ///
    /// Returns true if successful, false if the bit is already free.
    fn dealloc(&mut self, key: usize) -> bool;

    /// Free a contiguous block of bits.
    ///
    /// Returns true if successful, false if the bits in the range are already free.
    fn dealloc_contiguous(&mut self, base: usize, size: usize) -> bool;

    /// Mark bits in the range as unallocated (available).
    fn insert(&mut self, range: Range<usize>);

    /// Reverse of insert.
    fn remove(&mut self, range: Range<usize>);

    /// Returns true if no bits are available.
    fn is_empty(&self) -> bool;

    /// Whether a specific bit is free.
    fn test(&self, key: usize) -> bool;
}

#[doc(hidden)]
#[derive(Default)]
pub struct HeapBitAlloc16Leaf(BitAlloc16);

impl BitAllocRuntime for HeapBitAlloc16Leaf {
    const CAP: usize = <BitAlloc16 as BitAlloc>::CAP;

    fn alloc(&mut self) -> Option<usize> {
        self.0.alloc()
    }

    fn alloc_contiguous(
        &mut self,
        base: Option<usize>,
        size: usize,
        align_log2: usize,
    ) -> Option<usize> {
        self.0.alloc_contiguous(base, size, align_log2)
    }

    fn next(&self, key: usize) -> Option<usize> {
        self.0.next(key)
    }

    fn dealloc(&mut self, key: usize) -> bool {
        self.0.dealloc(key)
    }

    fn dealloc_contiguous(&mut self, base: usize, size: usize) -> bool {
        self.0.dealloc_contiguous(base, size)
    }

    fn insert(&mut self, range: Range<usize>) {
        self.0.insert(range);
    }

    fn remove(&mut self, range: Range<usize>) {
        self.0.remove(range);
    }

    fn is_empty(&self) -> bool {
        self.0.is_empty()
    }

    fn test(&self, key: usize) -> bool {
        self.0.test(key)
    }
}

/// Heap-backed variant of the 16-way cascade allocator.
///
/// This keeps the root value small and moves the recursive storage into heap
/// allocations, which makes large-capacity aliases practical to construct.
pub struct HeapBitAllocCascade16<T: BitAllocRuntime> {
    bitset: u16,
    sub: Box<[T; 16]>,
}

impl<T: BitAllocRuntime> Default for HeapBitAllocCascade16<T> {
    fn default() -> Self {
        Self {
            bitset: 0,
            sub: Box::new(from_fn(|_| T::default())),
        }
    }
}

impl<T: BitAllocRuntime> BitAllocRuntime for HeapBitAllocCascade16<T> {
    const CAP: usize = T::CAP * 16;

    fn alloc(&mut self) -> Option<usize> {
        if !self.is_empty() {
            let i = self.bitset.trailing_zeros() as usize;
            let res = self.sub[i].alloc().unwrap() + i * T::CAP;
            self.bitset.set_bit(i, !self.sub[i].is_empty());
            Some(res)
        } else {
            None
        }
    }

    fn alloc_contiguous(
        &mut self,
        base: Option<usize>,
        size: usize,
        align_log2: usize,
    ) -> Option<usize> {
        match base {
            Some(base) => {
                check_contiguous_runtime(self, base, Self::CAP, size, align_log2).then(|| {
                    self.remove(base..base + size);
                    base
                })
            }
            None => find_contiguous_runtime(self, Self::CAP, size, align_log2).inspect(|&base| {
                self.remove(base..base + size);
            }),
        }
    }

    fn dealloc(&mut self, key: usize) -> bool {
        let i = key / T::CAP;
        self.bitset.set_bit(i, true);
        self.sub[i].dealloc(key % T::CAP)
    }

    fn dealloc_contiguous(&mut self, base: usize, size: usize) -> bool {
        let mut success = true;
        let Range { start, end } = base..base + size;

        if end > Self::CAP {
            return false;
        }

        for i in start / T::CAP..=(end - 1) / T::CAP {
            let begin = if start / T::CAP == i {
                start % T::CAP
            } else {
                0
            };
            let end = if end / T::CAP == i {
                end % T::CAP
            } else {
                T::CAP
            };
            success = success && self.sub[i].dealloc_contiguous(begin, end - begin);
            self.bitset.set_bit(i, !self.sub[i].is_empty());
        }
        success
    }

    fn insert(&mut self, range: Range<usize>) {
        self.for_range(range, |sub, range| sub.insert(range));
    }

    fn remove(&mut self, range: Range<usize>) {
        self.for_range(range, |sub, range| sub.remove(range));
    }

    fn is_empty(&self) -> bool {
        self.bitset == 0
    }

    fn test(&self, key: usize) -> bool {
        self.sub[key / T::CAP].test(key % T::CAP)
    }

    fn next(&self, key: usize) -> Option<usize> {
        let idx = key / T::CAP;
        (idx..16).find_map(|i| {
            if self.bitset.get_bit(i) {
                let key = if i == idx { key - T::CAP * idx } else { 0 };
                self.sub[i].next(key).map(|x| x + T::CAP * i)
            } else {
                None
            }
        })
    }
}

impl<T: BitAllocRuntime> HeapBitAllocCascade16<T> {
    fn for_range(&mut self, range: Range<usize>, f: impl Fn(&mut T, Range<usize>)) {
        let Range { start, end } = range;
        assert!(start <= end);
        assert!(end <= Self::CAP);
        for i in start / T::CAP..=(end - 1) / T::CAP {
            let begin = if start / T::CAP == i {
                start % T::CAP
            } else {
                0
            };
            let end = if end / T::CAP == i {
                end % T::CAP
            } else {
                T::CAP
            };
            f(&mut self.sub[i], begin..end);
            self.bitset.set_bit(i, !self.sub[i].is_empty());
        }
    }
}

fn find_contiguous_runtime(
    ba: &impl BitAllocRuntime,
    capacity: usize,
    size: usize,
    align_log2: usize,
) -> Option<usize> {
    if align_log2 >= 64 || capacity < (1 << align_log2) || ba.is_empty() {
        return None;
    }

    let mut base = 0;
    if let Some(start) = ba.next(base) {
        base = align_up_log2(start, align_log2);
    } else {
        return None;
    }

    let mut offset = base;

    while offset < capacity {
        if let Some(next) = ba.next(offset) {
            if next != offset {
                assert!(next > offset);
                base = (((next - 1) >> align_log2) + 1) << align_log2;
                offset = base;
                continue;
            }
        } else {
            return None;
        }
        offset += 1;
        if offset - base == size {
            return Some(base);
        }
    }
    None
}

fn check_contiguous_runtime(
    ba: &impl BitAllocRuntime,
    base: usize,
    capacity: usize,
    size: usize,
    align_log2: usize,
) -> bool {
    if align_log2 >= 64 || capacity < (1 << align_log2) || ba.is_empty() {
        return false;
    }

    if !is_aligned_log2(base, align_log2) {
        return false;
    }

    let mut offset = base;
    while offset < capacity {
        if let Some(next) = ba.next(offset) {
            if next != offset {
                return false;
            }
            offset += 1;
            if offset - base == size {
                return true;
            }
        } else {
            return false;
        }
    }
    false
}

fn align_up_log2(base: usize, align_log2: usize) -> usize {
    (base + ((1 << align_log2) - 1)) & !((1 << align_log2) - 1)
}

fn is_aligned_log2(base: usize, align_log2: usize) -> bool {
    (base & ((1 << align_log2) - 1)) == 0
}

/// Heap-backed bitmap of 256 bits.
pub type HeapBitAlloc256 = HeapBitAllocCascade16<HeapBitAlloc16Leaf>;
/// Heap-backed bitmap of 4K bits.
pub type HeapBitAlloc4K = HeapBitAllocCascade16<HeapBitAlloc256>;
/// Heap-backed bitmap of 64K bits.
pub type HeapBitAlloc64K = HeapBitAllocCascade16<HeapBitAlloc4K>;
/// Heap-backed bitmap of 1M bits.
pub type HeapBitAlloc1M = HeapBitAllocCascade16<HeapBitAlloc64K>;
/// Heap-backed bitmap of 16M bits.
pub type HeapBitAlloc16M = HeapBitAllocCascade16<HeapBitAlloc1M>;
/// Heap-backed bitmap of 256M bits.
pub type HeapBitAlloc256M = HeapBitAllocCascade16<HeapBitAlloc16M>;
