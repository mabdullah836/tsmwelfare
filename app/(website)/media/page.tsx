    "use client"

    import { useState, useEffect, useMemo } from "react"
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
    import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"
    import { NoRecords } from '@/components/ui/no-records'
    import { Skeleton } from "@/components/ui/skeleton"
    import type { Media } from '@/lib/types/media'
    import { getMedia } from '@/lib/services/media'
    import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
    import { motion, AnimatePresence } from 'framer-motion'
    import { DialogHeader, DialogTitle } from '@/components/ui/dialog'
    import { X } from 'lucide-react'
    import { getYouTubeId } from "@/lib/utils/format"

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
      const pageSize = 12

      useEffect(() => {
        setPage(1)
      }, [searchQuery, activeTab])

      useEffect(() => {
        (async () => {
          setLoading(true)
          try {
            const data = await getMedia("general")
            setMediaItems(data)
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load media')
          } finally {
            setLoading(false)
          }
        })()
      }, [])


      const images = useMemo(() => mediaItems.filter(item => item.type === 'image'), [mediaItems]);
      const videos = useMemo(() => mediaItems.filter(item => item.type === 'video' && (!item.status || item.status === 'approved')), [mediaItems]);

      const filteredMedia = useMemo(() => mediaItems?.filter(item => {
        if (!item) return false;
        const matchesSearch = item.title?.toLowerCase().includes(searchQuery?.toLowerCase() || '');
        const matchesType = item.type === activeTab;
        if (item.type === 'video' && item.status && item.status !== 'approved') return false;
        return matchesSearch && matchesType;
      }) || [], [mediaItems, searchQuery, activeTab]);

      const totalPages = Math.ceil(filteredMedia.length / pageSize);

      const paginatedMedia = useMemo(() => {
        return filteredMedia.slice((page - 1) * pageSize, page * pageSize);
      }, [filteredMedia, page, pageSize]);

      useEffect(() => {
        if (page > totalPages && totalPages > 0) {
          setPage(totalPages)
        }
      }, [page, totalPages])



      if (error) {
        return (
          <div className="container mx-auto py-8 px-4">
            <div className="text-center text-red-500 min-h-[400px] flex items-center justify-center">
              {error}
            </div>
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

          <div className="container mx-auto py-8 px-4">
            {alert && (
              <AlertMessage
                message={alert.message}
                type={alert.type}
                onClose={() => setAlert(null)}
              />
            )}
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Tabs value={activeTab} onValueChange={v => setActiveTab(v as 'image' | 'video')}>
                  <TabsList>
                    <TabsTrigger value="image" aria-label="Show images">
                      Images
                    </TabsTrigger>
                    <TabsTrigger value="video" aria-label="Show videos">
                      Videos
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search media..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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

              <div className="relative min-h-[200px]">
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-64 w-full rounded-lg" />
                    ))}
                  </div>
                ) : paginatedMedia.length === 0 ? (
                  <NoRecords
                    title={`No ${activeTab === 'image' ? 'Images' : 'Videos'} Found`}
                    description={`No ${activeTab === 'image' ? 'images' : 'videos'} match your current filters. Try adjusting your search or check back later.`}
                  />
                ) : (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab + view}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.25 }}
                      className="w-full"
                    >
                      {view === "grid" ? (
                        <div
                          className={activeTab === 'image'
                            ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'
                            : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'}
                        >
                          {paginatedMedia.map((item) => (
                            <Card
                              key={item._id}
                              className={cn(
                                "overflow-hidden group cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 h-full flex flex-col bg-white dark:bg-zinc-900 border border-muted/40",
                                activeTab === 'image' ? 'hover:ring-2 hover:ring-primary/30' : ''
                              )}
                              onClick={() => setSelectedItem(item)}
                              tabIndex={0}
                              aria-label={item.title}
                              role="button"
                              onKeyDown={e => { if (e.key === 'Enter') setSelectedItem(item) }}
                            >
                              <div className="relative aspect-video bg-muted overflow-hidden">
                                {activeTab === 'image' ? (
                                  <Image
                                    src={item.url}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    priority={false}
                                  />
                                ) : (
                                  <>
                                    <img
                                      src={item.thumbnail || '/placeholder-image.svg'}
                                      alt={item.title}
                                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded z-10 shadow">
                                      {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                                    </span>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <span className="bg-black/60 rounded-full p-3 flex items-center justify-center shadow-lg">
                                        <Play className="h-8 w-8 text-white" />
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                              <CardContent className="p-4">
                                {item.type === 'video' && (
                                  <div className="mb-2">
                                    <h3 className="font-medium truncate">{item.title}</h3>
                                  </div>
                                )}
                                <div className="flex items-center justify-between">
                                  <p className="text-sm text-muted-foreground">
                                    {item.createdAt ? formatDate(item.createdAt) : ''}
                                  </p>
                                </div>
                                {item.tag && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="bg-muted px-2 py-1 rounded text-xs">{item.tag}</span>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-4">
                          {paginatedMedia.map((item) => (
                            <Card
                              key={item._id}
                              className={cn(
                                "overflow-hidden group cursor-pointer transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 flex items-center bg-white dark:bg-zinc-900 border border-muted/40",
                                activeTab === 'image' ? 'hover:ring-2 hover:ring-primary/30' : ''
                              )}
                              onClick={() => setSelectedItem(item)}
                              tabIndex={0}
                              aria-label={item.title}
                              role="button"
                              onKeyDown={e => { if (e.key === 'Enter') setSelectedItem(item) }}
                            >
                              <div className="h-16 w-16 relative bg-muted rounded overflow-hidden flex-shrink-0">
                                {activeTab === 'image' ? (
                                  <Image
                                    src={item.url}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    sizes="64px"
                                    priority={false}
                                  />
                                ) : (
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                                    <Play className="h-8 w-8 text-muted-foreground" />
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0 p-4">
                                {item.type === 'video' && (
                                  <h3 className="font-medium truncate">{item.title}</h3>
                                )}
                                <p className="text-sm text-muted-foreground">
                                  {item.size ? item.size.replace('MB', '').trim() : 'N/A'} • {item.createdAt ? formatDate(item.createdAt) : ''}
                                </p>
                                {item.tag && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="bg-muted px-2 py-1 rounded text-xs">{item.tag}</span>
                                  </div>
                                )}
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
              {totalPages > 1 && (
                <Pagination className="mt-8 flex justify-center">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} isActive={page > 1} />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>{i + 1}</PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext onClick={() => setPage(p => Math.min(totalPages, p + 1))} isActive={page < totalPages} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>

            <UniversalDialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)} maxWidth="max-w-4xl p-0">
              <DialogHeader className="p-4 border-b">
                <DialogTitle>Media</DialogTitle>
              </DialogHeader>
              {selectedItem?.type === 'image' && (
                <div className="relative aspect-video">
                  <Image
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
              {selectedItem?.type === 'video' && (
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  {/^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(selectedItem.url) ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${getYouTubeId(selectedItem.url)}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : /^https?:\/\/(www\.)?facebook\.com\//.test(selectedItem.url) ? (
                    <iframe
                      src={selectedItem.url}
                      title="Facebook video player"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  ) : (
                    <div className="text-white p-8">Invalid video URL</div>
                  )}
                </div>
              )}
              <div className="p-4">
                {selectedItem?.type === 'video' && (
                  <h2 className="text-xl font-semibold mb-1">{selectedItem?.title}</h2>
                )}
                <p className="text-sm text-muted-foreground mb-2">
                  {selectedItem && formatDate(selectedItem.createdAt || '')}
                </p>
                {selectedItem?.tag && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="bg-muted px-2 py-1 rounded text-xs">{selectedItem.tag}</span>
                  </div>
                )}
              </div>
            </UniversalDialog>
          </div>
        </>
      )
    }


