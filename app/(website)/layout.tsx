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
        url: "/images/smw-logo-transparent.png",
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
    images: ["/images/smw-logo-transparent.png"]
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
        className="fixed z-50 bottom-4 right-4 md:bottom-10 md:right-10 flex items-center md:justify-center bg-primary text-primary-foreground shadow-lg transition-transform focus-visible:ring-4 focus-visible:ring-primary/40 group
          rounded-full md:w-20 md:h-20 w-auto h-14 px-6 md:px-0 font-bold
          md:rounded-full md:flex md:items-center md:w-20 md:h-20
          hover:scale-105 hover:shadow-xl"
        aria-label="Open Zakat Calculator"
        style={{ minWidth: '56px' }}
      >
        <Calculator className="w-7 h-7 md:w-10 md:h-10 mx-auto" />
        <span className="ml-3 text-base md:hidden">Zakat</span>
      </Link>
    </>
  )
} 