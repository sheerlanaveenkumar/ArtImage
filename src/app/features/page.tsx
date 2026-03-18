import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import  Features from "@/components/Features";
import { Footer } from "@/components/Footer";

export default function FeaturesPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <Hero />
        <Features />
      </div>
      <Footer />
    </main>
  );
}
