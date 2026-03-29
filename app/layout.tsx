import type { Metadata } from "next";
import { Fredoka, Montserrat, Nunito } from "next/font/google";
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
  title: "SquishyBun Dumplings | Crazy Fun Drop",
  description:
    "Blind-box squishy dumplings — cute, viral, and oddly therapeutic. Guest checkout with Stripe.",
  openGraph: {
    title: "SquishyBun Dumplings",
    description: "You won’t know which dumpling you get. That’s the point.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${nunito.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
