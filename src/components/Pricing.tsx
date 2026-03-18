"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

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
              className="px-4 py-1 border border-gray-700 rounded-full text-sm"
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
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              // Entrance: slide in from left, staggered
              initial={{ opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.6 + i * 0.15,
                ease: "easeOut",
              }}
              // Hover: lift up
              whileHover={{ y: -10 }}
              className="border border-gray-800 rounded-2xl p-6 bg-gradient-to-b from-[#0f0f0f] to-black"
            >
              {/* Top Row */}
              <div className="flex justify-between items-center mb-4">
                <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                  {plan.name}
                </span>

                <div className="text-xl font-semibold">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={billing + plan.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.25 }}
                      className="inline-block"
                    >
                      ${billing === "monthly" ? plan.monthly : plan.yearly}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-sm text-gray-400">
                    /{billing === "monthly" ? "month" : "year"}
                  </span>
                </div>
              </div>

              <p className="text-gray-400 mb-6">
                Essential features for freelancer and small teams.
              </p>

              <div className="border-t border-gray-800 my-6" />

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full ${
                        f.available
                          ? "bg-purple-600"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {f.available ? <Check size={14} /> : <X size={14} />}
                    </span>
                    <span className="text-gray-300">{f.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className="w-full py-3 rounded-full font-medium bg-gray-200 text-black hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 transition-all duration-300">
                Get Started Now ✦
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
