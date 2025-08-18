import { ImpactStat } from "@/components/shared/impact-stat";
import React from "react";

// Define the icon components
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const HeartHandshakeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z" />
    <path d="M12 5l-1 1-1-1-1 1-1-1-1 1-1-1-1 1-1-1M3 15l1.5-1.5L6 15l1.5-1.5L9 15l1.5-1.5L12 15l1.5-1.5L15 15l1.5-1.5L18 15l1.5-1.5L21 15" />
  </svg>
);

const GraduationCapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
  </svg>
);

const MedalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path d="M12 2v2m0 16v2M4 12H2m4.5-6.5L5 5m13 7h2m-4.5 6.5L19 19" />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="currentColor">
    <path d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

// Define the impact data array
const impactData = [
  {
    value: `${new Date().getFullYear() - 2016}+`,
    label: "Years of Service",
    icon: <CalendarIcon className="w-6 h-6" />
  },
  {
    value: "2,500+",
    label: "Families Nourished",
    icon: <HeartHandshakeIcon className="w-6 h-6" />
  },
  {
    value: "800+",
    label: "Students Empowered",
    icon: <GraduationCapIcon className="w-6 h-6" />
  },
  {
    value: "50+",
    label: "Medical Camps",
    icon: <MedalIcon className="w-6 h-6" />
  }
];

const ImpactNumbersSection = () => {
  const yearsOfService = new Date().getFullYear() - 2016;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Transforming Lives Since 2016
          </h2>
          <p className="text-xl text-muted-foreground">
            For over {yearsOfService} years, The Sirat-e-Mustaqeem Welfare Trust has created lasting change in our community.
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {impactData.map((stat, index) => (
            <ImpactStat 
              key={index}
              value={stat.value} 
              label={stat.label}
              icon={stat.icon}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            And this is just the beginning...
          </p>
          <button className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-lg hover:shadow-xl transition-all duration-300">
            Join Our Mission
            <ArrowRightIcon className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImpactNumbersSection;