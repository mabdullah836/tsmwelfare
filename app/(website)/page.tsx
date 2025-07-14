
import { NewsletterSignup } from "@/components/features/newsletter-signup";
import { DonationCounter } from "@/components/features/donation-counter";
import { EventsSection } from "@/components/features/events-section";
import DepartmentsPage from "./departments/page";
import GazaPage from "@/components/gaza/page";
import { HeroSection } from "@/components/Hero/page";
import UrduTitleSection from "@/components/home/UrduTitleSection";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import ImpactNumbersSection from "@/components/home/ImpactNumbersSection";
import CallToActionSection from "@/components/home/CallToActionSection";

export default function HomePage() {
  return (
    <>
      <HeroSection/>
      <UrduTitleSection/>
      <DepartmentsPage />
      <GazaPage />
      <TestimonialsCarousel/>
      <ImpactNumbersSection/>
      <DonationCounter />
      <EventsSection />
      <NewsletterSignup />
      <CallToActionSection/>
    </>
  );
}
