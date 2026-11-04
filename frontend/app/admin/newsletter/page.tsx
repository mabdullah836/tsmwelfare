"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/lib/utils/export-csv";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Loader2, Mail, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNewsletter } from '@/lib/hooks/useNewsletter';

export default function NewsletterAdminPage() {
  // SWR hook for newsletter
  const { newsletter, isLoading } = useNewsletter();

  return (
    <div>
      <div className="flex flex-col gap-6">
        <div className="page-header">
          <div>
            <h1 className="page-title">Newsletter Subscribers</h1>
            <p className="page-description">Manage your email subscribers list</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="neutral" className="px-3 py-1 text-sm tabular-nums">
              {newsletter.length} subscribers
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToCSV(newsletter, "newsletter-subscribers.csv")}
              disabled={newsletter.length === 0}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          <CardHeader className="px-6 pt-6 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Subscribers List</CardTitle>
                <CardDescription className="text-sm">
                  {newsletter.length} active email addresses
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                {/* Add filter/sort buttons here if needed */}
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-4">
            <div className="border-t">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[60%] pl-6">Email Address</TableHead>
                    <TableHead className="text-right pr-6">Subscription Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={2} className="h-24 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading subscribers...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : newsletter.length > 0 ? (
                    newsletter.map((row: { email: string; createdAt: string }) => (
                      <TableRow key={row.email}>
                        <TableCell className="pl-6 font-medium">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-primary" aria-hidden>
                              <Mail className="h-4 w-4" />
                            </div>
                            <span className="truncate max-w-[16rem] sm:max-w-[300px]">{row.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground pr-6 whitespace-nowrap">
                          {new Date(row.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
                        No subscribers found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}