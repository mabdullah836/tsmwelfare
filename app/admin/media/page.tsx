"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Image, Upload, Grid, List, Search, AlertCircle, Trash2 } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/utils/format"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { AlertMessage } from "@/components/ui/alert-message"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"
import { FixedSizeGrid as RWGrid, FixedSizeList as RWList, GridChildComponentProps, ListChildComponentProps } from 'react-window';
import { fetchMedia, uploadMedia, deleteMedia } from '@/lib/services/media'
import type { Media } from '@/lib/types/media'
import { NoRecords } from '@/components/ui/no-records'
  
export default function MediaPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filterType, setFilterType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [mediaItems, setMediaItems] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
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
        const items = await fetchMedia('general')
        setMediaItems(items)
        setAlert({ message: `Successfully loaded ${items.length} media items`, type: 'success' })
      } catch (error) {
        setAlert({ message: error instanceof Error ? error.message : 'Failed to load media items', type: 'error' })
        setMediaItems([])
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files?.length) return
    setUploading(true)
    setError(null)
    try {
      await uploadMedia(Array.from(files), 'general')
      const items = await fetchMedia('general')
      setMediaItems(items)
      event.target.value = ''
      setAlert({ message: `Successfully uploaded ${files.length} file${files.length > 1 ? 's' : ''} to general folder`, type: 'success' })
    } catch (error) {
      setError('Failed to upload files. Please try again.')
      setAlert({ message: error instanceof Error ? error.message : 'Failed to upload files', type: 'error' })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMedia(id)
      setMediaItems(prev => prev.filter(item => item._id !== id))
      setAlert({ message: 'Media item has been permanently removed', type: 'success' })
    } catch (error) {
      setAlert({ message: error instanceof Error ? error.message : 'Failed to delete media item', type: 'error' })
    }
  }

  const filteredMedia = useMemo(() => mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || item.type === filterType
    return matchesSearch && matchesType
  }), [mediaItems, searchQuery, filterType])

  const stats = useMemo(() => ({
    total: mediaItems.length,
    images: mediaItems.filter(item => item.type === 'image').length,
    videos: mediaItems.filter(item => item.type === 'video').length,
    totalSize: mediaItems.reduce((acc, item) => {
      const size = parseFloat(String(item.size ?? ''))
      return isNaN(size) ? acc : acc + size
    }, 0)
  }), [mediaItems])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const totalPages = Math.ceil(filteredMedia.length / pageSize)
  
  const paginatedMedia = useMemo(() => {
    return filteredMedia.slice((page - 1) * pageSize, page * pageSize)
  }, [filteredMedia, page, pageSize])

  useEffect(() => {
    if (page > totalPages && totalPages > 0) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const MediaGridCell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    const index = rowIndex * 4 + columnIndex;
    if (index >= paginatedMedia.length) return null;
    const item = paginatedMedia[index];
    return (
      <div style={style} key={item._id}>
        <Card className={cn("overflow-hidden")}>
          <div className="aspect-video relative bg-muted">
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.endsWith('/placeholder-image.svg')) {
                    target.src = '/placeholder-image.svg';
                  }
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>
          <CardHeader className="p-4">
            <CardTitle className="text-sm">{item.title}</CardTitle>
            <CardDescription>{formatDate(item.createdAt || '')}</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{String(item.size ?? '')}</span>
              <div className="flex items-center gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(item._id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Media</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this media file? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(item._id!)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const MediaListRow = ({ index, style }: ListChildComponentProps) => {
    const item = paginatedMedia[index];
    return (
      <div style={style} key={item._id} className="mb-4 px-2">
        <Card className={cn("overflow-hidden flex items-center p-4")}>
          <div className="h-16 w-16 relative bg-muted rounded overflow-hidden flex-shrink-0">
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt={item.title}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (!target.src.endsWith('/placeholder-image.svg')) {
                    target.src = '/placeholder-image.svg';
                  }
                }}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0 p-4">
            <h3 className="font-medium truncate">{item.title}</h3>
            <p className="text-sm text-muted-foreground">
              {String(item.size ?? '')} • {formatDate(item.createdAt || '')}
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(item._id!)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Media</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this media file? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(item._id!)}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen ">
      <div className="container space-y-8 py-8">
        {alert && (
          <AlertMessage
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Media Library</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Files</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Images</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.images}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Videos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.videos}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Size</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatFileSize(stats.totalSize * 1024 * 1024)}</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-1 items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search media files..." 
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="image">Images</SelectItem>
                    <SelectItem value="video">Videos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button 
                        variant={view === "grid" ? "default" : "outline"} 
                        size="icon"
                        onClick={() => setView("grid")}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Grid view</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button 
                        variant={view === "list" ? "default" : "outline"} 
                        size="icon"
                        onClick={() => setView("list")}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>List view</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleUpload}
                    disabled={uploading}
                  />
                  <label htmlFor="file-upload">
                    <Button 
                      type="button"
                      disabled={uploading}
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {uploading ? 'Uploading...' : 'Upload Files'}
                    </Button>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {paginatedMedia.length === 0 && !loading ? (
          <NoRecords title="No media items found" description={searchQuery || filterType !== 'all' ? 'Try adjusting your filters or search terms' : 'Upload your first media file to get started'} />
        ) : (
          <div className="relative min-h-[200px]">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  <p className="text-muted-foreground">Loading media items...</p>
                </div>
              </div>
            )}
            {!loading && (
              <>
                <div className={view === "grid" ? "gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : undefined}>
                  {view === "grid" ? (
                    <RWGrid
                      columnCount={4}
                      columnWidth={300}
                      height={800}
                      rowCount={Math.ceil(paginatedMedia.length / 4)}
                      rowHeight={340}
                      width={1200}
                    >
                      {MediaGridCell}
                    </RWGrid>
                  ) : (
                    <RWList
                      height={800}
                      itemCount={paginatedMedia.length}
                      itemSize={120}
                      width={1200}
                    >
                      {MediaListRow}
                    </RWList>
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
        )}
      </div>
    </div>
  )
} 