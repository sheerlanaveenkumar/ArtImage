import { Zap, Camera, Play, Wand2 } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "Realistic Portraits",
    description: "Generate lifelike human portraits with incredible detail and texture.",
    icon: <Camera className="w-6 h-6 text-brand" />,
    image: "/images/features/hero.webp"
  },
  {
    title: "Stunning Landscapes",
    description: "Create breathtaking natural scenes from mountains to alien worlds.",
    icon: <Wand2 className="w-6 h-6 text-brand" />,
    image: "/images/gallery/1.webp"
  },
  {
    title: "Creative Illustrations",
    description: "Turn your concepts into beautiful digital art and illustrations.",
    icon: <Zap className="w-6 h-6 text-brand" />,
    image: "/images/hero-1.webp"
  }
];

export function Features() {
  return (
    <section className="py-24 bg-panel/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features for <br /> <span className="gradient-text">Professional Creators</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create, manage, and scale your AI visual content.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="glass-panel p-8 rounded-2xl hover:border-brand/50 transition-all group">
              <div className="bg-brand/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-6">{feature.description}</p>
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <Image src={feature.image} alt={feature.title} fill className="object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
