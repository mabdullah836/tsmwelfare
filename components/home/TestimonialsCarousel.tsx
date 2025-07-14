import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CustomImage } from "@/components/shared/custom-image";
import React from "react";

const TestimonialsCarousel = () => (
  <section className="bg-secondary py-12 md:py-20">
    <div className="container">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What People Say About Us
        </h2>
        <p className="text-lg text-muted-foreground">
          These are real stories from people we've helped. They tell us how
          our work has changed their lives.
        </p>
      </div>
      <Carousel className="h-[350px] md:h-[400px] max-w-4xl mx-auto">
        <CarouselContent>
          <CarouselItem>
            <Card className="h-full flex flex-col items-center justify-center p-6 md:p-8 text-center border-0 bg-background">
              <div className="mb-6 rounded-full overflow-hidden w-16 h-16 md:w-20 md:h-20 mx-auto">
                <CustomImage
                  src="/placeholder.svg?height=80&width=80&text=Ahmed"
                  alt="Ahmed's photo"
                  height="80"
                  width="80"
                  fill={false}
                  overlay={false}
                />
              </div>
              <blockquote className="text-lg md:text-xl italic mb-4">
                "My daughter was very sick and I had no money for the doctor.
                The health department helped us get free treatment. Now she's
                healthy and going to school again."
              </blockquote>
              <cite className="not-italic font-medium">
                — Ahmed Khan, Father of 3
              </cite>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className="h-full flex flex-col items-center justify-center p-6 md:p-8 text-center border-0 bg-background">
              <div className="mb-6 rounded-full overflow-hidden w-16 h-16 md:w-20 md:h-20 mx-auto">
                <CustomImage
                  src="/placeholder.svg?height=80&width=80&text=Fatima"
                  alt="Fatima's photo"
                  height="80"
                  width="80"
                  fill={false}
                  overlay={false}
                />
              </div>
              <blockquote className="text-lg md:text-xl italic mb-4">
                "After my husband died, I didn't know how to feed my children.
                The trust gives us monthly support and food packages. My kids
                are still in school because of their help."
              </blockquote>
              <cite className="not-italic font-medium">
                — Fatima Bibi, Widow with 4 children
              </cite>
            </Card>
          </CarouselItem>
          <CarouselItem>
            <Card className="h-full flex flex-col items-center justify-center p-6 md:p-8 text-center border-0 bg-background">
              <div className="mb-6 rounded-full overflow-hidden w-16 h-16 md:w-20 md:h-20 mx-auto">
                <CustomImage
                  src="/placeholder.svg?height=80&width=80&text=Ali"
                  alt="Ali's photo"
                  height="80"
                  width="80"
                  fill={false}
                  overlay={false}
                />
              </div>
              <blockquote className="text-lg md:text-xl italic mb-4">
                "I'm an orphan and had no money for my wedding. The marriage
                support department helped me with everything. Now I have my
                own family and I'm very grateful."
              </blockquote>
              <cite className="not-italic font-medium">
                — Muhammad Ali, Orphan
              </cite>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  </section>
);

export default TestimonialsCarousel; 