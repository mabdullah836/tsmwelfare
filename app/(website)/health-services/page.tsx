import Link from "next/link";

export default function HealthServicesPage() {
  return (
    <div className="container py-20">
      <h1 className="text-4xl font-bold mb-4">Health Services</h1>
      <p className="text-lg mb-8">
        Our health initiatives are designed to provide essential care and promote wellness for everyone in our community.
      </p>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Free health screenings</li>
          <li>Mental health support</li>
          <li>Wellness education</li>
          <li>Access to medical resources</li>
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Get Involved</h2>
        <p>
          Want to learn more or participate in our health programs?{' '}
          <Link href="/contact" className="text-primary underline">Contact us</Link> or sign up for our newsletter to stay updated!
        </p>
      </div>
      <div className="bg-primary/10 p-6 rounded-xl text-primary text-center">
        More details and opportunities will be available soon. Thank you for your interest!
      </div>
    </div>
  );
} 