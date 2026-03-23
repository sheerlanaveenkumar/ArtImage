"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import Image from "next/image";

const plans = [
  {
    name: "Basic",
    monthly: 19,
    yearly: 190,
    features: [
      { text: "100 AI Image Credits per Month", available: true },
      { text: "AI Remove Background", available: true },
      { text: "AI Upscaling to 4x", available: true },
      { text: "Fast Generation (GPU)", available: true },
      { text: "Commercial Usage", available: false },
      { text: "Private Generation", available: false },
    ],
  },
  {
    name: "Standard",
    monthly: 39,
    yearly: 390,
    features: [
      { text: "100 AI Image Credits per Month", available: true },
      { text: "AI Remove Background", available: true },
      { text: "AI Upscaling to 4x", available: true },
      { text: "Fast Generation (GPU)", available: true },
      { text: "Commercial Usage", available: true },
      { text: "Private Generation", available: false },
    ],
  },
  {
    name: "Premium",
    monthly: 99,
    yearly: 990,
    features: [
      { text: "100 AI Image Credits per Month", available: true },
      { text: "AI Remove Background", available: true },
      { text: "AI Upscaling to 4x", available: true },
      { text: "Fast Generation (GPU)", available: true },
      { text: "Commercial Usage", available: true },
      { text: "Private Generation", available: true },
    ],
  },
];

// Split heading into two lines for letter-by-letter animation
const line1 = "Smart Pricing Plans Designed";
const line2 = "for Creative Minds";

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="bg-black text-white py-24 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">

        {/* Header Row */}
        <div className="flex justify-between items-center mb-12 flex-wrap gap-6">

          {/* Left: Badge + Animated Heading */}
          <div>
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="px-4 py-2 border border-gray-700 rounded-full text-lg"
            >
              Our Pricing Plans
            </motion.span>

            {/* Letter-by-letter heading */}
            <h2 className="text-4xl md:text-5xl font-semibold mt-4 leading-tight font-exo">
              {/* Line 1 */}
              <span className="block overflow-hidden">
                {line1.split("").map((char, i) => (
                  <motion.span
                    key={`l1-${i}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.04,
                      delay: 0.4 + i * 0.03,
                      ease: "easeOut",
                    }}
                    className="inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>

              {/* Line 2 */}
              <span className="block overflow-hidden">
                {line2.split("").map((char, i) => (
                  <motion.span
                    key={`l2-${i}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.04,
                      delay: 0.4 + line1.length * 0.03 + i * 0.03,
                      ease: "easeOut",
                    }}
                    className="inline-block"
                    style={{ whiteSpace: char === " " ? "pre" : "normal" }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            </h2>
          </div>

          {/* Right: Toggle — slides in from left like cards, after heading finishes */}
          <motion.div
            initial={{ opacity: 0, x: -120 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            className="flex bg-gray-900 rounded-full p-1 relative"
          >
            {/* Animated sliding pill */}
            <motion.div
              className="absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
              initial={false}
              animate={{
                left: billing === "monthly" ? "4px" : "50%",
                width: billing === "monthly" ? "calc(50% - 4px)" : "calc(50% - 4px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {["monthly", "yearly"].map((type) => (
              <button
                key={type}
                onClick={() => setBilling(type as "monthly" | "yearly")}
                className="relative z-10 px-6 py-2 rounded-full transition-colors duration-200"
                style={{
                  color: billing === type ? "#fff" : "#9ca3af",
                  minWidth: "90px",
                }}
              >
                {type === "monthly" ? "Monthly" : "Yearly"}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6 + i * 0.15,
                ease: "easeOut",
              }}
              className="flex flex-col rounded-3xl border border-white/30 p-8"
              style={{ background: "#111113" }}
            >
              {/* Top Row: Plan name badge + Price */}
              <div className="flex justify-between items-center mb-5">
                <span
                  className="px-5 py-2 rounded-full text-base font-semibold text-white"
                  style={{ background: "#1e1c22" }}
                >
                  {plan.name}
                </span>
                <div className="flex items-baseline gap-1">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={billing + plan.name}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="text-4xl font-extrabold text-white"
                    >
                      ${billing === "monthly" ? plan.monthly : plan.yearly}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-base text-gray-400 font-normal">
                    /{billing === "monthly" ? "month" : "year"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white text-lg text-base leading-relaxed mb-6">
                Essential features for freelancer and small teams.
              </p>

              {/* Divider */}
              <div className="border-t border-white/30 mb-10" />

              {/* Feature List */}
              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <span
                      className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-full ${f.available ? "bg-[#2a2a2a]" : "bg-[#2a2a2a]"
                        }`}
                    >
                      {f.available ? (
                        <Check size={13} className="text-white" />
                      ) : (
                        <X size={13} className="text-gray-500" />
                      )}
                    </span>
                    <span className={`text-base text-lg ${f.available ? "text-white" : "text-gray-500"}`}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className="group relative w-full flex items-center justify-center h-[56px] rounded-full overflow-hidden transition-all duration-700 ease-in-out border border-white/30">
                {/* White Background — default */}
                <div className="absolute inset-0 bg-white transition-opacity duration-700 group-hover:opacity-0" />
                {/* Gradient slides in on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#dd429d] to-[#485cfb] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />
                <div className="relative z-10 flex items-center justify-center gap-2 px-6">
                  <div className="absolute -left-2 opacity-0 -translate-x-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-6">
                    <Image src="/images/button-icon-2.svg" alt="Spark" width={14} height={14} />
                  </div>
                  <span className="text-[15px] font-bold text-black transition-all duration-700 group-hover:text-white group-hover:translate-x-4 whitespace-nowrap">
                    Get Started Now
                  </span>
                  <div className="opacity-100 transition-all duration-700 group-hover:opacity-0 group-hover:translate-x-4">
                    <Image src="/images/button-icon-1.svg" alt="Spark" width={14} height={14} />
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
