import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormInput } from '@/components/ui/form-input';
import { Button } from '@/components/ui/button';
import { PlayCircle, CheckCircle, XCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils/format';
import type { Media } from '@/lib/types/media';
import Image from 'next/image';

export const VideoCard = ({ media, selected, onSelect, onClick, onApprove, onReject, approving }: {
  media: Media;
  selected: boolean;
  onSelect: () => void;
  onClick: () => void;
  onApprove: () => void;
  onReject: () => void;
  approving: boolean;
}) => (
  <div className="relative group cursor-pointer" onClick={onClick}>
    <div onClick={e => e.stopPropagation()}>
      <FormInput
        id={`select-video-${media?.id}`}
        label="Select Video"
        isCheckbox
        checked={selected}
        onCheckedChange={onSelect}
      />
    </div>
    <Card className="overflow-hidden">
      <div className="relative w-full h-48">
        <Image
          src={media.thumbnail || '/placeholder-image.svg'}
          alt={media.name ?? 'Video thumbnail'}
          width={400}
          height={192}
          className="object-cover w-full h-48"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
        </div>
        {media.status === 'approved' && <CheckCircle className="absolute top-2 right-2 text-green-500 dark:text-green-400" />}
        {media.status === 'pending' && <span className="absolute top-2 right-2 bg-yellow-400 dark:bg-yellow-500 text-black dark:text-white text-xs px-2 py-1 rounded">Pending</span>}
        {media.status === 'rejected' && <XCircle className="absolute top-2 right-2 text-red-500 dark:text-red-400" />}
      </div>
      <CardHeader className="p-4 flex flex-col gap-1">
        <CardTitle className="text-base truncate">{media.name || 'Untitled'}</CardTitle>
        <CardDescription className="truncate text-xs">{formatDate(media.createdAt || '')}</CardDescription>
        {media.status === 'pending' && (
          <div className="flex gap-2 mt-2">
            <Button size="sm" variant="default" className="bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white" disabled={approving} onClick={e => { e.stopPropagation(); onApprove(); }}>Approve</Button>
            <Button size="sm" variant="destructive" disabled={approving} onClick={e => { e.stopPropagation(); onReject(); }}>Reject</Button>
          </div>
        )}
      </CardHeader>
    </Card>
  </div>
);