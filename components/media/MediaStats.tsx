import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatFileSize } from '@/lib/utils/format'

export const MediaStats = ({ stats }: { stats: any }) => {
  const statList = [
    { label: "Total Files", value: stats.total },
    { label: "Images", value: stats.images },
    { label: "Videos", value: stats.videos },
    { label: "Total Size", value: formatFileSize(stats.totalSize * 1024 * 1024) }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {statList.map(({ label, value }) => (
        <Card key={label}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{label}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
