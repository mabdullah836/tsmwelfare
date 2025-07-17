import React from "react";
import { Input } from "@/components/ui/input";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FileUploadProps {
  name: string;
  control: any;
  label?: string;
  description?: string;
  multiple?: boolean;
  accept?: string;
  preview?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  name,
  control,
  label,
  description,
  multiple = false,
  accept,
  preview = true,
}) => {
  return (
    <div className="space-y-2">
      {label && <label className="block font-medium mb-1">{label}</label>}
      <input
        type="file"
        name={name}
        multiple={multiple}
        accept={accept}
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            control.setValue(
              name,
              multiple ? Array.from(files) : files[0],
              { shouldValidate: true }
            );
          } else {
            control.setValue(name, multiple ? [] : null, { shouldValidate: true });
          }
        }}
      />
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {/* Add error display if needed */}
      {/* Preview or filenames */}
      {control.watch && control.watch(name) && (
        <div className="mt-2 space-y-1">
          {multiple
            ? Array.isArray(control.watch(name)) &&
              control.watch(name).map((file: File, idx: number) => (
                <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                  {preview && file.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="h-10 w-10 object-cover rounded border"
                    />
                  ) : null}
                  <span>{file.name}</span>
                </div>
              ))
            : control.watch(name) && (
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  {preview && control.watch(name).type && control.watch(name).type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(control.watch(name))}
                      alt={control.watch(name).name}
                      className="h-10 w-10 object-cover rounded border"
                    />
                  ) : null}
                  <span>{control.watch(name).name}</span>
                </div>
              )}
        </div>
      )}
    </div>
  );
}; 