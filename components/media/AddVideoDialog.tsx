import { UniversalDialog } from '@/components/modals/UniversalDialog';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { FileUpload } from '@/components/ui/file-upload';
import { FormInput } from '@/components/ui/form-input';

export const AddVideoDialog = ({ open, onOpenChange, onSave }: any) => {

  const { register, handleSubmit, formState: { errors }, reset, control } = 
  useForm({
    defaultValues: {
      title: '',
      url: '',
      thumbnail: null,
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
          control={control}
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
        <Button type="submit">Save Video</Button>
      </form>
    </UniversalDialog>
  );
};
