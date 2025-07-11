"use client"

import { useState, useEffect } from 'react';
import { getTeamMembers } from '@/lib/services/team';
import { TeamMember } from '@/lib/types/team';
import { Card, CardContent } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/lib/hooks/use-debounce';

export function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<{ total: number; page: number; pages: number; limit: number }>({ total: 0, page: 1, pages: 1, limit: 8 });
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setLoading(true);
    getTeamMembers({ page, limit: meta.limit, q: debouncedSearch }).then(res => {
      setTeamMembers(res.data);
      setMeta(res.meta);
      setLoading(false);
      setError(null);
    }).catch(() => {
      setTeamMembers([]);
      setMeta({ total: 0, page: 1, pages: 1, limit: 8 });
      setLoading(false);
      setError('Failed to load team members');
    });
  }, [page, meta.limit, debouncedSearch]);

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <Input
            placeholder="Search team members..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-72"
          />
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(meta.limit)].map((_, i) => (
              <Card key={i} className="h-48 animate-pulse bg-muted/30" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-12">{error}</div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">No team members found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamMembers.map(member => (
              <Card key={member._id} className="flex flex-col items-center p-6">
                <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img src={member.imageUrl || '/placeholder-user.jpg'} alt={member.name} className="object-cover w-full h-full" />
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