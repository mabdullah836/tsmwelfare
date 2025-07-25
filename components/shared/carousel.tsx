'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomImage } from "@/components/shared/custom-image";

type Testimonial = {
  name: string;
  role: string;
  message: string;
  image: string;
};

type Story = {
  title: string;
  description: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
};

type ReusableCarouselProps = {
  variant: "testimonial" | "story";
  items: Testimonial[] | Story[];
  sectionTitle?: string;
  sectionDescription?: string;
  height?: string;
};

export const ReusableCarousel: React.FC<ReusableCarouselProps> = ({
  variant,
  items,
  sectionTitle,
  sectionDescription,
  height = "h-[400px]",
}) => {
  return (
    <section className="bg-secondary py-12 md:py-20">
      <div className="container">
        {(sectionTitle || sectionDescription) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
            {sectionTitle && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{sectionTitle}</h2>
            )}
            {sectionDescription && (
              <p className="text-lg text-muted-foreground">{sectionDescription}</p>
            )}
          </div>
        )}

        <Carousel className={`${height} max-w-6xl mx-auto relative`}>
          <CarouselContent>
            {(items as any[]).map((item, index) => (
              <CarouselItem key={index}>
                {variant === "testimonial" ? (
                  <Card className="h-full flex flex-col items-center justify-center p-8 text-center border-0 bg-background rounded-2xl shadow-md transition hover:shadow-xl">
                    <div className="mb-6 rounded-full overflow-hidden w-20 h-20">
                      <CustomImage
                        src={item.image}
                        alt={`${item.name}'s photo`}
                        height="80"
                        width="80"
                        fill={false}
                        overlay={false}
                      />
                    </div>
                    <blockquote className="text-lg md:text-xl italic mb-4 text-muted-foreground">
                      “{item.message}”
                    </blockquote>
                    <cite className="not-italic font-semibold">
                      — {item.name}, {item.role}
                    </cite>
                  </Card>
                ) : (
                  <div className="h-full rounded-2xl overflow-hidden relative group">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-10">
                      <h3 className="text-3xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-white/90 text-lg max-w-2xl">{item.description}</p>
                      {item.ctaText && item.ctaLink && (
                        <Button variant="secondary" className="mt-6 w-fit" asChild>
                          <Link href={item.ctaLink}>{item.ctaText}</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-4 h-12 w-12" />
          <CarouselNext className="right-4 h-12 w-12" />
        </Carousel>
      </div>
    </section>
  );
};
