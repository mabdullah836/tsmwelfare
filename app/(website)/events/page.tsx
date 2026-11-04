"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
              "/images/logo.png"
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
      <PageHeader title="Events" eyebrow="Join us">
        <p>Explore our upcoming events and join us in making a difference in the community.</p>
      </PageHeader>

      <section className="py-10 md:py-14">
        <div className="container">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl">All events</h2>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                type="search"
                aria-label="Search events"
                placeholder="Search events..."
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                  setPage(1);
                }}
                className="pl-9"
              />
            </div>
          </div>
          <AdminGrid
            items={events}
            loading={isLoading}
            emptyState={{ title: "No events found.", description: "Try adjusting your search or check back later." }}
            skeletonItems={3}
            gridClassName="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            renderItem={(event: Event) => <EventCard key={event.id} event={event} />}
          />
        </div>
      </section>
    </>
  );
} 