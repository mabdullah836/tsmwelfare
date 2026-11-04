
import { DonationCounter } from "@/components/features/donation-counter";
import { EventsSection } from "@/components/features/events-section";
import { DepartmentsSection } from "@/components/departments/DepartmentsSection";
import GazaPage from "@/components/gaza/page";
import { HeroSection } from "@/components/Hero/page";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import ImpactNumbersSection from "@/components/home/ImpactNumbersSection";
import CallToActionSection from "@/components/home/CallToActionSection";
import { NewsletterSignup } from "@/components/features/newsletter-signup";

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
            "logo": "/images/logo.png",
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
      <HeroSection />
      <DepartmentsSection headingLevel={2} />
      <GazaPage />
      <DonationCounter />
      <EventsSection />
      <TestimonialsCarousel />
      <ImpactNumbersSection />
      <CallToActionSection />
      <NewsletterSignup />
    </>
  );
}
