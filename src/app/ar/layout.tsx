import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script";

// Assuming globals.css is one level up and handles RTL or we just use Tailwind RTL
import "../globals.css";
// We will need an Arabic version of CookieBanner if there is text in it, but for now we'll import the default
import CookieBanner from "@/components/CookieBanner";

const cairo = Cairo({
    variable: "--font-sans",
    subsets: ["arabic", "latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "بيست سوليوشن® — تأسيس الشركات في دبي | خبراء الدائرة الاقتصادية والمنطقة الحرة",
    description: "أسس شركتك في دبي خلال ٢-٥ أيام. ملكية أجنبية ١٠٠٪، شركة ذات مسؤولية محدودة (رئيسية)، مناطق حرة، الإقامة الذهبية وخدمات تخليص المعاملات. شريك معتمد للدائرة الاقتصادية والمناطق الحرة.",
    keywords: "تأسيس شركات دبي, تأسيس شركة في الإمارات, منطقة حرة, شركة ذات مسؤولية محدودة, إقامة ذهبية دبي, شريك معتمد, خدمات برو الإمارات, حساب بنكي للشركات دبي",
    metadataBase: new URL("https://business.best-solution.ae"),
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "/ar",
    },
    openGraph: {
        type: "website",
        url: "https://business.best-solution.ae/ar",
        title: "بيست سوليوشن® — تأسيس الشركات في دبي",
        description: "شريك معتمد للدائرة الاقتصادية والمناطق الحرة. أسس شركتك في دبي خلال ٢-٥ أيام. ملكية أجنبية ١٠٠٪ متاحة.",
        siteName: "بيست سوليوشن لتأسيس الشركات",
        images: [{ url: "/logo.webp", width: 600, height: 200, alt: "بيست سوليوشن لتأسيس الشركات في دبي" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "بيست سوليوشن® — تأسيس الشركات في دبي",
        description: "شريك معتمد للدائرة الاقتصادية والمناطق الحرة. أسس شركتك في دبي خلال ٢-٥ أيام.",
        images: ["/logo.webp"],
    },
    icons: {
        icon: "/fav.webp",
        shortcut: "/fav.webp",
        apple: "/fav.webp",
    },
};

export default function ArabicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div lang="ar" dir="rtl" className={`${cairo.variable} antialiased`} style={{ fontFamily: 'var(--font-sans), sans-serif' }}>
            {children}
            <CookieBanner />
        </div>
    );
}
