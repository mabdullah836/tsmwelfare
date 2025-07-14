"use client";
import dynamic from "next/dynamic";

const NewsletterSignup = dynamic(() => import('@/components/features/newsletter-signup').then(mod => mod.NewsletterSignup));
const TestimonialsCarousel = dynamic(() => import('@/components/home/TestimonialsCarousel'));
const ImpactNumbersSection = dynamic(() => import('@/components/home/ImpactNumbersSection'));
const CallToActionSection = dynamic(() => import('@/components/home/CallToActionSection'));

export default function HomeClientSections() {
  return (
    <>
      <TestimonialsCarousel />
      <ImpactNumbersSection />
      <NewsletterSignup />
      <CallToActionSection />
    </>
  );
} 