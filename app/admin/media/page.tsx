'use client'

import { useState, useEffect, useMemo } from "react"
import { AlertMessage } from '@/components/ui/alert-message'
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal'
import { useSelection } from '@/lib/hooks/use-selection'
import { useBulkDelete } from '@/lib/hooks/use-bulk-delete'
import { getMedia, deleteMedia, updateMediaStatus, uploadVideoByUrl } from '@/lib/services/media'
import type { Media } from '@/lib/types/media'
import { useDebounce } from '@/lib/hooks/use-debounce'

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
  const [mediaItems, setMediaItems] = useState<Media[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [mediaToDelete, setMediaToDelete] = useState<string | null>(null)
  const [deletingSingle, setDeletingSingle] = useState(false)
  const [showAddVideo, setShowAddVideo] = useState(false)
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [activeVideo, setActiveVideo] = useState<Media | null>(null)
  const [approving, setApproving] = useState(false)
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState<{ total: number; page: number; pages: number; limit: number }>({ total: 0, page: 1, pages: 1, limit: 12 })
  const debouncedSearch = useDebounce(searchQuery, 400)
  const [showImageModal, setShowImageModal] = useState(false)
  const [activeImage, setActiveImage] = useState<Media | null>(null)

  // Fetch media from API
  useEffect(() => {
    setLoading(true)
    getMedia({ page, limit: meta.limit, q: debouncedSearch, folder: 'general' }).then(res => {
      setMediaItems(res.data)
      setMeta(res.meta)
      setLoading(false)
      setAlert(null)
    }).catch(() => {
      setMediaItems([])
      setMeta({ total: 0, page: 1, pages: 1, limit: 12 })
      setLoading(false)
      setAlert({ message: 'Failed to fetch media', type: 'error' })
    })
  }, [page, meta.limit, debouncedSearch])

  const stats = useMemo(() => ({
    total: mediaItems.length,
    images: mediaItems.filter(item => item.type === 'image').length,
    videos: mediaItems.filter(item => item.type === 'video').length,
    totalSize: mediaItems.reduce((acc, item) => {
      const size = parseFloat(String(item.size ?? ''))
      return isNaN(size) ? acc : acc + size
    }, 0)
  }), [mediaItems])

  const selectableMedia = mediaItems.filter(item => typeof item._id === 'string') as { _id: string }[]
  const { selectedIds, setSelectedIds, allSelected, toggleSelectAll, toggleSelect } = useSelection(selectableMedia)

  const deleteMediaItems = async (ids: string[]) => {
    const response = await fetch('/api/media/bulk-delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    })
    const data = await response.json()
    if (response.ok && data.success) {
      setMediaItems(prev => prev.filter(item => !ids.includes(item._id!)))
      setSelectedIds([])
      setAlert({ message: 'Selected media items deleted.', type: 'success' })
    } else {
      setAlert({ message: data.message || 'Failed to delete media items.', type: 'error' })
    }
  }
  const { showDeleteConfirm, setShowDeleteConfirm, deleting, handleBulkDelete } = useBulkDelete(deleteMediaItems, selectedIds)

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
    if (!mediaToDelete) return
    setDeletingSingle(true)
    await handleDelete(mediaToDelete)
    setDeletingSingle(false)
    setMediaToDelete(null)
  }

  async function handleApprove(media: Media) {
    setApproving(true)
    try {
      await updateMediaStatus(media._id!, 'approved')
      setAlert({ message: 'Video approved.', type: 'success' })
      const res = await getMedia({ page, limit: meta.limit, q: debouncedSearch, folder: 'general' })
      setMediaItems(res.data)
    } catch {
      setAlert({ message: 'Failed to approve video.', type: 'error' })
    } finally {
      setApproving(false)
    }
  }

  async function handleReject(media: Media) {
    setApproving(true)
    try {
      await deleteMedia(media._id!);
      setAlert({ message: 'Video rejected and removed.', type: 'success' });
      const res = await getMedia({ page, limit: meta.limit, q: debouncedSearch, folder: 'general' });
      setMediaItems(res.data);
    } catch {
      setAlert({ message: 'Failed to reject and remove video.', type: 'error' });
    } finally {
      setApproving(false);
    }
  }

  const handleSave = async () => {
    try {
      await uploadVideoByUrl({ videoUrl: url, thumbnail, title, tag: tag.trim() });
      setAlert({ message: 'Video added successfully.', type: 'success' });
      setShowAddVideo(false);
      setUrl('');
      setThumbnail('');
      setTitle('');
      setTag('');
      const res = await getMedia({ page, limit: meta.limit, q: debouncedSearch, folder: 'general' });
      setMediaItems(res.data);
    } catch (error) {
      setAlert({ message: error instanceof Error ? error.message : 'Failed to add video.', type: 'error' });
    }
  };

  // Filter media by type
  const filteredMedia = useMemo(() => {
    if (filterType === 'all') return mediaItems;
    return mediaItems.filter(item => item.type === filterType);
  }, [mediaItems, filterType]);

  return (
    <div className="min-h-screen">
      <div className="container space-y-8 py-8">
        {alert && (
          <AlertMessage
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}
        <MediaStats stats={stats} />
        <MediaToolbar
          view={view}
          setView={setView}
          filterType={filterType}
          setFilterType={setFilterType}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          uploading={loading}
          selectedIds={selectedIds}
          setShowAddVideo={setShowAddVideo}
          setShowDeleteConfirm={setShowDeleteConfirm}
          allSelected={allSelected}
          toggleSelectAll={toggleSelectAll}
        />
        <ConfirmDeleteModal
          open={showDeleteConfirm || !!mediaToDelete}
          title="Delete Media"
          description="Are you sure you want to delete the selected media file(s)? This action cannot be undone."
          loading={mediaToDelete ? deletingSingle : deleting}
          onCancel={() => {
            mediaToDelete ? setMediaToDelete(null) : setShowDeleteConfirm(false)
          }}
          onConfirm={mediaToDelete ? handleDeleteWithModal : handleBulkDelete}
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <AdminGrid
          items={filteredMedia}
          loading={loading}
          emptyState={{ title: "No media items found", description: searchQuery || filterType !== 'all' ? 'Try adjusting your filters or search terms' : 'Upload your first media file to get started' }}
          skeletonItems={meta.limit}
          gridClassName={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full' : 'flex flex-col gap-4'}
          renderItem={(item) => (
            item.type === 'image'
              ? <ImageCard
                  key={item._id}
                  media={item}
                  selected={selectedIds.includes(item._id!)}
                  onSelect={() => toggleSelect(item._id!)}
                  onClick={() => { setActiveImage(item); setShowImageModal(true); setShowVideoModal(false); }}
                />
              : <VideoCard
                  key={item._id}
                  media={item}
                  selected={selectedIds.includes(item._id!)}
                  onSelect={() => toggleSelect(item._id!)}
                  onClick={() => { setActiveVideo(item); setShowVideoModal(true); setShowImageModal(false); }}
                  onApprove={() => handleApprove(item)}
                  onReject={() => handleReject(item)}
                  approving={approving}
                />
          )}
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
      </div>
    </div>
  )
}
