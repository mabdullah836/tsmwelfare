"use client";

import { useEffect, useState } from "react";
import { getUpcomingEvents } from "@/lib/services/event";
import { Input } from "@/components/ui/input";
import { EventCard } from "@/components/features/EventCard";
import { AdminGrid } from "@/components/shared/AdminGrid";
import { PageHeader } from "@/components/page-header";

const DEFAULT_LIMIT = 8;

export default function EventsPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(DEFAULT_LIMIT);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getUpcomingEvents({ page, limit, q })
      .then((res) => {
        if (!res || (res as any)?.error || !Array.isArray(res.data)) {
          setError("Failed to load events.");
          setData([]);
          setMeta(null);
        } else {
          setData(res.data);
          setMeta(res.meta);
        }
      })
      .catch((err) => {
        setError("Failed to load events.");
      })
      .finally(() => setLoading(false));
  }, [page, limit, q]);

  return (
    <>
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
            items={data}
            loading={loading}
            emptyState={{ title: "No events found.", description: "Try adjusting your search or check back later." }}
            skeletonItems={limit}
            gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            renderItem={(event) => <EventCard key={event._id} event={event} />}
          />
        </div>
      </section>
    </>
  );
} 