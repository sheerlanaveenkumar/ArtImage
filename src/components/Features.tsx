"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "AI Content Generation",
    desc: "Zuno AI crafts platform-perfect posts with your brand voice, hashtags, and visuals in seconds.",
    image: "/images/features/feature1.png",
  },
  {
    title: "Smart Scheduling",
    desc: "Plan and schedule across all platforms from one unified calendar. Never miss a posting window.",
    image: "/images/features/feature2.png",
  },
  {
    title: "Deep Analytics",
    desc: "Track engagement, reach, and growth with real-time dashboards and actionable insights.",
    image: "/images/features/feature3.png",
  },
  {
    title: "Multi-Platform",
    desc: "Instagram, LinkedIn, X, TikTok, Facebook, YouTube manage every channel from one cockpit.",
    image: "/images/features/feature4.png",
  },
  {
    title: "Team Collaboration",
    desc: "Invite your team, assign roles, set approval workflows, and collaborate in real-time.",
    image: "/images/features/feature5.png",
  },
  {
    title: "Brand Consistency",
    desc: "Brand Kit ensures every post matches your colors, fonts, tone, and visual identity.",
    image: "/images/features/feature6.png",
  },
];

// ✅ Fix 1: Moved image transition into its own component so hooks aren't stale
function ImagePanel({
  scrollYProgress,
  active,
}: {
  scrollYProgress: MotionValue<number>;
  active: number;
}) {
  const start = active / features.length;
  const end = (active + 1) / features.length;

  // ✅ Fix 2: Each render recomputes range from current `active`
  const nextImageY = useTransform(scrollYProgress, [start, end], ["100%", "0%"]);

  return (
    <div className="relative w-full h-[400px] md:h-[480px] overflow-hidden rounded-2xl border border-gray-800 bg-black">
      {/* Current image */}
      <div className="absolute inset-0 z-10">
        <Image
          key={features[active].image}
          src={features[active].image}
          alt={features[active].title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Next image sliding up */}
      {active < features.length - 1 && (
        <motion.div className="absolute inset-0 z-20" style={{ y: nextImageY }}>
          <Image
            src={features[active + 1].image}
            alt={features[active + 1].title}
            fill
            className="object-cover"
          />
        </motion.div>
      )}
    </div>
  );
}

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const scrollPerItem =
    features.length <= 4 ? 130 : features.length <= 6 ? 120 : 110;
  const totalHeight = features.length * scrollPerItem;

  // ✅ Active index tracking
  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const segment = 1 / features.length;
      let nextActive = features.length - 1;
      for (let i = 0; i < features.length; i++) {
        if (latest >= i * segment && latest < (i + 1) * segment) {
          nextActive = i;
          break;
        }
      }
      setActive(nextActive);
    });
  }, [scrollYProgress]);

  // ✅ Scroll direction tracking
  useEffect(() => {
    let last = 0;
    return scrollYProgress.on("change", (latest) => {
      setDirection(latest > last ? "down" : "up");
      last = latest;
    });
  }, [scrollYProgress]);

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="relative bg-black text-white pb-32"
      style={{ height: `${totalHeight}vh` }}
    >
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-purple-700/10 blur-[130px] rounded-full" />
      </div>

      {/* Sticky panel */}
      <div className="sticky top-0 min-h-screen flex items-center flex-col justify-center py-24 md:py-0">

        {/* Header */}
        <div className="text-center mb-6 sm:mb-20 flex flex-col items-center gap-2 sm:gap-4 px-4">
          <span className="px-4 py-1 text-sm rounded-full border border-white/10 bg-white/5 backdrop-blur">
            Our Feature
          </span>
          <BlurText
            text="Explore Our Core Features"
            className="text-2xl sm:text-5xl md:text-[56px] font-bold text-white max-w-3xl"
          />
          <BlurText
            text="Transform ideas with AI tools designed for unparalleled art and video creation."
            delay={0.5}
            className="text-sm sm:text-base text-gray-400 max-w-lg"
          />
        </div>

        {/* Content grid */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6 w-full">

          {/* ✅ Fix 3: Extracted into component with fresh hook bindings per render */}
          <ImagePanel scrollYProgress={scrollYProgress} active={active} />

          {/* Text side */}
          <div className="flex flex-col justify-between h-full py-2">
            <div>
              {/* Progress bar */}
              <div className="h-[4px] bg-gray-700 rounded-full mt-10 mb-6 overflow-hidden">
                <motion.div
                  style={{ width: progressWidth }}
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                />
              </div>

              {/* Title */}
              <motion.h3
                key={features[active].title}
                initial={{ opacity: 0, x: direction === "down" ? -80 : 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-4xl font-semibold mb-4"
              >
                {features[active].title}
              </motion.h3>

              {/* Description */}
              <motion.p
                key={features[active].desc}
                initial={{ opacity: 0, x: direction === "down" ? -80 : 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-400 mb-4"
              >
                {features[active].desc}
              </motion.p>
            </div>

            {/* CTA Button */}
            <motion.div
              key={active + "-btn"}
              initial={{ opacity: 0, x: direction === "down" ? -80 : 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <button className="group relative flex items-center justify-center max-w-[180px] h-[48px] rounded-full overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-[#dd429d] to-[#485cfb] group-hover:opacity-0 transition" />
                <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition" />
                <div className="relative z-10 px-6">
                  <span className="text-white group-hover:text-[#bb46c7] transition">
                    Try It Now
                  </span>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ✅ Fix 4: Properly typed BlurText
interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

function BlurText({ text, className = "", delay = 0 }: BlurTextProps) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block mr-2 overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: delay + i * 0.08, duration: 0.5 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}