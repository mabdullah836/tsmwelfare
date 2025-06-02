"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, Filter, X } from "lucide-react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const donations = [
  {
    id: "DON001",
    donor: "Ahmed Khan",
    email: "ahmed@example.com",
    amount: 25000,
    type: "Zakat",
    date: "2024-01-15",
    status: "Completed",
  },
  {
    id: "DON002",
    donor: "Fatima Ali",
    email: "fatima@example.com",
    amount: 10000,
    type: "General",
    date: "2024-01-14",
    status: "Completed",
  },
  {
    id: "DON003",
    donor: "Muhammad Hassan",
    email: "hassan@example.com",
    amount: 50000,
    type: "Education",
    date: "2024-01-13",
    status: "Pending",
  },
  {
    id: "DON004",
    donor: "Aisha Malik",
    email: "aisha@example.com",
    amount: 15000,
    type: "Medical",
    date: "2024-01-12",
    status: "Completed",
  },
  {
    id: "DON005",
    donor: "Omar Sheikh",
    email: "omar@example.com",
    amount: 30000,
    type: "Orphan Care",
    date: "2024-01-11",
    status: "Completed",
  },
]

export function DonationRecords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredDonations, setFilteredDonations] = useState(donations)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    filterDonations(term, startDate, endDate)
  }

  const filterDonations = (term: string, start: Date | null, end: Date | null) => {
    let filtered = donations.filter(
      (donation) =>
        (donation.donor.toLowerCase().includes(term.toLowerCase()) ||
          donation.email.toLowerCase().includes(term.toLowerCase()) ||
          donation.type.toLowerCase().includes(term.toLowerCase()))
    )

    if (start && end) {
      filtered = filtered.filter((donation) => {
        const donationDate = new Date(donation.date)
        return donationDate >= start && donationDate <= end
      })
    }

    setFilteredDonations(filtered)
  }

  const clearFilters = () => {
    setStartDate(null)
    setEndDate(null)
    filterDonations(searchTerm, null, null)
  }

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    filterDonations(searchTerm, start, end)
  }

  const totalAmount = filteredDonations.reduce((sum, donation) => sum + donation.amount, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Donation Records</CardTitle>
          <CardDescription>Manage and track all donations received</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search donations..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-8 w-[300px]"
                  />
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
                {(startDate || endDate) && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                )}
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
            
            {showFilters && (
              <div className="flex items-center space-x-4 p-4 bg-muted/50 rounded-lg">
                <div>
                  <label className="text-sm font-medium mb-1 block">Date Range</label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    className="w-[300px] rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholderText="Select date range"
                    dateFormat="MMM d, yyyy"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">Rs. {totalAmount.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total Amount</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{filteredDonations.length}</div>
                <p className="text-xs text-muted-foreground">Total Donations</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  Rs. {Math.round(totalAmount / filteredDonations.length || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Average Amount</p>
              </CardContent>
            </Card>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell className="font-medium">{donation.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{donation.donor}</p>
                        <p className="text-sm text-muted-foreground">{donation.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>Rs. {donation.amount.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{donation.type}</Badge>
                    </TableCell>
                    <TableCell>{donation.date}</TableCell>
                    <TableCell>
                      <Badge variant={donation.status === "Completed" ? "default" : "secondary"}>
                        {donation.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
