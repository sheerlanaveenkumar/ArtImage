import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="pt-24 pb-12 bg-panel border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image src="/images/logo.png" alt="Artimg" width={32} height={32} />
              <span className="text-xl font-bold tracking-tight">Artimg</span>
            </Link>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              Empowering creativity through advanced AI image generation. 
              Transform your words into extraordinary visuals with Artimg.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="p-2 glass-panel rounded-lg hover:text-brand transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 glass-panel rounded-lg hover:text-brand transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 glass-panel rounded-lg hover:text-brand transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
              <Link href="#" className="p-2 glass-panel rounded-lg hover:text-brand transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-muted-foreground hover:text-brand text-sm transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-brand text-sm transition-colors">About Us</Link></li>
              <li><Link href="/features" className="text-muted-foreground hover:text-brand text-sm transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-brand text-sm transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-6">Resources</h4>
            <ul className="space-y-4">
              <li><Link href="/blog" className="text-muted-foreground hover:text-brand text-sm transition-colors">Blog</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-brand text-sm transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-brand text-sm transition-colors">Contact</Link></li>
              <li><Link href="/support" className="text-muted-foreground hover:text-brand text-sm transition-colors">Support</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="text-sm text-muted-foreground">support@artimg.com</li>
              <li className="text-sm text-muted-foreground">+1 (555) 123-4567</li>
              <li className="text-sm text-muted-foreground">123 AI Boulevard, Silicon Valley, CA</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Artimg. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
