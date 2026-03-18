import { Navbar } from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import { Footer } from "@/components/Footer";

export default function PricingPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-20">
        <Pricing />
      </div>
      <Footer />
    </main>
  );
}
