"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ─── Top Left (VR Card) — rotates LEFT ───────────────────────────────────
  const card1Y = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const card1RotateY = useTransform(scrollYProgress, [0, 1], [-15, -15 - 360]); // ← left spin
  const card1RotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-16, 12, -16]);

  // ─── Top Right (Bird Card) — rotates RIGHT ───────────────────────────────
  const card2Y = useTransform(scrollYProgress, [0, 1], [30, -400]);
  const card2RotateY = useTransform(scrollYProgress, [0, 1], [15, 15 + 360]);   // → right spin
  const card2RotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [16, 12, 16]);

  // ─── Bottom Left (Tree Card) ──────────────────────────────────────────────
  const card3Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const card3RotateY = useTransform(scrollYProgress, [0, 1], [-10, -10 - 360]);
  const card3RotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [8, 12, 8]);

  // ─── Bottom Right (Fire Card) ─────────────────────────────────────────────
  const card4Y = useTransform(scrollYProgress, [0, 1], [50, -320]);
  const card4RotateY = useTransform(scrollYProgress, [0, 1], [12, 12 + 360]);
  const card4RotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-10, -15, -10]);

  return (
    <section
      ref={containerRef}
      className="
        relative pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20
        overflow-hidden min-h-screen flex items-center
        [perspective:1500px] bg-gradient-to-b from-[#0F0716] via-[#1A0B2E] to-black
      "
    >
      {/* ── Background Pattern ── */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src="/images/bg-pattern.svg"
          alt="background pattern"
          fill
          className="object-cover"
        />
      </div>

      {/* ── Glow ── */}
      <div className="absolute top-[372px] left-1/2 -translate-x-1/2 w-[1152px] h-[576px] z-0 pointer-events-none opacity-35">
        <Image
          src="/images/Gradient+Blur.png"
          alt="Glow background"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="container mx-auto pt-10 px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* ── Headline ── */}
          <h1 className="
            text-2xl sm:text-4xl md:text-5xl lg:text-6xl
            font-semibold font-exo tracking-tight mb-4 sm:mb-6
            max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto
            leading-[1.1]
          ">
            Create Better Social Media Content -
            <span className="ml-2 inline-block w-fit bg-gradient-to-r from-[#d148cf] via-[#a020f0] to-[#7e007e] bg-clip-text text-transparent">
              Faster with AI
            </span>
          </h1>

          {/* ── Subtitle ── */}
          <p className="
            text-sm sm:text-base lg:text-lg
            text-muted-foreground 
            max-w-sm sm:max-w-xl md:max-w-2xl mx-auto
            mb-8 sm:mb-12
            px-2 sm:px-0 text-white font-exo
          ">
            ZunoSync is your AI-powered social media content generator that helps you turn simple ideas into engaging captions, hashtags, and post concepts in seconds.
          </p>

          {/* <p className="
            text-sm sm:text-base lg:text-lg
            text-muted-foreground
            max-w-sm sm:max-w-xl md:max-w-2xl mx-auto
            mb-8 sm:mb-12
            px-2 sm:px-0 text-white font-exo
          ">
            No overthinking. No creative blocks. Just content that works.
          </p> */}

          {/* ── Search Bar ── */}
          <div className="mx-auto mb-10 sm:mb-16 px-2 sm:px-0 max-w-[320px] md:max-w-[520px]">
            <div className="flex flex-col md:flex-row gap-4">

              {/* Primary Button */}
              <button className="
      flex-1 w-full h-14 sm:h-12
      rounded-full
      flex items-center justify-center
      text-sm sm:text-base font-medium
      text-white
      bg-gradient-to-r from-[#d148cf] to-[#5b6df9]
      transition-all duration-300
      whitespace-nowrap
    ">
                Start Creating for Free
                <ArrowRight className="w-4 h-8 ml-2" />
              </button>

              {/* Secondary Button */}
              <button className="
      flex-1 w-full h-14 sm:h-12
      rounded-full
      flex items-center justify-center
      text-sm sm:text-base font-medium
      text-white/80
      border border-white/20
      bg-white/5 backdrop-blur-md
      transition-all duration-300
      whitespace-nowrap
    ">
                <Play className="w-4 h-8 mr-2" />
                See How It Works
              </button>

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
                className="absolute -top-[15%] -left-[18%] w-52 xl:w-52 h-52 xl:h-52 rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image src="/images/hero/robo.svg" alt="Hero Card VR" fill className="object-contain" />
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
                className="absolute -top-[15%] -right-[18%] w-52 xl:w-52 h-52 xl:h-52 rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image src="/images/hero/roboleft.svg" alt="Hero Card Bird" fill className="object-contain" />
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
                className="absolute top-[55%] -left-[22%] w-52 xl:w-52 h-52 xl:h-52 rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image src="/images/hero/oldman.svg" alt="Hero Card Tree" fill className="object-contain" />
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
                className="absolute top-[60%] -right-[18%] w-52 xl:w-52 h-52 xl:h-52 rounded-2xl overflow-hidden shadow-2xl"
              >
                <Image src="/images/hero/brain.svg" alt="Hero Card Fire" fill className="object-contain" />
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
                  src="/images/hero/dashboard.svg"
                  alt="Artimg Platform Mockup"
                  width={780}
                  height={400}
                  className="w-full h-auto block"
                  priority
                />
                {/* Inner glass sheen */}
                {/* <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[inherit] pointer-events-none" /> */}
              </div>
            </motion.div>

            {/* ── Mobile floating cards (sm–md) shown below mockup ── */}
            <div className="flex justify-center gap-3 mt-6 lg:hidden sm:gap-4">
              {[
                { src: "/images/hero/robo.svg", alt: "VR" },
                { src: "/images/hero/roboleft.svg", alt: "Bird" },
                { src: "/images/hero/oldman.svg", alt: "Tree" },
                { src: "/images/hero/brain.svg", alt: "Fire" },
              ].map((card, i) => (
                <motion.div
                  key={card.alt}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  className="relative w-16 h-22 sm:w-20 sm:h-28 rounded-xl overflow-hidden border border-white/30 shadow-lg shrink-0"
                  style={{ height: "clamp(5.5rem, 14vw, 7rem)" }}
                >
                  <Image src={card.src} alt={`Hero Card ${card.alt}`} fill className="object-cover" />
                </motion.div>
              ))}
            </div>

          </div>
        </motion.div>
        {/* <p className="text-center text-sm text-muted-foreground mt-18">Used by marketers, founders, and creators who want consistent, high-performing content without the daily struggle.</p> */}
      </div>
    </section>
  );
}