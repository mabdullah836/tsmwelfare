"use client"

import { useState, useMemo, useCallback } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon, Play, Download, Grid, List, Search, Clock, Tag } from "lucide-react"
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

        <div className="space-y-8 pb-12">
          <motion.div 
            className="bg-gradient-to-r from-card/50 to-card/30 backdrop-blur-sm rounded-2xl p-6 border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="space-y-4">
                <Tabs value={activeTab} onValueChange={v => setActiveTab(v as 'image' | 'video')}>
                  <TabsList className="grid w-full grid-cols-2 lg:w-auto">
                    <TabsTrigger value="image" className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">Images</span>
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      <span className="hidden sm:inline">Videos</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    className="pl-10 pr-4 h-11 bg-background/50 border-border/50 focus:bg-background transition-colors"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={`Search ${activeTab === 'image' ? 'images' : 'videos'}...`}
                    aria-label="Search media"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-sm text-muted-foreground hidden sm:block">
                  {filteredMedia.length} {activeTab === 'image' ? 'images' : 'videos'} found
                </div>
                <div className="flex items-center gap-2 bg-background/50 rounded-lg p-1">
                  <Button
                    variant={view === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setView("grid")}
                    aria-label="Grid view"
                    className="h-8 w-8 p-0"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={view === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setView("list")}
                    aria-label="List view"
                    className="h-8 w-8 p-0"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AdminGrid
              items={filteredMedia}
              loading={isLoading}
              emptyState={{ 
                title: `No ${activeTab === 'image' ? 'Images' : 'Videos'} Found`, 
                description: `Try adjusting your search or check back later for new content.`
              }}
              gridClassName={cn(
                view === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6' 
                  : 'flex flex-col gap-3',
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
          </motion.div>

          {meta.pages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Pagination className="mt-12 flex justify-center">
                <div className="flex items-center gap-2 bg-card/50 backdrop-blur-sm rounded-xl p-2 border border-border/50">
                  <Button
                    variant="ghost"
                    disabled={page === 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    className="gap-1 pl-2.5 disabled:opacity-50"
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
                        variant={page === pageNum ? "default" : "ghost"}
                        onClick={() => setPage(pageNum)}
                        className={cn(
                          "w-10 h-10",
                          page === pageNum && "bg-primary text-primary-foreground shadow-lg"
                        )}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                  <Button
                    variant="ghost"
                    disabled={page === meta.pages}
                    onClick={() => setPage(p => Math.min(meta.pages, p + 1))}
                    className="gap-1 pr-2.5 disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              </Pagination>
            </motion.div>
          )}
        </div>

        <UniversalDialog 
          open={!!selectedItem} 
          onOpenChange={() => setSelectedItem(null)} 
          className="max-w-5xl p-0 overflow-hidden rounded-2xl border-0 shadow-2xl"
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
                <DialogHeader className="p-6 border-b bg-gradient-to-r from-card to-card/80">
                  <DialogTitle className="text-xl font-semibold">{selectedItem.title}</DialogTitle>
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
                
                <div className="p-6 space-y-4 bg-gradient-to-b from-card/50 to-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Uploaded: {formatDate(selectedItem?.createdAt || '')}</span>
                      </div>
                      {selectedItem.tag && (
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <span className="bg-gradient-to-r from-primary/10 to-primary/5 text-primary px-3 py-1 rounded-full text-xs font-medium border border-primary/20">
                            {selectedItem.tag}
                          </span>
                        </div>
                      )}
                    </div>
                    <Button variant="outline" size="sm" asChild className="gap-2">
                      <a href={selectedItem.url} download target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4" />
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