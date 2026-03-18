"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ─── Top Left (VR Card) — rotates LEFT ───────────────────────────────────
  const card1Y         = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const card1RotateY   = useTransform(scrollYProgress, [0, 1], [-15, -15 - 360]); // ← left spin
  const card1RotateZ   = useTransform(scrollYProgress, [0, 0.5, 1], [-16, 12, -16]);

  // ─── Top Right (Bird Card) — rotates RIGHT ───────────────────────────────
  const card2Y         = useTransform(scrollYProgress, [0, 1], [30, -400]);
  const card2RotateY   = useTransform(scrollYProgress, [0, 1], [15, 15 + 360]);   // → right spin
  const card2RotateZ   = useTransform(scrollYProgress, [0, 0.5, 1], [16, 12, 16]);

  // ─── Bottom Left (Tree Card) ──────────────────────────────────────────────
  const card3Y         = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const card3RotateY   = useTransform(scrollYProgress, [0, 1], [-10, -10 - 360]);
  const card3RotateZ   = useTransform(scrollYProgress, [0, 0.5, 1], [8, 12, 8]);

  // ─── Bottom Right (Fire Card) ─────────────────────────────────────────────
  const card4Y         = useTransform(scrollYProgress, [0, 1], [50, -320]);
  const card4RotateY   = useTransform(scrollYProgress, [0, 1], [12, 12 + 360]);
  const card4RotateZ   = useTransform(scrollYProgress, [0, 0.5, 1], [-10, -15, -10]);

  return (
    <section
      ref={containerRef}
      className="
        relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20
        overflow-hidden min-h-screen flex items-center
        [perspective:1500px]
      "
    >
      {/* ── Background Pattern ── */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/bg-pattern.svg"
          alt="background pattern"
          fill
          className="object-cover"
        />
      </div>

      {/* ── Glow ── */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] md:w-[800px] h-[200px] sm:h-[300px] md:h-[400px] bg-brand/20 blur-[80px] sm:blur-[120px] rounded-full z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* ── Headline ── */}
          <h1 className="
            text-3xl sm:text-5xl md:text-6xl lg:text-7xl
            font-bold font-exo tracking-tight mb-4 sm:mb-6
            max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto
            leading-[1.1]
          ">
            Create Stunning Visuals <br />
            <span className="gradient-text">In Just One Prompt</span>
          </h1>

          {/* ── Subtitle ── */}
          <p className="
            text-sm sm:text-base lg:text-lg
            text-muted-foreground font-inter
            max-w-sm sm:max-w-xl md:max-w-2xl mx-auto
            mb-8 sm:mb-12
            px-2 sm:px-0
          ">
            Experience the power of generative AI. Artimg transforms your words into
            high-fidelity, realistic images that will wow your audience.
          </p>

          {/* ── Search Bar ── */}
          <div className="max-w-xs sm:max-w-lg md:max-w-2xl mx-auto mb-10 sm:mb-16 relative px-2 sm:px-0">
            <div className="bg-[#fcfcfc] rounded-full p-1.5 sm:p-2 flex items-center shadow-lg border border-transparent focus-within:border-[#425a36] transition-colors">
              <input
                type="text"
                placeholder="Describe your imagination..."
                className="
                  flex-1 bg-transparent border-none focus:outline-none
                  px-3 sm:px-6 text-black placeholder:text-gray-400
                  text-sm sm:text-base
                  min-w-0
                "
              />
              <div className="btn-generate-wrapper shrink-0">
                <button className="btn-generate-inner text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5">
                  Generate
                </button>
              </div>
            </div>
          </div>

          {/* ── Cards + Mockup ── */}
          <div className="relative max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto [transform-style:preserve-3d]">

            {/* ── Floating Cards (lg+ only) ── */}
            <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">

              {/* Top Left — VR */}
              <motion.div
                style={{
                  y: card1Y,
                  rotateY: card1RotateY,
                  rotateZ: card1RotateZ,
                  // rotateX: 10,
                }}
                initial={{ opacity: 0, rotateY: 90, x: -50 }}
                animate={{ opacity: 1, rotateY: -15, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute -top-[15%] -left-[20%] w-52 xl:w-52 h-64 xl:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <Image src="/images/hero_card_vr.png" alt="Hero Card VR" fill className="object-cover" />
              </motion.div>

              {/* Top Right — Bird */}
              <motion.div
                style={{
                  y: card2Y,
                  rotateY: card2RotateY,
                  rotateZ: card2RotateZ,
                  rotateX: 10,
                }}
                initial={{ opacity: 0, rotateY: -90, x: 50 }}
                animate={{ opacity: 1, rotateY: 15, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -top-[15%] -right-[20%] w-52 xl:w-52 h-64 xl:h-70 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <Image src="/images/hero_card_bird.png" alt="Hero Card Bird" fill className="object-cover" />
              </motion.div>

              {/* Bottom Left — Tree */}
              <motion.div
                style={{
                  y: card3Y,
                  rotateY: card3RotateY,
                  rotateZ: card3RotateZ,
                  rotateX: 5,
                }}
                initial={{ opacity: 0, rotateY: 90, x: -30 }}
                animate={{ opacity: 1, rotateY: -10, x: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="absolute top-[55%] -left-[22%] w-44 xl:w-52 h-64 xl:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <Image src="/images/hero_card_tree.png" alt="Hero Card Tree" fill className="object-cover" />
              </motion.div>

              {/* Bottom Right — Fire */}
              <motion.div
                style={{
                  y: card4Y,
                  rotateY: card4RotateY,
                  rotateZ: card4RotateZ,
                  rotateX: 5,
                }}
                initial={{ opacity: 0, rotateY: -90, x: 30 }}
                animate={{ opacity: 1, rotateY: 12, x: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute top-[60%] -right-[18%] w-48 xl:w-56 h-64 xl:h-72 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              >
                <Image src="/images/hero_card_fire.png" alt="Hero Card Fire" fill className="object-cover" />
              </motion.div>
            </div>

            {/* ── Hero Mockup — Glass Border ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="
                relative z-10
                p-[12px]
                rounded-xl sm:rounded-2xl
                bg-gradient-to-br from-white/25 via-white/5 to-white/15
                shadow-[0_40px_100px_rgba(0,0,0,0.5)]
                backdrop-blur-sm
              "
            >
              {/* Inner clip wrapper */}
              <div className="rounded-[calc(1.5rem-2px)] sm:rounded-[calc(1.75rem-2px)] overflow-hidden relative">
                <Image
                  src="/images/hero-mockup.webp"
                  alt="Artimg Platform Mockup"
                  width={1200}
                  height={600}
                  className="w-full h-auto block"
                  priority
                />
                {/* Inner glass sheen */}
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[inherit] pointer-events-none" />
              </div>
            </motion.div>

            {/* ── Mobile floating cards (sm–md) shown below mockup ── */}
            <div className="flex justify-center gap-3 mt-6 lg:hidden sm:gap-4">
              {[
                { src: "/images/hero_card_vr.png",   alt: "VR"   },
                { src: "/images/hero_card_bird.png",  alt: "Bird" },
                { src: "/images/hero_card_tree.png",  alt: "Tree" },
                { src: "/images/hero_card_fire.png",  alt: "Fire" },
              ].map((card, i) => (
                <motion.div
                  key={card.alt}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="relative w-16 h-22 sm:w-20 sm:h-28 rounded-xl overflow-hidden border border-white/10 shadow-lg shrink-0"
                  style={{ height: "clamp(5.5rem, 14vw, 7rem)" }}
                >
                  <Image src={card.src} alt={`Hero Card ${card.alt}`} fill className="object-cover" />
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}