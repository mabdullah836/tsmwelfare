import { UniversalDialog } from '@/components/modals/UniversalDialog';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { FormInput } from '@/components/ui/form-input';
import { FileUpload } from '@/components/ui/file-upload';

interface AddVideoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: { title: string; url: string; tag?: string; thumbnail?: File | null }) => void;
  saving?: boolean;
}

export const AddVideoDialog: React.FC<AddVideoDialogProps> = ({ open, onOpenChange, onSave, saving }) => {
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    defaultValues: {
      title: '',
      url: '',
      thumbnail: null as File | null,
      tag: '',
    },
  });

  const onSubmit = (data: any) => {
    onSave(data);
    reset();
  };

  return (
    <UniversalDialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader><DialogTitle>Add Video</DialogTitle></DialogHeader>
      <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="title"
          label="Title"
          register={register}
          errors={errors}
          required
          placeholder="Title"
        />
        <FormInput
          id="url"
          label="Video URL"
          register={register}
          errors={errors}
          required
          placeholder="Video URL"
        />
        <FileUpload
          name="thumbnail"
          form={{ setValue, watch }}
          label="Thumbnail"
          accept="image/*"
          preview
        />
        <FormInput
          id="tag"
          label="Tag"
          register={register}
          errors={errors}
          placeholder="Tag"
        />
        <Button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Video'}</Button>
      </form>
    </UniversalDialog>
  );
};
