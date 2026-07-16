"use client";

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function VimStatusBarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<"NORMAL" | "VISUAL" | "INSERT">("NORMAL");
  const [scrollPercent, setScrollPercent] = useState<string>("Top");
  const [lineCol, setLineCol] = useState<string>("1:1");

  // Determine filepath based on route and query param
  let filepath = "~/blog/all.md";
  if (pathname === "/") {
    const category = searchParams.get("category");
    if (category === "technical") {
      filepath = "~/blog/technical.md";
    } else if (category === "personal") {
      filepath = "~/blog/personal.md";
    }
  } else if (pathname.startsWith("/posts/")) {
    const slug = pathname.replace("/posts/", "");
    filepath = `~/posts/${slug}.mdx`;
  }

  // 1. Dynamic Mode switching on mouse hover & keyboard focus
  useEffect(() => {
    const updateMode = (target: HTMLElement | null) => {
      if (!target) {
        setMode("NORMAL");
        return;
      }
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        setMode("INSERT");
      } else if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setMode("VISUAL");
      } else {
        setMode("NORMAL");
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      updateMode(e.target as HTMLElement);
    };

    const handleFocusOut = () => {
      setMode("NORMAL");
    };

    const handleMouseOver = (e: MouseEvent) => {
      updateMode(e.target as HTMLElement);
    };

    const handleMouseOut = () => {
      setMode("NORMAL");
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  // 2. Track Scroll percentage and mock line:col
  useEffect(() => {
    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight || document.body.scrollHeight;
      const clientHeight = doc.clientHeight || window.innerHeight;
      
      const totalScrollable = scrollHeight - clientHeight;
      
      if (totalScrollable <= 0) {
        setScrollPercent("Top");
        setLineCol("1:1");
        return;
      }

      const pct = Math.round((scrollTop / totalScrollable) * 100);
      
      if (pct <= 0) {
        setScrollPercent("Top");
      } else if (pct >= 100) {
        setScrollPercent("Bot");
      } else {
        setScrollPercent(`${pct}%`);
      }

      const approxLine = Math.max(1, Math.round((scrollTop / totalScrollable) * 120));
      const approxCol = Math.round((scrollTop % 60) + 1);
      setLineCol(`${approxLine}:${approxCol}`);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Mode Theme Mapping
  const modeColors = {
    NORMAL: { bg: "#427b58", text: "#fbf1c7", raw: "bg-[#427b58] text-[#fbf1c7]" },
    VISUAL: { bg: "#8f3f71", text: "#fbf1c7", raw: "bg-[#8f3f71] text-[#fbf1c7]" },
    INSERT: { bg: "#076678", text: "#fbf1c7", raw: "bg-[#076678] text-[#fbf1c7]" },
  };

  const currentModeInfo = modeColors[mode];

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-7 bg-gruv-border border-t border-gruv-border text-xs font-mono flex justify-between items-center z-50 select-none shadow-md overflow-hidden">
      {/* Left side segments */}
      <div className="flex h-full items-center">
        <div 
          className="h-full px-3 flex items-center font-extrabold uppercase transition-colors duration-150"
          style={{ backgroundColor: currentModeInfo.bg, color: currentModeInfo.text }}
        >
          -- {mode} --
        </div>
        
        <svg 
          className="h-full w-4 flex-shrink-0" 
          viewBox="0 0 16 16" 
          preserveAspectRatio="none"
          style={{ color: currentModeInfo.bg, backgroundColor: "#f2e5bc" }}
        >
          <polygon points="0,0 12,8 0,16" fill="currentColor" />
        </svg>

        <div className="h-full px-4 flex items-center text-gruv-primary bg-gruv-card font-bold">
          {filepath}
        </div>

        <svg 
          className="h-full w-4 flex-shrink-0" 
          viewBox="0 0 16 16" 
          preserveAspectRatio="none"
          style={{ color: "#f2e5bc", backgroundColor: "#ebdbb2" }}
        >
          <polygon points="0,0 12,8 0,16" fill="currentColor" />
        </svg>
      </div>

      {/* Right side segments */}
      <div className="flex h-full items-center">
        <svg 
          className="h-full w-4 flex-shrink-0 hidden sm:block" 
          viewBox="0 0 16 16" 
          preserveAspectRatio="none"
          style={{ color: "#f2e5bc", backgroundColor: "#ebdbb2" }}
        >
          <polygon points="12,0 0,8 12,16" fill="currentColor" />
        </svg>

        <div className="h-full px-3 items-center text-gruv-secondary bg-gruv-card hidden sm:flex border-r border-gruv-border/30">
          utf-8 <span className="text-[10px] text-gruv-muted ml-2">[unix]</span>
        </div>

        <svg 
          className="h-full w-4 flex-shrink-0" 
          viewBox="0 0 16 16" 
          preserveAspectRatio="none"
          style={{ color: "#7c6f64", backgroundColor: "#f2e5bc" }}
        >
          <polygon points="12,0 0,8 12,16" fill="currentColor" />
        </svg>

        <div className="h-full px-3 flex items-center text-gruv-bg bg-gruv-muted font-bold min-w-[50px] justify-center">
          {scrollPercent}
        </div>

        <svg 
          className="h-full w-4 flex-shrink-0" 
          viewBox="0 0 16 16" 
          preserveAspectRatio="none"
          style={{ color: "#076678", backgroundColor: "#7c6f64" }}
        >
          <polygon points="12,0 0,8 12,16" fill="currentColor" />
        </svg>

        <div className="h-full px-4 flex items-center text-[#fbf1c7] bg-[#076678] font-bold">
          {lineCol}
        </div>
      </div>
    </footer>
  );
}

export default function VimStatusBar() {
  return (
    <Suspense fallback={
      <footer className="fixed bottom-0 left-0 right-0 h-7 bg-gruv-border border-t border-gruv-border text-xs font-mono flex justify-between items-center z-50">
        <div className="h-full px-3 flex items-center bg-[#427b58] text-[#fbf1c7] font-extrabold">-- NORMAL --</div>
        <div className="h-full px-4 flex items-center text-gruv-secondary bg-gruv-card font-bold">~/blog/all.md</div>
        <div className="h-full px-4 flex items-center bg-[#076678] text-[#fbf1c7] font-bold">1:1</div>
      </footer>
    }>
      <VimStatusBarContent />
    </Suspense>
  );
}
