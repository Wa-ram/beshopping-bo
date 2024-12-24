"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImagePreview } from "./image-preview";

interface ImageUploadProps {
  values: string[];
  onChange: (values: string[]) => void;
  disabled?: boolean;
  className?: string;
  maxFiles?: number;
}

export function ImageUpload({
  values = [],
  onChange,
  disabled,
  className,
  maxFiles = 5,
}: ImageUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        if (values.length >= maxFiles) return;

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          onChange([...values, base64String]);
        };
        reader.readAsDataURL(file);
      });
    },
    [onChange, values, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    disabled: disabled || values.length >= maxFiles,
    maxFiles: maxFiles - values.length,
  });

  const removeImage = useCallback(
    (index: number) => {
      const newValues = values.filter((_, i) => i !== index);
      onChange(newValues);
    },
    [onChange, values]
  );

  return (
    <div className={cn("space-y-4 w-full", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition cursor-pointer",
          isDragActive && "border-primary",
          (disabled || values.length >= maxFiles) &&
            "opacity-50 cursor-not-allowed"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-row items-center justify-center gap-2">
          <div>
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground text-center">
              {values.length >= maxFiles
                ? `Maximum ${maxFiles} images allowed`
                : `Drag & drop images here, or click to select (${values.length}/${maxFiles})`}
            </p>
          </div>
        </div>
        {values.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {values.map((image, index) => (
              <ImagePreview
                key={index}
                src={image}
                onRemove={() => removeImage(index)}
                disabled={disabled}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
