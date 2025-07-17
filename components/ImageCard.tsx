import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FormInput } from '@/components/ui/form-input';
import { formatDate } from '@/lib/utils/format';
import type { Media } from '@/lib/types/media';
import Image from 'next/image';

export const ImageCard = ({ media, selected, onSelect, onClick }: { media: Media; selected: boolean; onSelect: () => void; onClick?: () => void }) => (
  <div className="relative group">
    <FormInput
      id={`select-image-${media?._id}`}
      label="Select Image"
      isCheckbox
      checked={selected}
      onCheckedChange={onSelect}
    />
    <Card className="overflow-hidden cursor-pointer" onClick={onClick}>
      <CardContent className="p-0">
        <Image
          src={media.url ?? ''}
          alt={media.name ?? 'Media'}
          width={400}
          height={192}
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