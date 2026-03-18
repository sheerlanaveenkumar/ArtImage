import Link from "next/link";
import Image from "next/image";
import { Facebook, Youtube, Instagram } from "lucide-react";
import { Twitter } from "lucide-react";

// X (Twitter) icon as SVG since lucide's Twitter is the old bird
function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-panel border-t border-white/5 font-sans antialiased">
      {/* ── Main grid ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          divide-y sm:divide-y-0 lg:divide-x
          divide-white/8
          py-16 sm:py-20
        ">

          {/* ── Col 1: Brand ── */}
          <div className="pb-10 sm:pb-0 lg:pr-12 xl:pr-16 flex flex-col gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 w-fit">
              <Image
                src="/images/logo.png"
                alt="Artimg"
                width={130}
                height={36}
                className="object-contain"
                priority
              />
              {/* <span className="text-xl font-bold tracking-tight text-white">Artimg</span> */}
            </Link>

            {/* Tagline */}
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[240px]">
              Create stunning visuals with just a click begin your adventure!
              Turn the unreal undeniable.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              {[
                { href: "#", icon: <Facebook className="w-4 h-4" />, label: "Facebook" },
                { href: "#", icon: <XIcon className="w-4 h-4" />, label: "X" },
                { href: "#", icon: <Youtube className="w-4 h-4" />, label: "YouTube" },
                { href: "#", icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
              ].map(({ href, icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="
                    w-9 h-9 flex items-center justify-center
                    rounded-full
                    border border-white/10
                    text-muted-foreground hover:text-white
                    hover:border-white/30
                    transition-colors duration-200
                  "
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div className="py-10 sm:py-0 sm:pl-8 lg:px-12 xl:px-16 flex flex-col gap-6">
            <h4 className="font-bold text-white text-base">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Features", href: "/features" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Utility Pages ── */}
          <div className="py-10 sm:py-0 sm:pl-8 lg:px-12 xl:px-16 flex flex-col gap-6">
            <h4 className="font-bold text-white text-base">Utility Pages</h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: "Password Protected", href: "/password" },
                { label: "404 Not Found", href: "/404" },
                { label: "Style Guide", href: "/style" },
                { label: "Licenses", href: "/licenses" },
                { label: "Changelog", href: "/changelog" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-muted-foreground hover:text-white text-sm transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Contact Us ── */}
          <div className="pt-10 sm:pt-0 sm:pl-8 lg:pl-12 xl:pl-16 flex flex-col gap-6">
            <h4 className="font-bold text-white text-base">Contact Us</h4>
            <ul className="flex flex-col gap-5">
              <li className="text-sm text-muted-foreground leading-relaxed">
                505 Willow Way,<br />New York, NY 10011
              </li>
              <li>
                <a
                  href="mailto:info@artimg.com"
                  className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                >
                  info@artimg.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+11234567890"
                  className="text-sm text-muted-foreground hover:text-white transition-colors duration-200"
                >
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Copyright © Artimg
          </p>
          <span className="hidden sm:inline text-muted-foreground/40">|</span>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Designed by Brandbes – Powered by Webflow
          </p>
        </div>
      </div>
    </footer>
  );
}
