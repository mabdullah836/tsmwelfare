"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon, Play, Download, Grid, List, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UniversalDialog } from '@/components/modals/UniversalDialog'
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/utils/format"
import Image from "next/image"
import { AlertMessage } from "@/components/ui/alert-message"
import { Pagination } from "@/components/ui/pagination"
import type { Media } from '@/lib/types/media'
import { getMedia } from '@/lib/services/media'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion, AnimatePresence } from 'framer-motion'
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getYouTubeId } from "@/lib/utils/format"
import { useDebounce } from '@/lib/hooks/use-debounce'
import { AdminGrid } from "@/components/shared/AdminGrid"
import { Skeleton } from "@/components/ui/skeleton"
import { AspectRatio } from "@/components/ui/aspect-ratio"

const MediaCard = ({ 
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

const MediaSkeleton = ({ view }: { view: "grid" | "list" }) => {
  return view === 'grid' ? (
    <div className="space-y-3">
      <Skeleton className="aspect-video rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  ) : (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-24 w-24 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}

export default function MediaPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image')
  const [searchQuery, setSearchQuery] = useState("")
  const [mediaItems, setMediaItems] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<Media | null>(null)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1, limit: 24 })
  const debouncedSearch = useDebounce(searchQuery, 400)

  const fetchMedia = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getMedia({ 
        page, 
        limit: meta.limit, 
        q: debouncedSearch, 
        folder: 'general'
      })
      
      setMediaItems(res.data)
      setMeta(res.meta)
      setError(null)
    } catch (err) {
      setMediaItems([])
      setMeta({ total: 0, page: 1, pages: 1, limit: 24 })
      setError(err instanceof Error ? err.message : 'Failed to load media')
    } finally {
      setLoading(false)
    }
  }, [page, meta.limit, debouncedSearch])

  useEffect(() => {
    fetchMedia()
  }, [fetchMedia])

  useEffect(() => {
    if (page > meta.pages && meta.pages > 0) {
      setPage(meta.pages)
    }
  }, [page, meta.pages])

  const filteredMedia = useMemo(() => {
    return mediaItems.filter(item => {
      const matchesSearch = item.title?.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchesType = item.type === activeTab
      const isApprovedVideo = item.type !== 'video' || !item.status || item.status === 'approved'
      return matchesSearch && matchesType && isApprovedVideo
    })
  }, [mediaItems, debouncedSearch, activeTab])

  const handleItemClick = useCallback((item: Media) => {
    setSelectedItem(item)
  }, [])

  if (error) {
    return (
      <div className="container py-8">
        <AlertMessage
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      </div>
    )
  }

  return (
    <>
      <PageHeader title="Media Gallery">
        <p className="text-xl text-white/90">
          Browse through our collection of images and videos showcasing our work and impact in the community.
        </p>
      </PageHeader>

      <div className="container py-8 min-h-[70vh]">
        <AnimatePresence>
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AlertMessage
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-6 pb-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Tabs value={activeTab} onValueChange={v => setActiveTab(v as 'image' | 'video')}>
              <TabsList>
                <TabsTrigger value="image">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Images
                </TabsTrigger>
                <TabsTrigger value="video">
                  <Play className="w-4 h-4 mr-2" />
                  Videos
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                className="pl-9"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab === 'image' ? 'images' : 'videos'}...`}
                aria-label="Search media"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={view === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("grid")}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setView("list")}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <AdminGrid
            items={filteredMedia}
            loading={loading}
            emptyState={{ 
              title: `No ${activeTab === 'image' ? 'Images' : 'Videos'} Found`, 
              description: `Try adjusting your search or check back later for new content.`
            }}
            skeletonItems={meta.limit}
            gridClassName={cn(
              view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4',
              filteredMedia.length <= 3 ? 'pb-12' : ''
            )}
            renderItem={(item) => (
              <MediaCard 
                item={item} 
                view={view} 
                activeTab={activeTab}
                onClick={() => handleItemClick(item)}
              />
            )}
            renderSkeleton={() => <MediaSkeleton view={view} />}
          />

          {meta.pages > 1 && (
            <Pagination className="mt-8 flex gap-2">
              <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="gap-1 pl-2.5"
              >
                Previous
              </Button>
              {Array.from({ length: Math.min(5, meta.pages) }, (_, i) => {
                const pageNum = page <= 3 ? i + 1 : 
                              page >= meta.pages - 2 ? meta.pages - 4 + i : 
                              page - 2 + i
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "default" : "outline"}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </Button>
                )
              })}
              <Button
                variant="outline"
                disabled={page === meta.pages}
                onClick={() => setPage(p => Math.min(meta.pages, p + 1))}
                className="gap-1 pr-2.5"
              >
                Next
              </Button>
            </Pagination>
          )}
        </div>

        <UniversalDialog 
          open={!!selectedItem} 
          onOpenChange={() => setSelectedItem(null)} 
          className="max-w-4xl p-0 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {selectedItem && (
              <motion.div
                key={selectedItem._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <DialogHeader className="p-4 border-b">
                  <DialogTitle>{selectedItem.title}</DialogTitle>
                </DialogHeader>
                
                {selectedItem.type === 'image' ? (
                  <AspectRatio ratio={16/9}>
                    <Image
                      src={selectedItem.url}
                      alt={selectedItem.title}
                      fill
                      className="object-contain"
                      priority
                    />
                  </AspectRatio>
                ) : (
                  <AspectRatio ratio={16/9} className="bg-black">
                    {/youtube|youtu\.be/.test(selectedItem.url) ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeId(selectedItem.url)}?autoplay=1`}
                        title={selectedItem.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    ) : (
                      <video
                        src={selectedItem.url}
                        controls
                        autoPlay
                        className="w-full h-full"
                      />
                    )}
                  </AspectRatio>
                )}
                
                <div className="p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Uploaded: {formatDate(selectedItem?.createdAt || '')}
                  </p>
                  {selectedItem.tag && (
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-muted px-2 py-1 rounded text-xs">{selectedItem.tag}</span>
                    </div>
                  )}
                  <div className="flex justify-end gap-2 pt-2">
                    <Button variant="outline" size="sm" asChild>
                      <a href={selectedItem.url} download target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </UniversalDialog>
      </div>
    </>
  )
}