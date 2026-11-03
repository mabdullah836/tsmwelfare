'use client'

import { useState,useMemo } from "react"
import { AlertMessage } from '@/components/ui/alert-message'
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal'
import { useSelection } from '@/lib/hooks/use-selection'
import { useBulkDelete } from '@/lib/hooks/use-bulk-delete'
import type { Media } from '@/lib/types/media'
import { useDebounce } from '@/lib/hooks/use-debounce'
import { useMedia } from '@/lib/hooks/useMedia';
import { changeResourceStatus } from '@/lib/utils/changeResourceStatus';

import { MediaStats } from '@/components/media/MediaStats'
import { MediaToolbar } from '@/components/media/MediaToolbar'
import { AddVideoDialog } from '@/components/media/AddVideoDialog'
import { VideoPreviewDialog } from '@/components/media/VideoPreviewDialog'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { AdminGrid } from "@/components/shared/AdminGrid";
import { ImageCard } from '@/components/ImageCard';
import { VideoCard } from '@/components/VideoCard';
import { UniversalDialog } from '@/components/modals/UniversalDialog';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function MediaPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [showAddVideo, setShowAddVideo] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [activeVideo, setActiveVideo] = useState<Media | null>(null)
  const [approving, setApproving] = useState(false)
  // Video add modal uses its own internal form; no external state needed here
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebounce(searchQuery, 400)
  const [showImageModal, setShowImageModal] = useState(false)
  const [activeImage, setActiveImage] = useState<Media | null>(null)
  const [uploading, setUploading] = useState(false)

  // SWR hook for media
  const { media, meta, isLoading, isError, mutate } = useMedia({ page, limit: 12, q: debouncedSearch, folder: 'general' });

  const stats = useMemo(() => ({
    total: media.length,
    images: media.filter((item: Media) => item.type === 'image').length,
    videos: media.filter((item: Media) => item.type === 'video').length,
    totalSize: media.reduce((acc: number, item: Media) => {
      const size = parseFloat(String(item.size ?? ''))
      return isNaN(size) ? acc : acc + size
    }, 0)
  }), [media])

  const selectableMedia = media.filter((item: Media) => typeof item._id === 'string') as { _id: string }[]
  const { selectedIds, setSelectedIds, allSelected, toggleSelectAll, toggleSelect } = useSelection(selectableMedia)

  const deleteMediaItems = async (ids: string[]) => {
    const response = await fetch('/api/media/bulk-delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    })
    const data = await response.json()
    if (response.ok && data.success) {
      setSelectedIds([])
      setAlert({ message: 'Selected media items deleted.', type: 'success' })
      mutate()
    } else {
      setAlert({ message: data.message || 'Failed to delete media items.', type: 'error' })
    }
  }
  const { showDeleteConfirm, setShowDeleteConfirm, deleting, handleBulkDelete } = useBulkDelete(deleteMediaItems, selectedIds)

  const handleStatusChange = async ({
    mediaItem,
    newStatus,
  }: {
    mediaItem: Media;
    newStatus: 'approved' | 'rejected';
  }) => {
    setApproving(true);
    try {
      const result = await changeResourceStatus({
        resource: 'media',
        id: mediaItem._id!,
        newStatus,
        statusMap: { approve: 'approved', reject: 'rejected' },
      });
  
      if (result.success) {
        const action = newStatus === 'approved' ? 'approved' : 'rejected and removed';
        setAlert({ message: `Video ${action}.`, type: 'success' });
        mutate();
      } else {
        const action = newStatus === 'approved' ? 'approve video' : 'reject and remove video';
        setAlert({ message: result.message || `Failed to ${action}.`, type: 'error' });
      }
    } finally {
      setApproving(false);
    }
  };
  

  const handleSave = async (data: { title: string; url: string; tag?: string; thumbnail?: File | null }) => {
    try {
      const formData = new FormData();
      formData.append('videoUrl', data.url);
      if (data.thumbnail instanceof File) {
        // If File object, upload as file (API supports both)
        formData.append('thumbnail', data.thumbnail);
      }
      if (data.title) formData.append('title', data.title);
      if (data.tag) formData.append('tag', data.tag.trim());
      formData.append('folder', 'general');

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to add video');

      setAlert({ message: 'Video added successfully.', type: 'success' });
      setShowAddVideo(false);
      mutate();
    } catch (error) {
      setAlert({ message: error instanceof Error ? error.message : 'Failed to add video.', type: 'error' });
    }
  };

  const uploadFiles = async (files: File[]) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('files', file);
      });
      formData.append('folder', 'general');

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      setAlert({ message: 'Files uploaded successfully.', type: 'success' });
      mutate(); // Refresh the media list
    } catch (error) {
      setAlert({ message: error instanceof Error ? error.message : 'Failed to upload files.', type: 'error' });
    } finally {
      setUploading(false);
    }
  };


  // Filter media by type
  const filteredMedia = useMemo(() => {
    if (filterType === 'all') return media;
    return media.filter((item: Media) => item.type === filterType);
  }, [media, filterType]);

  return (
    <div>
      <div className="space-y-6">
        {alert && (
          <AlertMessage
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        <div className="page-header">
          <div>
            <h1 className="page-title">Media Library</h1>
            <p className="page-description">Photos and videos shown in the public media gallery.</p>
          </div>
        </div>
        <MediaStats stats={stats} />
        <MediaToolbar
          view={view}
          setView={setView}
          filterType={filterType}
          setFilterType={setFilterType}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          uploading={uploading}
          selectedIds={selectedIds}
          setShowAddVideo={setShowAddVideo}
          setShowDeleteConfirm={setShowDeleteConfirm}
          allSelected={allSelected}
          toggleSelectAll={toggleSelectAll}
          onSelectFiles={(value: File[] | File | null) => {
            const files = Array.isArray(value) ? value : value ? [value] : [];
            uploadFiles(files);
          }}
        />
        <ConfirmDeleteModal
          open={showDeleteConfirm}
          title="Delete Media"
          description="Are you sure you want to delete the selected media file(s)? This action cannot be undone."
          loading={deleting}
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleBulkDelete}
        />
        { isError && <div className="text-destructive text-sm">Failed to fetch media.</div>}
        <AdminGrid
          items={filteredMedia}
          loading={isLoading}
          emptyState={{ title: "No media items found", description: searchQuery || filterType !== 'all' ? 'Try adjusting your filters or search terms' : 'Upload your first media file to get started' }}
          skeletonItems={meta.limit}
          gridClassName={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full' : 'flex flex-col gap-4'}
          renderItem={(item: Media) =>
            item.type === 'image' ? (
              <ImageCard
                key={item._id}
                media={item}
                selected={selectedIds.includes(item._id!)}
                onSelect={() => toggleSelect(item._id!)}
                onClick={() => {
                  setActiveImage(item);
                  setShowImageModal(true);
                  setShowVideoModal(false);
                }}
              />
            ) : (
              <VideoCard
                key={item._id}
                media={item}
                selected={selectedIds.includes(item._id!)}
                onSelect={() => toggleSelect(item._id!)}
                onClick={() => {
                  setActiveVideo(item);
                  setShowVideoModal(true);
                  setShowImageModal(false);
                }}
                onApprove={() => handleStatusChange({ mediaItem: item, newStatus: 'approved' })}
                onReject={() => handleStatusChange({ mediaItem: item, newStatus: 'rejected' })}
                approving={approving}
              />
            )
          }          
        />
        <UniversalDialog open={showImageModal} onOpenChange={setShowImageModal}>
          {activeImage && (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle>{activeImage.name || 'Image'}</DialogTitle>
              </DialogHeader>
              <div className="w-full flex justify-center items-center bg-black rounded overflow-hidden">
                <img
                  src={activeImage.url ?? ''}
                  alt={activeImage.name ?? 'Media'}
                  className="object-contain max-h-[70vh] max-w-full"
                />
              </div>
              {activeImage.description && <div className="text-sm text-muted-foreground">{activeImage.description}</div>}
            </div>
          )}
        </UniversalDialog>
        <VideoPreviewDialog
          open={showVideoModal}
          onOpenChange={setShowVideoModal}
          media={activeVideo}
        />
        {meta.pages > 1 && (
          <Pagination className="mt-8 flex justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} isActive={page > 1} />
              </PaginationItem>
              {[...Array(meta.pages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>{i + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={() => setPage(p => Math.min(meta.pages, p + 1))} isActive={page < meta.pages} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
        <AddVideoDialog
          open={showAddVideo}
          onOpenChange={setShowAddVideo}
          onSave={handleSave}
          saving={uploading}
        />
      </div>
    </div>
  )
}
