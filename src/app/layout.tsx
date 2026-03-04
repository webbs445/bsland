import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Best Solution® — Business Setup in Dubai | DED & Free Zone Experts",
  description: "Set up your company in Dubai in 2–5 days. 100% foreign ownership, Mainland LLC, Free Zone, Golden Visa & PRO services. Authorized DED & Free Zone Channel Partner.",
  keywords: "business setup Dubai, company formation UAE, free zone setup, mainland LLC, golden visa Dubai, DED authorized, PRO services UAE, corporate banking Dubai",
  metadataBase: new URL("https://business.best-solution.ae"),
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://business.best-solution.ae",
    title: "Best Solution® — Business Setup in Dubai",
    description: "Authorized DED & Free Zone Channel Partner. Set up your company in Dubai in 2–5 days. 100% foreign ownership available.",
    siteName: "Best Solution Business Setup",
    images: [{ url: "/logo.webp", width: 600, height: 200, alt: "Best Solution Business Setup Dubai" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Solution® — Business Setup in Dubai",
    description: "Authorized DED & Free Zone Channel Partner. Set up your company in Dubai in 2–5 days.",
    images: ["/logo.webp"],
  },
  icons: {
    icon: "/fav.webp",
    shortcut: "/fav.webp",
    apple: "/fav.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
