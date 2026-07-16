# Gruvbox Light Next.js Personal Blog

A highly polished, responsive personal blog themed with the retro **Gruvbox Light** color palette and typography (Lora and JetBrains Mono). Built on Next.js 16 (App Router) and TypeScript, compiled for fast static rendering on Vercel.

---

## ✍️ Adding New Posts (Dead Simple)

Adding a new post takes exactly one step: **Create a new `.mdx` or `.md` file in the `/posts/` directory.**

*   The homepage listing, dynamic pagination, and dynamic slugs are calculated **automatically** from files in the `/posts/` directory.
*   No database, registry array, or index file needs to be updated.

### Frontmatter Format Template

Copy and paste the template below to create your file (e.g. `/posts/my-cool-post.mdx`):

```markdown
---
title: "My New Blog Post Title"
date: "YYYY-MM-DD"
category: "technical"
excerpt: "A brief one-to-two sentence summary of what this post is about. It will be shown on the home page feed."
---

Write your Markdown/MDX content here. You can use standard Markdown tags, lists, links, or code blocks.

### Standard Heading

Your normal paragraphs go here.

### Technical Code Blocks

Code blocks will automatically receive beautiful syntax highlighting using the `gruvbox-light` Shiki theme:

```typescript
const hello = "world";
console.log(`Hello, ${hello}!`);
```
```

> [!IMPORTANT]
> - **Category**: Must be exactly `"technical"` or `"personal"`.
> - **Date**: Use the `YYYY-MM-DD` format (e.g., `2026-07-16`) to ensure correct sorting in the feed (newest first).
> - **Slug**: The URL slug is automatically derived from the filename. E.g. `/posts/my-first-post.mdx` will map to `/posts/my-first-post`.

---

## 🛠️ Local Development & Scripts

To run the site locally for development or testing:

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start the development server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.
3.  **Compile and build for production**:
    ```bash
    npm run build
    ```

---

## 🎨 Theme Customization

To customize the bio text, author name, or social handles, edit the single configuration file:
*   [site.ts](file:///Users/hermes/Developer/vc-projects/src/config/site.ts)

To tweak the design variables or custom styles, edit:
*   [globals.css](file:///Users/hermes/Developer/vc-projects/src/app/globals.css)
