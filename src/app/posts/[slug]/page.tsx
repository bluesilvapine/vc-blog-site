import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getPostBySlug, getAllPosts } from "@/lib/posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static routes for all posts at build time
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic SEO metadata generation
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.metadata.title,
    description: post.metadata.excerpt,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.excerpt,
      type: "article",
      publishedTime: post.metadata.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metadata.title,
      description: post.metadata.excerpt,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { metadata, content } = post;
  const isTechnical = metadata.category === "technical";
  const categoryColorClass = isTechnical
    ? "text-gruv-blue border-gruv-blue bg-gruv-blue/5"
    : "text-gruv-orange border-gruv-orange bg-gruv-orange/5";

  // Configuration for rehype-pretty-code syntax highlighter
  const options: any = {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [
        [
          rehypePrettyCode,
          {
            theme: "gruvbox-light-medium",
            keepBackground: false,
          },
        ],
      ],
    },
  };

  return (
    <article className="max-w-3xl mx-auto space-y-6 animate-[fadeIn_0.3s_ease-out]">
      {/* Back Navigation */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-gruv-muted hover:text-gruv-purple transition-colors group"
      >
        <span className="transform group-hover:-translate-x-0.5 transition-transform">❮</span>
        <span>Back to index</span>
      </Link>

      {/* Post Header */}
      <header className="space-y-4 pb-6 border-b border-dashed border-gruv-border">
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className="text-gruv-muted">{metadata.date}</span>
          <span className="text-gruv-border">•</span>
          <span
            className={`px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${categoryColorClass}`}
          >
            {metadata.category}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-mono font-extrabold text-gruv-primary leading-tight">
          {metadata.title}
        </h1>
      </header>

      {/* Main MDX Content */}
      <div className="prose pt-4">
        <MDXRemote source={content} options={options} />
      </div>

      {/* Article Footer */}
      <footer className="pt-10 mt-12 border-t border-dashed border-gruv-border text-center">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-gruv-card border border-gruv-border text-xs font-mono font-bold text-gruv-primary hover:border-gruv-purple hover:text-gruv-purple transition-all shadow-sm"
        >
          <span>❮ Return to Log List</span>
        </Link>
      </footer>
    </article>
  );
}
