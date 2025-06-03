"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Image, Upload, Grid, List, Search } from "lucide-react"
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
import { AdminHeader } from "@/components/layout/admin-header"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/utils/format"

interface MediaItem {
  _id: string;
  title: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  createdAt: string;
}

export default function MediaPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filterType, setFilterType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/media')
      const data = await response.json()
      setMediaItems(data)
    } catch (error) {
      console.error('Failed to fetch media:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredMedia = mediaItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || item.type === filterType
    return matchesSearch && matchesType
  })

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
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Media Library</h2>
          <p className="text-muted-foreground">
            Manage and organize your media files efficiently.
          </p>
        </div>

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
                    <SelectItem value="all">All Files</SelectItem>
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
                <Button onClick={() => console.log('Upload functionality will be implemented')}>
                  <Upload className="mr-2 h-4 w-4" /> Upload Files
                </Button>
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
              <Image className="mx-auto h-8 w-8 text-muted-foreground opacity-50 mb-3" />
              <p className="text-muted-foreground">No media items found</p>
            </CardContent>
          </Card>
        ) : (
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
                        <span className="text-sm text-muted-foreground">{formatFileSize(item.size)}</span>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
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
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{formatFileSize(item.size)} • {formatDate(item.createdAt)}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="flex-shrink-0">
                      View Details
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 