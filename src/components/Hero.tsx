"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image 
          src="/images/bg-pattern.svg" 
          alt="background pattern" 
          fill 
          className="object-cover"
        />
      </div>
      
      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/20 blur-[120px] rounded-full z-0" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4 text-brand" />
            <span>Generate Realistic Images with AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-sans tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
            Create Stunning Visuals <br />
            <span className="gradient-text">In Just One Prompt</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Experience the power of generative AI. Artimg transforms your words into 
            high-fidelity, realistic images that will wow your audience.
          </p>

          <div className="max-w-2xl mx-auto mb-16 relative">
            <div className="glass-panel rounded-full p-2 flex items-center shadow-lg">
              <input 
                type="text" 
                placeholder="Describe your imagination..." 
                className="flex-1 bg-transparent border-none focus:outline-none px-6 text-foreground placeholder:text-muted-foreground"
              />
              <Button className="bg-brand hover:bg-brand-dark text-white rounded-full px-8 h-12">
                Generate
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-5xl mx-auto rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
          >
            <Image 
              src="/images/hero-mockup.webp" 
              alt="Artimg Platform Mockup" 
              width={1600} 
              height={900}
              className="w-full h-auto"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
