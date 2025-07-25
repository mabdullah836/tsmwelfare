"use client"

import React from "react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertMessage } from '@/components/ui/alert-message';
import { EventCard } from './EventCard';
import { useEvents } from '@/lib/hooks/useEvents';
import { CalendarIcon, ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function EventsSection() {
  const { events, isLoading, isError } = useEvents({ page: 1, limit: 10 });
  const rowLimit = 3;
  const title = 'Upcoming Events';
  const description = 'Join us in making a difference. Participate in our upcoming events and help create positive change in our community.';

  const showViewAll = (events?.length || 0) > rowLimit;
  const visibleEvents = events?.slice(0, rowLimit) || [];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/30 dark:to-black">
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <CalendarIcon className="h-8 w-8 text-primary" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
              {title}
            </h2>
          </div>
          {description && (
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </motion.div>

        {isError && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <AlertMessage 
              message={isError.message || 'Failed to load events.'} 
              type="error" 
            />
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {isLoading ? (
            Array.from({ length: rowLimit }).map((_, i) => (
              <motion.div key={i} variants={fadeIn}>
                <Skeleton className="h-96 w-full rounded-xl" />
              </motion.div>
            ))
          ) : visibleEvents.length === 0 ? (
            <motion.div 
              variants={fadeIn}
              className="col-span-full text-center py-16"
            >
              <div className="text-muted-foreground text-lg mb-4">
                No upcoming events at this time.
              </div>
              <Button variant="outline" asChild>
                <Link href="/events">
                  Browse past events
                </Link>
              </Button>
            </motion.div>
          ) : (
            visibleEvents.map((event: any) => (
              <motion.div key={event._id} variants={fadeIn}>
                <EventCard event={event} />
              </motion.div>
            ))
          )}
        </motion.div>

        {showViewAll && !isLoading && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex justify-center"
          >
            <Button size="lg" asChild>
              <Link href="/events" className="gap-2">
                View All Events
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export { EventCard };