"use client"

import { useState, useEffect } from "react"
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
import { AdminHeader } from "@/components/layout/admin-header"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/utils/format"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { AlertMessage } from "@/components/ui/alert-message"
  
interface MediaItem {
  _id: string;
  name: string;
  title: string;
  description?: string;
  type: 'image' | 'video';
  url: string;
  size: string;
  publicId: string;
  folder?: string;
  createdAt: string;
}

export default function MediaPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filterType, setFilterType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      setError(null)
      setAlert({
        message: "Fetching media items...",
        type: "success"
      })
      const response = await fetch('/api/media?folder=general')
      if (!response.ok) throw new Error('Failed to fetch media')
      const data = await response.json()
      const generalMedia = data.filter((item: MediaItem) => item.folder === 'general' || !item.folder)
      setMediaItems(generalMedia)
      setAlert({
        message: `Successfully loaded ${generalMedia.length} media items`,
        type: "success"
      })
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Failed to load media items",
        type: "error"
      })
      setMediaItems([])
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files?.length) return

    setUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      Array.from(files).forEach(file => {
        formData.append('files', file)
      })

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'folder': 'general',
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Upload failed')
      }
      
      await fetchMedia()
      event.target.value = ''
      setAlert({
        message: `Successfully uploaded ${files.length} file${files.length > 1 ? 's' : ''} to general folder`,
        type: "success"
      })
    } catch (error) {
      console.error('Upload failed:', error)
      setError('Failed to upload files. Please try again.')
      setAlert({
        message: error instanceof Error ? error.message : "Failed to upload files",
        type: "error"
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/media/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete media')
      }

      setMediaItems(prev => prev.filter(item => item._id !== id))
      setAlert({
        message: "Media item has been permanently removed",
        type: "success"
      })
    } catch (error) {
      setAlert({
        message: error instanceof Error ? error.message : "Failed to delete media item",
        type: "error"
      })
    }
  }

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || item.type === filterType
    return matchesSearch && matchesType
  })

  const stats = {
    total: mediaItems.length,
    images: mediaItems.filter(item => item.type === 'image').length,
    videos: mediaItems.filter(item => item.type === 'video').length,
    totalSize: mediaItems.reduce((acc, item) => {
      const size = parseFloat(item.size)
      return isNaN(size) ? acc : acc + size
    }, 0)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader />
      
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

        {loading ? (
          <div className="flex items-center justify-center h-[200px]">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <p className="text-muted-foreground">Loading media items...</p>
            </div>
          </div>
        ) : filteredMedia.length === 0 ? (
          <Card className="flex items-center justify-center h-[200px] border-dashed">
            <CardContent className="text-center">
              <Image className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-3" />
              <h3 className="font-medium mb-1">No media items found</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchQuery || filterType !== 'all'
                  ? 'Try adjusting your filters or search terms'
                  : 'Upload your first media file to get started'}
              </p>
              <div className="relative inline-block">
                <input
                  type="file"
                  id="empty-state-upload"
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
                <Button 
                  asChild
                  variant="outline"
                  disabled={uploading}
                >
                  <label htmlFor="empty-state-upload" className="cursor-pointer">
                    <Upload className="mr-2 h-4 w-4" />
                    {uploading ? 'Uploading...' : 'Upload Files'}
                  </label>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                Showing {filteredMedia.length} of {mediaItems.length} items
              </p>
            </div>
            <div className={cn(
              "grid gap-6",
              view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            )}>
              {filteredMedia.map((item) => (
                <Card key={item._id} className={cn(
                  "overflow-hidden",
                  view === "list" && "flex items-center"
                )}>
                  {view === "grid" ? (
                    <>
                      <div className="aspect-video relative bg-muted">
                        {item.type === 'image' ? (
                          // eslint-disable-next-line @next/next/no-img-element
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
                        <CardDescription>{formatDate(item.createdAt)}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">{item.size}</span>
                          <div className="flex items-center gap-2">
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Media</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this media? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    className="bg-red-500 hover:bg-red-600"
                                    onClick={() => handleDelete(item._id)}
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </>
                  ) : (
                    <div className="flex w-full items-center gap-4 p-4">
                      <div className="h-12 w-12 relative bg-muted rounded flex-shrink-0">
                        {item.type === 'image' ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.url}
                            alt={item.title}
                            className="absolute inset-0 h-full w-full object-cover rounded"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (!target.src.endsWith('/placeholder-image.svg')) {
                                target.src = '/placeholder-image.svg';
                              }
                            }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Image className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.size} • {formatDate(item.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Media</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this media? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
} 