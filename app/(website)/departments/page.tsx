"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { departments } from "@/lib/constants/departments"
import { AdminGrid } from "@/components/shared/AdminGrid"
import { motion } from "framer-motion"
import { fadeIn, container } from "@/lib/motion"

export default function DepartmentsPage() {
  return (
    <div className="container py-16">
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={fadeIn('up', 0.1)}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
          Our Departments
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We work across multiple specialized departments to holistically serve our community. 
          Each division focuses on distinct needs with tailored programs and support systems.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <AdminGrid
          items={departments}
          loading={false}
          emptyState={{ 
            title: "No departments available", 
            description: "We're currently organizing our departments. Please check back soon." 
          }}
          skeletonItems={6}
          gridClassName="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          renderItem={(department, index) => (
            <motion.div
              key={index}
              variants={fadeIn('up', 0.2 + index * 0.1)}
            >
              <Card className="flex flex-col h-full group hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${department.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                      <department.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-semibold">{department.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pt-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {department.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        />
      </motion.div>
    </div>
  )
}