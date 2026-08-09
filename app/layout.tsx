import type { Metadata } from "next";
import { Playfair_Display, Inter, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Happy Raksha Bandhan - A Gift for Bhargavi & Akshara",
  description:
    "A heartfelt digital gift crafted with endless love by Dhanunjaya for his beloved sisters Bhargavi and Akshara. Happy Raksha Bandhan!",
  keywords: ["Raksha Bandhan", "Sister", "Brother", "Love", "Gift"],
  openGraph: {
    title: "Happy Raksha Bandhan - For Bhargavi & Akshara ❤️",
    description: "A cinematic digital surprise crafted with love by Dhanunjaya",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${inter.variable} ${poppins.variable} bg-bg text-cream antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
