"use client"

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/lib/hooks/use-debounce';
import Image from 'next/image';
import { useTeam } from '@/lib/hooks/useTeam';

export function TeamSection() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  // SWR hook for team
  const { team, meta, isLoading, isError } = useTeam({ page, limit: 8, q: debouncedSearch });

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <Input
            id="teamMemberName"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            required
            placeholder="Enter team member name"
          />
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(meta.limit)].map((_, i) => (
              <Card key={i} className="h-48 animate-pulse bg-muted/30" />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center text-destructive py-12">{isError.message || 'Failed to load team members'}</div>
        ) : team.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">No team members found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {team.map((member: import('@/lib/types/team').TeamMember) => (
              <Card key={member._id} className="flex flex-col items-center p-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <Image src={member.imageUrl || '/placeholder-user.jpg'} alt={member.name} width={96} height={96} className="object-cover w-full h-full" />
                </div>
                <CardContent className="text-center">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <div className="text-sm text-muted-foreground mb-1">{member.role}</div>
                  <div className="text-xs text-muted-foreground">{member.bio}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {meta.pages > 1 && (
          <Pagination className="mt-8 flex justify-center">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} isActive={page > 1} />
              </PaginationItem>
              {[...Array(meta.pages)].map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink isActive={page === i + 1} onClick={() => setPage(i + 1)}>{i + 1}</PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={() => setPage(p => Math.min(meta.pages, p + 1))} isActive={page < meta.pages} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
} 