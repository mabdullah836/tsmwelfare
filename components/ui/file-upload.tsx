import React from "react";
import { Input } from "@/components/ui/input";

interface FileUploadForm {
  setValue: (name: any, value: any, options?: { shouldValidate?: boolean }) => void;
  watch: (name: any) => any;
}

interface FileUploadProps {
  name: string;
  form?: FileUploadForm;
  onChange?: (value: File[] | File | null) => void;
  label?: string;
  description?: string;
  multiple?: boolean;
  accept?: string;
  preview?: boolean;
  variant?: 'default' | 'compact';
  buttonText?: string;
  className?: string;
}

const FilePreview: React.FC<{ file: File; preview: boolean }> = ({ file, preview }) => (
  <div className="text-sm text-muted-foreground flex items-center gap-2">
    {preview && file.type && file.type.startsWith("image/") && (
      <img
        src={URL.createObjectURL(file)}
        alt={file.name}
        className="h-10 w-10 object-cover rounded border"
      />
    )}
    <span>{file.name}</span>
  </div>
);

export const FileUpload: React.FC<FileUploadProps> = ({
  name,
  form,
  onChange,
  label,
  description,
  multiple = false,
  accept,
  preview = true,
  variant = 'default',
  buttonText,
  className,
}) => {
  const [localValue, setLocalValue] = React.useState<File[] | File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const value = files
      ? multiple
        ? Array.from(files)
        : files[0]
      : multiple
        ? []
        : null;

    try {
      if (form) {
        form.setValue(name, value, { shouldValidate: true });
      } else {
        setLocalValue(value);
      }
      if (onChange) onChange(value);
    } catch (error) {
      console.error("Error setting file value:", error);
    }
  };

  const watchedValue = form ? form.watch(name) : localValue;

  // Compact variant for toolbars
  if (variant === 'compact') {
    return (
      <div className="relative">
        <input
          type="file"
          id={`file-upload-${name}`}
          name={name}
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <label 
          htmlFor={`file-upload-${name}`}
          className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 cursor-pointer ${className ?? ''}`}
        >
          {buttonText || (multiple ? 'Upload Files' : 'Upload File')}
        </label>
      </div>
    );
  }

  // Simple variant (no RHF context required)
  return (
    <div className="space-y-2">
      {label && <label className="block font-medium mb-1">{label}</label>}
      
      <Input
        type="file"
        name={name}
        multiple={multiple}
        accept={accept}
        onChange={handleFileChange}
        className="w-full"
      />
      
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      
      {/* Preview */}
      {watchedValue && (
        <div className="mt-2 space-y-1">
          {multiple && Array.isArray(watchedValue)
            ? watchedValue.map((file: File, idx: number) => (
                <FilePreview key={idx} file={file} preview={preview} />
              ))
            : watchedValue && <FilePreview file={watchedValue} preview={preview} />}
        </div>
      )}
    </div>
  );
};
