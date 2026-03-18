import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Logos } from "@/components/Logos";
import { InNumbers } from "@/components/InNumbers";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import { Footer } from "@/components/Footer";
import Testimonial from "@/components/testimonial";
import FaqSection from "@/components/FaqSection";
import BlogSection from "@/components/blogsection";
import HowItWorksWith3Cols from "@/components/howItWorks";
import Gallery from "@/components/Gallery";


export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Logos />
      <InNumbers />
      <Features />
      <HowItWorksWith3Cols />
      <Gallery />
      <Pricing />
      <Testimonial />
      <FaqSection />
      <BlogSection />
      <CTA />
      <Footer />
    </main>
  );
}
