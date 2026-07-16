import Link from "next/link";
import { PostMetadata } from "@/lib/posts";

interface PostCardProps {
  post: PostMetadata;
}

export default function PostCard({ post }: PostCardProps) {
  const { title, date, category, excerpt, slug } = post;

  // Determine styles based on category
  const isTechnical = category === "technical";
  const accentColorClass = isTechnical ? "text-gruv-blue border-gruv-blue bg-gruv-blue/5" : "text-gruv-orange border-gruv-orange bg-gruv-orange/5";
  const hoverShadowClass = isTechnical 
    ? "hover:shadow-[6px_6px_0px_#076678] hover:border-gruv-blue" 
    : "hover:shadow-[6px_6px_0px_#af3a03] hover:border-gruv-orange";

  return (
    <Link href={`/posts/${slug}`} className="group block">
      <article className={`p-5 rounded-lg bg-gruv-card border border-gruv-border transition-all duration-200 transform hover:-translate-y-1 ${hoverShadowClass} flex flex-col justify-between h-full`}>
        <div className="space-y-3">
          {/* Metadata Row */}
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gruv-muted">{date}</span>
            <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${accentColorClass}`}>
              {category}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-base sm:text-lg font-mono font-bold text-gruv-primary group-hover:text-gruv-purple transition-colors leading-snug">
            {title}
          </h2>

          {/* Excerpt */}
          <p className="text-sm font-serif text-gruv-secondary line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        </div>

        {/* Action Link indicator */}
        <div className="mt-4 pt-3 border-t border-dashed border-gruv-border flex justify-end">
          <span className="text-xs font-mono font-bold text-gruv-muted group-hover:text-gruv-purple transition-colors flex items-center">
            Read post <span className="ml-1.5 transform group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </div>
      </article>
    </Link>
  );
}
