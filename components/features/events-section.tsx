"use client"

import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertMessage } from '@/components/ui/alert-message';
import { EventCard } from './EventCard';
import { useEvents } from '@/lib/hooks/useEvents';

export function EventsSection() {
  // SWR hook for events
  const { events, isLoading, isError } = useEvents({ page: 1, limit: 10 });
  const rowLimit = 3;
  const title = 'Upcoming Events';
  const description = 'Join us in making a difference. Here are our upcoming events where you can participate and contribute to our cause.';

  const showViewAll = (events?.length || 0) > rowLimit;
  const visibleEvents = events?.slice(0, rowLimit) || [];

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
        {description && <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">{description}</p>}
        {isError && (
          <AlertMessage message={isError.message || 'Failed to load events.'} type="error" />
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {isLoading ? (
            Array.from({ length: rowLimit }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))
          ) : visibleEvents.length === 0 ? (
            <div className="col-span-full text-center text-muted-foreground py-12">No events found.</div>
          ) : (
            visibleEvents.map((event: any) => (
              <EventCard key={event._id} event={event} />
            ))
          )}
        </div>
        {showViewAll && !isLoading && (
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
