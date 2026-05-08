import type { Metadata } from "next";
import { Fredoka, Montserrat, Nunito } from "next/font/google";
import Script from "next/script";
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
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '2675340019517731');
fbq('track', 'PageView');
          `}
        </Script>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18147745818"
          strategy="afterInteractive"
        />
        <Script id="google-gtag" strategy="afterInteractive">
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-18147745818');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2675340019517731&ev=PageView&noscript=1"
          />
        </noscript>
        <PromoMarquee />
        {children}
      </body>
    </html>
  );
}
