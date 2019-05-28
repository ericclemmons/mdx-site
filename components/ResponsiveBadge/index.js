export const ResponsiveBadge = () => (
  <div class="fixed top-0 left-0 z-50 bg-pink-500 text-white shadow-md px-2 rounded-br font-mono">
    <span class="sm:hidden">default</span>
    <span class="hidden sm:inline md:hidden">sm</span>
    <span class="hidden md:inline lg:hidden">md</span>
    <span class="hidden lg:inline xl:hidden">lg</span>
    <span class="hidden xl:inline">xl</span>
  </div>
);
