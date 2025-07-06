"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, Grid, List, Search, AlertCircle } from "lucide-react"
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
import { formatDate } from "@/lib/utils/format"
import { AlertMessage } from "@/components/ui/alert-message"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination"
import { uploadMedia, deleteMedia, getMedia } from '@/lib/services/media'
import type { Media } from '@/lib/types/media'
import { NoRecords } from '@/components/ui/no-records'
import { Checkbox } from '@/components/ui/checkbox'
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal'
import { useSelection } from '@/lib/hooks/use-selection'
import { useBulkDelete } from '@/lib/hooks/use-bulk-delete'
import { usePaginationFilter } from '@/lib/hooks/use-pagination-filter'
import { AdminGrid } from "@/components/shared/AdminGrid"
import { AdminList } from "@/components/shared/AdminList"
  
export default function MediaPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filterType, setFilterType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [mediaItems, setMediaItems] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [mediaToDelete, setMediaToDelete] = useState<string | null>(null);
  const [deletingSingle, setDeletingSingle] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true)
      try {
        const items = await getMedia('general')
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
      const uploadedItems = await uploadMedia(Array.from(files), 'general')
      if (!Array.isArray(uploadedItems)) throw new Error('Invalid upload response')
      setMediaItems(prev => [...uploadedItems, ...prev]) 
  
      setAlert({
        message: `Successfully uploaded ${files.length} file${files.length > 1 ? 's' : ''} to general folder`,
        type: 'success',
      })
    } catch (error) {
      setError('Failed to upload files. Please try again.')
      setAlert({
        message: error instanceof Error ? error.message : 'Failed to upload files',
        type: 'error',
      })
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

  const handleDeleteWithModal = async () => {
    if (!mediaToDelete) return;
    setDeletingSingle(true);
    await handleDelete(mediaToDelete);
    setDeletingSingle(false);
    setMediaToDelete(null);
  };

  const {
    page,
    setPage,
    totalPages,
    paginated: paginatedMedia,
  } = usePaginationFilter<Media>(mediaItems, {
    pageSize: 12,
    searchValue: searchQuery,
    filterFn: (item, search) => item.title.toLowerCase().includes(search.toLowerCase()),
    extraFilters: { filterType },
    extraFilterFn: (item, { filterType }) => filterType === 'all' || item.type === filterType,
  });

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

  const selectableMedia = paginatedMedia.filter(item => typeof item._id === 'string') as { _id: string }[];
  const { selectedIds, setSelectedIds, allSelected, toggleSelectAll, toggleSelect } = useSelection(selectableMedia);

  const deleteMediaItems = async (ids: string[]) => {
    const response = await fetch('/api/media/bulk-delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    });
    const data = await response.json();
    if (response.ok && data.success) {
      setMediaItems(prev => prev.filter(item => !ids.includes(item._id!)));
      setSelectedIds([]);
      setAlert({ message: 'Selected media items deleted.', type: 'success' });
    } else {
      setAlert({ message: data.message || 'Failed to delete media items.', type: 'error' });
    }
  };
  const { showDeleteConfirm, setShowDeleteConfirm, deleting, handleBulkDelete } = useBulkDelete(deleteMediaItems, selectedIds);

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
        <div className="border rounded-lg px-4 py-3 mb-6 flex items-center w-full">
          <div className="flex-grow flex items-center">
            <div className="relative w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search media files..." 
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 ml-4">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
              </SelectContent>
            </Select>
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
           {selectedIds.length > 0 && (
                <div className="flex items-center gap-1 ml-2">
                  <div className="p-4 w-8 flex-shrink-0 flex items-center justify-center" role="columnheader">
                      <>
                        <label htmlFor="select-all-checkbox" className="sr-only">Select all</label>
                        <Checkbox
                          id="select-all-checkbox"
                          checked={allSelected}
                          onCheckedChange={toggleSelectAll}
                        />
                      </>
                  </div>
                </div>
              )}
            {selectedIds.length > 0 && (
              <Button
                variant="destructive"
                disabled={deleting}
                onClick={() => setShowDeleteConfirm(true)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
        <ConfirmDeleteModal
          open={showDeleteConfirm || !!mediaToDelete}
          title="Delete Media"
          description="Are you sure you want to delete the selected media file(s)? This action cannot be undone."
          loading={mediaToDelete ? deletingSingle : deleting}
          onCancel={() => {
            mediaToDelete ? setMediaToDelete(null) : setShowDeleteConfirm(false);
          }}
          onConfirm={mediaToDelete ? handleDeleteWithModal : handleBulkDelete}
        />
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {paginatedMedia.length === 0 && !loading ? (
          <NoRecords title="No media items found" description={searchQuery || filterType !== 'all' ? 'Try adjusting your filters or search terms' : 'Upload your first media file to get started'} />
        ) : (
          view === "grid" ? (
            <AdminGrid
              items={paginatedMedia}
              loading={loading}
              emptyState={{
                title: "No media items found",
                description: searchQuery || filterType !== 'all' ? 'Try adjusting your filters or search terms' : 'Upload your first media file to get started'
              }}
              pagination={totalPages > 1 && (
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
              renderItem={(media: Media) => {
                return (
                  <div key={media._id ?? ''} className="relative group">
                    <Checkbox
                      className="absolute top-2 left-2 z-10"
                      checked={selectedIds.includes(media._id ?? '')}
                      onCheckedChange={() => media._id && toggleSelect(media._id)}
                    />
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        {media.type === 'image' ? (
                          <img
                            src={media.url ?? ''}
                            alt={media.name ?? 'Media'}
                            className="object-cover w-full h-48"
                          />
                        ) : (
                          <video src={media.url ? media.url : ''} controls className="object-cover w-full h-48" />
                        )}
                      </CardContent>
                      <CardHeader className="p-4 flex flex-col gap-1">
                        <CardTitle className="text-base truncate">{media.name || 'Untitled'}</CardTitle>
                        <CardDescription className="truncate text-xs">{formatDate(media.createdAt || '')}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                );
              }}
            />
          ) : (
            <AdminList
              items={paginatedMedia}
              loading={loading}
              emptyState={{
                title: "No media items found",
                description: searchQuery || filterType !== 'all' ? 'Try adjusting your filters or search terms' : 'Upload your first media file to get started'
              }}
              pagination={totalPages > 1 && (
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
              renderItem={(media: Media) => {
                return (
                  <div key={media._id ?? ''} className="relative group flex items-center gap-4 border rounded-lg p-4">
                    <Checkbox
                      className="absolute top-2 left-2 z-10"
                      checked={selectedIds.includes(media._id ?? '')}
                      onCheckedChange={() => media._id && toggleSelect(media._id)}
                    />
                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded">
                      {media.type === 'image' ? (
                        <img
                          src={media.url ?? ''}
                          alt={media.name ?? 'Media'}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <video src={media.url ? media.url : ''} controls className="object-cover w-full h-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{media.name || 'Untitled'}</div>
                      <div className="text-xs text-muted-foreground truncate">{formatDate(media.createdAt || '')}</div>
                    </div>
                  </div>
                );
              }}
            />
          )
        )}
      </div>
    </div>
  )
} 