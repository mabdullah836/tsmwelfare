"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel } from "@/components/carousel"
import { Play, Download, Calendar, User, X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { NoRecords } from "@/components/ui/no-records"

// Add this after imports and before content definition
interface MediaItem {
  id: string
  title: string
  description: string
  url: string
  type: 'image' | 'video'
}

// Initialize empty content
const content: {
  images: MediaItem[]
  videos: MediaItem[]
} = {
  images: [],
  videos: []
}

export default function MediaPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  const allItems = [...content.images, ...content.videos]
  const filteredItems = selectedTab === "all" 
    ? allItems
    : selectedTab === "image" 
      ? content.images 
      : content.videos

  const carouselItems = content.images.map((item) => (
    <div key={item.id} className="relative h-[400px] w-full">
      <Image
        src={item.url}
        alt={item.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <p className="text-white/90">{item.description}</p>
        </div>
      </div>
    </div>
  ))

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Media Gallery</h1>
      
      {/* Media Tabs and Grid */}
      <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="all">All Media ({allItems.length})</TabsTrigger>
          <TabsTrigger value="image">Images ({content.images.length})</TabsTrigger>
          <TabsTrigger value="video">Videos ({content.videos.length})</TabsTrigger>
        </TabsList>

        <div className="mt-8">
          {selectedTab === "all" && allItems.length === 0 && (
            <NoRecords 
              title="No Media Available"
              description="There are no media items available at the moment."
            />
          )}
          {selectedTab === "image" && content.images.length === 0 && (
            <NoRecords 
              title="No Images Available"
              description="There are no images available at the moment."
            />
          )}
          {selectedTab === "video" && content.videos.length === 0 && (
            <NoRecords 
              title="No Videos Available"
              description="There are no videos available at the moment."
            />
          )}
          {filteredItems.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.url}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                    {item.type === 'video' && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-full bg-black/50 p-3">
                          <Play className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex h-full items-end p-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                        <p className="mt-1 text-sm text-gray-200">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Tabs>

      {/* Featured Media Carousel - Only show if there are images */}
      {content.images.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Featured Media</h2>
          <Carousel className="h-[400px]" items={carouselItems} />
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0">
          {selectedItem && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 z-10 bg-black/20 hover:bg-black/40 text-white"
                onClick={() => setSelectedItem(null)}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="relative h-[80vh]">
                <Image
                  src={selectedItem.url}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                  priority
                />
                {selectedItem.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="rounded-full bg-black/50 p-6 cursor-pointer hover:bg-black/70 transition-colors">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                <h3 className="text-xl font-bold text-white mb-2">{selectedItem.title}</h3>
                <p className="text-white/90 mb-2">{selectedItem.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
