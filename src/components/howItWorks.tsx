"use client";

import { useState, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";

// ─── Data ───────────────────────────────────────────────────────────────────

const steps = [
  {
    id: "1. Describe",
    desc: "Describe your vision in a few words, and watch the AI transform it into stunning visuals instantly.",
  },
  {
    id: "2. Generate",
    desc: "Generate your vision in a few words, and watch the AI transform it into stunning visuals instantly.",
  },
  {
    id: "3. Export",
    desc: "Export your vision in a few words, and watch the AI transform it into stunning visuals instantly.",
  },
];

const BASE = "https://cdn.prod.website-files.com/685293486d80eb34c60ada80/";

// 3x3 grid — col arrays (each col = 3 images top→bottom)
const col1 = [
  BASE + "6857d15a9243092d64064ba4_how-it-works-image-1.webp", // row0 — VR helmet      [corner]
  BASE + "6857d15ab704014814cbb8fb_how-it-works-image-4.webp", // row1 — orange helmet  [Mark Tain]
  BASE + "6857d15ad986105f55c05f24_how-it-works-image-7.webp", // row2 — white hair     [corner]
];
const col2 = [
  BASE + "6857d15aa135f9b50078c8bc_how-it-works-image-2.webp", // row0 — astronaut
  BASE + "6857d15ad9a93b3fd0947930_how-it-works-image-5.webp", // row1 — glass helmet kid
  BASE + "6857d15a6e3bac8a312f3622_how-it-works-image-8.webp", // row2 — moon
];
const col3 = [
  BASE + "6857d15a62988817291bfc7d_how-it-works-image-3.webp", // row0 — golden figures [corner]
  BASE + "6857d15a4469db3b2805916a_how-it-works-image-6.webp", // row1 — red hair warrior
  BASE + "6857d15bd4846cf6ff391126_how-it-works-image-9.webp", // row2 — pink panda     [corner]
];

const badgeText = "How It Works";
const h2Text = "Built in Just 3 Steps";
const pText = "Transform ideas with AI tools designed for unparalleled art and video creation. Create image, videos that mesmerize.";

// ─── Helpers ────────────────────────────────────────────────────────────────

function AnimatedText({
  text,
  startDelay = 0,
  className = "",
  tag: Tag = "span",
}: {
  text: string;
  startDelay?: number;
  className?: string;
  tag?: "span" | "p" | "h2" | "h3";
}) {
  return (
    <Tag className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: startDelay + i * 0.022, ease: "easeOut" }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
}

const h2Delay = 0.2;
const pDelay = h2Delay + h2Text.length * 0.022 + 0.1;

// ─── Cursor icon ────────────────────────────────────────────────────────────

function CursorIcon() {
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center border border-white/30"
      style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(4px)" }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 3 L12 3 L3 12 Z" fill="white" />
        <path d="M12 12 L3 12 L12 3 Z" fill="white" fillOpacity="0.35" />
      </svg>
    </div>
  );
}

// ─── Single scrolling column ─────────────────────────────────────────────────

interface ColProps {
  images: string[];
  direction: "down" | "up";
  duration: number;
  cornerRows: number[];   // row indices that show cursor on hover
  markTainRow?: number;   // row index to show Mark Tain badge
}

function ScrollColumn({ images, direction, duration, cornerRows, markTainRow }: ColProps) {
  const controls = useAnimationControls();
  const [hovered, setHovered] = useState<number | null>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const startY = direction === "down" ? "0%" : "-50%";
  const endY = direction === "down" ? "-50%" : "0%";

  const play = () =>
    controls.start({
      y: [startY, endY],
      transition: { duration, repeat: Infinity, ease: "linear" },
    });

  useEffect(() => { play(); }, []);

  const looped = [...images, ...images]; // double for seamless loop

  return (
    <div className="relative overflow-hidden h-full">
      <motion.div animate={controls} className="flex flex-col gap-2">
        {looped.map((src, i) => {
          const row = i % images.length;
          const isCorner = cornerRows.includes(row);
          const isHovered = hovered === row;
          const isMark = markTainRow === row && i < images.length;

          return (
            <div
              key={i}
              className="relative aspect-square flex-shrink-0 overflow-hidden rounded-xl cursor-none"
              onMouseEnter={() => { setHovered(row); controls.stop(); }}
              onMouseLeave={() => { setHovered(null); play(); }}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                setCursor({ x: e.clientX - r.left, y: e.clientY - r.top });
              }}
            >
              {/* Image */}
              <Image
                src={src}
                alt=""
                fill
                className={`object-cover transition-all duration-500 ${isHovered ? "scale-[1.06] brightness-110" : "scale-100 brightness-[0.88]"
                  }`}
              />

              {/* Custom cursor — corners only */}
              {isCorner && isHovered && (
                <div
                  className="absolute pointer-events-none z-30"
                  style={{ left: cursor.x, top: cursor.y, transform: "translate(-50%,-50%)" }}
                >
                  <CursorIcon />
                </div>
              )}

              {/* Corner ring */}
              {isCorner && isHovered && (
                <div className="absolute inset-0 rounded-xl ring-1 ring-white/25 pointer-events-none z-20" />
              )}

              {/* Mark Tain badge + play button */}
              {isMark && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center shadow-xl"
                      style={{ background: "linear-gradient(135deg,#d946ef,#6366f1)" }}
                    >
                      <svg className="w-4 h-4 fill-white ml-0.5" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div
                    className="absolute bottom-2 right-2 text-[9px] font-bold px-2.5 py-1 rounded-full text-white z-10 whitespace-nowrap shadow-lg pointer-events-none"
                    style={{ background: "linear-gradient(135deg,#d946ef,#6366f1)" }}
                  >
                    Mark Tain
                  </div>
                </>
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── Image Grid ─────────────────────────────────────────────────────────────

function ImageGrid() {
  return (
    <div className="grid grid-cols-3 gap-2 h-[390px] overflow-hidden rounded-2xl cursor-none">
      {/* Col 1 — down — corners: row0, row2 — Mark Tain: row1 */}
      <ScrollColumn
        images={col1}
        direction="down"
        duration={14}
        cornerRows={[0, 2]}
        markTainRow={1}
      />
      {/* Col 2 — up — no corners */}
      <ScrollColumn
        images={col2}
        direction="up"
        duration={11}
        cornerRows={[]}
      />
      {/* Col 3 — down — corners: row0, row2 */}
      <ScrollColumn
        images={col3}
        direction="down"
        duration={17}
        cornerRows={[0, 2]}
      />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function HowItWorks() {
  return (
    <section className="relative bg-[#0b0510] text-white py-24 px-6 md:px-12 lg:px-20 overflow-hidden min-h-screen">

      {/* BG glow blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%]  left-[20%]  w-[550px] h-[750px] rounded-full bg-[#d946ef]/15 blur-[150px]" />
        <div className="absolute top-[25%] right-[20%] w-[500px] h-[600px] rounded-full bg-[#6366f1]/15 blur-[140px]" />
        <div className="absolute bottom-0  left-1/2   w-[500px] h-[300px] -translate-x-1/2 rounded-full bg-[#6366f1]/10 blur-[100px]" />
      </div>

      {/* Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "100px 100px",
          maskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
        }}
      />

      <div className="max-w-[84rem] mx-auto grid md:grid-cols-2 gap-16 items-start relative z-10">

        {/* ── LEFT ── */}
        <div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block px-5 py-2 rounded-full border border-white/30 text-[13px] font-bold uppercase tracking-widest text-white mb-8"
          >
            {badgeText}
          </motion.div>

          {/* H2 */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 tracking-tight">
            <AnimatedText text={h2Text} startDelay={h2Delay} />
          </h2>

          {/* P */}
          <div className="mb-16 md:pr-4">
            <AnimatedText
              text={pText}
              startDelay={pDelay}
              className="text-white text-base md:text-xl leading-relaxed"
              tag="p"
            />
          </div>

          {/* Steps */}
          <div className="space-y-16">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
                className="space-y-3"
              >
                <div className="text-xl md:text-3xl font-bold text-white">
                  <AnimatedText text={step.id} startDelay={i * 0.15 + 0.1} />
                </div>
                <AnimatedText
                  text={step.desc}
                  startDelay={i * 0.15 + 0.1 + step.id.length * 0.022 + 0.05}
                  className="text-white text-sm md:text-xl leading-relaxed md:pr-4"
                  tag="p"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — sticky card ── */}
        <div className="sticky">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative rounded-[2rem] p-8 md:p-10 shadow-2xl overflow-hidden border border-white/[0.08]"
            style={{ backgroundImage: "linear-gradient(180deg, #241436 0%, #150A1F 100%)" }}
          >
            {/* Top shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Card title */}
            <h3 className="text-lg md:text-3xl font-bold text-white mb-5">
              <AnimatedText text="Create Awesome Characters" startDelay={0.3} />
            </h3>

            {/* Step badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {["1. Describe", "2. Generate", "3. Export"].map((label, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                  className="px-6 py-1 rounded-full text-lg font-bold text-white"
                  style={{ background: "linear-gradient(135deg,#d946ef,#6366f1)" }}
                >
                  {label}
                </motion.div>
              ))}
            </div>

            {/* Input pill */}
            <motion.div
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="w-full rounded-full py-2.5 px-7 text-white text-lg mb-7 border border-white/[0.08]"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              Create stunning AI female characters..
            </motion.div>

            {/* 3×3 Scrolling Image Grid */}
            <ImageGrid />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
