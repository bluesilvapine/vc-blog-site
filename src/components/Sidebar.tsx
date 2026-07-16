import Link from "next/link";
import { siteConfig } from "@/config/site";

// Inline custom SVGs for brand icons to ensure bulletproof rendering regardless of lucide-react versions
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-80 lg:fixed lg:left-0 lg:top-0 lg:bottom-7 border-b lg:border-b-0 lg:border-r border-gruv-border p-6 lg:p-8 flex flex-col justify-between bg-gruv-bg overflow-y-auto z-10">
      <div className="space-y-6">
        {/* Avatar & Branding */}
        <div className="flex flex-row lg:flex-col items-center lg:items-start space-x-4 lg:space-x-0 lg:space-y-4">
          <Link href="/" className="h-16 w-16 lg:h-20 lg:w-20 rounded-full bg-gruv-card border-2 border-gruv-border flex items-center justify-center text-gruv-primary font-mono text-xl lg:text-2xl font-bold shadow-sm select-none hover:border-gruv-purple transition-colors">
            {siteConfig.avatarInitials}
          </Link>
          <div>
            <h1 className="text-xl lg:text-2xl font-mono font-bold text-gruv-primary">
              <Link href="/" className="hover:text-gruv-purple transition-colors">{siteConfig.name}</Link>
            </h1>
            <p className="text-sm font-serif italic text-gruv-secondary lg:mt-1">
              {siteConfig.tagline}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p className="text-base font-serif text-gruv-secondary leading-relaxed border-t border-dashed border-gruv-border pt-4">
          {siteConfig.bio}
        </p>

        {/* Social Links as Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-gruv-card border border-gruv-border hover:border-gruv-purple hover:text-gruv-purple transition-colors shadow-sm"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-gruv-card border border-gruv-border hover:border-gruv-purple hover:text-gruv-purple transition-colors shadow-sm"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="h-3.5 w-3.5" />
            <span>LinkedIn</span>
          </a>
          <a
            href={siteConfig.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold bg-gruv-card border border-gruv-border hover:border-gruv-purple hover:text-gruv-purple transition-colors shadow-sm"
            aria-label="Twitter Profile"
          >
            <TwitterIcon className="h-3.5 w-3.5" />
            <span>Twitter/X</span>
          </a>
        </div>
      </div>

      {/* Footer in Sidebar (desktop only) */}
      <div className="hidden lg:block pt-6 border-t border-dashed border-gruv-border text-xs font-mono text-gruv-muted">
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        <p className="mt-1">Built with Next.js & MDX</p>
      </div>
    </aside>
  );
}
