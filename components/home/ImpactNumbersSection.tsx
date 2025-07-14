import { ImpactStat } from "@/components/shared/impact-stat";
import React from "react";

const ImpactNumbersSection = () => (
  <section className="py-12 md:py-20">
    <div className="container">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our Impact Since 2016
        </h2>
        <p className="text-lg text-muted-foreground">
          For over {new Date().getFullYear() - 2016} years, The Sirat-e-Mustaqeem Welfare Trust has been making a real difference in our community.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <ImpactStat value={`${new Date().getFullYear() - 2016}+`} label="Years of Service" />
        <ImpactStat value="2,500+" label="Families Fed" />
        <ImpactStat value="800+" label="Students Supported" />
        <ImpactStat value="50+" label="Medical Camps" />
      </div>
    </div>
  </section>
);

export default ImpactNumbersSection; 