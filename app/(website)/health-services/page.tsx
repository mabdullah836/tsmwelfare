import ServiceLandingPage from "@/components/ServiceLandingPage";

export default function HealthServicesPage() {
  return (
    <ServiceLandingPage
      title="Health Services"
      intro="Our health initiatives are designed to provide essential care and promote wellness for everyone in our community."
      offerings={[
        { label: "Free health screenings" },
        { label: "Mental health support" },
        { label: "Wellness education" },
        { label: "Access to medical resources" },
      ]}
      getInvolved={"Want to learn more or participate in our health programs? Contact us or sign up for our newsletter to stay updated!"}
      futurePlans={"More details and opportunities will be available soon. Thank you for your interest!"}
    />
  );
}
