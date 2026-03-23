"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Image from "next/image";

const sliderImages = [
  "/images/faqs/faq1.png",
  "/images/faqs/faq2.svg",
  "/images/faqs/faq3.svg",
  "/images/faqs/faq4.svg",
];

const SLIDE_INTERVAL = 2500;

const faqs = [
  { question: "What is ZunoSync?", answer: "ZunoSync is an AI-powered social media content generator that helps you create captions, hashtags, and content ideas quickly using simple prompts." },
  { question: "Who is it for?", answer: "It's designed for marketers, creators, businesses, and agencies who want faster and better content creation." },
  { question: "Do i need writing skills?", answer: "No. ZunoSync does the heavy lifting — you just guide it." },
  { question: "Can i use it for multiple platforms?", answer: "Yes! ZunoSync generates optimized content for Instagram, LinkedIn, Twitter, and more." },
  { question: "Is there a free plan?", answer: "Yes, our Starter plan lets you try ZunoSync with 50 AI generations per month at no cost." },
];

const h2Text = "Frequently Asked Questions";
const pText = "Explore quick answers to common questions about our AI Imagery Website. Everything you need to know, simplified.";

function AnimatedText({ text, startDelay = 0, className = "", tag: Tag = "span" }: {
  text: string; startDelay?: number; className?: string; tag?: "span" | "p";
}) {
  return (
    <Tag className={className}>
      {text.split("").map((char, i) => (
        <motion.span key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.03, delay: startDelay + i * 0.025, ease: "easeOut" }}
          className="inline-block" style={{ whiteSpace: char === " " ? "pre" : "normal" }}>
          {char}
        </motion.span>
      ))}
    </Tag>
  );
}

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(p => (p + 1) % sliderImages.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, []);

  const toggle = (i: number) => setActiveIndex(activeIndex === i ? null : i);

  const h2Delay = 0.2;
  const pDelay = h2Delay + h2Text.length * 0.025 + 0.08;

  return (
    <section className="bg-black text-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <motion.span initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="px-5 py-2 border border-white/30 rounded-full text-[13px] font-bold uppercase tracking-widest text-white mb-6 inline-block">
            FAQ
          </motion.span>

          <div className="flex flex-row items-center justify-between gap-6 mb-6 flex-wrap">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight font-exo">
              <AnimatedText text={h2Text} startDelay={h2Delay} />
            </h2>
            <motion.button
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: h2Delay + 0.15, ease: "easeOut" }}
              className="relative group p-[1px] rounded-full overflow-hidden bg-gradient-to-r from-[#d946ef] to-[#6366f1] transition-transform hover:scale-105"
            >
              <div className="relative flex items-center gap-2 px-6 py-3 rounded-full bg-transparent group-hover:bg-white transition-all duration-300">
                <div className="relative w-3.5 h-3.5">
                  <Image
                    src="/images/button-icon-1.svg"
                    alt="icon"
                    width={14}
                    height={15}
                    className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
                  />
                  <Image
                    src="/images/button-icon-2.svg"
                    alt="icon"
                    width={14}
                    height={15}
                    className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  />
                </div>
                <span className="text-[15px] font-bold text-white group-hover:bg-gradient-to-r group-hover:from-[#DD429D] group-hover:to-[#485CFB] group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300">
                  View All Features
                </span>
              </div>
            </motion.button>
          </div>

          <div className="max-w-2xl">
            <AnimatedText text={pText} startDelay={pDelay} className="text-lg text-white/50 leading-relaxed" tag="p" />
          </div>
        </div>

        {/* Two Column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left: Images all stacked, crossfade one by one — zero black gap */}
          <motion.div
            initial={{ opacity: 0, x: -80, filter: "blur(16px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative w-full rounded-[32px] overflow-hidden"
            style={{ aspectRatio: "1 / 1" }}
          >
            {/* ALL images always rendered, stacked. Only opacity changes — no unmounting = no black flash */}
            {sliderImages.map((src, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
              >
                <Image src={src} alt={`FAQ visual ${i + 1}`} fill className="object-cover" />
              </div>
            ))}

            {/* Dot indicators */}
            {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {sliderImages.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${i === current ? "bg-white w-5" : "bg-white/40 w-2"}`}
                />
              ))}
            </div> */}
          </motion.div>

          {/* Right: FAQ staggered top to bottom */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeIndex === index;
              return (
                <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
                  className={`border border-white/30 rounded-[24px] overflow-hidden transition-all duration-300 ${isOpen ? "bg-white/[0.04] border-white/30 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]" : "bg-white/[0.02] hover:bg-white/[0.04]"}`}>
                  <button onClick={() => toggle(index)} className="w-full flex justify-between items-center p-6 md:p-8 text-left">
                    <span className="text-lg md:text-xl font-bold tracking-tight text-white/90">Q. {faq.question}</span>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-white text-black rotate-45" : "bg-white/10 text-white"}`}>
                      <Plus size={20} />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}>
                        <div className="px-6 md:px-8 pb-8 text-white/60 text-lg leading-relaxed font-medium">{faq.answer}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}