"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Freelance", href: "#freelance" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activePath, setActivePath] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // 1. Scroll listener for glass effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // 2. Intersection Observer for active section detection
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the upper-middle part of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActivePath(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections defined in navItems
    navItems.forEach((item) => {
      const section = document.querySelector(item.href);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300",
        isScrolled ? "p-4" : "p-6"
      )}
    >
      <nav className={cn(
        "flex w-full max-w-7xl items-center justify-between transition-all duration-300",
        isScrolled && "rounded-full bg-white/80 px-6 py-3 backdrop-blur-md shadow-sm"
      )}>
        {/* Left: Brand */}
        <div className="flex-1">
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-tighter text-black transition-opacity hover:opacity-80"
          >
            kodidela
          </Link>
        </div>

        {/* Center: Navigation Pill (Desktop) */}
        <div className="hidden md:relative md:flex items-center rounded-full border border-black/5 bg-black/5 px-2 py-1.5 backdrop-blur-md">
          {navItems.map((item, index) => {
            const isActive = activePath === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActivePath(item.href)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "relative px-5 py-2 text-sm font-bold uppercase tracking-widest transition-colors flex items-center justify-center",
                  isActive ? "text-black" : "text-black/50 hover:text-black/80"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                    className="absolute inset-0 z-[-1] rounded-full bg-black/10"
                  />
                )}
                {hoveredIndex === index && !isActive && (
                  <motion.div
                    layoutId="hover-pill"
                    transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                    className="absolute inset-0 z-[-1] rounded-full bg-black/5"
                  />
                )}
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right: Resume Button (Desktop) & Hamburger (Mobile) */}
        <div className="flex flex-1 justify-end items-center gap-4">
          <a
            href="/kodidela_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:group sm:relative sm:flex items-center gap-1 overflow-hidden rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition-all hover:pr-8 active:scale-95"
          >
            RESUME
            <ArrowUpRight className="absolute right-3 h-4 w-4 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100" />
          </a>

          <button 
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-3 rounded-full bg-black/5 text-black hover:bg-black/10 transition-colors cursor-pointer active:scale-95"
            aria-label="Open mobile menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0a] text-white p-6"
          >
            {/* Header inside mobile menu */}
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
              <Link 
                href="/" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-2xl font-bold tracking-tighter text-white"
              >
                kodidela
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors active:scale-95"
              >
                <X size={24} strokeWidth={2.5} />
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-1 flex-col items-center justify-center gap-10">
              {navItems.map((item) => {
                const isActive = activePath === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      setActivePath(item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "text-xl font-bold uppercase tracking-[0.2em] transition-all relative flex flex-col items-center",
                      isActive ? "text-white" : "text-white/40 hover:text-white/80"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="mobile-active-pill"
                        transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                        className="absolute inset-x-[-1.5rem] inset-y-[-0.75rem] z-[-1] rounded-full bg-white/10"
                      />
                    )}
                    {item.name}
                  </Link>
                );
              })}

              <a
                href="/kodidela_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-8 flex items-center justify-center rounded-full border border-white/20 bg-transparent px-10 py-4 text-sm font-bold tracking-widest text-white hover:bg-white hover:text-black transition-all active:scale-95"
              >
                RESUME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
