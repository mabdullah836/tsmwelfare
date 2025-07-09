'use client'

import { useState, useEffect, useMemo } from "react"
import { AlertMessage } from '@/components/ui/alert-message'
import { ConfirmDeleteModal } from '@/components/modals/ConfirmDeleteModal'
import { NoRecords } from '@/components/ui/no-records'
import { useSelection } from '@/lib/hooks/use-selection'
import { useBulkDelete } from '@/lib/hooks/use-bulk-delete'
import { usePaginationFilter } from '@/lib/hooks/use-pagination-filter'
import { getMedia, deleteMedia, updateMediaStatus, uploadVideoByUrl } from '@/lib/services/media'
import type { Media } from '@/lib/types/media'

import { MediaStats } from '@/components/media/MediaStats'
import { MediaToolbar } from '@/components/media/MediaToolbar'
import { MediaView } from '@/components/media/MediaView'
import { AddVideoDialog } from '@/components/media/AddVideoDialog'
import { VideoPreviewDialog } from '@/components/media/VideoPreviewDialog'

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
  })

  const stats = useMemo(() => ({
    total: mediaItems.length,
    images: mediaItems.filter(item => item.type === 'image').length,
    videos: mediaItems.filter(item => item.type === 'video').length,
    totalSize: mediaItems.reduce((acc, item) => {
      const size = parseFloat(String(item.size ?? ''))
      return isNaN(size) ? acc : acc + size
    }, 0)
  }), [mediaItems])

  const selectableMedia = paginatedMedia.filter(item => typeof item._id === 'string') as { _id: string }[]
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
      const items = await getMedia('general')
      setMediaItems(items)
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
      const items = await getMedia('general');
      setMediaItems(items);
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
      getMedia('general').then(setMediaItems);
    } catch (error) {
      setAlert({ message: error instanceof Error ? error.message : 'Failed to add video.', type: 'error' });
    }
  };

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
        {paginatedMedia.length === 0 && !loading ? (
          <NoRecords
            title="No media items found"
            description={searchQuery || filterType !== 'all' ? 'Try adjusting your filters or search terms' : 'Upload your first media file to get started'}
          />
        ) : (
          <MediaView
            view={view}
            media={paginatedMedia}
            onClick={(item) => {
              if (item.type === 'video') {
                setActiveVideo(item)
                setShowVideoModal(true)
              }
            }}
            onApprove={handleApprove}
            onReject={handleReject}
            approving={approving}
          />
        )}
        <AddVideoDialog
          open={showAddVideo}
          onOpenChange={setShowAddVideo}
          setAlert={setAlert}
          refreshMedia={() => getMedia('general').then(setMediaItems)}
          url={url}
          setUrl={setUrl}
          thumbnail={thumbnail}
          setThumbnail={setThumbnail}
          title={title}
          setTitle={setTitle}
          tag={tag}
          setTag={setTag}
          onSave={handleSave}
        />
        <VideoPreviewDialog
          open={showVideoModal}
          onOpenChange={setShowVideoModal}
          media={activeVideo}
        />
      </div>
    </div>
  )
}
