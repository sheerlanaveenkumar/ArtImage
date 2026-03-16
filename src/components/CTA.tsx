import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CTA() {
  return (
    <section className="py-24 container mx-auto px-4">
      <div className="relative rounded-[40px] overflow-hidden bg-brand h-[400px] flex items-center justify-center text-center px-6">
        <Image 
          src="/images/bg-pattern.svg" 
          alt="pattern" 
          fill 
          className="object-cover opacity-20 mix-blend-overlay"
        />
        
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Ready to Unleash Your <br /> Creative Potential?
          </h2>
          <p className="text-white/80 mb-10 text-lg">
            Join thousands of creators who are already using Artimg to bring 
            their ideas to life. Start generating your masterpieces today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-white text-brand hover:bg-white/90 rounded-full px-10 h-14 text-lg font-bold">
              Get Started Now
            </Button>
            <Button className="bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-full px-10 h-14 text-lg font-bold">
              View Showcase
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
