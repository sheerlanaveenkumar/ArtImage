"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkle } from "lucide-react";
import { useState } from "react";

const badgeText = "Let's Get Start";
const h2Line1   = "Bring Your Creative Design Dreams";
const h2Line2   = "to Life with the Power of AI";
const pText     = "Let's AI brilliantly transform your unique thoughts into your artwork. Create something truly amazing today.";

function AnimatedText({
  text,
  startDelay = 0,
  className = "",
  tag: Tag = "span",
}: {
  text: string;
  startDelay?: number;
  className?: string;
  tag?: "span" | "p";
}) {
  return (
    <Tag className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: startDelay + i * 0.02, ease: "easeOut" }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
}

// Delays: badge → h2 line1 → h2 line2 → p
const badgeDelay = 0;
const h2L1Delay  = 0.3;
const h2L2Delay  = h2L1Delay + h2Line1.length * 0.02 + 0.05;
const pDelay     = h2L2Delay + h2Line2.length * 0.02 + 0.08;
const btnDelay   = pDelay + pText.length * 0.02 * 0.3; // don't wait full p, overlap a bit

export default function CTA() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="bg-black text-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-[32px] p-12 md:p-24 text-center border border-white/5">

          {/* ── Base gradient: #1e0f4a → #3b1f8c → #6d28d9 → #9333ea → #c026d3 ── */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(125deg, #1e0f4a 0%, #3b1f8c 25%, #6d28d9 50%, #9333ea 72%, #c026d3 100%)",
            }}
          />

          {/* ── Pink glow blob — bottom right corner ── */}
          <div
            className="absolute bottom-[-60px] right-[-60px] w-[380px] h-[380px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #c026d3 0%, #c026d380 30%, transparent 70%)" }}
          />

          {/* ── Pink glow blob — top left corner ── */}
          <div
            className="absolute top-[-60px] left-[-60px] w-[340px] h-[340px] rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle, #c026d3 0%, #c026d370 30%, transparent 70%)" }}
          />

          {/* Grainy texture overlay */}
          <div
            className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Grid lines — visible only in center, fully fades at all 4 corners */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
              maskImage:
                "radial-gradient(ellipse 55% 50% at 50% 50%, black 0%, black 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 55% 50% at 50% 50%, black 0%, black 30%, transparent 100%)",
            }}
          />

          {/* ── Content ── */}
          <div className="relative z-10 flex flex-col items-center">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: badgeDelay }}
              className="px-6 py-2 bg-black/20 backdrop-blur-md border border-white/20 rounded-full text-[14px] font-bold mb-10 tracking-tight"
            >
              {badgeText}
            </motion.div>

            {/* H2 — two lines, letter by letter */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 tracking-tighter leading-[1.15] max-w-4xl">
              <span className="block">
                <AnimatedText text={h2Line1} startDelay={h2L1Delay} />
              </span>
              <span className="block">
                <AnimatedText text={h2Line2} startDelay={h2L2Delay} />
              </span>
            </h2>

            {/* P — letter by letter */}
            <div className="max-w-2xl mx-auto mb-12">
              <AnimatedText
                text={pText}
                startDelay={pDelay}
                className="text-lg md:text-xl text-white/80 leading-relaxed font-medium"
                tag="p"
              />
            </div>

            {/* Button */}
            <motion.div
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: btnDelay }}
            >
              <motion.button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center gap-2 px-8 py-4 rounded-full text-[17px] font-bold overflow-hidden shadow-xl"
              >
                {/* White bg default */}
                <div className={`absolute inset-0 bg-white transition-opacity duration-500 ${isHovered ? "opacity-0" : "opacity-100"}`} />
                {/* Gradient on hover */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                  style={{ background: "linear-gradient(to right, #d946ef, #6366f1)" }} />

                <div className={`relative z-10 flex items-center gap-2 transition-colors duration-500 ${isHovered ? "text-white" : "text-black"}`}>
                  <AnimatePresence>
                    {isHovered && (
                      <motion.span
                        initial={{ width: 0, opacity: 0, x: -10 }}
                        animate={{ width: "auto", opacity: 1, x: 0 }}
                        exit={{ width: 0, opacity: 0, x: -10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center"
                      >
                        <Sparkle size={20} className="fill-current" />
                      </motion.span>
                    )}
                  </AnimatePresence>

                  Get Started Now

                  <AnimatePresence>
                    {!isHovered && (
                      <motion.span
                        initial={{ width: "auto", opacity: 1 }}
                        exit={{ width: 0, opacity: 0, x: 10 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center"
                      >
                        ✦
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}