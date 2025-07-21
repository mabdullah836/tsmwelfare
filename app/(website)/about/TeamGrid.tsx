'use client'

import { motion, easeOut } from "framer-motion";
import { AdminGrid } from "@/components/shared/AdminGrid";
import { Card } from "@/components/ui/card";
import type { TeamMember } from "@/lib/types/team";
import { useTeam } from '@/lib/hooks/useTeam';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.5,
      ease: easeOut
    }
  })
};

const hoverEffect = {
  scale: 1.03,
  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  transition: { duration: 0.3, ease: easeOut }
};

export default function TeamGrid() {
  const { team, isLoading } = useTeam({ page: 1, limit: 12, q: '' });

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <AdminGrid
        items={team}
        loading={isLoading}
        emptyState={{
          title: "No Team Members Found",
          description: "We currently don't have any team members to display. Check back later!",
        }}
        skeletonItems={8}
        gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        renderItem={(member: TeamMember, idx) => (
          <motion.div
            key={member._id || idx}
            custom={idx % 8} // Stagger animation
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            whileHover={hoverEffect}
            className="h-full"
          >
            <Card className="h-full flex flex-col items-center p-6 group hover:border-primary/30 transition-colors">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-background group-hover:border-primary/50 transition-colors shadow-lg">
                <img 
                  src={member.imageUrl || '/placeholder-user.jpg'} 
                  alt={member.name}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="text-center space-y-2 flex-grow">
                <h3 className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <div className="text-primary font-medium">{member.role}</div>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {member.bio}
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      />
    </div>
  );
}