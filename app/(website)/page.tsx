import { Carousel } from "@/components/carousel";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NewsletterSignup } from "@/components/features/newsletter-signup";
import { DonationCounter } from "@/components/features/donation-counter";
import { UpcomingEvents } from "@/components/features/upcoming-events";
import { CustomImage } from "@/components/shared/custom-image";
import { ImpactStat } from "@/components/shared/impact-stat";
import DepartmentsPage from "./departments/page";
import GazaPage from "@/components/gaza/page";
import { HeroSection } from "@/components/Hero/page";

export default function HomePage() {
  return (
    <>
      <HeroSection/>
      <section className="py-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
        <div className="container">
          <div className="text-center">
            <h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-700 dark:text-emerald-400"
              dir="rtl"
            >
              صراط مستقیم ویلفیئر ٹرسٹ
            </h2>
          </div>
        </div>
      </section>

      <DepartmentsPage />
      <GazaPage />

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

          <Carousel
            className="h-[350px] md:h-[400px] max-w-4xl mx-auto"
            items={[
              <Card
                key="1"
                className="h-full flex flex-col items-center justify-center p-6 md:p-8 text-center border-0 bg-background"
              >
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
              </Card>,
              <Card
                key="2"
                className="h-full flex flex-col items-center justify-center p-6 md:p-8 text-center border-0 bg-background"
              >
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
              </Card>,
              <Card
                key="3"
                className="h-full flex flex-col items-center justify-center p-6 md:p-8 text-center border-0 bg-background"
              >
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
              </Card>,
            ]}
          />
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact Since 2016
            </h2>
            <p className="text-lg text-muted-foreground">
              For over {new Date().getFullYear() - 2016} years, The Sirat-e-Mustaqeem Welfare Trust has been making a real difference in our community.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <ImpactStat value={`${new Date().getFullYear() - 2016}+`} label="Years of Service" />
            <ImpactStat value="2,500+" label="Families Fed" />
            <ImpactStat value="800+" label="Students Supported" />
            <ImpactStat value="150+" label="Medical Camps" />
          </div>
        </div>
      </section>

      <DonationCounter />

      <UpcomingEvents />

      <NewsletterSignup />

      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground py-12 md:py-20">
        <div className="container">
          <Card className="max-w-3xl mx-auto text-center bg-transparent border-0">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl font-bold text-primary-foreground">
                Want to Help Us Help Others?
              </CardTitle>
              <CardDescription className="text-lg text-primary-foreground/90">
                There are many ways you can join us in making life better for
                people in need. Every little bit helps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="font-medium"
                >
                  <a href="/donate">Donate Money</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 font-medium hover:bg-white/20"
                >
                  <a href="/volunteer">Volunteer Your Time</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 font-medium hover:bg-white/20"
                >
                  <a href="/apply">Apply for Assistance</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
