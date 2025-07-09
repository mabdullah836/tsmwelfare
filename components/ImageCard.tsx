import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { formatDate } from '@/lib/utils/format';
import type { Media } from '@/lib/types/media';

export const ImageCard = ({ media, selected, onSelect }: { media: Media; selected: boolean; onSelect: () => void }) => (
  <div className="relative group">
    <Checkbox
      className="absolute top-2 left-2 z-10"
      checked={selected}
      onCheckedChange={onSelect}
    />
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <img
          src={media.url ?? ''}
          alt={media.name ?? 'Media'}
          className="object-cover w-full h-48"
        />
      </CardContent>
      <CardHeader className="p-4 flex flex-col gap-1">
        <CardTitle className="text-base truncate">{media.name || 'Untitled'}</CardTitle>
        <CardDescription className="truncate text-xs">{formatDate(media.createdAt || '')}</CardDescription>
      </CardHeader>
    </Card>
  </div>
);