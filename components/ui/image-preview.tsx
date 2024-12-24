"use client";

import { X } from "lucide-react";
import Image from "next/image";

interface ImagePreviewProps {
  src: string;
  onRemove: () => void;
  disabled?: boolean;
}

export function ImagePreview({ src, onRemove, disabled }: ImagePreviewProps) {
  return (
    <div className="relative group">
      <div className="relative w-afull aspect-square">
        <Image
          src={src}
          alt="Preview"
          fill
          className="object-cover rounded-lg"
        />
      </div>
      {!disabled && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground p-1 rounded-full hover:opacity-80 transition opacity-0 group-hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}