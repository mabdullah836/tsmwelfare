"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Grid, List, Trash2, Edit, Download } from "lucide-react"
import Image from "next/image"

const mediaFiles = [
  {
    id: 1,
    name: "medical-camp-2024.jpg",
    type: "image",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    url: "/placeholder.svg?height=200&width=300&text=Medical+Camp",
    category: "Events",
  },
  {
    id: 2,
    name: "food-distribution.jpg",
    type: "image",
    size: "1.8 MB",
    uploadDate: "2024-01-14",
    url: "/placeholder.svg?height=200&width=300&text=Food+Distribution",
    category: "Community",
  },
  {
    id: 3,
    name: "education-program.mp4",
    type: "video",
    size: "45.2 MB",
    uploadDate: "2024-01-13",
    url: "/placeholder.svg?height=200&width=300&text=Education+Video",
    category: "Education",
  },
  {
    id: 4,
    name: "orphan-care.jpg",
    type: "image",
    size: "3.1 MB",
    uploadDate: "2024-01-12",
    url: "/placeholder.svg?height=200&width=300&text=Orphan+Care",
    category: "Orphans",
  },
  {
    id: 5,
    name: "water-project.jpg",
    type: "image",
    size: "2.7 MB",
    uploadDate: "2024-01-11",
    url: "/placeholder.svg?height=200&width=300&text=Water+Project",
    category: "Infrastructure",
  },
  {
    id: 6,
    name: "volunteer-training.mp4",
    type: "video",
    size: "38.5 MB",
    uploadDate: "2024-01-10",
    url: "/placeholder.svg?height=200&width=300&text=Training+Video",
    category: "Training",
  },
]

export function MediaManager() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch =
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || file.category.toLowerCase() === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["all", ...Array.from(new Set(mediaFiles.map((file) => file.category.toLowerCase())))]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Media Library</CardTitle>
          <CardDescription>Manage your uploaded images and videos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search media..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>

              <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                <TabsList>
                  {categories.map((category) => (
                    <TabsTrigger key={category} value={category} className="capitalize">
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredFiles.map((file) => (
                <Card key={file.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={file.url || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
                    <div className="absolute top-2 right-2">
                      <Badge variant={file.type === "image" ? "default" : "secondary"}>{file.type}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="font-medium truncate mb-1">{file.name}</p>
                    <p className="text-sm text-muted-foreground mb-2">{file.size}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {file.category}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="relative h-12 w-12 rounded overflow-hidden">
                      <Image src={file.url || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {file.size} • {file.uploadDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={file.type === "image" ? "default" : "secondary"}>{file.type}</Badge>
                    <Badge variant="outline">{file.category}</Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
