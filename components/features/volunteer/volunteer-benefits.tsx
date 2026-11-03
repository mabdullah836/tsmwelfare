import React from "react"
import { BenefitCard } from "./benefit-card"
import { VOLUNTEER_BENEFITS } from "@/lib/constants/volunteer"

export const VolunteerBenefits = React.memo(function VolunteerBenefits() {
  return (
    <section className="bg-muted/50 py-12 md:py-16" aria-label="Why volunteer with us">
      <div className="container">
        <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VOLUNTEER_BENEFITS.map((benefit, index) => (
            <BenefitCard key={index} {...benefit} />
          ))}
        </div>
      </div>
    </section>
  );
}); 