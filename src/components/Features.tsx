"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const features = [
  {
    title: "Text to Image Generator",
    desc: "Generate striking visuals from plain text, with high resolution artwork for every project.",
    image: "/images/features/feature1.png",
  },
  {
    title: "Image to Video Generator",
    desc: "Convert images into stunning animated videos with smooth motion and effects.",
    image: "/images/features/feature2.png",
  },
  {
    title: "AI Magic Art Generator",
    desc: "Transform ideas into stunning visuals instantly. No skills required.",
    image: "/images/features/feature3.png",
  },
  {
    title: "Online Image Converter",
    desc: "Convert images into different formats with high quality and performance.",
    image: "/images/features/feature4.png",
  },
];

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const index = Math.floor(latest * features.length);
      setActive(Math.min(index, features.length - 1));
    });
  }, [scrollYProgress]);

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[400vh] bg-black text-white">

      {/* Ambient background glow - Isolated to prevent horizontal overflow without breaking sticky */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-purple-700/10 blur-[130px] rounded-full" />
      </div>

      {/* Sticky Section */}
      <div className="sticky top-0 min-h-[100dvh] flex items-center flex-col justify-center py-24 md:py-0">

        {/* ✅ UPDATED HEADER ONLY */}
        <div className="text-center mb-6 sm:mb-20 flex flex-col items-center gap-2 sm:gap-4 px-4">

          {/* Tag */}
          <span className="px-4 py-1 text-sm rounded-full border border-white/10 bg-white/5 backdrop-blur">
            Our Feature
          </span>

          {/* Heading */}
          <BlurText
            text="Explore Our Core Features"
            className="text-2xl sm:text-5xl md:text-[56px] font-bold text-white leading-tight max-w-3xl"
          />

          {/* Subtitle */}
          <BlurText
            text="Transform ideas with AI tools designed for unparalleled art and video creation. Create image & videos that mesmerize."
            delay={0.5}
            className="text-sm sm:text-base text-gray-400 max-w-lg leading-relaxed"
          />

        </div>

        {/* ORIGINAL CONTENT (UNCHANGED) */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-12 px-6 w-full">

          {/* LEFT IMAGE */}
          <div className="relative max-w-[300px] md:max-w-none mx-auto w-full">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-2xl border border-gray-800"
            >
              <Image
                src={features[active].image}
                alt="feature"
                width={800}
                height={600}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col justify-center">

            {/* Progress Bar */}
            <div className="h-[4px] bg-gray-700 rounded-full mb-6 overflow-hidden">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
              />
            </div>

            {/* Title */}
            <motion.h3
              key={features[active].title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-4xl font-semibold mb-2 sm:mb-4"
            >
              {features[active].title}
            </motion.h3>

            {/* Description */}
            <motion.p
              key={features[active].desc}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-gray-400 mb-6"
            >
              {features[active].desc}
            </motion.p>

            {/* Button */}
            <button className="group relative flex items-center justify-center max-w-[180px] h-[48px] rounded-full overflow-hidden transition-all duration-700 ease-in-out border border-white/10">
              
              <div className="absolute inset-0 bg-gradient-to-r from-[#dd429d] to-[#485cfb] transition-opacity duration-700 group-hover:opacity-0" />

              <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />

              <div className="relative z-10 flex items-center justify-center gap-2 px-6">

                <div className="absolute -left-2 opacity-0 -translate-x-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-6">
                  <Image src="/images/button-icon-2.svg" alt="Spark" width={14} height={14} />
                </div>

                <span className="text-[15px] font-bold text-white transition-all duration-700 group-hover:text-[#bb46c7] group-hover:translate-x-4">
                  Try It Now
                </span>

                <div className="opacity-100 transition-all duration-700 group-hover:opacity-0 group-hover:translate-x-4">
                  <Image src="/images/button-icon-1.svg" alt="Spark" width={14} height={14} />
                </div>

              </div>
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

/* ✅ BLUR TEXT COMPONENT (for header only) */
function BlurText({ text, className = "", delay = 0 }: BlurTextProps) {
  const words = text.split(" ");

  return (
    <p className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-2 overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: delay + i * 0.08,
              duration: 0.5,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
}