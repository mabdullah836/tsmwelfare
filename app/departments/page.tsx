"use client"

import { DepartmentCard } from "@/components/department-card";
import { StethoscopeIcon, HeartIcon, DollarSignIcon, BookOpenIcon, HomeIcon, FileTextIcon } from "lucide-react";

const departments = [
  {
    icon: StethoscopeIcon,
    title: "Department of Health",
    description:
      "We organize free medical camps in villages where doctors are hard to find. When we have enough funds and volunteers, we visit remote areas and provide basic medicines to families who can't afford treatment.",
  },
  {
    icon: HeartIcon,
    title: "Food for Poor People",
    description:
      "Every week we distribute food packages to families who don't have enough to eat. During Ramadan, we give special ration bags to over 500 families in our area.",
  },
  {
    icon: DollarSignIcon,
    title: "Financial Assistance",
    description:
      "When families face emergencies like hospital bills or house repairs, we help them with money. We also give monthly support to widows and elderly people who have no income.",
  },
  {
    icon: BookOpenIcon,
    title: "Department of Education",
    description:
      "We pay school fees for children whose parents can't afford education. We also provide books, uniforms, and bags to students. Our dream is to build our own school one day to provide free education to poor children.",
  },
  {
    icon: HomeIcon,
    title: "Marriage Support for Orphan Girls",
    description:
      "We help orphan girls who have no earning person in their family when they want to get married. We cover all wedding expenses including clothes, jewelry, and ceremony costs. This support is only for girls who are truly alone.",
  },
  {
    icon: FileTextIcon,
    title: "Department of Muqadas Awraq",
    description:
      "We collect old and damaged Quran pages from mosques, homes, and even the streets to ensure they are disposed of properly according to Islamic guidelines. In addition, we distribute free copies of the Holy Quran and organize Quran classes for children to help spread knowledge and respect for the Holy Book.",
  },
];

export default function DepartmentsPage() {
  return (
    <section className="py-12 md:py-20">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Departments</h2>
          <p className="text-lg text-muted-foreground">
            We have different departments that work together to help people...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, i) => (
            <DepartmentCard
              key={i}
              icon={dept.icon}
              title={dept.title}
              description={dept.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}