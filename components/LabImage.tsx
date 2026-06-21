"use client";

import Image from "next/image";
import { useState } from "react";
import { IMAGES } from "@/lib/constants";

export function LabImage({
  src,
  alt,
  priority = false,
  sizes = "100vw",
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const [current, setCurrent] = useState(src);
  return (
    <Image
      src={current}
      alt={alt}
      fill
      quality={85}
      sizes={sizes}
      loading={priority ? undefined : "lazy"}
      priority={priority}
      onError={() => setCurrent(IMAGES.fallback)}
      className={`object-cover ${className}`}
    />
  );
}
