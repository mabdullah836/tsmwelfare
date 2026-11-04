import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import Link from "next/link";
import { Calculator } from "lucide-react";

export const metadata = {
  title: {
    default: "The Sirat-e-Mustaqeem Welfare Trust | Charity in Pakistan | Non-Profit Organization",
    template: "%s | The Sirat-e-Mustaqeem Welfare Trust"
  },
  description:
    "The Sirat-e-Mustaqeem Welfare Trust is a non-profit organization in Pakistan dedicated to community service, education, healthcare, food distribution, and supporting those in need. Donate, volunteer, and join our mission to make a difference.",
  keywords: [
    "welfare trust",
    "charity in Pakistan",
    "non-profit organization",
    "donate",
    "community service",
    "volunteer",
    "education",
    "healthcare",
    "food distribution"
  ],
  openGraph: {
    title: "The Sirat-e-Mustaqeem Welfare Trust | Charity in Pakistan | Non-Profit Organization",
    description:
      "Support The Sirat-e-Mustaqeem Welfare Trust in Pakistan. Join our mission for education, healthcare, food distribution, and community service. Donate or volunteer today!",
    url: "https://www.smwelfare.org/",
    siteName: "The Sirat-e-Mustaqeem Welfare Trust",
    images: [
      {
        url: "/images/logo.png",
        width: 800,
        height: 600,
        alt: "The Sirat-e-Mustaqeem Welfare Trust Logo"
      }
    ],
    locale: "en_PK",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sirat-e-Mustaqeem Welfare Trust | Charity in Pakistan | Non-Profit Organization",
    description:
      "Support The Sirat-e-Mustaqeem Welfare Trust in Pakistan. Join our mission for education, healthcare, food distribution, and community service. Donate or volunteer today!",
    images: ["/images/logo.png"]
  },
  alternates: {
    canonical: "https://www.smwelfare.org/"
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: "/logo.png"
  }
};

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      {/* Floating Zakat Calculator Button */}
      <Link
        href="/zakat-calculator"
        className="fixed bottom-4 right-4 z-40 flex h-12 items-center gap-2 rounded-full bg-primary px-4 font-semibold text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:shadow-xl md:bottom-8 md:right-8 md:h-16 md:w-16 md:justify-center md:px-0"
        aria-label="Open Zakat Calculator"
      >
        <Calculator className="h-5 w-5 md:h-7 md:w-7" aria-hidden />
        <span className="text-sm md:hidden">Zakat</span>
      </Link>
    </>
  )
} 