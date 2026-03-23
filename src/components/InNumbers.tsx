"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const badgeText = "In Numbers";
const h2Text = "Discover key AI tool statistics";
const pText = "Discover the power of creativity through data! Our AI has generated over 1 million unique images.";

const stats = [
  { value: "99%", label: "Worldwide Client Satisfaction" },
  { value: "75+", label: "Global Company Investment" },
  { value: "95k", label: "Total Worldwide Users" },
  { value: "25+", label: "Image Generation Modes" },
];

// ─── Letter-by-letter blur reveal ────────────────────────────────────────────
function AnimatedText({
  text,
  startDelay = 0,
  className = "",
  tag: Tag = "span",
}: {
  text: string;
  startDelay?: number;
  className?: string;
  tag?: "span" | "p" | "h2";
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

const h2L1Delay = 0.2;
const pDelay = h2L1Delay + h2Text.length * 0.022 + 0.08;
const btnDelay = pDelay + 0.4;

// ─── Main ─────────────────────────────────────────────────────────────────────
export function InNumbers() {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6 max-w-[84rem]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_0.9fr] gap-6 items-stretch">

          {/* ── LEFT CARD ── */}
          <motion.div
            initial={{ opacity: 0, x: -50, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative border border-[#fcfcfc40] rounded-[14px] p-10 md:p-12 overflow-hidden flex flex-col justify-center min-h-[440px]"
          >
            {/* BG gradient — dark top-left to #351F41 bottom-right */}
            <div
              className="absolute inset-0 z-0"
              style={{
                background: "linear-gradient(to bottom right, #0d0912 0%, #1a0f25 45%, #351F41 100%)",
              }}
            />

            {/* Grid lines — fade in from bottom, visible across the bottom half */}
            <div
              className="absolute inset-0 z-0 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "90px 90px",
                backgroundPosition: "top left",
                maskImage:
                  "linear-gradient(to top, black 0%, black 40%, transparent 80%)",
                WebkitMaskImage:
                  "linear-gradient(to top, black 0%, black 40%, transparent 80%)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col space-y-6">

              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0 }}
                className="inline-block w-fit px-4 py-1.5 rounded-full border border-white/30 text-[18px] font-medium text-white mb-2"
              >
                {badgeText}
              </motion.span>

              {/* H2 — single line */}
              <h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                <span className="block">
                  <AnimatedText text={h2Text} startDelay={h2L1Delay} />
                </span>
              </h2>

              {/* P */}
              <div className="max-w-[420px]">
                <AnimatedText
                  text={pText}
                  startDelay={pDelay}
                  className="text-lg text-white leading-relaxed"
                  tag="p"
                />
              </div>

              {/* Button */}
              <button className="group relative flex items-center justify-center max-w-[180px] h-[58px] rounded-full overflow-hidden transition-all duration-700 ease-in-out border border-white/30">
                {/* Base Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#dd429d] to-[#485cfb] transition-opacity duration-700 group-hover:opacity-0" />

                {/* White Fill Background Layer */}
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />

                <div className="relative z-10 flex items-center justify-center gap-2 px-6">
                  {/* Gradient Sparkle (Left - Shows on Hover) */}
                  <div className="absolute -left-2 opacity-0 -translate-x-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-6">
                    <Image src="/images/button-icon-2.svg" alt="Spark" width={14} height={14} />
                  </div>

                  {/* Text */}
                  <span className="text-[15px] font-bold text-white transition-all duration-700 group-hover:text-[#bb46c7] group-hover:translate-x-4">
                    Explore Now
                  </span>

                  {/* White Sparkle (Right - Hides on Hover) */}
                  <div className="opacity-100 transition-all duration-700 group-hover:opacity-0 group-hover:translate-x-4">
                    <Image src="/images/button-icon-1.svg" alt="Spark" width={14} height={14} />
                  </div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* ── RIGHT CARD — vertical marquee stats ── */}
          <motion.div
            initial={{ opacity: 0, x: 50, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="relative h-[440px] overflow-hidden rounded-[14px] border border-[#fcfcfc40] bg-[#0a0a0a]"
          >
            <motion.div
              className="flex flex-col gap-3 p-4"
              animate={{ y: ["0%", "-50%"] }}
              transition={{ duration: 14, ease: "linear", repeat: Infinity }}
            >
              {[...stats, ...stats].map((stat, i) => (
                <div
                  key={i}
                  className="border border-white/[0.08] px-8 py-7 rounded-2xl flex flex-col justify-center hover:border-white/20 transition-colors duration-300"
                  style={{ background: i % stats.length === 0 ? "#161616" : "#111111" }}
                >
                  <h3
                    className="text-5xl font-bold mb-3 tracking-tight"
                    style={{
                      background: "linear-gradient(to right, #dd429d, #b14bf4, #fb48f5ff)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {stat.value}
                  </h3>
                  <p className="text-base text-white/80 font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            {/* Top + bottom fade */}
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
