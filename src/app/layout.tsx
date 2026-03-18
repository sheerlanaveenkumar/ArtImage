import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, Exo } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Artimg - Generate Realistic Images with AI",
  description: "Experience the power of AI image generation. Artimg allows you to create stunning, realistic images in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", inter.variable, exo.variable)}>
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} ${exo.variable} antialiased font-inter`}
      >
        {children}
      </body>
    </html>
  );
}
