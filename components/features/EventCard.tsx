import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

export function EventCard({ event }: { event: any }) {
  return (
    <Card key={event?._id} className="overflow-hidden flex flex-col">
      {event?.imageUrl || true ? (
        <div className="relative w-full h-48 bg-muted">
          <Image
            src={event?.imageUrl || '/placeholder.svg?height=400&width=600&text=Event'}
            alt={event?.title}
            fill
            className="object-cover"
          />
        </div>
      ) : null}
      <CardContent className="pt-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-1">{event?.title}</h3>
        <p className="text-primary font-medium mb-3">{event?.location}</p>
        <p className="text-muted-foreground flex-1">{event?.description}</p>
        <div className="text-xs text-muted-foreground mt-2">
          {event?.date ? new Date(event?.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
        </div>
      </CardContent>
    </Card>
  );
} 