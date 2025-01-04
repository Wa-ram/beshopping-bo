"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImagePreview } from "./image-preview";

interface ImageUploadProps {
  values: File[];
  onChange: (values: File[]) => void;
  disabled?: boolean;
  className?: string;
  maxFiles?: number;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function ImageUpload({
  values = [],
  onChange,
  disabled,
  className,
  maxFiles = 5,
}: ImageUploadProps) {
  const [error, setError] = useState<string | null>(null); // added

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null); // Réinitialiser les erreurs

      // acceptedFiles.forEach((file) => {
      //   if (values.length >= maxFiles) return;

      //   const reader = new FileReader();
      //   reader.onloadend = () => {
      //     const base64String = reader.result as string;
      //     onChange([...values, base64String]);
      //   };
      //   reader.readAsDataURL(file);
      // });
      const filteredFiles = acceptedFiles.filter(
        (file) => file.size <= MAX_FILE_SIZE
      );

      if (filteredFiles.length !== acceptedFiles.length) {
        setError(
          `Some files exceed the maximum size of ${
            MAX_FILE_SIZE / 1024 / 1024
          }MB.`
        );
      }

      // Ajoute les nouveaux fichiers si le maxFiles n'est pas atteint
      const newFiles = [...values, ...filteredFiles].slice(0, maxFiles);
      onChange(newFiles);
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
            {values.map((file, index) => (
              <ImagePreview
                key={index}
                src={URL.createObjectURL(file)}
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
