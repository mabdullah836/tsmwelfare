import { Checkbox } from '@/components/ui/checkbox';
import { formatDate } from '@/lib/utils/format';
import type { Media } from '@/lib/types/media';
import Image from 'next/image';

export const ListRow = ({ media, selected, onSelect }: {
  media: Media;
  selected: boolean;
  onSelect: () => void;
}) => (
  <div className="relative group flex items-center gap-4 border rounded-lg p-4">
    <Checkbox
      className="absolute top-2 left-2 z-10"
      checked={selected}
      onCheckedChange={onSelect}
    />
    <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded">
      {media.type === 'image' ? (
        <Image
          src={media.url ?? ''}
          alt={media.name ?? 'Media'}
          width={96}
          height={96}
          className="object-cover w-full h-full"
        />
      ) : (
        <video
          src={media.url ?? ''}
          controls
          className="object-cover w-full h-full"
        />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="font-medium truncate">{media.name || 'Untitled'}</div>
      <div className="text-xs text-muted-foreground truncate">{formatDate(media.createdAt || '')}</div>
    </div>
  </div>
);