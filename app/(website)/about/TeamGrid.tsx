'use client'

import { useEffect, useState } from "react";
import { getTeamMembers } from "@/lib/services/team";
import { AdminGrid } from "@/components/shared/AdminGrid";
import { Card } from "@/components/ui/card";
import type { TeamMember } from "@/lib/types/team";

export default function TeamGrid() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getTeamMembers({ page: 1, limit: 12, q: "" }).then(res => {
      setTeam(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);
  return (
    <AdminGrid
      items={team}
      loading={loading}
      emptyState={{ title: "No team members found.", description: "Check back later for updates." }}
      skeletonItems={8}
      gridClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      renderItem={(member, idx) => (
        <Card key={member._id || idx} className="flex flex-col items-center p-6">
          <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
            <img src={member.imageUrl || '/placeholder-user.jpg'} alt={member.name} className="object-cover w-full h-full" />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-lg mb-1">{member.name}</h3>
            <div className="text-sm text-muted-foreground mb-1">{member.role}</div>
            <div className="text-xs text-muted-foreground">{member.bio}</div>
          </div>
        </Card>
      )}
    />
  );
} 