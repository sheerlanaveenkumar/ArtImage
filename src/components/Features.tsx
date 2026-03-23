"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { CardsParallax, type iCardItem } from "@/components/ui/scroll-cards";

const features = [
  {
    title: "Text to Image Generator",
    desc: "Generate striking visuals from plain text, with high resolution artwork for every project.",
    image: "/images/features/feature6.png",
  },
  {
    title: "Image to Video Generator",
    desc: "Convert images into stunning animated videos with smooth motion and effects.",
    image: "/images/features/feature7.png",
  },
  {
    title: "AI Magic Art Generator",
    desc: "Transform ideas into stunning visuals instantly. No skills required.",
    image: "/images/features/feature8.png",
  },
  {
    title: "Online Image Converter",
    desc: "Convert images into different formats with high quality and performance.",
    image: "/images/features/feature5.png",
  },
];

// Map the features array to the card items interface required by CardsParallax
const cardItems: iCardItem[] = features.map((f, i) => ({
  title: "", // Left blank since the right-hand column dynamically displays the title 
  description: "", // Left blank for cleaner visual on the left side
  tag: `Feature ${i + 1}`,
  src: f.image,
  link: "#",
  color: "transparent",
  textColor: "white",
}));

// Reusable BlurText component for the header
function BlurText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <p className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block mr-2 overflow-hidden">
          <motion.span
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: delay + i * 0.08, duration: 0.5 }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  // Track the scroll progress of the entire section to update the right column
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      // Avoid index-out-of-bounds at exactly 1.0 latest progress
      const index = Math.min(Math.floor(latest * features.length), features.length - 1);
      setActive(Math.max(0, index));
    });
  }, [scrollYProgress]);

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative bg-[#0b0810] text-white">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-purple-700/10 blur-[130px] rounded-full" />
      </div>

      <div className="max-w-[84rem] mx-auto w-full pt-16 px-4">

        {/* Header intro locked at the top of the section */}
        <div className="flex flex-col items-center text-center">
          <span className="px-6 py-2 text-sm rounded-full border border-white/30 bg-white/5 backdrop-blur inline-block">
            Our Feature
          </span>
          <BlurText
            text="Explore Our Core Features"
            className="text-3xl sm:text-5xl md:text-[52px] font-bold text-white leading-[1.1] tracking-tighter mt-6 mb-4 max-w-3xl"
          />
          <BlurText
            text="Transform ideas with AI tools designed for unparalleled art and video creation. Create image & videos that mesmerize."
            delay={0.5}
            className="text-sm sm:text-[18px] text-white/80 max-w-2xl leading-relaxed mt-2"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 relative w-full">

          {/* LEFT SECTION: Natively drives the section height via 'h-screen' elements stacking */}
          <div className="relative w-full">
            <CardsParallax items={cardItems} />
          </div>

          {/* RIGHT SECTION: Sticky text/actions that update based on active scroll index */}
          <div className="sticky top-0 h-screen flex flex-col items-start justify-center text-left py-28">

            {/* Animated Progress Bar */}
            <div className="w-full h-[8px] bg-gray-800 rounded-full mb-10 overflow-hidden max-w-md">
              <motion.div
                style={{ width: progressWidth }}
                className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
              />
            </div>

            <motion.h3
              key={features[active].title}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-4xl font-bold mb-4 tracking-tight"
            >
              {features[active].title}
            </motion.h3>

            <motion.p
              key={features[active].desc}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed"
            >
              {features[active].desc}
            </motion.p>

            {/* Call to action */}
            <button className="group relative mt-auto flex items-center justify-center min-w-[180px] h-[58px] rounded-full overflow-hidden transition-all duration-700 ease-in-out border border-white/30">
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