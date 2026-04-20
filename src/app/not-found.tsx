"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, RotateCcw, Home as HomeIcon } from "lucide-react";

export default function NotFound() {
  const [selectedBlame, setSelectedBlame] = useState<number | null>(null);
  const [visitCount, setVisitCount] = useState(1);
  const [refreshCount, setRefreshCount] = useState(0);
  const [showKonami, setShowKonami] = useState(false);
  const [floatingTags, setFloatingTags] = useState<any[]>([]);
  const [verdictText, setVerdictText] = useState("");

  const konamiRef = useRef<number[]>([]);
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

  const blameOptions = [
    { label: "👨‍💻 The developer", verdict: "→ Definitely not me 🤷" },
    { label: "🌐 DNS (always DNS)", verdict: "→ Classic. Everything is DNS." },
    { label: "⌨️ Your typing", verdict: "→ The URL is working fine. You typed wrong." },
    { label: "🪐 Mercury retrograde", verdict: "→ Mercury is in retrograde. Not my problem." },
    { label: "🧑‍🎓 The intern", verdict: "→ The intern is aware of the issue." },
  ];

  const tagPool = [
    'console.log("where am i?")', 'undefined', 'null', 'git blame',
    '// TODO: fix this', '404', 'NaN', 'TypeError', 'git push --force',
    'it works on my machine', 'sudo rm -rf /', 'window.location = "/"',
    'cache.clear()', 'undefined is not a function', '// dont touch this',
    '¯\\_(ツ)_/¯', 'rm -rf node_modules', 'yarn install',
    'works in prod?', 'LGTM', '// fix later'
  ];

  useEffect(() => {
    // Generate floating tags
    const newTags = Array.from({ length: 18 }).map(() => ({
      text: tagPool[Math.floor(Math.random() * tagPool.length)],
      size: Math.floor(Math.random() * (13 - 9 + 1)) + 9,
      duration: Math.floor(Math.random() * (20 - 8 + 1)) + 8,
      delay: Math.floor(Math.random() * 8),
      left: Math.floor(Math.random() * 95),
      top: Math.floor(Math.random() * 100),
    }));
    setFloatingTags(newTags);

    // Visit counter
    const visitInterval = setInterval(() => {
      setVisitCount(prev => (prev < 5 ? prev + 1 : prev));
    }, 3200);

    // Konami listener
    const handleKeyDown = (e: KeyboardEvent) => {
      konamiRef.current = [...konamiRef.current, e.keyCode].slice(-10);
      if (JSON.stringify(konamiRef.current) === JSON.stringify(konamiCode)) {
        setShowKonami(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(visitInterval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleRefreshLife = () => {
    const newCount = refreshCount + 1;
    setRefreshCount(newCount);
    if (newCount >= 8) {
      setVerdictText("→ You need help. Professional help.");
    } else if (newCount >= 5) {
      setVerdictText("→ Please. Stop. Refreshing.");
    } else if (newCount >= 3) {
      setVerdictText("→ Still broken. Shocking.");
    }
  };

  const handleBlame = (index: number) => {
    setSelectedBlame(index);
    setVerdictText(blameOptions[index].verdict);
  };

  return (
    <div className="flex flex-col min-h-[80vh] bg-white font-inter text-[#0a0a0a]">
      {/* Navbar logic handled by RootLayout according to user requirement update */}

      <main className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center relative overflow-hidden">
        
        {/* Floating Background Tags */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {floatingTags.map((tag, i) => (
            <div
              key={i}
              className="absolute font-space-mono text-[#e0e0e0] whitespace-nowrap opacity-0"
              style={{
                fontSize: `${tag.size}px`,
                left: `${tag.left}%`,
                top: `${tag.top}%`,
                animation: `floatUp ${tag.duration}s linear ${tag.delay}s infinite`,
              }}
            >
              {tag.text}
            </div>
          ))}
        </div>

        {/* CSS for custom animations */}
        <style jsx>{`
          @keyframes floatUp {
            0% { opacity: 0; transform: translateY(0); }
            10% { opacity: 1; }
            80% { opacity: 0.5; }
            100% { opacity: 0; transform: translateY(-100vh); }
          }
          @keyframes wobble {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(-1deg); }
            75% { transform: rotate(1deg); }
          }
          @keyframes glitch1 {
            0%, 90%, 100% { transform: translate(0); }
            92% { transform: translate(-4px, 1px); }
            96% { transform: translate(4px, -1px); }
          }
          @keyframes glitch2 {
            0%, 90%, 100% { transform: translate(0); }
            93% { transform: translate(4px, 2px); }
            97% { transform: translate(-4px, -2px); }
          }
          @keyframes up {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fillBar {
            from { width: 0; }
            to { width: var(--w); }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .animate-up { animation: up 0.6s ease both; }
          .glitch-container {
            font-family: var(--font-instrument);
            font-size: clamp(100px, 18vw, 180px);
            font-weight: 400;
            letter-spacing: -0.06em;
            line-height: 1;
            position: relative;
            display: inline-block;
            animation: wobble 3s ease-in-out infinite;
          }
          .glitch-container::before, .glitch-container::after {
            content: '404';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .glitch-container::before {
            color: #e24b4a;
            clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
            left: 3px;
            animation: glitch1 2.5s infinite;
          }
          .glitch-container::after {
            color: #378ADD;
            clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
            left: -3px;
            animation: glitch2 2.5s infinite;
          }
        `}</style>
        
        {/* 404 Glitch */}
        <div className="glitch-container z-10 mb-2">404</div>

        {/* Sublabel */}
        <p className="font-space-mono text-[11px] tracking-[0.18em] uppercase text-[#bbb] mb-8 animate-up" style={{ animationDelay: '0.1s' }}>
          error · page · not · found · oops
        </p>

        {/* Quotes */}
        <div className="max-w-[460px] mx-auto">
          <h1 className="text-[clamp(20px,3.5vw,30px)] font-bold tracking-tight leading-[1.2] text-[#0a0a0a] mb-2 animate-up" style={{ animationDelay: '0.2s' }}>
            I swear this page was <span className="line-through text-[#bbb]">working</span> <span className="text-[#e24b4a]">vibing</span> yesterday.
          </h1>
          <p className="font-instrument italic text-[clamp(15px,2.5vw,20px)] text-[#888] mb-10 animate-up" style={{ animationDelay: '0.3s' }}>
            Must be a caching issue… try refreshing your life. 😄
          </p>
        </div>

        {/* Blame Section */}
        <div className="flex flex-col items-center mb-10 animate-up" style={{ animationDelay: '0.4s' }}>
          <span className="font-space-mono text-[11px] tracking-[0.12em] uppercase text-[#bbb] mb-3">Whose fault is this?</span>
          <div className="flex flex-wrap gap-[10px] justify-center max-w-[460px]">
            {blameOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleBlame(i)}
                className={`font-space-mono text-[12px] font-medium px-[14px] py-[6px] rounded-full border transition-all duration-200 cursor-pointer flex items-center gap-[6px] ${
                  selectedBlame === i 
                  ? "bg-[#e24b4a] text-white border-[#e24b4a]" 
                  : "border-[#e0e0e0] text-[#555] hover:bg-[#0a0a0a] hover:text-white hover:border-[#0a0a0a]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div id="blameVerdict" className="font-space-mono text-[13px] text-[#e24b4a] font-medium mt-6 min-h-[20px]">
            {verdictText}
          </div>
        </div>

        {/* Counters */}
        <div className="w-full max-w-[420px] grid grid-cols-3 border border-[#ebebeb] rounded-xl overflow-hidden mb-10 animate-up" style={{ animationDelay: '0.45s' }}>
          <div className="flex flex-col items-center p-4 border-r border-[#ebebeb]">
            <span className="font-instrument text-[28px] leading-none mb-1 text-[#0a0a0a]">{visitCount}</span>
            <span className="font-space-mono text-[10px] text-[#999] uppercase tracking-wider">times lost today</span>
          </div>
          <div className="flex flex-col items-center p-4 border-r border-[#ebebeb]">
            <span className="font-instrument text-[28px] leading-none mb-1 text-[#0a0a0a]">{refreshCount}</span>
            <span className="font-space-mono text-[10px] text-[#999] uppercase tracking-wider">refreshes tried</span>
          </div>
          <div className="flex flex-col items-center p-4">
            <span className="text-[28px] leading-none mb-1" style={{ animation: 'spin 2s linear infinite' }}>⚙️</span>
            <span className="font-space-mono text-[10px] text-[#999] uppercase tracking-wider">fixing in progress</span>
          </div>
        </div>

        {/* Diagnostic Bars */}
        <div className="w-full max-w-[420px] bg-[#fafafa] border border-[#ebebeb] rounded-xl p-5 md:p-6 text-left mb-10 animate-up" style={{ animationDelay: '0.5s' }}>
          <h3 className="font-space-mono text-[11px] font-semibold tracking-wider uppercase text-[#999] mb-4">Running diagnostics...</h3>
          <div className="flex flex-col gap-4">
            {[
              { label: "Page existence", color: "#e24b4a", width: "0%", pct: "0%" },
              { label: "Your sanity", color: "#e24b4a", width: "12%", pct: "12%" },
              { label: "Dev confidence", color: "#0a0a0a", width: "100%", pct: "100%" },
              { label: "Coffee levels", color: "#e24b4a", width: "8%", pct: "8%" },
              { label: "Everything fine", color: "#22c55e", width: "100%", pct: "100%" }
            ].map((bar, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[12px] text-[#555] w-[120px] shrink-0">{bar.label}</span>
                <div className="flex-1 h-[6px] bg-[#ebebeb] rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      backgroundColor: bar.color, 
                      width: bar.width,
                      animation: `fillBar 1.8s ease forwards ${0.2 + (i * 0.2)}s`,
                      // @ts-ignore
                      '--w': bar.width
                    }} 
                  />
                </div>
                <span className="font-space-mono text-[11px] text-[#999] w-[32px] text-right">{bar.pct}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-10 animate-up" style={{ animationDelay: '0.6s' }}>
          <Link href="/" className="bg-[#0a0a0a] text-white px-7 py-3 rounded-full text-[14px] font-bold tracking-wide transition-all hover:bg-[#333]">
            🏠 Take me home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="border border-[#ddd] px-7 py-3 rounded-full text-[14px] font-bold tracking-wide transition-all hover:border-[#0a0a0a]"
          >
            ← Go back
          </button>
          <button 
            onClick={handleRefreshLife}
            className="border border-[#fecfca] text-[#e24b4a] px-7 py-3 rounded-full text-[14px] font-bold tracking-wide hover:bg-[#fff5f4] transition-all"
          >
            ↻ Refresh life
          </button>
        </div>

        {/* Easter Egg */}
        <div className="w-full max-w-[460px] border border-dashed border-[#e0e0e0] rounded-xl p-5 md:p-6 text-left animate-up" style={{ animationDelay: '0.75s' }}>
          <div className="flex items-center gap-2 mb-4">
            <span className="font-space-mono text-[11px] uppercase tracking-wider text-[#bbb]">secret mission</span>
            <div className="flex-1 h-[1px] bg-[#ebebeb]" />
          </div>
          <p className="text-[12px] text-[#999] leading-relaxed mb-4">
            Type the Konami code for a secret message:
          </p>
          <div className="flex flex-wrap gap-2 mb-4 scale-90 origin-left">
            {["↑", "↑", "↓", "↓", "←", "→", "←", "→", "B", "A"].map((key, i) => (
              <code key={i} className="bg-[#f4f4f4] px-[7px] py-[2px] rounded-md text-[11px] font-space-mono text-[#555]">{key}</code>
            ))}
          </div>
          
          <div className={`bg-[#0a0a0a] rounded-lg p-4 font-space-mono text-[12px] text-[#22c55e] leading-loose transition-all duration-400 ${showKonami ? "block animate-up" : "hidden"}`}>
            $ sudo find /page --include="*.lost"<br/>
            &gt; Found: 1 missing page<br/>
            &gt; Status: vibing somewhere else<br/>
            &gt; Fix: touch grass, try again<br/>
            &gt; <span className="text-white">You found the Easter egg. Legend. 🥚</span>
          </div>
        </div>

      </main>

      {/* Footer logic handled by RootLayout according to user requirement update */}
    </div>
  );
}
