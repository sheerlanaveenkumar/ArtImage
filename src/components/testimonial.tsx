"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "David Markson",
    role: "Digital Marketer",
    image: "/images/testimonials/avatar1.webp",
    review: "As a digital artist, I used to struggle with ideas. Now I generate visuals in seconds, and the results are game it's a changer tools.",
  },
  {
    name: "Marina Lora",
    role: "Entrepreneur",
    image: "/images/testimonials/avatar2.jpg",
    review: "No signup, no friction just a image generation. The quality is insane and perfect for social media content. It's helped me visualize concepts for my product designs quicker than ever. Highly recommend.",
  },
  {
    name: "Mark Stones",
    role: "Author",
    image: "/images/testimonials/avatar3.png",
    review: "We needed banner images and the concepts fast. Artimg delivered to a beautiful options instantly and saved hours of time.",
  },
  {
    name: "Yearn Mitchel",
    role: "Graphics Designer",
    image: "/images/testimonials/avatar4.jpg",
    review: "I've been using Artimg to enhance to mockups. The image quality helps my projects stand out to clients. I just a type a few ideas and Artimg sparks my creativity with visuals.",
  },
  {
    name: "Mitchel Ryan",
    role: "Consultant",
    image: "/images/testimonials/avatar5.png",
    review: "My secret weapon presentation. The AI creates sleek, professional visuals that's impress my clients every time. No more struggling with design the software just instant, polished with a awesome results.",
  },
  {
    name: "Rosa Jackson",
    role: "Photographer",
    image: "/images/testimonials/avatar6.jpg",
    review: "The AI gets a better with every the update. I've been using it for months, & the new features keep impressing me. The photorealism insane to the sometimes I can't tell it's great AI generated tools!",
  },
];

const badgeText = "Testimonial";
const h2Text = "What Our Happy Users Say";
const pText = "Discover how our platform helps creators generate stunning visuals instantly.";

// Reusable letter-by-letter blur reveal
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
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: startDelay + i * 0.022, ease: "easeOut" }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  );
}

const h2Delay = 0.2;
const pDelay = h2Delay + h2Text.length * 0.022 + 0.1;

export default function Testimonial() {
  return (
    <section className="relative bg-black text-white py-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-[1200px] pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[80%] h-[90%] bg-[#485cfb]/20 blur-[120px] rounded-full" />
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[80%] h-[70%] bg-[#dd429d]/20 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header — letter by letter blur reveal */}
        <div className="text-center mb-20">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
            className="px-5 py-2 border border-white/10 rounded-full text-[13px] font-bold uppercase tracking-widest text-white/50 inline-block mb-8"
          >
            {badgeText}
          </motion.span>

          {/* H2 — letter by letter + blur */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-6 tracking-tight">
            <AnimatedText text={h2Text} startDelay={h2Delay} />
          </h2>

          {/* P — after h2 finishes */}
          <div className="max-w-2xl mx-auto">
            <AnimatedText
              text={pText}
              startDelay={pDelay}
              className="text-lg text-white/50 leading-relaxed"
              tag="p"
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {/* Column 1 */}
          <div className="flex flex-col gap-6">
            {[testimonials[0], testimonials[3]].map((item, i) => (
              <TestimonialCard key={i} item={item} colDelay={0} rowDelay={i * 0.15} />
            ))}
          </div>
          {/* Column 2 */}
          <div className="flex flex-col gap-6 lg:mt-12">
            {[testimonials[1], testimonials[4]].map((item, i) => (
              <TestimonialCard key={i} item={item} colDelay={0.15} rowDelay={i * 0.15} />
            ))}
          </div>
          {/* Column 3 */}
          <div className="flex flex-col gap-6">
            {[testimonials[2], testimonials[5]].map((item, i) => (
              <TestimonialCard key={i} item={item} colDelay={0.3} rowDelay={i * 0.15} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ item, colDelay, rowDelay }: { item: any; colDelay: number; rowDelay: number }) {
  const delay = colDelay + rowDelay;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="relative bg-gradient-to-b from-white/[0.05] to-white/[0.01] border border-white/[0.08] rounded-[32px] p-8 hover:bg-white/[0.06] transition-all duration-500 group"
    >
      {/* Stars */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((star) => (
            <span key={star} className="text-orange-400 text-lg">★</span>
          ))}
          <span className="text-white/30 text-lg relative">
            ★
            <span className="absolute inset-0 text-orange-400 overflow-hidden w-[60%]">★</span>
          </span>
        </div>
        <span className="text-[15px] font-bold text-white/90">(4.5)</span>
      </div>

      {/* Review text — letter by letter blur reveal */}
      <p className="text-[17px] text-white/70 leading-[1.6] mb-10 font-medium">
        "
        {item.review.split("").map((char: string, i: number) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: delay + 0.2 + i * 0.01, ease: "easeOut" }}
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : "normal" }}
          >
            {char}
          </motion.span>
        ))}
        "
      </p>

      {/* Profile — blur fade in last */}
      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.4, ease: "easeOut" }}
        className="flex items-center gap-4 mt-auto"
      >
        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        </div>
        <div>
          <h4 className="text-[17px] font-bold text-white mb-1">{item.name}</h4>
          <p className="text-[14px] text-white/40 font-medium">{item.role}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}