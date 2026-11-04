import { UniversalDialog } from '@/components/modals/UniversalDialog';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getYouTubeId } from '@/lib/utils/format';
import type { Media } from '@/lib/types/media';

export const VideoPreviewDialog = ({ open, onOpenChange, media }: { open: boolean; onOpenChange: (v: boolean) => void; media: Media | null }) => (
  <UniversalDialog open={open} onOpenChange={onOpenChange}>
    {media && (
      <div className="space-y-4">
        <DialogHeader>
          <DialogTitle>{media.title || 'Video'}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video w-full bg-black rounded overflow-hidden">
          {/youtube/.test(media.url) ? (
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(media.url)}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-80"
            />
          ) : /facebook/.test(media.url) ? (
            <iframe
              src={media.url}
              title="Facebook video player"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-80"
            />
          ) : (
            <div className="text-white p-8">Invalid video URL</div>
          )}
        </div>
        <div className="text-sm text-muted-foreground">{media.description}</div>
      </div>
    )}
  </UniversalDialog>
);