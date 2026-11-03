import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Upload, Grid, List, Search } from "lucide-react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { FileUpload } from '@/components/ui/file-upload'

export const MediaToolbar = ({
  searchQuery,
  setSearchQuery,
  filterType,
  setFilterType,
  view,
  setView,
  onSelectFiles,
  uploading,
  setShowAddVideo,
  selectedIds,
  allSelected,
  toggleSelectAll,
  setShowDeleteConfirm
}: any) => (
  <div className="mb-6 flex w-full flex-col gap-3 rounded-xl border bg-card px-4 py-3 md:flex-row md:items-center">
    <div className="flex flex-grow items-center">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <Input type="search" aria-label="Search media files" placeholder="Search media files..." className="pl-9 w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-2 md:flex-nowrap">
      <Select value={filterType} onValueChange={setFilterType}>
        <SelectTrigger className="w-[120px]" aria-label="Filter by media type">
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
          <TooltipTrigger><Button variant={view === "grid" ? "default" : "outline"} size="icon" onClick={() => setView("grid")} aria-label="Grid view" aria-pressed={view === "grid"}><Grid className="h-4 w-4" /></Button></TooltipTrigger>
          <TooltipContent>Grid view</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger><Button variant={view === "list" ? "default" : "outline"} size="icon" onClick={() => setView("list")} aria-label="List view" aria-pressed={view === "list"}><List className="h-4 w-4" /></Button></TooltipTrigger>
          <TooltipContent>List view</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="relative">
        {filterType === 'video' ? (
          <Button type="button" onClick={() => setShowAddVideo(true)}><Upload className="mr-2 h-4 w-4" /> Add Video</Button>
        ) : (
          <FileUpload
            name="mediaFiles"
            multiple
            accept="image/*,video/*"
            preview={false}
            onChange={onSelectFiles}
            variant="compact"
            buttonText={uploading ? 'Uploading...' : 'Upload Files'}
            className="h-8 px-3"
          />
        )}
      </div>
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-1 ml-2">
          <Checkbox id="select-all-checkbox" checked={allSelected} onCheckedChange={toggleSelectAll} aria-label="Select all media" />
        </div>
      )}
      {selectedIds.length > 0 && (
        <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>{selectedIds.length > 1 ? 'Delete All' : 'Delete' }</Button>
      )}
    </div>
  </div>
)
