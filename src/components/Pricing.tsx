import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for exploring our AI capabilities.",
    features: ["10 images per month", "Standard resolution", "Community support", "Public profile"],
    button: "Get Started",
    popular: false
  },
  {
    name: "Basic",
    price: "$29",
    description: "Ideal for growing creators and hobbyists.",
    features: ["100 images per month", "High resolution", "Priority support", "Private generations", "Commercial rights"],
    button: "Subscribe Now",
    popular: true
  },
  {
    name: "Premium",
    price: "$99",
    description: "Built for professional artists and teams.",
    features: ["Unlimited images", "Ultra-high resolution", "Dedicated support", "API access", "Custom models"],
    button: "Contact Sales",
    popular: false
  }
];

export function Pricing() {
  return (
    <section className="py-24 bg-panel/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Choose the Plan <br /> <span className="gradient-text">That Fits Your Needs</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`glass-panel p-10 rounded-3xl relative ${plan.popular ? "border-brand border-2" : "border-white/10"}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/monthly</span>
              </div>
              
              <ul className="space-y-4 mb-10">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="bg-brand/20 p-1 rounded-full">
                      <Check className="w-3 h-3 text-brand" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full rounded-2xl h-12 font-bold ${
                  plan.popular ? "bg-brand hover:bg-brand-dark text-white" : "glass-panel hover:bg-white/10"
                }`}
              >
                {plan.button}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
