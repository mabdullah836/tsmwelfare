import ServiceLandingPage from "@/components/ServiceLandingPage";

export default function CommunityProgramsPage() {
  return (
    <ServiceLandingPage
      title="Community Programs"
      intro="We’re dedicated to building a stronger, more connected community through a variety of outreach programs and events."
      offerings={[
        {
          label: "Monthly food drives",
          description: "Providing essential groceries and staples to families in need every month.",
        },
        {
          label: "Support services for families",
          description: "Offering assistance, guidance, and resources to help families overcome challenges and improve their well-being.",
        },
      ]}
      getInvolved={"Interested in joining or supporting our community programs? Contact us or sign up for our newsletter to stay updated!"}
      futurePlans={"We plan to introduce more community initiatives soon to better serve families and individuals in need."}
    />
  );
} 