"use client"

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Section, SectionHeader } from '@/components/site/section';
import { EventCard } from './EventCard';
import { useEvents } from '@/lib/hooks/useEvents';

export function EventsSection() {
  const { events, isLoading, isError } = useEvents({ page: 1, limit: 10 });
  const rowLimit = 3;
  const visibleEvents = events?.slice(0, rowLimit) || [];

  return (
    <Section tone="muted">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          align="left"
          className="mb-0 md:mb-0"
          eyebrow="Events"
          title="Upcoming events"
          description="Join us in making a difference. Take part in our upcoming events and help create positive change in our community."
        />
        <Button asChild variant="outline" className="shrink-0 self-start md:self-auto">
          <Link href="/events">
            View all events <ArrowRight />
          </Link>
        </Button>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: rowLimit }).map((_, i) => <Skeleton key={i} className="h-[380px] w-full rounded-2xl" />)
        ) : isError ? (
          <p className="col-span-full rounded-2xl border bg-card p-10 text-center text-muted-foreground" role="status">
            We couldn&apos;t load events right now. Please try again later.
          </p>
        ) : visibleEvents.length === 0 ? (
          <p className="col-span-full rounded-2xl border border-dashed bg-card p-10 text-center text-muted-foreground">
            No upcoming events at this time. Check back soon.
          </p>
        ) : (
          visibleEvents.map((event: { _id: string }) => <EventCard key={event._id} event={event} />)
        )}
      </div>
    </Section>
  );
}

export { EventCard };
