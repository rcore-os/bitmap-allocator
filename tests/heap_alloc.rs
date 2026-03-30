#![cfg(feature = "alloc")]

use core::mem::size_of;

use bitmap_allocator::heap::{BitAllocRuntime, HeapBitAlloc16M, HeapBitAlloc256M};

fn smoke_runtime_alloc<T: BitAllocRuntime + Default>() {
    let mut ba = T::default();
    ba.insert(8..24);
    assert!(!ba.is_empty());
    assert_eq!(ba.alloc(), Some(8));
    assert_eq!(ba.alloc(), Some(9));
    assert!(ba.test(10));
    assert!(ba.dealloc(8));
    assert_eq!(ba.alloc_contiguous(Some(16), 4, 2), Some(16));
    assert_eq!(ba.next(16), Some(20));
}

#[test]
fn heap_bitalloc_roots_stay_small() {
    assert!(size_of::<HeapBitAlloc16M>() < 64);
    assert!(size_of::<HeapBitAlloc256M>() < 64);
}

#[test]
fn heap_bitalloc16m_supports_basic_operations() {
    smoke_runtime_alloc::<HeapBitAlloc16M>();
}

#[test]
fn heap_bitalloc256m_supports_basic_operations() {
    smoke_runtime_alloc::<HeapBitAlloc256M>();
}
