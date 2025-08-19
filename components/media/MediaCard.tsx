import { Card, CardContent } from "@/components/ui/card";
import { Play, Clock, Tag } from "lucide-react";
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
          "overflow-hidden group cursor-pointer transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm",
          view === 'grid' ? 'h-full flex flex-col' : 'flex items-center',
          activeTab === 'image' ? 'hover:ring-2 hover:ring-primary/20 hover:shadow-primary/10' : 'hover:ring-2 hover:ring-blue-500/20 hover:shadow-blue-500/10',
          'mb-4 rounded-xl'
        )}
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-label={`View ${item.title}`}
        onKeyDown={e => e.key === 'Enter' && onClick()}
      >
        {view === 'grid' ? (
          <>
            <div className="relative aspect-video bg-gradient-to-br from-muted to-muted/60 overflow-hidden rounded-t-xl">
              <Image
                src={activeTab === 'image' ? item.url : (item.thumbnail || '/placeholder-video.svg')}
                alt={item.title}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />
              {activeTab === 'video' && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 flex items-center justify-center">
                  <motion.div 
                    className="bg-white/95 backdrop-blur-md rounded-full p-4 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:bg-primary group-hover:scale-110"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="h-8 w-8 text-primary group-hover:text-white fill-current" />
                  </motion.div>
                </div>
              )}
              <div className="absolute top-3 right-3">
                <div className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm",
                  activeTab === 'image' ? 'bg-green-500/80 text-white' : 'bg-blue-500/80 text-white'
                )}>
                  {activeTab === 'image' ? 'Image' : 'Video'}
                </div>
              </div>
            </div>
            <CardContent className="p-5 flex-1 flex flex-col">
              <h3 className="font-semibold text-lg line-clamp-2 mb-3 text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
              <div className="mt-auto space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{item.createdAt ? formatDate(item.createdAt) : 'Unknown date'}</span>
                </div>
                {item.tag && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20">
                      {item.tag}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </>
        ) : (
          <>
            <div className="relative h-24 w-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
              <Image
                src={activeTab === 'image' ? item.url : (item.thumbnail || '/placeholder-video.svg')}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="96px"
                priority={false}
              />
              {activeTab === 'video' && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Play className="h-4 w-4 fill-current" />
                  </div>
                </div>
              )}
            </div>
            <CardContent className="p-5 flex-1 min-w-0">
              <h3 className="font-semibold text-lg truncate mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{item.createdAt ? formatDate(item.createdAt) : 'Unknown date'}</span>
                  {item.size && (
                    <>
                      <span>•</span>
                      <span>{item.size.replace('MB', '').trim()} MB</span>
                    </>
                  )}
                </div>
                {item.tag && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20">
                      {item.tag}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </motion.div>
  )
} 