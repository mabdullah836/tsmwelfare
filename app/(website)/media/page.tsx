"use client"

import { useState, useEffect, useMemo } from "react"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Image as ImageIcon, Play, Download, Grid, List, Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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


export default function MediaPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filterType, setFilterType] = useState("all")
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
  }, [searchQuery, filterType])

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

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.message || 'Failed to delete media')
      }

      setMediaItems(prev => prev.filter(item => item._id !== id))
      setAlert({
        message: "Media deleted successfully",
        type: "success"
      })
    } catch (error) {
      console.error('Delete failed:', error)
      setAlert({
        message: error instanceof Error ? error.message : "Failed to delete media",
        type: "error"
      })
    }
  }

  const filteredMedia = useMemo(() => mediaItems?.filter(item => {
    if (!item) return false;
    if (item.status && item.status !== 'approved') return false;
    const matchesSearch = item.title?.toLowerCase().includes(searchQuery?.toLowerCase() || '');
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  }) || [], [mediaItems, searchQuery, filterType]);

  const totalPages = Math.ceil(filteredMedia.length / pageSize);
  
  const paginatedMedia = useMemo(() => {
    return filteredMedia.slice((page - 1) * pageSize, page * pageSize);
  }, [filteredMedia, page, pageSize]);

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

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
          <div className="flex items-center gap-2">
            <Select
              value={filterType}
              onValueChange={setFilterType}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search media..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant={view === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setView("list")}
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
              title="No Media Found" 
              description="No media items match your current filters. Try adjusting your search or filter criteria."
            />
          ) : (
            <>
              <div className="w-full">
                {view === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {paginatedMedia.map((item) => (
                      <Card 
                        key={item._id}
                        className={cn(
                          "overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg h-full flex flex-col"
                        )}
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="relative aspect-video bg-muted overflow-hidden">
                          {item.type === 'image' ? (
                            <Image
                              src={item.url}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <>
                              <img
                                src={item.thumbnail || '/placeholder-image.svg'}
                                alt={item.title}
                                className="object-cover w-full h-full"
                              />
                              <span className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded z-10 shadow">
                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                              </span>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-primary rounded-full p-3 flex items-center justify-center shadow-lg">
                                  <Play className="h-8 w-8 text-primary-foreground" />
                                </span>
                              </div>
                            </>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="mb-2">
                            <h3 className="font-medium truncate">{item.title}</h3>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                              {item.createdAt ? formatDate(item.createdAt) : ''}
                            </p>
                          </div>
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
                          "overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg flex items-center"
                        )}
                        onClick={() => setSelectedItem(item)}
                      >
                        <div className="h-16 w-16 relative bg-muted rounded overflow-hidden flex-shrink-0">
                          {item.type === 'image' ? (
                            <Image
                              src={item.url}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                              <Play className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 p-4">
                          <h3 className="font-medium truncate">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.size ? item.size.replace('MB', '').trim() : 'N/A'} • {item.createdAt ? formatDate(item.createdAt) : ''}
                          </p>
                        </div>
                        <Button size="icon" variant="secondary">
                          <Download className="h-4 w-4" />
                        </Button>
                      </Card>
                    ))}
                  </div>
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
            </>
          )}
        </div>
      </div>

      <UniversalDialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)} maxWidth="max-w-4xl p-0">
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
          <h2 className="text-xl font-semibold mb-1">{selectedItem?.title}</h2>
          <p className="text-sm text-muted-foreground">
            {selectedItem?.size?.replace('MB', '').trim()} • {selectedItem && formatDate(selectedItem.createdAt || '')}
          </p>
          {selectedItem?.description && <div className="mt-2 text-sm">{selectedItem.description}</div>}
        </div>
      </UniversalDialog>
      </div>
    </>
  )
}

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/]\S{11})/);
  return match ? match[1] : '';
}
