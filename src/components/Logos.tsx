"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
  { name: "Bezify", src: "/images/logos/bezify.svg" },
  { name: "Taskbes", src: "/images/logos/taskbes.svg" },
  { name: "Bezify", src: "/images/logos/bezify.svg" },
  { name: "Finteck", src: "/images/logos/finteck.svg" },
  { name: "Appixy", src: "/images/logos/appixy.svg" },
  { name: "Bezify", src: "/images/logos/bezify.svg" },
  { name: "Taskbes", src: "/images/logos/taskbes.svg" },
  { name: "Finteck", src: "/images/logos/finteck.svg" },
];

export function Logos() {
  return (
    <section className="py-20 relative overflow-hidden bg-black">
      <div className="container mx-auto px-4 mb-12 text-center">
        <p className="text-lg font-medium text-muted-foreground uppercase tracking-widest text-white">
          Trusted by Brands and Creators
        </p>
      </div>

      {/* Centered Wrapper */}
      <div className="max-w-[84rem] mx-auto relative overflow-hidden">
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-10 md:px-16"
              >
                <div className="relative h-10 w-32 md:h-12 md:w-40 opacity-100 hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    className="object-contain filter brightness-0 invert"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Fade edges INSIDE centered box */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
        </div>
      </div>
    </section>
  );
}
