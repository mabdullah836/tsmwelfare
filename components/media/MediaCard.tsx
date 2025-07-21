import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import Image from "next/image";
import { motion } from 'framer-motion';
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
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      className={view === 'grid' ? 'h-full' : ''}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card
        className={cn(
          "overflow-hidden group cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 border border-muted/40 bg-card",
          view === 'grid' ? 'h-full flex flex-col' : 'flex items-center',
          activeTab === 'image' ? 'hover:ring-2 hover:ring-primary/30' : '',
          'mb-4'
        )}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`View ${item.title}`}
        onKeyDown={e => e.key === 'Enter' && onClick()}
      >
        {view === 'grid' ? (
          <>
            <div className="relative aspect-video bg-muted overflow-hidden">
              {activeTab === 'image' ? (
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
              ) : (
                <>
                  <Image
                    src={item.thumbnail || '/placeholder-video.svg'}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="bg-primary/90 rounded-full p-3 flex items-center justify-center shadow-lg">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </>
              )}
            </div>
            <CardContent className="p-4 flex-1 flex flex-col">
              <h3 className="font-medium line-clamp-2 mb-2">{item.title}</h3>
              <div className="mt-auto space-y-1">
                <p className="text-sm text-muted-foreground">
                  {item.createdAt ? formatDate(item.createdAt) : ''}
                </p>
                {item.tag && (
                  <div className="flex flex-wrap gap-1">
                    <span className="bg-muted px-2 py-1 rounded text-xs">{item.tag}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </>
        ) : (
          <>
            <div className="relative h-24 w-24 flex-shrink-0 bg-muted">
              {activeTab === 'image' ? (
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                  priority={false}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                  <Play className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <CardContent className="p-4 flex-1 min-w-0">
              <h3 className="font-medium truncate">{item.title}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {item.size ? item.size.replace('MB', '').trim() : 'N/A'} • {item.createdAt ? formatDate(item.createdAt) : ''}
              </p>
              {item.tag && (
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="bg-muted px-2 py-1 rounded text-xs">{item.tag}</span>
                </div>
              )}
            </CardContent>
          </>
        )}
      </Card>
    </motion.div>
  )
} 