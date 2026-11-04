"use client"

import { useState, useMemo, useCallback } from "react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon, Play, Download, Grid, List, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { UniversalDialog } from '@/components/modals/UniversalDialog'
import { formatDate } from "@/lib/utils/format"
import Image from "next/image"
import { AlertMessage } from "@/components/ui/alert-message"
import { TablePagination } from "@/components/shared/TablePagination"
import type { Media } from '@/lib/types/media'
import { useMedia } from '@/lib/hooks/useMedia';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
      <PageHeader title="Media gallery" eyebrow="Our work in pictures">
        <p>Browse through our collection of images and videos showcasing our work and impact in the community.</p>
      </PageHeader>

      <div className="container min-h-[60vh] py-10 md:py-14">
        {alert && (
          <AlertMessage
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="space-y-8 pb-12">
          <div className="flex flex-col gap-3 rounded-2xl border bg-card p-3 shadow-sm sm:flex-row sm:items-center">
            <Tabs value={activeTab} onValueChange={v => setActiveTab(v as 'image' | 'video')}>
              <TabsList className="h-10 rounded-xl">
                <TabsTrigger value="image" className="gap-2 rounded-lg px-4">
                  <ImageIcon className="h-4 w-4" aria-hidden />
                  Images
                </TabsTrigger>
                <TabsTrigger value="video" className="gap-2 rounded-lg px-4">
                  <Play className="h-4 w-4" aria-hidden />
                  Videos
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                type="search"
                className="pl-9"
                value={searchQuery}
                onChange={e => { setSearchQuery(e.target.value); setPage(1) }}
                placeholder={`Search ${activeTab === 'image' ? 'images' : 'videos'}...`}
                aria-label="Search media"
              />
            </div>

            <div className="hidden items-center gap-1 rounded-xl bg-muted p-1 sm:flex">
              <Button
                variant={view === "grid" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setView("grid")}
                aria-label="Grid view"
                aria-pressed={view === "grid"}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={view === "list" ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setView("list")}
                aria-label="List view"
                aria-pressed={view === "list"}
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
            gridClassName={view === 'grid' ? 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'flex flex-col gap-3'}
            renderItem={(item: Media) => (
              <MediaCard
                key={item?.id}
                item={item}
                view={view}
                activeTab={activeTab}
                onClick={() => handleItemClick(item)}
              />
            )}
          />

          {meta.pages > 1 && (
            <TablePagination page={page} pages={meta.pages} total={meta.total} onPageChange={setPage} />
          )}
        </div>

        <UniversalDialog 
          open={!!selectedItem} 
          onOpenChange={() => setSelectedItem(null)} 
          className="max-w-4xl p-0 overflow-hidden"
        >
          {selectedItem && (
              <div key={selectedItem.id}>
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
              </div>
            )}
        </UniversalDialog>
      </div>
    </>
  )
}