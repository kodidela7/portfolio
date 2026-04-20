"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Layers,
  Database,
  Globe,
  ShieldCheck,
  ArrowUpRight,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- DATA ---

const tickerItems = [
  { tech: "Node js", desc: "1M+ concurrent users" },
  { tech: "FastAPI", desc: "event-driven" },
  { tech: "Microservices", desc: "distributed systems" },
  { tech: "Docker", desc: "sub-50ms" },
  { tech: "Redis", desc: "async I/O" },
  { tech: "Nginx", desc: "zero downtime" },
];

const expertiseItems = [
  {
    title: "Low-Latency Trading Infrastructure",
    description: "Order execution pipelines and live price feeds handling millions of market ticks per second. WebSocket powered real-time delivery to 1M+ clients with sub-22ms latency – even at market open.",
    tags: ["WebSockets", "FastAPI", "Async IO", "Python"],
    icon: <Zap size={22} />,
  },
  {
    title: "Microservices & Distributed Systems",
    description: "10+ independent services with database-per-service architecture. Redis Pub/Sub event-driven messaging eliminates coupling. Docker + K3s containerization with fully automated CI/CD.",
    tags: ["Docker", "Kubernetes", "Redis", "PostgreSQL"],
    icon: <Layers size={22} />,
  },
  {
    title: "Real-Time Data Pipelines",
    description: "OHLC aggregation engine spanning 1-second to 1-month timeframes. Optimized time-series indexing with dynamic symbol, timeframe & range queries returning in under a millisecond.",
    tags: ["Redis", "Timescale", "PostgreSQL", "Influx"],
    icon: <Database size={22} />,
  },
  {
    title: "Full-Stack Fintech Platforms",
    description: "Full-stack ownership from database schema to Nginx config. TradingView-integrated dashboards, IB affiliate commission systems, REST APIs, SSL edge balancing and cloud VM deployments.",
    tags: ["Django", "Node js", "TradingView", "Nginx"],
    icon: <Globe size={22} />,
  },
  {
    title: "Fault-Tolerant & Reliable Systems",
    description: "Reduced system downtime by ~70% through architectural improvements, multi-threaded async I/O, and granular error handling. Systems built to survive high market volatility without a single restart.",
    tags: ["Multi-threading", "Reliability", "Fault-tolerant"],
    icon: <ShieldCheck size={22} />,
  },
];

const statsItems = [
  { value: "10", label: "Microservices built & deployed", suffix: "" },
  { value: "70", label: "Reduction in system downtime", suffix: "%" },
  { value: "1M", label: "Real-time users scalable to", suffix: "+" },
  { value: "50", label: "Trading latency maintained", suffix: "ms" },
];

const marqueeItems = [
  "Node js", "FastAPI", "Microservices", "Distributed", "Docker", "Redis", "Nginx", "PostgreSQL",
  "WebSockets", "Python", "Django", "Kubernetes", "CI/CD", "TradingView", "SSL", "OHLC",
  "gRPC", "Protobuf", "Async IO", "Low-latency"
];

const toolsItems = [
  "Python", "FastAPI", "Django", "Node js", "PostgreSQL", "Redis", "WebSockets", "Docker",
  "K3s / Kubernetes", "Nginx", "CI/CD", "TradingView", "Math", "AI", "Protobuf", "gRPC"
];

const experienceItems = [
  {
    title: "Full-Stack Developer",
    company: "LiveFx Hub",
    period: "May 2025 – Present",
    badge: "Current",
    description: "Leading architecture and development of a production-grade microservices trading platform.",
    bullets: [
      "Architected 10+ independent microservices with database-per-service (PostgreSQL), Docker + K3s, automated CI/CD",
      "Built low-latency trading infrastructure for order execution, price feeds, WebSockets, async processing",
      "Engineered real-time OHLC aggregation engine (1s → 1M timeframes) using Redis + PostgreSQL",
      "Designed scalable IB system with referral tracking, commission distribution, real-time earnings",
      "Implemented Redis Pub/Sub event-driven communication, reducing service coupling",
      "Reduced system downtime by ~70% via backend optimisations and improved error handling"
    ],
    tags: ["Python", "FastAPI", "WebSockets", "Redis", "PostgreSQL", "Docker", "K3s", "Nginx", "CI/CD"]
  },
  {
    title: "Intern Full-Stack Developer",
    company: "LiveFx Hub",
    period: "Feb 2025 – May 2025",
    badge: "Internship",
    description: "Joined as intern, took full ownership of features, earned full-time role in 3 months.",
    bullets: [
      "Developed full-stack Refer & Earn (IB) system integrated with live trading workflows",
      "Built responsive frontend dashboards with real-time updates via WebSockets",
      "Integrated TradingView charts and live market data feeds",
      "Designed backend APIs for user management, trading data, affiliate tracking",
      "Optimised backend services to improve performance and reduce latency"
    ],
    tags: ["Django", "Node.js", "WebSockets", "TradingView", "REST APIs", "JavaScript"]
  }
];

const freelanceCards = [
  {
    title: "Web & Product Builds",
    icon: "🌐",
    desc: "Marketing sites, SaaS platforms, internal tools. Clean UI/UX, SEO-friendly, responsive, built to scale."
  },
  {
    title: "DevOps & Infrastructure",
    icon: "☁️",
    desc: "Secure server deployments, CI/CD, Docker, Nginx, SSL, cloud VM configuration from scratch."
  },
  {
    title: "Bug Fixing — Pay on Fix",
    icon: "🐛",
    desc: "Production bugs, downtime, performance issues. No fix — no invoice."
  },
  {
    title: "Maintenance & Support",
    icon: "🔧",
    desc: "Ongoing monitoring, updates, and long-term maintenance after launch."
  }
];

const educationItems = [
  {
    year: "2020 – 2024",
    degree: "B.Tech Electronics & Communication Engineering",
    school: "GITAM University, Bengaluru",
    cgpa: "6.98"
  },
  {
    year: "2018 – 2020",
    degree: "Intermediate (MPC)",
    school: "Sri Chaitanya Jr College, Kurnool",
    cgpa: "7.82"
  },
  {
    year: "Until 2018",
    degree: "High School (CBSE)",
    school: "St. Joseph Public School, Ananthapur",
    cgpa: "6.5"
  }
];

const socialContacts = [
  {
    name: "LinkedIn",
    handle: "Kodidela Dinesh Naidu",
    icon: <ExternalLink size={20} />,
    link: "https://linkedin.com/in/kodidela-dinesh-naidu"
  },
  {
    name: "GitHub",
    handle: "kodidela",
    icon: <ExternalLink size={20} />,
    link: "https://github.com/kodidela7"
  },
  {
    name: "WhatsApp",
    handle: "+91 70757 81960",
    icon: <MessageCircle size={20} />,
    link: "https://wa.me/917075781960"
  }
];

const contactRows = [
  {
    emoji: "✉️",
    label: "Send an Email",
    subtext: "kodidela@zohomail.in",
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=kodidela@zohomail.in"
  },
  {
    emoji: "💬",
    label: "WhatsApp",
    subtext: "+91 70757 81960",
    link: "https://wa.me/917075781960"
  },
  {
    emoji: "💼",
    label: "LinkedIn",
    subtext: "Connect professionally",
    link: "https://linkedin.com/in/kodidela-dinesh-naidu"
  },
  {
    emoji: "🚀",
    label: "Request a Quote — Webkraft",
    subtext: "For freelance projects",
    badge: "Active",
    link: "https://kodidela-webkraft.com/contact?type=quote"
  }
];

const projectItems = [
  {
    title: "LiveFx Hub — Trading Platform",
    featured: true,
    description: "End-to-end microservices trading platform with real-time price feeds, OHLC aggregation, IB affiliate system, live dashboards. 10+ services, 1M+ users, <50ms latency.",
    tags: ["Microservices", "WebSockets", "Redis", "PostgreSQL", "Docker", "K3s"],
    link: "https://livefxhub.com"
  },
  {
    title: "Facial Recognition — LBPH",
    description: "Robust facial recognition system using Local Binary Patterns Histogram (LBPH). Real-time identity verification for security and access control. Optimised for speed and precision.",
    tags: ["Python", "OpenCV", "LBPH", "Computer Vision"],
    link: "https://github.com/kodidela7/Facial-recognition"
  },
  {
    title: "Phishing Website Detector — AI/ML",
    description: "Machine learning model detecting phishing websites by analysing URL patterns, page content, and metadata. Reduces false positives, improves online security.",
    tags: ["Python", "ML", "Scikit-learn", "NLP", "Security"],
    link: "https://github.com/kodidela7/Detecting-phishing-websites"
  }
];

// --- COMPONENTS ---

export default function Home() {
  return (
    <div className="bg-white text-black font-outfit">

      {/* SECTION 1: HERO */}
      <section id="home" className="relative h-[100dvh] min-h-[700px] w-full bg-white text-black overflow-hidden scroll-mt-24 lg:scroll-mt-32">
        <motion.div
          className="relative w-full h-full origin-center"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            scale: { duration: 4.4, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 2.4, ease: "easeOut" },
          }}
        >
          {/* Portrait Image */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 top-[40%] md:top-24 w-full max-w-[850px] pointer-events-none z-0">
            <Image
              src="/dinu_clean.png"
              alt="Kodidela Portrait"
              fill
              priority
              className="object-cover"
              style={{
                objectPosition: '50% 30%',
                maskImage: 'radial-gradient(ellipse 85% 75% at 50% 45%, black 45%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(ellipse 85% 75% at 50% 45%, black 45%, transparent 85%)',
              }}
            />
          </div>

          <div className="relative z-10 w-full h-full max-w-[1360px] mx-auto px-6 lg:px-12 xl:px-16">
            <div className="absolute top-[12%] md:top-auto md:bottom-[22%] lg:bottom-[25%] left-6 lg:left-12 xl:left-16 flex flex-col items-start gap-3 max-w-[90%] md:max-w-[460px]">
              <div className="flex items-center gap-2 rounded-full border border-black/5 bg-white/90 backdrop-blur-sm px-4 py-1.5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-2">
                <div className="h-2 w-2 rounded-full bg-[#00D26A]" />
                <span className="text-[13px] font-medium text-black/50 tracking-wide">
                  Open to work
                </span>
              </div>
              <h1 className="text-[1.65rem] md:text-[2rem] lg:text-[2.35rem] font-medium tracking-[-0.025em] leading-[1.18] text-[#111]">
                Dinesh turns complex ideas <br />
                into production-ready <br />
                systems with scalable <br />
                architecture and real-time capabilities.
              </h1>
            </div>

            <div className="absolute top-[80%] md:top-[60%] lg:top-[62%] right-6 lg:right-12 xl:right-16 flex flex-col items-end md:items-start max-w-[320px] lg:max-w-[400px]">
              <div className="bg-white/70 backdrop-blur-md p-5 lg:p-7 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] border border-white/50 flex flex-col items-start gap-5 lg:gap-6">
                <p className="text-[13px] lg:text-[14px] leading-[1.7] text-black font-medium">
                  As a backend and distributed systems engineer with a strong focus
                  on microservices and real-time architectures, he collaborates
                  closely with teams to build scalable, high-performance systems. A
                  reliable partner in turning complex ideas into production-ready
                  solutions.
                </p>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=kodidela@zohomail.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[12px] bg-[#111] px-6 py-3 text-[13px] font-semibold tracking-wide text-white transition-all duration-300 hover:bg-black hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] active:scale-95 active:translate-y-0 inline-block"
                >
                  Email Me
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TECH TICKER */}
      <div className="py-2 border-y border-black/5 bg-white overflow-hidden flex whitespace-nowrap relative z-20">
        <motion.div
          className="flex items-center gap-10 md:gap-14 lg:gap-20 pr-10 md:pr-14 lg:pr-20"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <React.Fragment key={idx}>
              <span className="text-[14px] lg:text-[15px] text-black/40 italic font-light lowercase">
                {item.desc}
              </span>
              <span className="text-[16px] lg:text-[18px] text-black font-bold uppercase tracking-[0.2em]">
                {item.tech}
              </span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* SECTION 2: EXPERTISE & STATS */}
      <section className="relative bg-white pt-6 lg:pt-10 pb-16">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 xl:px-16 lg:grid lg:grid-cols-[1.2fr_1.8fr] lg:gap-24">

          {/* Sticky Left Column */}
          <div className="relative mb-16 lg:mb-0 lg:h-fit lg:sticky lg:top-32 self-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-black" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-black/60">Expertise</span>
            </div>
            <h2 className="text-[2rem] md:text-[2.5rem] lg:text-[3.2rem] leading-[1.1] font-medium tracking-tight text-black mb-8">
              Engineering the infrastructure <br />
              <span className="italic text-black/60 font-light">behind real-time finance.</span>
            </h2>
            <p className="text-[0.95rem] lg:text-[1.05rem] leading-[1.7] text-black/60 max-w-[420px]">
              I specialize in the hard parts — low-latency systems, distributed architecture, and the backend that doesn't break when markets move fast.
            </p>
          </div>

          {/* Scrolling Expertise Cards */}
          <div className="flex flex-col gap-5 lg:gap-8">
            {expertiseItems.map((item, idx) => (
              <ExpertiseCard key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>

        {/* Stats Band */}
        <div className="mt-6 lg:mt-10 border-t border-black/5">
          <div className="max-w-[1360px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-black/5">
            {statsItems.map((stat, idx) => (
              <div key={idx} className="group relative p-8 lg:p-12 overflow-hidden transition-colors hover:bg-black/[0.01]">
                {/* Left edge line animation on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-black scale-y-0 origin-top group-hover:scale-y-100 transition-transform duration-500 ease-out" />
                <div className="relative z-10">
                  <div className="text-[2.5rem] lg:text-[3.5rem] font-medium tracking-tight mb-2 flex items-baseline gap-1">
                    {stat.value}<span className="text-[1.5rem] lg:text-[2rem] text-black/20 font-light font-sans">{stat.suffix}</span>
                  </div>
                  <p className="text-[0.8rem] lg:text-[0.85rem] font-bold uppercase tracking-wider text-black/40 leading-relaxed max-w-[160px]">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mt-12 lg:mt-16 max-w-[1360px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="mb-12">
            <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-black/30 mb-8">Tools & Technologies</h3>
            <div className="flex flex-wrap gap-3">
              {toolsItems.map((tool, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="px-5 py-2.5 rounded-full border border-black/5 bg-white text-black/60 text-[13px] font-medium transition-all duration-300 hover:bg-black hover:text-white hover:border-black cursor-default"
                >
                  {tool}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: EDUCATION */}
      <section id="education" className="relative bg-[#fafafa] py-20 border-t border-[#ebebeb] overflow-hidden scroll-mt-24 lg:scroll-mt-32">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 xl:px-16">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-black" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-black/60">Education</span>
            </div>
            <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] leading-[1.05] font-medium tracking-tight text-black">
              The foundation <br />
              <span className="italic text-[#111] font-light">behind the code.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col">
            {educationItems.map((item: any, idx: number) => (
              <EducationItem key={idx} item={item} />
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: WORK EXPERIENCE */}
      <section id="experience" className="relative bg-white pt-3 lg:pt-4 pb-8 lg:pb-10 overflow-hidden scroll-mt-24 lg:scroll-mt-32">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 xl:px-16">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 lg:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-black" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-black/60">Experience</span>
            </div>
            <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] leading-[1.05] font-medium tracking-tight text-black">
              Where I&apos;ve built <br />
              <span className="italic text-[#888] font-light">things that matter.</span>
            </h2>
          </motion.div>

          <div className="flex flex-col">
            {experienceItems.map((item: any, idx: number) => (
              <ExperienceItem key={idx} item={item} />
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 4: FREELANCE / WEBKRAFT */}
      <section id="freelance" className="relative bg-[#fafafa] pt-8 lg:pt-10 pb-24 lg:pb-32 border-y border-[#ebebeb] overflow-hidden scroll-mt-24 lg:scroll-mt-32">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Content */}
            <div className="flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 mb-8">
                <div className="h-1.5 w-1.5 rounded-full bg-black" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-black/60">Freelance</span>
              </div>
              <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] leading-[1.05] font-medium tracking-tight text-black mb-8">
                Building products for clients — <br />
                <span className="italic text-[#888] font-light">since day one.</span>
              </h2>
              <p className="text-[0.95rem] lg:text-[1.1rem] leading-[1.7] text-black/60 max-w-[540px] mb-6">
                Alongside my full-time work, I run <span className="text-black font-semibold uppercase tracking-tight">Webkraft</span> — a freelance studio delivering web platforms, automation tools, and cloud infrastructure for businesses that need reliable, production-grade software.
              </p>
              <p className="text-[13px] text-[#999] font-medium mb-10 flex items-center gap-3">
                <span className="h-1 w-1 rounded-full bg-[#ccc]" /> Pay-only-if-fixed bug support.
                <span className="h-1 w-1 rounded-full bg-[#ccc]" /> Fast turnaround.
                <span className="h-1 w-1 rounded-full bg-[#ccc]" /> Full ownership.
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-16">
                <a
                  href="https://kodidela-webkraft.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-black px-8 py-4 text-[14px] font-bold tracking-wide text-white transition-all duration-300 hover:scale-[1.03] shadow-[0_4px_14px_rgba(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
                >
                  Visit Webkraft ↗
                </a>
                <a
                  href="https://kodidela-webkraft.com/contact?type=quote"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-bold tracking-wide text-black hover:opacity-60 transition-opacity"
                >
                  Request a quote →
                </a>
              </div>

              {/* Freelance Stats Row */}
              <div className="w-full pt-10 border-t border-black/5 flex flex-wrap gap-x-12 gap-y-6">
                <div className="flex flex-col">
                  <span className="text-[28px] font-medium font-instrument tracking-tight leading-none mb-2">40+</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-black/30">Projects shipped</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[28px] font-medium font-instrument tracking-tight leading-none mb-2">&lt;2h</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-black/30">Avg. response</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[28px] font-medium font-instrument tracking-tight leading-none mb-2">98%</span>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-black/30">Happy clients</span>
                </div>
              </div>
            </div>

            {/* Right: Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {freelanceCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="bg-white p-7 rounded-[12px] border border-[#ebebeb] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-4 relative overflow-hidden"
                >
                  {card.title.includes("Bug") && (
                    <div className="absolute top-0 right-0 py-1 px-3 bg-[#00D26A] text-white text-[9px] font-black uppercase tracking-widest">
                      Pay on Fix
                    </div>
                  )}
                  <div className="text-2xl">{card.icon}</div>
                  <h3 className="text-[15px] font-bold tracking-tight text-black">{card.title}</h3>
                  <p className="text-[13px] leading-[1.6] text-black/50 font-medium">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: PROJECTS */}
      <section id="projects" className="relative bg-white py-24 lg:py-32 overflow-hidden scroll-mt-24 lg:scroll-mt-32">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 xl:px-16">

          {/* Section Header */}
          <div className="mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-black" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-black/60">Projects</span>
            </div>
            <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.2rem] leading-[1.05] font-medium tracking-tight text-black mb-6">
              Things I&apos;ve built <br />
              <span className="italic text-[#111] font-light">from scratch.</span>
            </h2>
            <p className="text-[14px] text-[#999] font-medium">
              Side projects and academic work beyond the day job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projectItems.map((item: any, idx: number) => (
              <ProjectCard key={idx} item={item} index={idx} />
            ))}

            {/* Project Placeholder */}
            <div className="p-9 lg:p-12 rounded-[16px] border-2 border-dashed border-[#ebebeb] flex flex-col items-center justify-center text-center gap-4 transition-colors hover:border-black/10 group">
              <div className="h-12 w-12 rounded-full bg-black/5 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🚀</div>
              <h3 className="text-[18px] font-bold text-black/40">More coming soon</h3>
              <p className="text-[13px] text-black/30 font-medium mb-4">Currently building in public.</p>
              <a
                href="https://github.com/kodidela7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-bold uppercase tracking-widest text-black hover:opacity-100 opacity-40 transition-opacity"
              >
                Follow on GitHub →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: CONTACT */}
      <section id="contact" className="relative bg-white py-24 lg:py-32 scroll-mt-24 lg:scroll-mt-32">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-12 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-start text-left lg:sticky lg:top-32 self-start"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 mb-6">
                <div className="h-1.5 w-1.5 rounded-full bg-black" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-black/60">Contact</span>
              </div>
              <h2 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1] font-medium tracking-tight text-black mb-10">
                Let&apos;s build <br />
                <span className="italic text-[#111] font-light text-[0.95em]">something that lasts.</span>
              </h2>
              <p className="text-[1rem] lg:text-[1.1rem] leading-[1.7] text-black/60 max-w-[500px]">
                Whether it&apos;s a full platform, a tricky backend problem, or a production fire — I&apos;m available for new projects, collaborations, and full-time opportunities.
              </p>
            </motion.div>

            {/* Right: Black Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-[#0a0a0a] rounded-[24px] px-6 py-12 sm:px-10 lg:p-14"
            >
              <h3 className="text-[1.6rem] sm:text-[1.8rem] lg:text-[2.2rem] font-medium text-white tracking-tight mb-4">
                Ready to work <span className="italic font-light text-white/60">together?</span>
              </h3>
              <p className="text-[14px] leading-relaxed text-[#888] font-medium mb-10 max-w-full sm:max-w-[340px]">
                Pick the best way to reach me. I typically respond within a few hours.
              </p>

              <div className="flex flex-col gap-3">
                {contactRows.map((row: any, idx: number) => (
                  <a
                    key={idx}
                    href={row.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-[#111] hover:bg-[#1a1a1a] p-5 rounded-[12px] flex items-center justify-between transition-all duration-300 border border-white/5 hover:border-white/10"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <span className="text-lg sm:text-xl shrink-0">{row.emoji}</span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[13px] sm:text-[14px] font-bold text-white tracking-wide uppercase truncate">{row.label}</span>
                        <span className="text-[12px] sm:text-[13px] text-white/30 font-medium group-hover:text-white/50 transition-colors truncate">{row.subtext}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {row.badge && (
                        <div className="hidden xs:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00D26A]/10 border border-[#00D26A]/20">
                          <div className="h-1.5 w-1.5 rounded-full bg-[#00D26A] animate-blink" />
                          <span className="text-[#00D26A] text-[9px] font-bold uppercase tracking-widest">
                            {row.badge}
                          </span>
                        </div>
                      )}
                      <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#ebebeb] py-12 lg:py-16">
        <div className="max-w-[1240px] mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[12px] font-medium text-[#999] tracking-tight">
            © 2025 Kodidela Dinesh Naidu. All rights reserved.
          </p>

          <div className="flex items-center gap-8">
            {[
              { name: "LinkedIn", href: "https://linkedin.com/in/kodidela-dinesh-naidu" },
              { name: "GitHub", href: "https://github.com/kodidela7" },
              { name: "Webkraft", href: "https://kodidela-webkraft.com" },
              { name: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=kodidela@zohomail.in" }].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[12px] font-bold uppercase tracking-widest text-[#999] hover:text-black transition-colors"
                >
                  {link.name}
                </a>
              ))}
          </div>
        </div>
      </footer>

    </div>
  );
}

// --- HELPER COMPONENTS ---

function ExpertiseCard({ item, index }: { item: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative pt-10 pb-8 border-t border-black/5 transition-all duration-500"
    >
      {/* Top Border Sweep Animation */}
      <div className="absolute top-[-1px] left-0 h-[1.5px] bg-black w-0 group-hover:w-full transition-all duration-700 ease-[0.16,1,0.3,1]" />

      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <span className="text-[0.75rem] font-bold text-black/20 tracking-widest">
            0{index + 1}
          </span>
          <h3 className="text-[1.25rem] lg:text-[1.5rem] font-medium tracking-tight transition-colors group-hover:text-black">
            {item.title}
          </h3>
        </div>
        <motion.div
          className="p-3 rounded-xl bg-black/5 text-black/40 group-hover:bg-black group-hover:text-white transition-colors duration-500"
          whileHover={{ rotate: 45 }}
        >
          {item.icon}
        </motion.div>
      </div>

      <p className="text-[0.9rem] lg:text-[1rem] leading-[1.7] text-black/50 mb-8 max-w-[540px]">
        {item.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {item.tags.map((tag: string, i: number) => (
          <span
            key={i}
            className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider border border-black/5 rounded-md text-black/30 transition-all duration-300 group-hover:border-black/10 group-hover:text-black"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function ExperienceItem({ item }: { item: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative border-t border-[#ebebeb] py-12 lg:py-16 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-10 md:gap-16 transition-all duration-500"
    >
      {/* Hover Sweep Animation */}
      <div className="absolute top-[-1.5px] left-0 h-[1.5px] bg-black w-0 group-hover:w-full transition-all duration-700 ease-[0.16,1,0.3,1] z-10" />

      {/* Left Meta */}
      <div className="flex flex-col items-start gap-4">
        <span className="text-[12px] text-[#999] font-medium uppercase tracking-wider">
          {item.period}
        </span>
        <div className="flex flex-col items-start gap-3">
          <h4 className="text-[14px] font-extrabold text-black uppercase tracking-tight">
            {item.company}
          </h4>
          <span
            className={cn(
              "px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full",
              item.badge === "Current"
                ? "bg-black text-white"
                : "bg-[#f5f5f5] text-black/40"
            )}
          >
            {item.badge}
          </span>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex flex-col items-start gap-6">
        <h3 className="text-[22px] font-bold tracking-[-0.02em] text-[#111]">
          {item.title}
        </h3>
        <p className="text-[14px] leading-[1.8] text-[#666] font-medium max-w-[680px]">
          {item.description}
        </p>

        <ul className="flex flex-col gap-4">
          {item.bullets.map((bullet: string, i: number) => (
            <li
              key={i}
              className="flex items-start gap-4 group/bullet transition-transform duration-300 hover:translate-x-1"
            >
              <div className="mt-[9px] h-[5px] w-[5px] min-w-[5px] rounded-full bg-[#ccc] group-hover/bullet:bg-black transition-colors" />
              <span className="text-[14px] leading-relaxed text-[#666] font-medium">
                {bullet}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 pt-4">
          {item.tags.map((tag: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider border border-[#ebebeb] bg-[#f9f9f9] rounded-md text-black/30 transition-all duration-300 group-hover:border-black/10 group-hover:bg-black group-hover:text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function EducationItem({ item }: { item: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative border-t border-[#ebebeb] py-12 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 md:gap-16 transition-all duration-500"
    >
      {/* Top Border Sweep */}
      <div className="absolute top-[-1.5px] left-0 h-[1.5px] bg-black w-0 group-hover:w-full transition-all duration-700 ease-[0.16,1,0.3,1] z-10" />

      <div className="flex flex-col items-start gap-1">
        <span className="text-[12px] text-[#999] font-medium tracking-wider uppercase">
          {item.year}
        </span>
      </div>

      <div className="flex flex-col items-start gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <h3 className="text-[18px] font-bold text-black tracking-tight">
            {item.degree}
          </h3>
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#f5f5f5] text-black/40 rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-500">
            CGPA: {item.cgpa}
          </span>
        </div>
        <p className="text-[14px] font-medium text-[#666]">{item.school}</p>
      </div>
    </motion.div>
  );
}

function ProjectCard({ item, index }: { item: any; index: number }) {
  const isFeatured = item.featured === true;

  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group relative p-9 lg:p-11 rounded-[16px] border transition-all duration-500 flex flex-col items-start gap-8",
        isFeatured
          ? "bg-[#0a0a0a] text-white border-white/5 md:col-span-2"
          : "bg-white text-black border-[#ebebeb]"
      )}
    >
      {/* Top Border Sweep Animation - Green for Featured, Black for Standard */}
      <div
        className={cn(
          "absolute top-[-1.5px] left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-700 ease-[0.16,1,0.3,1] z-10",
          isFeatured ? "bg-[#22c55e]" : "bg-black"
        )}
      />

      <div className="w-full flex justify-between items-start">
        <span
          className={cn(
            "text-[13px] italic font-instrument transition-opacity duration-500",
            isFeatured ? "text-white/20" : "text-[#ccc]"
          )}
        >
          {isFeatured ? "Featured" : `0${index + 1}`}
        </span>
        <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 opacity-40 group-hover:opacity-100" />
      </div>

      <div className="flex flex-col gap-4">
        <h3
          className={cn(
            "text-[20px] lg:text-[22px] font-bold tracking-tight",
            isFeatured ? "text-white" : "text-black"
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "text-[13.5px] leading-[1.75] font-medium max-w-[90%]",
            isFeatured ? "text-white/50" : "text-[#666]"
          )}
        >
          {item.description}
        </p>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        {item.tags.map((tag: string, i: number) => (
          <span
            key={i}
            className={cn(
              "px-3 py-1 text-[11px] font-bold uppercase tracking-wider border rounded-md transition-all duration-300",
              isFeatured
                ? "border-white/10 text-white/30 group-hover:bg-white group-hover:text-black group-hover:border-white"
                : "border-[#ebebeb] text-[#aaa] group-hover:border-black/10 group-hover:bg-black group-hover:text-white group-hover:border-black"
            )}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
