import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIRECTORY = path.join(process.cwd(), "posts");

export interface PostMetadata {
  title: string;
  date: string;
  category: "technical" | "personal";
  excerpt: string;
  slug: string;
}

export interface PostData {
  metadata: PostMetadata;
  content: string;
}

// Get all posts and their frontmatter metadata
export function getAllPosts(): PostMetadata[] {
  // Ensure the posts directory exists
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(POSTS_DIRECTORY);

  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(POSTS_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || "Untitled",
        date: data.date || "",
        category: (data.category as "technical" | "personal") || "personal",
        excerpt: data.excerpt || "",
      } as PostMetadata;
    });

  // Sort posts by date in descending order (newest first)
  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  });
}

// Get a single post by slug
export function getPostBySlug(slug: string): PostData | null {
  try {
    // Try .mdx first, then .md
    let fullPath = path.join(POSTS_DIRECTORY, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) {
      fullPath = path.join(POSTS_DIRECTORY, `${slug}.md`);
    }

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      metadata: {
        slug,
        title: data.title || "Untitled",
        date: data.date || "",
        category: (data.category as "technical" | "personal") || "personal",
        excerpt: data.excerpt || "",
      },
      content,
    };
  } catch (error) {
    console.error(`Error reading post with slug ${slug}:`, error);
    return null;
  }
}
