"use client"

import React from "react"
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertMessage } from '@/components/ui/alert-message';
import { EventCard } from './EventCard';

interface EventsSectionProps {
  title?: string;
  description?: string;
  events: any[];
  rowLimit?: number;
  loading?: boolean;
  error?: string | null;
}

export function EventsSection({
  title = 'Upcoming Events',
  description = 'Join us in making a difference. Here are our upcoming events where you can participate and contribute to our cause.',
  events = [],
  rowLimit = 3,
  loading = false,
  error = null,
}: EventsSectionProps) {
  const showViewAll = events.length > rowLimit;
  const visibleEvents = events.slice(0, rowLimit);

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
        {description && <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">{description}</p>}
        {error && (
          <AlertMessage message={error} type="error" />
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {loading ? (
            Array.from({ length: rowLimit }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))
          ) : visibleEvents.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground py-12">No events found.</div>
          ) : (
            visibleEvents.map(event => (
              <EventCard key={event._id} event={event} />
            ))
          )}
        </div>
        {showViewAll && !loading && (
          <div className="flex justify-center">
            <Link href="/events">
              <button className="px-6 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 transition">View All Events</button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
} 

export { EventCard };
