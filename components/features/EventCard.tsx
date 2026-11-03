import Image from 'next/image';
import { CalendarDays, MapPin } from 'lucide-react';

type EventLike = { _id?: string; title?: string; description?: string; location?: string; date?: string; imageUrl?: string };

export function EventCard({ event }: { event: EventLike }) {
  const date = event?.date ? new Date(event.date) : null;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[16/10] w-full bg-muted">
        {event?.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-accent text-primary" aria-hidden>
            <CalendarDays className="h-10 w-10 opacity-60" />
          </div>
        )}
        {date && (
          <div className="absolute left-4 top-4 rounded-xl bg-background/95 px-3 py-2 text-center shadow-sm backdrop-blur">
            <p className="text-xs font-semibold uppercase text-primary">{date.toLocaleDateString('en-GB', { month: 'short' })}</p>
            <p className="font-display text-xl font-bold leading-none">{date.getDate()}</p>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug">{event?.title}</h3>
        {event?.location && (
          <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-primary">
            <MapPin className="h-4 w-4" aria-hidden /> {event.location}
          </p>
        )}
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">{event?.description}</p>
        {date && (
          <p className="mt-4 text-xs text-muted-foreground">
            {date.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        )}
      </div>
    </article>
  );
}
