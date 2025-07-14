
import { DonationCounter } from "@/components/features/donation-counter";
import { EventsSection } from "@/components/features/events-section";
import DepartmentsPage from "./departments/page";
import GazaPage from "@/components/gaza/page";
import { HeroSection } from "@/components/Hero/page";
import UrduTitleSection from "@/components/home/UrduTitleSection";
import HomeClientSections from '@/components/home/HomeClientSections';

export const metadata = {
  title: "Sirat-e-Mustaqeem Welfare Trust | Charity in Pakistan | Non-Profit Organization",
  description:
    "Welcome to Sirat-e-Mustaqeem Welfare Trust, a leading charity in Pakistan dedicated to community service, education, healthcare, food distribution, and supporting those in need. Donate or volunteer to make a difference.",
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
  ]
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sirat-e-Mustaqeem Welfare Trust",
            "url": "https://www.smwelfare.org/",
            "logo": "/images/smw-logo-transparent.png",
            "description": "A non-profit organization in Pakistan dedicated to community service, education, healthcare, and food distribution.",
            "sameAs": [
              "https://www.facebook.com/smwelfare/"
            ],
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "+92-XXX-XXXXXXX",
              "contactType": "Customer Service"
            }]
          })
        }}
      />
      <HeroSection/>
      <UrduTitleSection/>
      <DepartmentsPage />
      <GazaPage />
      <HomeClientSections />
      <DonationCounter />
      <EventsSection />
    </>
  );
}
