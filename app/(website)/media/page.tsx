"use client"

import { useState, useMemo, useCallback } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon, Play, Download, Grid, List, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UniversalDialog } from '@/components/modals/UniversalDialog'
import { cn } from "@/lib/utils/cn"
import { formatDate } from "@/lib/utils/format"
import Image from "next/image"
import { AlertMessage } from "@/components/ui/alert-message"
import { Pagination } from "@/components/ui/pagination"
import type { Media } from '@/lib/types/media'
import { useMedia } from '@/lib/hooks/useMedia';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion, AnimatePresence } from 'framer-motion'
import { MediaCard } from '@/components/media/MediaCard';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { getYouTubeId } from "@/lib/utils/format"
import { useDebounce } from '@/lib/hooks/use-debounce'
import { AdminGrid } from "@/components/shared/AdminGrid"
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function MediaPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image')
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItem, setSelectedItem] = useState<Media | null>(null)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(searchQuery, 400)

  // SWR hook for media
  const { media, meta, isLoading, isError } = useMedia({ page, limit: 24, q: debouncedSearch, folder: 'general' });

  // Filtered media logic
  const filteredMedia = useMemo(() => {
    return media.filter((item: Media) => {
      const matchesSearch = item.title?.toLowerCase().includes(debouncedSearch.toLowerCase())
      const matchesType = item.type === activeTab
      const isApprovedVideo = item.type !== 'video' || !item.status || item.status === 'approved'
      return matchesSearch && matchesType && isApprovedVideo
    })
  }, [media, debouncedSearch, activeTab])

  const handleItemClick = useCallback((item: Media) => {
    setSelectedItem(item)
  }, [])

  if (isError) {
    return (
      <div className="container py-8">
        <AlertMessage
          message={isError.message || 'Failed to load media'}
          type="error"
          onClose={() => setAlert(null)}
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
            loading={isLoading}
            emptyState={{ 
              title: `No ${activeTab === 'image' ? 'Images' : 'Videos'} Found`, 
              description: `Try adjusting your search or check back later for new content.`
            }}
            gridClassName={cn(
              view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4',
              filteredMedia.length <= 3 ? 'pb-12' : ''
            )}
            renderItem={(item: Media) => (
              <MediaCard 
                key={item?._id}
                item={item} 
                view={view} 
                activeTab={activeTab}
                onClick={() => handleItemClick(item)}
              />
            )}
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