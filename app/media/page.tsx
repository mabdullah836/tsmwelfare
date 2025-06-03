"use client"

import { useState, useEffect } from "react"
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
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/utils/format"
import Image from "next/image"

interface MediaItem {
  _id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  size: string;
  createdAt: string;
}

export default function MediaPage() {
  const [view, setView] = useState<"grid" | "list">("grid")
  const [filterType, setFilterType] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      setError(null)
      const response = await fetch('/api/media')
      if (!response.ok) throw new Error('Failed to fetch media')
      const data = await response.json()
      setMediaItems(data)
    } catch (error) {
      console.error('Failed to fetch media:', error)
      setError('Failed to load media items. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredMedia = mediaItems.filter(item => {
    if (filterType !== "all" && item.type !== filterType) return false
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <p className="text-muted-foreground">Loading media items...</p>
          </div>
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
    <div className="container mx-auto py-8 px-4">
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

        {filteredMedia.length === 0 ? (
          <Card className="flex items-center justify-center h-[400px] border-dashed">
            <CardContent className="text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-3" />
              <h3 className="font-medium mb-1">No media items found</h3>
              <p className="text-sm text-muted-foreground">
                {searchQuery || filterType !== 'all' 
                  ? 'Try adjusting your filters or search terms'
                  : 'No media items available'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className={cn(
            "grid gap-6",
            view === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
          )}>
            {filteredMedia.map((item) => (
              <Card 
                key={item._id} 
                className={cn(
                  "overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg",
                  view === "list" && "flex items-center"
                )}
                onClick={() => setSelectedItem(item)}
              >
                {view === "grid" ? (
                  <>
                    <div className="aspect-video relative bg-muted overflow-hidden">
                      {item.type === 'image' ? (
                        <Image
                          src={item.url}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                          <Play className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-2 right-2">
                          <Button size="icon" variant="secondary">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <h3 className="font-medium truncate">{item.title}</h3>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          {formatDate(item.createdAt)}
                        </p>
                      </div>
                    </CardContent>
                  </>
                ) : (
                  <div className="flex w-full items-center gap-4 p-4">
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
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.size.replace('MB', '').trim()} • {formatDate(item.createdAt)}
                      </p>
                    </div>
                    <Button size="icon" variant="secondary">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0">
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
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-1">{selectedItem?.title}</h2>
            <p className="text-sm text-muted-foreground">
              {selectedItem?.size.replace('MB', '').trim()} • {selectedItem && formatDate(selectedItem.createdAt)}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
