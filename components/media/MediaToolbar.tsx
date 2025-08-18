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
  <div className="border rounded-lg px-4 py-3 mb-6 flex items-center w-full">
    <div className="flex-grow flex items-center">
      <div className="relative w-full">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search media files..." className="pl-8 w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
          <TooltipTrigger><Button variant={view === "grid" ? "default" : "outline"} size="icon" onClick={() => setView("grid")}><Grid className="h-4 w-4" /></Button></TooltipTrigger>
          <TooltipContent>Grid view</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger><Button variant={view === "list" ? "default" : "outline"} size="icon" onClick={() => setView("list")}><List className="h-4 w-4" /></Button></TooltipTrigger>
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
          <Checkbox id="select-all-checkbox" checked={allSelected} onCheckedChange={toggleSelectAll} />
        </div>
      )}
      {selectedIds.length > 0 && (
        <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>{selectedIds.length > 1 ? 'Delete All' : 'Delete' }</Button>
      )}
    </div>
  </div>
)
