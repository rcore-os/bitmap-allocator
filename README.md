# BitmapAllocator

[![Crates.io](https://img.shields.io/crates/v/bitmap-allocator)](https://crates.io/crates/bitmap-allocator)
[![Docs.rs](https://docs.rs/bitmap-allocator/badge.svg)](https://docs.rs/bitmap-allocator)
[![CI](https://github.com/rcore-os/bitmap-allocator/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/rcore-os/bitmap-allocator/actions/workflows/main.yml)

Bit allocator based on segment tree algorithm.

## Example

```rust
use bitmap_allocator::{BitAlloc, BitAlloc1M};

let mut ba = BitAlloc1M::default();
ba.insert(0..16);
for i in 0..16 {
    assert!(ba.test(i));
}
ba.remove(2..8);
assert_eq!(ba.alloc(), Some(0));
assert_eq!(ba.alloc(), Some(1));
assert_eq!(ba.alloc(), Some(8));
ba.dealloc(0);
ba.dealloc(1);
ba.dealloc(8);
```

## Large allocator note

The larger aliases in this crate are still plain by-value Rust types.
Starting from `BitAlloc16M`, those values become large enough that constructing
them as ordinary local variables may overflow a typical thread stack.

For large-capacity allocators, prefer storing them in static memory or other
caller-managed non-stack storage instead of writing `let mut ba =
BitAlloc16M::default();` on a small stack.
