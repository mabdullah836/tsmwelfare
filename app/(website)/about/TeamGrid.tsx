'use client'

import Image from "next/image";
import { UserRound } from "lucide-react";
import { AdminGrid } from "@/components/shared/AdminGrid";
import type { TeamMember } from "@/lib/types/team";
import { useTeam } from '@/lib/hooks/useTeam';

export default function TeamGrid() {
  const { team, isLoading } = useTeam({ page: 1, limit: 12, q: '' });

  return (
    <AdminGrid
      items={team}
      loading={isLoading}
      emptyState={{
        title: "No Team Members Found",
        description: "We currently don't have any team members to display. Check back later!",
      }}
      skeletonItems={4}
      gridClassName="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      renderItem={(member: TeamMember, idx) => (
        <article key={member._id || idx} className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-shadow hover:shadow-md">
          <div className="relative aspect-[4/3] bg-accent">
            {member.imageUrl ? (
              <Image
                src={member.imageUrl}
                alt={member.name}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover object-top"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-primary/50" aria-hidden>
                <UserRound className="h-16 w-16" />
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-lg font-bold">{member.name}</h3>
            <p className="text-sm font-medium text-primary">{member.role}</p>
            {member.bio && <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{member.bio}</p>}
          </div>
        </article>
      )}
    />
  );
}
