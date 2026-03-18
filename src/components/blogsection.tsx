"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { User, Calendar } from "lucide-react";

const blogs = [
  {
    title: "What You Should Know About Ethics and Copyright in AI Art",
    category: "Digital Art",
    image: "/images/blog-vr.png",
    author: "Alina Smith",
    date: "June 29, 2025",
  },
  {
    title: "10 Surprising Ways You Can Use AI to Create Stunning Images",
    category: "AI Images",
    image: "/images/blog-astro.png",
    author: "Jorge Brooks",
    date: "June 29, 2025",
  },
];

const badgeText = "Blog & Articles";
const h2Text = "Explore Our Latest Insights";
const pText = "Discover our fresh ideas, trends, and tips in AI generated art and design.";

// Letter-by-letter with blur effect
function AnimatedText({
  text,
  startDelay = 0,
  className = "",
  tag: Tag = "span",
}: {
  text: string;
  startDelay?: number;
  className?: string;
  tag?: "span" | "p" | "h2";
}) {
  return (
    <Tag className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: startDelay + i * 0.022,
            ease: "easeOut",
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
}

const badgeDelay = 0;
const h2Delay = 0.15;
const pDelay = h2Delay + h2Text.length * 0.022 + 0.1;

export default function BlogSection() {
  return (
    <section className="bg-black text-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">

          {/* Badge — blur reveal */}
          <motion.span
            initial={{ opacity: 0, filter: "blur(8px)", y: -8 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: badgeDelay }}
            className="px-5 py-2 border border-white/10 rounded-full text-[13px] font-bold uppercase tracking-widest text-white/50 mb-8 inline-block"
          >
            {badgeText}
          </motion.span>

          {/* H2 — letter by letter + blur */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <AnimatedText text={h2Text} startDelay={h2Delay} />
          </h2>

          {/* P — letter by letter + blur, starts after h2 */}
          <div className="max-w-2xl mx-auto">
            <AnimatedText
              text={pText}
              startDelay={pDelay}
              className="text-lg text-white/50 leading-relaxed"
              tag="p"
            />
          </div>
        </div>

        {/* Cards Grid — slide up + blur, one by one */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {blogs.map((blog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2, ease: "easeOut" }}
              className="group relative bg-[#0A0A0A] border border-white/5 rounded-[32px] overflow-hidden flex flex-col hover:border-white/10 transition-all duration-500 shadow-2xl"
            >
              {/* Image */}
              <div className="relative aspect-[12/10] overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-10 flex flex-col flex-grow">

                {/* Category */}
                <motion.span
                  initial={{ opacity: 0, x: -20, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.2 }}
                  className="w-fit px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[13px] font-medium text-white/70 mb-6"
                >
                  {blog.category}
                </motion.span>

                {/* Title — letter by letter blur reveal */}
                <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-8 group-hover:text-purple-400 transition-colors duration-300">
                  <AnimatedText
                    text={blog.title}
                    startDelay={0.4 + i * 0.2}
                  />
                </h3>

                <div className="h-[1px] w-full bg-white/5 mb-8" />

                {/* Footer */}
                <motion.div
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                  className="flex items-center gap-6 text-sm md:text-base font-medium text-white/50"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
                      <User size={14} className="text-white/40" />
                    </div>
                    {blog.author}
                  </div>
                  <div className="flex items-center gap-2 text-white/40">
                    <Calendar size={18} />
                    {blog.date}
                  </div>
                </motion.div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}