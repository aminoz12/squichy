import type { Metadata } from "next";
import { Fredoka, Montserrat, Nunito } from "next/font/google";
import { PromoMarquee } from "@/components/PromoMarquee";
import { rootMetadataExtras } from "@/lib/seo";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

/** Heavy sans for the orange “Buzz” reel section (reference layout). */
const montserrat = Montserrat({
  variable: "--font-buzz",
  subsets: ["latin"],
  weight: ["800", "900"],
});

export const metadata: Metadata = {
  ...rootMetadataExtras(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-US"
      className={`${fredoka.variable} ${nunito.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col font-sans">
        <PromoMarquee />
        {children}
      </body>
    </html>
  );
}
