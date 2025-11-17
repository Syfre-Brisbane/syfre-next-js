import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans-3",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Syfre AI Solutions",
  description: "Brisbane-based AI consulting and automation specialists. We help businesses leverage artificial intelligence to drive efficiency, growth, and innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-Y8T93PQ37E"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-Y8T93PQ37E');
        `}
      </Script>
      <body
        className={`${sourceSans3.variable} antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
