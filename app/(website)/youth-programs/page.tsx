import ServiceLandingPage from "@/components/ServiceLandingPage";

export default function YouthProgramsPage() {
  return (
    <ServiceLandingPage
      title="Youth Programs"
      intro="We empower young people through mentorship and support."
      offerings={[
        {
          label: "Mentorship programs",
          description: "Connecting young people with caring mentors who offer guidance, encouragement, and support for personal growth and education.",
        },
      ]}
      getInvolved={"Interested in joining or supporting our youth programs? Contact us or sign up for our newsletter to stay updated!"}
      futurePlans={"We are actively working to expand our youth support services in the future. Stay tuned for new programs and opportunities!"}
    />
  );
} 