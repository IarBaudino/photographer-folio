import Image from "next/image";
import { cn } from "@/lib/cn";

const OPTIMIZED_HOSTS = new Set([
  "images.unsplash.com",
  "plus.unsplash.com",
]);

function canOptimize(src: string) {
  if (src.startsWith("/")) return true;
  try {
    return OPTIMIZED_HOSTS.has(new URL(src).hostname);
  } catch {
    return false;
  }
}

type SmartImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  objectPosition?: string;
};

export function SmartImage({
  src,
  alt,
  className,
  sizes,
  priority,
  fill = true,
  objectPosition,
}: SmartImageProps) {
  const shared = cn(fill && "object-cover", className);
  const style = objectPosition ? { objectPosition } : undefined;

  if (!fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={className} style={style} />
    );
  }

  if (canOptimize(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={shared}
        style={style}
      />
    );
  }

  return (
    // Supabase y otros hosts: sin /_next/image para evitar timeouts con fotos pesadas.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn(fill && "absolute inset-0 h-full w-full object-cover", shared)}
      style={style}
    />
  );
}
