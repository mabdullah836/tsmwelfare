import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CustomImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  badgeText?: string;
  height?: string;
  width?: string;
  fill?: boolean;
  overlay?: boolean;
}

export function CustomImage({
  src,
  alt,
  className = "",
  priority = false,
  badgeText,
  height,
  width,
  fill = true,
  overlay = true,
}: CustomImageProps) {
  return (
    <Card className={`relative overflow-hidden border-0 shadow-2xl ${className}`}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          height={height ? parseInt(height) : undefined}
          width={width ? parseInt(width) : undefined}
          className="object-cover"
          priority={priority}
        />
      )}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      )}
      {badgeText && (
        <div className="absolute bottom-6 left-6">
          <Badge variant="secondary" className="bg-black/50 text-white border-0">
            {badgeText}
          </Badge>
        </div>
      )}
    </Card>
  );
}