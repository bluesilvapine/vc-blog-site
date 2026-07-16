import Link from "next/link";

interface CategoryFilterProps {
  activeCategory: string; // 'all' | 'technical' | 'personal'
}

export default function CategoryFilter({ activeCategory }: CategoryFilterProps) {
  const categories = [
    { id: "all", label: "All Posts", href: "/" },
    { id: "technical", label: "Technical", href: "/?category=technical" },
    { id: "personal", label: "Personal", href: "/?category=personal" },
  ];

  return (
    <div className="flex items-center space-x-2 border-b border-gruv-border pb-4 mb-8 overflow-x-auto select-none">
      <span className="text-xs font-mono font-bold text-gruv-muted uppercase tracking-wider mr-2 hidden sm:inline">
        Filter:
      </span>
      <div className="flex space-x-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <Link
              key={cat.id}
              href={cat.href}
              className={`px-4 py-1.5 rounded-md text-xs font-mono font-bold border transition-all duration-150 ${
                isActive
                  ? "bg-gruv-card border-gruv-aqua text-gruv-aqua shadow-sm"
                  : "bg-gruv-card border-gruv-border text-gruv-secondary hover:border-gruv-purple hover:text-gruv-purple"
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
