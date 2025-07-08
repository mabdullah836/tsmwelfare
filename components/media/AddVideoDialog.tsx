import { UniversalDialog } from '@/components/modals/UniversalDialog';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const AddVideoDialog = ({ open, onOpenChange, url, setUrl, thumbnail, setThumbnail, title, setTitle, onSave }: any) => (
  <UniversalDialog open={open} onOpenChange={onOpenChange}>
    <DialogHeader><DialogTitle>Add Video</DialogTitle></DialogHeader>
    <div className="grid gap-4 py-4">
      <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Input placeholder="Video URL" value={url} onChange={(e) => setUrl(e.target.value)} />
      <Input type="file" accept="image/*" onChange={(e) => setThumbnail(e.target.files?.[0] || null)} />
      <Button onClick={onSave}>Save Video</Button>
    </div>
  </UniversalDialog>
);
