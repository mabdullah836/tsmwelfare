import { ImageCard } from '@/components/ImageCard';
import { VideoCard } from '@/components/VideoCard';
import { ListRow } from '@/components/ListRow';
import type { Media } from '@/lib/types/media';

export const MediaView = ({ media, view, onClick, onApprove, onReject, approving }: {
  media: Media[],
  view: 'grid' | 'list';
  onClick: (m: Media) => void;
  onApprove?: (m: Media) => void;
  onReject?: (m: Media) => void;
  approving?: boolean;
}) => {
  if (media.length === 0) return <div className="text-muted-foreground text-center py-20">No media found</div>;

  if (view === 'list') {
    return (
      <div className="flex flex-col gap-2">
        {media.map((item) => (
          <ListRow key={item._id} media={item} selected={false} onSelect={() => onClick(item)} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {media.map((item) => (
        item.type === 'image' ? (
          <ImageCard key={item._id} media={item} selected={false} onSelect={() => onClick(item)} />
        ) : (
          <VideoCard
            key={item._id}
            media={item}
            selected={false}
            onSelect={() => onClick(item)}
            onClick={() => onClick(item)}
            onApprove={() => onApprove && onApprove(item)}
            onReject={() => onReject && onReject(item)}
            approving={!!approving}
          />
        )
      ))}
    </div>
  );
};