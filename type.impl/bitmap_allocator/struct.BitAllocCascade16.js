(function() {
    var type_impls = Object.fromEntries([["bitmap_allocator",[["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-BitAlloc-for-BitAllocCascade16%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#100-194\">Source</a><a href=\"#impl-BitAlloc-for-BitAllocCascade16%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"bitmap_allocator/trait.BitAlloc.html\" title=\"trait bitmap_allocator::BitAlloc\">BitAlloc</a>&gt; <a class=\"trait\" href=\"bitmap_allocator/trait.BitAlloc.html\" title=\"trait bitmap_allocator::BitAlloc\">BitAlloc</a> for <a class=\"struct\" href=\"bitmap_allocator/struct.BitAllocCascade16.html\" title=\"struct bitmap_allocator::BitAllocCascade16\">BitAllocCascade16</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle\" open><summary><section id=\"associatedconstant.CAP\" class=\"associatedconstant trait-impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#101\">Source</a><a href=\"#associatedconstant.CAP\" class=\"anchor\">§</a><h4 class=\"code-header\">const <a href=\"bitmap_allocator/trait.BitAlloc.html#associatedconstant.CAP\" class=\"constant\">CAP</a>: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.usize.html\">usize</a> = _</h4></section></summary><div class='docblock'>The bitmap has a total of CAP bits, numbered from 0 to CAP-1 inclusively.</div></details><details class=\"toggle\" open><summary><section id=\"associatedconstant.DEFAULT\" class=\"associatedconstant trait-impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#103-106\">Source</a><a href=\"#associatedconstant.DEFAULT\" class=\"anchor\">§</a><h4 class=\"code-header\">const <a href=\"bitmap_allocator/trait.BitAlloc.html#associatedconstant.DEFAULT\" class=\"constant\">DEFAULT</a>: Self = _</h4></section></summary><div class='docblock'>The default value. Workaround for <code>const fn new() -&gt; Self</code>.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.alloc\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#108-117\">Source</a><a href=\"#method.alloc\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"bitmap_allocator/trait.BitAlloc.html#tymethod.alloc\" class=\"fn\">alloc</a>(&amp;mut self) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.usize.html\">usize</a>&gt;</h4></section></summary><div class='docblock'>Allocate a free bit.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.alloc_contiguous\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#119-134\">Source</a><a href=\"#method.alloc_contiguous\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"bitmap_allocator/trait.BitAlloc.html#tymethod.alloc_contiguous\" class=\"fn\">alloc_contiguous</a>(\n    &amp;mut self,\n    base: <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.usize.html\">usize</a>&gt;,\n    size: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.usize.html\">usize</a>,\n    align_log2: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.usize.html\">usize</a>,\n) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.usize.html\">usize</a>&gt;</h4></section></summary><div class='docblock'>Allocate a free block with a given size, and return the first bit position. <a href=\"bitmap_allocator/trait.BitAlloc.html#tymethod.alloc_contiguous\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.dealloc\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#136-140\">Source</a><a href=\"#method.dealloc\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"bitmap_allocator/trait.BitAlloc.html#tymethod.dealloc\" class=\"fn\">dealloc</a>(&amp;mut self, key: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.usize.html\">usize</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Free an allocated bit. <a href=\"bitmap_allocator/trait.BitAlloc.html#tymethod.dealloc\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.dealloc_contiguous\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#142-166\">Source</a><a href=\"#method.dealloc_contiguous\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"bitmap_allocator/trait.BitAlloc.html#tymethod.dealloc_contiguous\" class=\"fn\">dealloc_contiguous</a>(&amp;mut self, base: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.usize.html\">usize</a>, size: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.usize.html\">usize</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Free a contiguous block of bits. <a href=\"bitmap_allocator/trait.BitAlloc.html#tymethod.dealloc_contiguous\">Read more</a></div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.insert\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#168-170\">Source</a><a href=\"#method.insert\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"bitmap_allocator/trait.BitAlloc.html#tymethod.insert\" class=\"fn\">insert</a>(&amp;mut self, range: <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/ops/range/struct.Range.html\" title=\"struct core::ops::range::Range\">Range</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.usize.html\">usize</a>&gt;)</h4></section></summary><div class='docblock'>Mark bits in the range as unallocated (available)</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.remove\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#171-173\">Source</a><a href=\"#method.remove\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"bitmap_allocator/trait.BitAlloc.html#tymethod.remove\" class=\"fn\">remove</a>(&amp;mut self, range: <a class=\"struct\" href=\"https://doc.rust-lang.org/nightly/core/ops/range/struct.Range.html\" title=\"struct core::ops::range::Range\">Range</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.usize.html\">usize</a>&gt;)</h4></section></summary><div class='docblock'>Reverse of insert</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.any\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#174-176\">Source</a><a href=\"#method.any\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"bitmap_allocator/trait.BitAlloc.html#tymethod.any\" class=\"fn\">any</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.bool.html\">bool</a></h4></section></summary><span class=\"item-info\"><div class=\"stab deprecated\"><span class=\"emoji\">👎</span><span>Deprecated: use <code>!self.is_empty()</code> instead</span></div></span><div class='docblock'>Whether there are free bits remaining</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.is_empty\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#177-179\">Source</a><a href=\"#method.is_empty\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"bitmap_allocator/trait.BitAlloc.html#tymethod.is_empty\" class=\"fn\">is_empty</a>(&amp;self) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Returns true if no bits is available.</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.test\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#180-182\">Source</a><a href=\"#method.test\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"bitmap_allocator/trait.BitAlloc.html#tymethod.test\" class=\"fn\">test</a>(&amp;self, key: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.usize.html\">usize</a>) -&gt; <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.bool.html\">bool</a></h4></section></summary><div class='docblock'>Whether a specific bit is free</div></details><details class=\"toggle method-toggle\" open><summary><section id=\"method.next\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#183-193\">Source</a><a href=\"#method.next\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"bitmap_allocator/trait.BitAlloc.html#tymethod.next\" class=\"fn\">next</a>(&amp;self, key: <a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.usize.html\">usize</a>) -&gt; <a class=\"enum\" href=\"https://doc.rust-lang.org/nightly/core/option/enum.Option.html\" title=\"enum core::option::Option\">Option</a>&lt;<a class=\"primitive\" href=\"https://doc.rust-lang.org/nightly/core/primitive.usize.html\">usize</a>&gt;</h4></section></summary><div class='docblock'>Find a index not less than a given key, where the bit is free.</div></details></div></details>","BitAlloc","bitmap_allocator::BitAlloc256","bitmap_allocator::BitAlloc4K","bitmap_allocator::BitAlloc64K","bitmap_allocator::BitAlloc1M","bitmap_allocator::BitAlloc16M","bitmap_allocator::BitAlloc256M"],["<details class=\"toggle implementors-toggle\" open><summary><section id=\"impl-Default-for-BitAllocCascade16%3CT%3E\" class=\"impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#93\">Source</a><a href=\"#impl-Default-for-BitAllocCascade16%3CT%3E\" class=\"anchor\">§</a><h3 class=\"code-header\">impl&lt;T: <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> + <a class=\"trait\" href=\"bitmap_allocator/trait.BitAlloc.html\" title=\"trait bitmap_allocator::BitAlloc\">BitAlloc</a>&gt; <a class=\"trait\" href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html\" title=\"trait core::default::Default\">Default</a> for <a class=\"struct\" href=\"bitmap_allocator/struct.BitAllocCascade16.html\" title=\"struct bitmap_allocator::BitAllocCascade16\">BitAllocCascade16</a>&lt;T&gt;</h3></section></summary><div class=\"impl-items\"><details class=\"toggle method-toggle\" open><summary><section id=\"method.default\" class=\"method trait-impl\"><a class=\"src rightside\" href=\"src/bitmap_allocator/lib.rs.html#93\">Source</a><a href=\"#method.default\" class=\"anchor\">§</a><h4 class=\"code-header\">fn <a href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html#tymethod.default\" class=\"fn\">default</a>() -&gt; <a class=\"struct\" href=\"bitmap_allocator/struct.BitAllocCascade16.html\" title=\"struct bitmap_allocator::BitAllocCascade16\">BitAllocCascade16</a>&lt;T&gt;</h4></section></summary><div class='docblock'>Returns the “default value” for a type. <a href=\"https://doc.rust-lang.org/nightly/core/default/trait.Default.html#tymethod.default\">Read more</a></div></details></div></details>","Default","bitmap_allocator::BitAlloc256","bitmap_allocator::BitAlloc4K","bitmap_allocator::BitAlloc64K","bitmap_allocator::BitAlloc1M","bitmap_allocator::BitAlloc16M","bitmap_allocator::BitAlloc256M"]]]]);
    if (window.register_type_impls) {
        window.register_type_impls(type_impls);
    } else {
        window.pending_type_impls = type_impls;
    }
})()
//{"start":55,"fragment_lengths":[12352]}