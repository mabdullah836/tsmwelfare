import Link from "next/link";

type ServiceLandingPageProps = {
  title: string;
  intro: string;
  offerings: { label: string; description?: string }[];
  getInvolved: string;
  futurePlans: string;
};

export default function ServiceLandingPage({
  title,
  intro,
  offerings,
  getInvolved,
  futurePlans,
}: ServiceLandingPageProps) {
  return (
    <div className="container py-20">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg mb-8">{intro}</p>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
        <ul className="list-disc pl-6 space-y-2">
          {offerings.map((item, i) => (
            <li key={i}>
              <span className="font-medium">{item.label}</span>
              {item.description && (
                <div className="text-muted-foreground text-sm">{item.description}</div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Get Involved</h2>
        <p>{getInvolved}</p>
      </div>
      <div className="bg-primary/10 p-4 rounded-xl text-primary text-center mt-6">
        {futurePlans}
      </div>
    </div>
  );
} 