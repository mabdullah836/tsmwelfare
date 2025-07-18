"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { exportToCSV } from "@/lib/utils/export-csv";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Loader2, Mail, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function NewsletterAdminPage() {
  const [emails, setEmails] = useState<{ email: string; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/newsletter")
      .then(res => res.json())
      .then(data => {
        if (data.success) setEmails(data.emails);
        else setEmails([]);
        setLoading(false);
      })
      .catch(() => {
        setEmails([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Mail className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Newsletter Subscribers</h1>
              <p className="text-muted-foreground">Manage your email subscribers list</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="px-3 py-1 text-sm">
              {emails.length} subscribers
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportToCSV(emails, "newsletter-subscribers.csv")}
              disabled={emails.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>

        <Card className="border-0 shadow-sm">
          <CardHeader className="px-6 pt-6 pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Subscribers List</CardTitle>
                <CardDescription className="text-sm">
                  {emails.length} active email addresses
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                {/* Add filter/sort buttons here if needed */}
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[60%] pl-6">Email Address</TableHead>
                    <TableHead className="text-right pr-6">Subscription Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={2} className="h-24 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Loading subscribers...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : emails.length > 0 ? (
                    emails.map((row, index) => (
                      <TableRow key={row.email} className={index % 2 === 0 ? "bg-muted/5" : ""}>
                        <TableCell className="pl-6 font-medium">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Mail className="h-4 w-4" />
                            </div>
                            <span className="truncate max-w-[300px]">{row.email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground pr-6">
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