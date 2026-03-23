"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = "All" | "Startups" | "E-commerce" | "Personal Brand" | "Agencies" | "Creators";

interface GalleryItem {
  id: number;
  title: string;
  category: Category[];
  src: string;
  /** Controls the visual "weight" of the card – tall = 2 rows, normal = 1 row */
  span: "tall" | "normal";
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const BASE = "https://cdn.prod.website-files.com/685293486d80eb34c60ada80";

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "Brand Launch",
    category: ["Startups", "All"],
    src: `/images/gallery/neon.png`,
    span: "normal",
  },
  {
    id: 2,
    title: "Client Campaign",
    category: ["E-commerce", "All"],
    src: `/images/gallery/dreamscape.png`,
    span: "tall",
  },
  {
    id: 3,
    title: "Personal Voice",
    category: ["Personal Brand", "All"],
    src: `/images/gallery/crystal.png`,
    span: "normal",
  },
  {
    id: 4,
    title: "Product Spotlight",
    category: ["E-commerce", "Creators", "All"],
    src: `/images/gallery/phantom.png`,
    span: "normal",
  },
  {
    id: 5,
    title: "Content Calendar",
    category: ["Agencies", "Agencies", "All"],
    src: `/images/gallery/shadow.png`,
    span: "tall",
  },
  {
    id: 6,
    title: "Growth Strategy",
    category: ["Startups", "Personal Brand", "Agencies", "All"],
    src: `/images/gallery/midnight.png`,
    span: "normal",
  },
  {
    id: 7,
    title: "Viral Hook",
    category: ["Creators", "Agencies", "All"],
    src: `/images/gallery/quantum.png`,
    span: "normal",
  },
  {
    id: 8,
    title: "Story Arc",
    category: ["Agencies", "Creators", "All"],
    src: `/images/gallery/frozen.png`,
    span: "tall",
  },
  {
    id: 9,
    title: "Multi Brand",
    category: ["Personal Brand", "Agencies", "All"],
    src: `/images/gallery/stellar.png`,
    span: "normal",
  },
  // {
  //   id: 10,
  //   title: "Aurora Genesis",
  //   category: ["E-commerce", "Startups", "Agencies", "All"],
  //   src: `/images/gallery/aurora.png`,
  //   span: "tall",
  // },
  // {
  //   id: 11,
  //   title: "Void Walker",
  //   category: ["Agencies", "All"],
  //   src: `/images/gallery/void.png`,
  //   span: "normal",
  // },
  // {
  //   id: 12,
  //   title: "Celestial Echo",
  //   category: ["E-commerce", "Personal Brand", "All"],
  //   src: `/images/gallery/celestial.png`,
  //   span: "normal",
  // },
  // {
  //   id: 13,
  //   title: "Cyber Prowess",
  //   category: ["All"],
  //   src: `/images/gallery/cyber.png`,
  //   span: "tall",
  // },
  // {
  //   id: 14,
  //   title: "Robotic Feast",
  //   category: ["Creators", "All"],
  //   src: `/images/gallery/robotic.png`,
  //   span: "normal",
  // },
  // {
  //   id: 15,
  //   title: "Verdant Reach",
  //   category: ["Startups", "All"],
  //   src: `/images/gallery/verdant.png`,
  //   span: "normal",
  // },
  // {
  //   id: 16,
  //   title: "Sunset Spire",
  //   category: ["Startups", "All"],
  //   src: `/images/gallery/sunset.png`,
  //   span: "normal",
  // },
  // {
  //   id: 17,
  //   title: "Mistwood Path",
  //   category: ["Startups", "All"],
  //   src: `/images/gallery/mistwood.png`,
  //   span: "normal",
  // },
  // {
  //   id: 18,
  //   title: "Golden Valley",
  //   category: ["Startups", "All"],
  //   src: `/images/gallery/golden.png`,
  //   span: "normal",
  // },
  // {
  //   id: 19,
  //   title: "Cybernetic Bloom",
  //   category: ["E-commerce", "All"],
  //   src: `/images/gallery/cybernetic.png`,
  //   span: "tall",
  // },
  // {
  //   id: 20,
  //   title: "Neural Network",
  //   category: ["E-commerce", "All"],
  //   src: `/images/gallery/neural.png`,
  //   span: "normal",
  // },
  // {
  //   id: 21,
  //   title: "Digital Soul",
  //   category: ["E-commerce", "All"],
  //   src: `/images/gallery/digital.png`,
  //   span: "tall",
  // },
  // {
  //   id: 22,
  //   title: "Prism Void",
  //   category: ["E-commerce", "All"],
  //   src: `/images/gallery/prism.png`,
  //   span: "normal",
  // },
  // {
  //   id: 23,
  //   title: "Chrome Echo",
  //   category: ["E-commerce", "All"],
  //   src: `/images/gallery/chrome.png`,
  //   span: "normal",
  // },
];

const GRID_CONFIG: Record<string, string> = {
  All: "lg:grid-cols-4",
  Startups: "lg:grid-cols-4",
  "E-commerce": "lg:grid-cols-4",
  "Personal Brand": "lg:grid-cols-4",
  Agencies: "lg:grid-cols-3",
  Creators: "lg:grid-cols-3",
};

const CATEGORIES: Category[] = [
  "All",
  "Startups",
  "E-commerce",
  "Personal Brand",
  "Agencies",
  "Creators",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface GalleryCardProps {
  item: GalleryItem;
  index: number;
  priority: boolean;
  onClick: () => void;
}

function GalleryCard({ item, index, priority, onClick }: GalleryCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group ${item.span === "tall" ? "row-span-2" : "row-span-1"
        }`}
      style={{ minHeight: item.span === "tall" ? "460px" : "220px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* ── Image ── */}
      <div className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${hovered ? "scale-110 blur-[2px]" : "scale-100 blur-0"}`}>
        <Image
          src={item.src}
          alt={item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>

      {/* ── Eye Icon Overlay (appears on hover) ── */}
      <div className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-500 pointer-events-none ${hovered ? "opacity-100" : "opacity-0"}`}>
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
      </div>

      {/* ── Dark gradient overlay (always present, deepens on hover) ── */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 z-10 ${hovered ? "opacity-100" : "opacity-40"
          }`}
        style={{
          background:
            "linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* ── Text reveal (bottom) ── */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-30">
        {/* category tag */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mb-2"
        >
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/60">
            {item.category[0]}
          </span>
        </motion.div>

        {/* title */}
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="text-white font-bold text-lg leading-tight tracking-tight"
          style={{ fontFamily: "'Sora', 'Inter', sans-serif" }}
        >
          {item.title}
        </motion.h3>

        {/* divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.45, delay: 0.12 }}
          style={{ transformOrigin: "left" }}
          className="mt-3 h-px bg-gradient-to-r from-white/60 to-transparent"
        />
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-80px" });

  const filtered = useMemo(() => {
    if (activeCategory === "All") return galleryItems;
    return galleryItems.filter((item) => item.category.includes(activeCategory));
  }, [activeCategory]);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === "Escape") setSelectedIdx(null);
      if (e.key === "ArrowRight") {
        setSelectedIdx((prev) => (prev !== null && prev < filtered.length - 1 ? prev + 1 : prev));
      }
      if (e.key === "ArrowLeft") {
        setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, filtered.length]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#080808] py-24 md:py-32 overflow-hidden"
    >
      {/* ── Lightbox Component ── */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors z-[110] p-2 bg-white/5 rounded-full border border-white/30"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Main Stage */}
            <div className="relative w-full max-w-6xl h-[65vh] flex items-center justify-center px-4 md:px-20">
              {/* Prev Arrow */}
              <button
                disabled={selectedIdx === 0}
                onClick={() => setSelectedIdx(selectedIdx - 1)}
                className={`absolute left-4 md:left-8 p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/30 transition-all ${selectedIdx === 0 ? 'opacity-0' : 'opacity-100'}`}
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <motion.div
                key={selectedIdx}
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/30"
              >
                <Image
                  src={filtered[selectedIdx].src}
                  alt={filtered[selectedIdx].title}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              {/* Next Arrow */}
              <button
                disabled={selectedIdx === filtered.length - 1}
                onClick={() => setSelectedIdx(selectedIdx + 1)}
                className={`absolute right-4 md:right-8 p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/30 transition-all ${selectedIdx === filtered.length - 1 ? 'opacity-0' : 'opacity-100'}`}
              >
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Info */}
            <div className="mt-8 text-center max-w-lg px-4">
              <h3 className="text-white text-2xl font-bold tracking-tight">{filtered[selectedIdx].title}</h3>
              <p className="text-violet-400 text-sm mt-1 uppercase tracking-widest font-semibold">{filtered[selectedIdx].category.join(" • ")}</p>
            </div>

            {/* Thumbnail Reel */}
            <div className="absolute bottom-10 w-full max-w-5xl px-8 overflow-hidden">
              <div className="flex justify-center gap-3 overflow-x-auto pb-4 no-scrollbar">
                {filtered.map((item: GalleryItem, i: number) => (
                  <button
                    key={`${item.id}-thumb`}
                    onClick={() => setSelectedIdx(i)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 border-2 ${selectedIdx === i ? 'border-violet-500 scale-110 shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'border-transparent opacity-40 grayscale hover:opacity-100 hover:grayscale-0'}`}
                  >
                    <Image src={item.src} alt={item.title} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ── Background grain texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── Subtle radial glow ── */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(120,80,255,0.4) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">

        {/* ── Section header ── */}
        <div ref={headerRef} className="mb-14 md:mb-20 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            {/* pill badge */}
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-white border border-white/30 bg-white/[0.04] backdrop-blur-sm rounded-full px-4 py-2 font-exo">
              {/* <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.6)] inline-block" /> */}
              Our Gallery
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white font-bold text-4xl sm:text-5xl lg:text-7xl leading-[1.07] tracking-tighter max-w-[900px] mb-8 font-exo"
          >
            Built for people who <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #a78bfa 0%, #7c3aed 50%, #c084fc 100%)",
              }}
            >create</span>{" "}
            {/* <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #a78bfa 0%, #7c3aed 50%, #c084fc 100%)",
              }}
            >
              Video Gallery
            </span> */}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-white text-base md:text-lg leading-relaxed max-w-[650px]"
          >
            Whether you're growing a brand or managing clients, ZunoSync helps you stay consistent without burning out.
          </motion.p>
        </div>

        {/* ── Filter tabs ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-16"
        >
          <div className="inline-flex flex-wrap items-center justify-center gap-3 p-3 bg-white/[0.02] border border-white/30 rounded-[40px] md:rounded-full backdrop-blur-md">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 py-3.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 border ${activeCategory === cat
                  ? "text-white border-transparent"
                  : "text-white hover:text-white bg-white/[0.05] border-white/30 hover:border-white/20"
                  }`}
              >
                {activeCategory === cat && (
                  <motion.span
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #d946ef 0%, #7c3aed 100%)",
                      boxShadow: "0 0 25px rgba(217,70,239,0.35)",
                    }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Masonry / CSS grid ── */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory}
            className={`grid grid-cols-1 sm:grid-cols-2 ${GRID_CONFIG[activeCategory] || "lg:grid-cols-3"
              } gap-4 auto-rows-[220px]`}
          >
            {filtered.map((item: GalleryItem, i: number) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={i}
                priority={i < 4}
                onClick={() => setSelectedIdx(i)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── CTA button ── */}
        <div className="flex justify-center mt-16 pb-12">
          <button className="group relative flex items-center justify-center min-w-[200px] h-[62px] rounded-full overflow-hidden transition-all duration-700 ease-in-out border border-white/30">
            {/* Base Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#dd429d] to-[#485cfb] transition-opacity duration-700 group-hover:opacity-0" />

            {/* White Fill Background Layer */}
            <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />

            <div className="relative z-10 flex items-center justify-center gap-2 px-8">
              {/* Gradient Sparkle (Left - Shows on Hover) */}
              <div className="absolute -left-2 opacity-0 -translate-x-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-6">
                <Image src="/images/button-icon-2.svg" alt="Spark" width={14} height={14} />
              </div>

              {/* Text */}
              <span className="text-[15px] font-bold text-white transition-all duration-700 group-hover:text-[#bb46c7] group-hover:translate-x-4 whitespace-nowrap">
                Discover AI Gallery
              </span>

              {/* White Sparkle (Right - Hides on Hover) */}
              <div className="opacity-100 transition-all duration-700 group-hover:opacity-0 group-hover:translate-x-4">
                <Image src="/images/button-icon-1.svg" alt="Spark" width={14} height={14} />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* ── Shimmer keyframe (injected inline) ── */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </section>
  );
}