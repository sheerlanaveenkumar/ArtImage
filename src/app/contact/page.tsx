import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-40 pb-24 container mx-auto px-4">
        <div className="max-w-4xl mx-auto glass-panel p-12 rounded-[40px] border border-white/30">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Get in <span className="gradient-text">Touch</span></h1>
            <p className="text-muted-foreground">Have questions? We're here to help you get the most out of Artimg.</p>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/30 rounded-xl px-4 py-3 focus:border-brand outline-none" placeholder="John" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <input type="text" className="w-full bg-white/5 border border-white/30 rounded-xl px-4 py-3 focus:border-brand outline-none" placeholder="Doe" />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-sm font-medium">Email Address</label>
              <input type="email" className="w-full bg-white/5 border border-white/30 rounded-xl px-4 py-3 focus:border-brand outline-none" placeholder="john@example.com" />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea className="w-full bg-white/5 border border-white/30 rounded-xl px-4 py-3 h-32 focus:border-brand outline-none" placeholder="How can we help?"></textarea>
            </div>
            <div className="col-span-1 md:col-span-2">
              <Button className="w-full bg-brand hover:bg-brand-dark text-white h-14 rounded-xl text-lg font-bold">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
