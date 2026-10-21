"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const FALLBACK =
  "https://images.unsplash.com/photo-1560393464-5c7596c5573b?w=800&q=80";

export function ProductImage({
  src,
  alt,
  className,
  fill,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
}) {
  const initial = src?.startsWith("http") ? src : FALLBACK;
  const [currentSrc, setCurrentSrc] = useState(initial);

  useEffect(() => {
    setCurrentSrc(src?.startsWith("http") ? src : FALLBACK);
  }, [src]);
  const isAllowed = currentSrc.includes("unsplash.com");

  if (!isAllowed) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={currentSrc}
          alt={alt}
          className={`absolute inset-0 h-full w-full object-cover ${className ?? ""}`}
          onError={() => setCurrentSrc(FALLBACK)}
        />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={currentSrc}
        alt={alt}
        className={className}
        onError={() => setCurrentSrc(FALLBACK)}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      className={className}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      onError={() => setCurrentSrc(FALLBACK)}
    />
  );
}
