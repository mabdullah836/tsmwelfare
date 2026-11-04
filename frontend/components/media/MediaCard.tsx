import { ImageIcon, Play } from "lucide-react";
import Image from "next/image";
import type { Media } from '@/lib/types/media';
import { cn } from "@/lib/utils/cn";
import { formatDate } from "@/lib/utils/format";

export const MediaCard = ({
  item,
  view,
  activeTab,
  onClick
}: {
  item: Media,
  view: "grid" | "list",
  activeTab: 'image' | 'video',
  onClick: () => void
}) => {
  const thumb = activeTab === 'image' ? item.url : item.thumbnail
  const preview = (
    <>
      {thumb ? (
        <Image
          src={thumb}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes={view === 'grid' ? "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" : "96px"}
        />
      ) : (
        <div className="flex h-full items-center justify-center bg-accent text-primary/60" aria-hidden>
          <ImageIcon className="h-8 w-8" />
        </div>
      )}
      {activeTab === 'video' && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/20" aria-hidden>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 text-primary shadow-lg transition-transform group-hover:scale-110">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        </span>
      )}
    </>
  )

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View ${item.title}`}
      className={cn(
        "group w-full overflow-hidden rounded-2xl border bg-card text-left shadow-sm transition-shadow hover:shadow-md",
        view === 'grid' ? 'flex h-full flex-col' : 'flex items-center'
      )}
    >
      {view === 'grid' ? (
        <>
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">{preview}</div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className="line-clamp-2 font-semibold">{item.title}</h3>
            <div className="mt-auto flex flex-wrap items-center gap-2 pt-2 text-xs text-muted-foreground">
              {item.createdAt && <span>{formatDate(item.createdAt)}</span>}
              {item.tag && <span className="rounded-full bg-muted px-2 py-0.5">{item.tag}</span>}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-muted">{preview}</div>
          <div className="min-w-0 flex-1 p-4">
            <h3 className="truncate font-semibold">{item.title}</h3>
            <p className="truncate text-sm text-muted-foreground">
              {item.size ? item.size.replace('MB', '').trim() : 'N/A'} • {item.createdAt ? formatDate(item.createdAt) : ''}
            </p>
            {item.tag && <span className="mt-1 inline-block rounded-full bg-muted px-2 py-0.5 text-xs">{item.tag}</span>}
          </div>
        </>
      )}
    </button>
  )
}
