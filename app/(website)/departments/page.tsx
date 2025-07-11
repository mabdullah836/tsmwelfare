"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { departments } from "@/lib/constants/departments"
import { AdminGrid } from "@/components/shared/AdminGrid";

export default function DepartmentsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Departments</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We work across multiple departments to serve our community in different ways. Each department focuses on specific needs and areas of support.
        </p>
      </div>

      <AdminGrid
        items={departments}
        loading={false}
        emptyState={{ title: "No departments found.", description: "Check back later for updates." }}
        skeletonItems={6}
        gridClassName="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        renderItem={(department, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg bg-primary/10 ${department.color}`}>
                  <department.icon className="h-6 w-6" />
                </div>
                <CardTitle>{department.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-muted-foreground">{department.description}</p>
            </CardContent>
          </Card>
        )}
      />
    </div>
  )
}