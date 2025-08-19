"use client";

export const metadata = {
  title: "Events | Sirat-e-Mustaqeem Welfare Trust | Community Service in Pakistan",
  description:
    "Explore upcoming events by Sirat-e-Mustaqeem Welfare Trust. Join our charity events, community service, and social welfare initiatives in Pakistan.",
  keywords: [
    "welfare trust events",
    "charity events Pakistan",
    "community service",
    "non-profit events"
  ]
};

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { EventCard } from "@/components/features/EventCard";
import { AdminGrid } from "@/components/shared/AdminGrid";
import { PageHeader } from "@/components/page-header";
import { useEvents } from '@/lib/hooks/useEvents';
import { Event } from "@/lib/types/event";

const DEFAULT_LIMIT = 8;

export default function EventsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(DEFAULT_LIMIT);
  const [q, setQ] = useState("");

  // SWR hook for events
  const { events, isLoading } = useEvents({ page, limit, q });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Sirat-e-Mustaqeem Welfare Trust Events",
            "startDate": "2024-12-01", // Example date, replace with real event data
            "location": {
              "@type": "Place",
              "name": "Pakistan",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "PK"
              }
            },
            "image": [
              "/images/smw-logo-transparent.png"
            ],
            "description": "Charity and community service events by Sirat-e-Mustaqeem Welfare Trust in Pakistan.",
            "organizer": {
              "@type": "Organization",
              "name": "Sirat-e-Mustaqeem Welfare Trust",
              "url": "https://www.smwelfare.org/"
            }
          })
        }}
      />
      <PageHeader title="Events">
        <p className="text-xl text-white/90">
          Explore our upcoming events and join us in making a difference in the community.
        </p>
      </PageHeader>

      <section>
        <div className="container mx-auto py-8 px-4">
          <div className="mb-6 flex justify-between items-center">
            <Input
              placeholder="Search events..."
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              className="w-full max-w-xs"
            />
          </div>
          <AdminGrid
            items={events}
            loading={isLoading}
            emptyState={{ title: "No events found.", description: "Try adjusting your search or check back later." }}
            skeletonItems={limit}
            gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            renderItem={(event: Event) => <EventCard key={event._id} event={event} />}
          />
        </div>
      </section>
    </>
  );
} 