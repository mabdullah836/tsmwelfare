"use client"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { NoRecords } from "@/components/ui/no-records"
import { useState } from "react"

interface TeamMember {
  _id: string
  name: string
  role: string
  bio: string
  imageUrl?: string
  order: number
  createdAt: Date
  updatedAt: Date
}

interface TeamSectionProps {
  title?: string
  description?: string
  teamMembers: TeamMember[]
}

export function TeamSection({ 
  title = "Our Team", 
  description = "Meet the dedicated individuals who make our mission possible.", 
  teamMembers 
}: TeamSectionProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const handleImageError = (memberId: string) => {
    setImageErrors(prev => ({ ...prev, [memberId]: true }))
  }

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">{title}</h2>
        {description && (
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            {description}
          </p>
        )}
        {teamMembers.length === 0 ? (
          <NoRecords 
            title="No Team Members Yet"
            description="Our team section is currently being updated. Check back soon to meet our amazing team members."
          />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <Card key={member._id} className="overflow-hidden flex flex-col">
                <div className="aspect-square relative bg-muted">
                  <Image
                    src={imageErrors[member._id] 
                      ? `/placeholder.svg?height=400&width=400&text=${member.name.split(" ")[0]}`
                      : member.imageUrl || `/placeholder.svg?height=400&width=400&text=${member.name.split(" ")[0]}`
                    }
                    alt={member.name}
                    fill
                    className="object-cover"
                    onError={() => handleImageError(member._id)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <CardContent className="pt-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground flex-1">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
} 