import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import CategoryFilter from "@/components/CategoryFilter";
import PostCard from "@/components/PostCard";

interface PageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  // Await searchParams in Next.js 15+ / 16
  const resolvedParams = await searchParams;
  const activeCategory = (resolvedParams.category as "technical" | "personal" | undefined) || "all";
  const activePage = Math.max(1, Number(resolvedParams.page) || 1);

  // Fetch and filter posts on the server
  const allPosts = getAllPosts();
  const filteredPosts = activeCategory === "all"
    ? allPosts
    : allPosts.filter((post) => post.category === activeCategory);

  // Pagination calculations (6 posts per page)
  const POSTS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPage = totalPages > 0 ? Math.min(activePage, totalPages) : 1;

  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <div className="space-y-8 max-w-4xl animate-[fadeIn_0.3s_ease-out]">
      {/* Header section */}
      <div className="space-y-3 pb-6 border-b border-dashed border-gruv-border">
        <h2 className="text-2xl font-mono font-extrabold text-gruv-primary flex items-center">
          <span className="text-gruv-aqua mr-2">❯</span> 
          {activeCategory === "all" 
            ? "Recent Log Entries" 
            : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Log Entries`}
        </h2>
        <p className="text-sm font-serif text-gruv-secondary">
          Documenting my thoughts, technical guides, and personal highlights.
        </p>
      </div>

      {/* Category Filter Pills */}
      <CategoryFilter activeCategory={activeCategory} />

      {/* Post Grid */}
      {displayedPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="p-8 rounded-lg bg-gruv-card border border-dashed border-gruv-border text-center font-mono">
          <p className="text-gruv-secondary font-bold">-- NO LOGS FOUND --</p>
          <p className="text-xs text-gruv-muted mt-2">Try clearing your category filter.</p>
        </div>
      )}

      {/* Pagination Numbers Bar */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-12 pt-6 border-t border-dashed border-gruv-border select-none">
          <span className="text-xs font-mono font-bold text-gruv-muted mr-2">Page:</span>
          {Array.from({ length: totalPages }, (_, i) => {
            const pageNum = i + 1;
            const isActive = pageNum === currentPage;
            
            // Build target href preserving the active category
            const href = activeCategory === "all"
              ? `/?page=${pageNum}`
              : `/?category=${activeCategory}&page=${pageNum}`;
            
            return (
              <Link
                key={pageNum}
                href={href}
                className={`px-3 py-1.5 rounded text-xs font-mono font-bold border transition-all duration-150 ${
                  isActive
                    ? "bg-gruv-aqua text-gruv-bg border-gruv-aqua shadow-sm"
                    : "bg-gruv-card border-gruv-border text-gruv-secondary hover:border-gruv-purple hover:text-gruv-purple"
                }`}
              >
                {pageNum}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
