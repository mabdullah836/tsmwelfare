import ServiceLandingPage from "@/components/ServiceLandingPage";

export default function EducationProgramsPage() {
  return (
    <ServiceLandingPage
      title="Education Programs"
      intro="We believe in empowering individuals of all ages through accessible education and support."
      offerings={[
        {
          label: "Financial assistance for school fees, books, and uniforms",
        },
        {
          label: "Guidance and encouragement for students and families",
        },
        {
          label: "Connecting individuals with educational opportunities and resources",
        },
        {
          label: "Support for continuing education and self-improvement",
        },
      ]}
      getInvolved={"Interested in our education programs? Contact us or sign up for our newsletter to stay updated!"}
      futurePlans={"Our goal is to offer even more educational support and resources as we grow."}
    />
  );
} 