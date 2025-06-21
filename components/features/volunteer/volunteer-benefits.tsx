import { BenefitCard } from "./benefit-card"
import { VOLUNTEER_BENEFITS } from "@/lib/constants/volunteer"

export const VolunteerBenefits = () => (
  <section className="py-16 bg-muted">
    <div className="container">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {VOLUNTEER_BENEFITS.map((benefit, index) => (
          <BenefitCard key={index} {...benefit} />
        ))}
      </div>
    </div>
  </section>
); 