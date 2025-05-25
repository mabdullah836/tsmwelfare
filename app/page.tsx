import Image from "next/image"
import { Carousel } from "@/components/carousel"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, BookOpen, Home, Stethoscope, ArrowRight, DollarSign, FileText, HandHeart } from "lucide-react"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { DonationCounter } from "@/components/donation-counter"
import { UpcomingEvents } from "@/components/upcoming-events"
import { Typewriter } from "@/components/typewriter"

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Real Images */}
      <section className="bg-background py-12 md:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px]">
            {/* Left side - Text Content */}
            <div className="order-2 lg:order-1 space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Bringing <span className="text-primary">Hope</span> and <span className="text-primary">Help</span> to
                  Local Communities
                </h1>

                <div className="text-xl md:text-2xl font-semibold">
                  <span className="text-muted-foreground">We are dedicated to providing </span>
                  <span className="text-blue-600">
                    <Typewriter
                      words={[
                        "free medical care for families",
                        "food for hungry children",
                        "education for every child",
                        "financial help to needy families",
                        "hope for a better tomorrow",
                      ]}
                      typingSpeed={80}
                      deletingSpeed={40}
                      delayBetweenWords={2000}
                    />
                  </span>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  For over a decade, we have been working directly with communities, reaching families in remote areas
                  and providing essential services that make a real difference in people's daily lives.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="font-medium">
                  <a href="/services">See Our Work</a>
                </Button>
                <Button variant="outline" size="lg" className="font-medium">
                  <a href="/donate" className="flex items-center gap-2">
                    Join Our Mission
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Right side - Real Work Images */}
            <div className="order-1 lg:order-2 relative h-[400px] md:h-[500px] lg:h-[600px]">
              <Card className="relative h-full w-full overflow-hidden border-0 shadow-2xl">
                <Image
                  src="/images/welfare-work-collage.jpeg"
                  alt="Our welfare work in action - medical care, food distribution, and community support"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <Badge variant="secondary" className="bg-black/50 text-white border-0">
                    Real work, Real impact
                  </Badge>
                </div>
              </Card>
            </div>

            {/* Mobile-only simplified image */}
            <div className="order-1 lg:order-2 lg:hidden">
              <Card className="relative h-[300px] overflow-hidden border-0 shadow-2xl">
                <Image
                  src="/images/welfare-work-collage.jpeg"
                  alt="Our community welfare work"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="bg-black/50 text-white border-0">
                    Making a difference every day
                  </Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Name in Arabic/Urdu */}
      <section className="py-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
        <div className="container">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-emerald-700 dark:text-emerald-400" dir="rtl">
              صراط مستقیم ویلفیئر ٹرسٹ
            </h2>
          </div>
        </div>
      </section>

      {/* Our Departments Section */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Departments</h2>
            <p className="text-lg text-muted-foreground">
              We have different departments that work together to help people in our community. Each department focuses
              on specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Stethoscope className="h-6 w-6" />
                </div>
                <CardTitle>Department of Health</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We organize free medical camps in villages where doctors are hard to find. When we have enough funds
                  and volunteers, we visit remote areas and provide basic medicines to families who can't afford
                  treatment.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <CardTitle>Food for Poor People</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Every week we distribute food packages to families who don't have enough to eat. During Ramadan, we
                  give special ration bags to over 500 families in our area.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <DollarSign className="h-6 w-6" />
                </div>
                <CardTitle>Financial Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  When families face emergencies like hospital bills or house repairs, we help them with money. We also
                  give monthly support to widows and elderly people who have no income.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <CardTitle>Department of Education</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We pay school fees for children whose parents can't afford education. We also provide books, uniforms,
                  and bags to students. Our dream is to build our own school one day to provide free education to poor
                  children.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Home className="h-6 w-6" />
                </div>
                <CardTitle>Marriage Support for Orphan Girls</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We help orphan girls who have no earning person in their family when they want to get married. We
                  cover all wedding expenses including clothes, jewelry, and ceremony costs. This support is only for
                  girls who are truly alone.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle>Department of Muqadas Awraq</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We collect old and damaged Quran pages from mosques and homes to dispose of them properly according to
                  Islamic way. We also distribute free copies of Holy Quran and organize Quran classes for children.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gaza Palestine Support Section */}
      <section className="py-12 md:py-20 bg-red-50 dark:bg-red-950/20">
        <div className="container">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="flex items-center justify-center mb-4">
              <HandHeart className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold text-red-800 dark:text-red-200">
                Emergency Support for Gaza Palestine
              </h2>
            </div>
            <p className="text-lg text-red-700 dark:text-red-300 mb-6">
              Our brothers and sisters in Gaza need our urgent help. We are collecting donations to send emergency aid
              to families who are suffering.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
            <div className="space-y-6">
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="text-red-800 dark:text-red-200">What We're Doing for Gaza</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-600 mt-2"></div>
                    <p>Collecting donations from our community to send emergency food packages</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-600 mt-2"></div>
                    <p>Working with trusted organizations to deliver aid directly to Gaza families</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-600 mt-2"></div>
                    <p>Organizing special prayer gatherings for our Palestinian brothers and sisters</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-600 mt-2"></div>
                    <p>Raising awareness in our local community about the situation in Gaza</p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-medium">
                  <a href="/donate?type=gaza" className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Donate for Gaza Now
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="border-red-600 text-red-600 hover:bg-red-50 font-medium">
                  <a href="/gaza-updates">Get Updates</a>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <Card className="relative h-[250px] overflow-hidden border-0">
                <Image
                  src="/images/gaza-appeal.jpeg"
                  alt="Gaza Palestine Emergency Appeal - Send Aid to Gaza & Save Lives Today"
                  fill
                  className="object-cover"
                />
              </Card>
              <div className="grid grid-cols-2 gap-4">
                <Card className="relative h-[120px] overflow-hidden border-0">
                  <Image
                    src="/images/gaza-solidarity.jpeg"
                    alt="Palestine solidarity with Al-Aqsa Mosque and Palestinian flags"
                    fill
                    className="object-cover"
                  />
                </Card>
                <Card className="relative h-[120px] overflow-hidden border-0">
                  <Image
                    src="/images/gaza-child.jpeg"
                    alt="Child in Gaza receiving food aid - showing the urgent humanitarian need"
                    fill
                    className="object-cover"
                  />
                </Card>
              </div>
            </div>
          </div>

          <Card className="bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-2">
                  Every Donation Counts - No Matter How Small
                </h3>
                <p className="text-red-700 dark:text-red-300 mb-4">
                  Even Rs. 500 can provide a meal for a hungry family in Gaza. Your donation will be sent through
                  trusted Islamic relief organizations to ensure it reaches those who need it most.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white dark:bg-red-800 p-3 rounded-lg">
                    <p className="font-bold text-red-800 dark:text-red-200">Rs. 500</p>
                    <p className="text-sm text-red-600 dark:text-red-300">One Family Meal</p>
                  </div>
                  <div className="bg-white dark:bg-red-800 p-3 rounded-lg">
                    <p className="font-bold text-red-800 dark:text-red-200">Rs. 2,000</p>
                    <p className="text-sm text-red-600 dark:text-red-300">Food Package</p>
                  </div>
                  <div className="bg-white dark:bg-red-800 p-3 rounded-lg">
                    <p className="font-bold text-red-800 dark:text-red-200">Rs. 5,000</p>
                    <p className="text-sm text-red-600 dark:text-red-300">Medical Supplies</p>
                  </div>
                  <div className="bg-white dark:bg-red-800 p-3 rounded-lg">
                    <p className="font-bold text-red-800 dark:text-red-200">Rs. 10,000</p>
                    <p className="text-sm text-red-600 dark:text-red-300">Emergency Kit</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-secondary py-12 md:py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Say About Us</h2>
            <p className="text-lg text-muted-foreground">
              These are real stories from people we've helped. They tell us how our work has changed their lives.
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
                  <Image
                    src="/placeholder.svg?height=80&width=80&text=Ahmed"
                    alt="Ahmed's photo"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <blockquote className="text-lg md:text-xl italic mb-4">
                  "My daughter was very sick and I had no money for the doctor. The health department helped us get free
                  treatment. Now she's healthy and going to school again."
                </blockquote>
                <cite className="not-italic font-medium">— Ahmed Khan, Father of 3</cite>
              </Card>,
              <Card
                key="2"
                className="h-full flex flex-col items-center justify-center p-6 md:p-8 text-center border-0 bg-background"
              >
                <div className="mb-6 rounded-full overflow-hidden w-16 h-16 md:w-20 md:h-20 mx-auto">
                  <Image
                    src="/placeholder.svg?height=80&width=80&text=Fatima"
                    alt="Fatima's photo"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <blockquote className="text-lg md:text-xl italic mb-4">
                  "After my husband died, I didn't know how to feed my children. The trust gives us monthly support and
                  food packages. My kids are still in school because of their help."
                </blockquote>
                <cite className="not-italic font-medium">— Fatima Bibi, Widow with 4 children</cite>
              </Card>,
              <Card
                key="3"
                className="h-full flex flex-col items-center justify-center p-6 md:p-8 text-center border-0 bg-background"
              >
                <div className="mb-6 rounded-full overflow-hidden w-16 h-16 md:w-20 md:h-20 mx-auto">
                  <Image
                    src="/placeholder.svg?height=80&width=80&text=Ali"
                    alt="Ali's photo"
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <blockquote className="text-lg md:text-xl italic mb-4">
                  "I'm an orphan and had no money for my wedding. The marriage support department helped me with
                  everything. Now I have my own family and I'm very grateful."
                </blockquote>
                <cite className="not-italic font-medium">— Muhammad Ali, Orphan</cite>
              </Card>,
            ]}
          />
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How Many People We've Helped</h2>
            <p className="text-lg text-muted-foreground">
              These numbers show the real impact of our work in the community over the years.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "2,500+", label: "Families Fed" },
              { value: "800+", label: "Students Supported" },
              { value: "150+", label: "Medical Camps" },
              { value: "50+", label: "Marriages Supported" },
            ].map((stat, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="p-0">
                  <p className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</p>
                  <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <DonationCounter />

      <UpcomingEvents />

      {/* Current Projects */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">What We're Working on Right Now</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                These are our main projects this year. We need your help to make them successful.
              </p>
              <div className="space-y-4">
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge
                      variant="secondary"
                      className="h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold"
                    >
                      1
                    </Badge>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Free Medical Camps in Remote Villages</h3>
                      <p className="text-muted-foreground">
                        We want to organize medical camps in villages where people can't reach doctors easily. Our goal
                        is to help 2000 people get free checkups and medicines this year.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge
                      variant="secondary"
                      className="h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold"
                    >
                      2
                    </Badge>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Education Support for 200 Children</h3>
                      <p className="text-muted-foreground">
                        We're trying to sponsor 200 poor children's education this year by paying their school fees and
                        buying books. Every child deserves to learn.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <Badge
                      variant="secondary"
                      className="h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs font-bold"
                    >
                      3
                    </Badge>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Monthly Food for 1000 Families</h3>
                      <p className="text-muted-foreground">
                        We want to provide monthly food packages to 1000 poor families throughout the year.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              <div className="mt-6">
                <Button asChild>
                  <a href="/services">Learn More About Our Work</a>
                </Button>
              </div>
            </div>
            <Card className="relative h-[300px] md:h-[400px] overflow-hidden border-0">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Community+Projects"
                alt="Our projects helping communities"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <Badge variant="secondary" className="bg-black/50 text-white border-0">
                  Building Better Communities
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

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
                There are many ways you can join us in making life better for people in need. Every little bit helps.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" variant="secondary" className="font-medium">
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
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
