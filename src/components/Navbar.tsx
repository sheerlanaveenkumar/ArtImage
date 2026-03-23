"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [isPagesOpen, setIsPagesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsPagesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pagesData = [
    {
      title: "Pages",
      links: [
        { name: "Gallery", href: "/gallery" },
        { name: "Pricing", href: "/pricing" },
        { name: "Image Generator", href: "/generator" },
        { name: "Blog", href: "/blog" },
        { name: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "CMS pages",
      links: [{ name: "Blog Details", href: "/blog/details" }],
    },
    {
      title: "Template info",
      links: [
        { name: "Style Guide", href: "/style-guide" },
        { name: "Licenses", href: "/licenses" },
        { name: "Changelog", href: "/changelog" },
        { name: "Instruction", href: "/instruction" },
      ],
    },
    {
      title: "Utility pages",
      links: [
        { name: "Password Protected", href: "/password" },
        { name: "404 Page", href: "/404" },
      ],
    },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#" },
    { name: "Features", href: "/features" },
  ];

  const isAnyPageActive = pagesData.some((section) =>
    section.links.some((link) => pathname === link.href)
  );

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0F0716] backdrop-blur-xl">
        <div className="container mx-auto px-4 h-22 flex items-center justify-between">
          {/* Logo - Added left padding */}
          <Link href="/" className="flex items-center pl-4 lg:pl-40">
            <Image
              src="/images/newlogo.png"
              alt="Artimg"
              width={130}
              height={50}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-[15px] font-medium transition-colors ${isActive ? "text-[#d148cf]" : "text-white/60 hover:text-white"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Pages Dropdown Trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsPagesOpen(!isPagesOpen)}
                className={`group flex items-center gap-1.5 text-[15px] font-medium transition-colors focus:outline-none ${isAnyPageActive ? "text-[#d148cf]" : "text-white/60 hover:text-white"
                  }`}
              >
                <span>Pages</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isPagesOpen ? "rotate-180" : ""
                    } ${isAnyPageActive ? "text-[#d148cf]" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isPagesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-5 w-[540px] bg-[#1a181c]/95 backdrop-blur-2xl border border-white/30 rounded-[28px] p-10 shadow-3xl z-50 overflow-hidden"
                  >
                    <div className="grid grid-cols-2 gap-x-16 gap-y-12">
                      {pagesData.map((section, idx) => (
                        <div key={idx} className="flex flex-col space-y-5">
                          <h4 className="text-[14px] font-bold text-white uppercase tracking-[0.15em]">
                            {section.title}
                          </h4>
                          <div className="flex flex-col space-y-4">
                            {section.links.map((link, lIdx) => (
                              <Link
                                key={lIdx}
                                href={link.href}
                                className="group/item relative flex items-center transition-all duration-300"
                              >
                                {pathname === link.href && (
                                  <div className="h-[3px] w-3 bg-[#d148cf] rounded-full shrink-0 mr-2.5" />
                                )}
                                <motion.div
                                  initial={{ width: 0, opacity: 0, marginRight: 0 }}
                                  whileHover={{ width: 12, opacity: 1, marginRight: 10 }}
                                  className="h-[3px] bg-[#d148cf] rounded-full shrink-0"
                                />
                                <span className={`text-[16px] transition-colors ${pathname === link.href ? "text-[#d148cf]" : "text-white/70 group-hover/item:text-[#d148cf]"
                                  }`}>
                                  {link.name}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Action Buttons - Added right padding */}
          <div className="flex items-center gap-4 pr-4 lg:pr-40">
            <button className="hidden md:flex group relative items-center justify-center max-w-[180px] h-[48px] rounded-full overflow-hidden transition-all duration-700 ease-in-out border border-white/30">
              {/* Base Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#dd429d] to-[#485cfb] transition-opacity duration-700 group-hover:opacity-0" />

              {/* White Fill Background Layer */}
              <div className="absolute inset-0 bg-white translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-in-out" />

              <div className="relative z-10 flex items-center justify-center gap-2 px-6">
                {/* Gradient Sparkle (Left - Shows on Hover) */}
                <div className="absolute -left-2 opacity-0 -translate-x-4 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-6">
                  <Image src="/images/button-icon-2.svg" alt="Spark" width={14} height={14} />
                </div>

                {/* Text */}
                <span className="text-[15px] font-bold text-white transition-all duration-700 group-hover:text-[#bb46c7] group-hover:translate-x-4">
                  Get Started
                </span>

                {/* White Sparkle (Right - Hides on Hover) */}
                <div className="opacity-100 transition-all duration-700 group-hover:opacity-0 group-hover:translate-x-4">
                  <Image src="/images/button-icon-1.svg" alt="Spark" width={14} height={14} />
                </div>
              </div>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-white/70 hover:text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - MOVED OUTSIDE NAV TO FIX STACKING CONTEXT */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[80px] bg-[#0a0a0a] z-[9999] md:hidden flex flex-col overflow-y-auto"
          >
            <div className="flex flex-col p-8 space-y-10 w-full min-h-full pb-20">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className={`text-2xl font-bold transition-colors ${isActive ? "text-[#d148cf]" : "text-white/60 hover:text-white"
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="border-t border-white/30 pt-8"
              >
                <h4 className="text-[13px] font-bold text-white/40 uppercase tracking-widest mb-6">Pages</h4>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  {pagesData[0].links.concat(pagesData[1].links).map((link, idx) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={idx}
                        href={link.href}
                        className={`text-[16px] transition-colors py-2 ${isActive ? "text-[#d148cf]" : "text-white/70 hover:text-[#d148cf]"
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="pt-10"
              >
                <button className="w-full relative px-7 py-4 rounded-full overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d148cf] to-[#7b61ff]" />
                  <div className="absolute inset-0 translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-500 ease-in-out">
                    <div className="w-1/2 h-full bg-white/30 skew-x-[-25deg] blur-sm" />
                  </div>
                  <span className="relative z-10 text-lg font-bold text-white">Get Started</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
