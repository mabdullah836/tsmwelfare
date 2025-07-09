import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatFileSize } from '@/lib/utils/format'

export const MediaStats = ({ stats }: { stats: any }) => (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Files</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.total}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Images</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.images}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Videos</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{stats.videos}</div></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Total Size</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">{formatFileSize(stats.totalSize * 1024 * 1024)}</div></CardContent></Card>
    </div>
)
