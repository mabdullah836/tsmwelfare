export function exportToCSV(data: any[], filename = "export.csv") {
  if (!Array.isArray(data) || data.length === 0) return;
  const keys = Object.keys(data[0]);
  const csvRows = [
    keys,
    ...data.map(d => keys.map(k => d[k] ?? ""))
  ];
  const csvContent = csvRows.map(row => row.map(String).map(cell => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
} 