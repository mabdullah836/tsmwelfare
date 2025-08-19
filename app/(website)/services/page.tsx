'use client'

import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Heart, 
  BookOpen, 
  Target,
  Handshake,
  ChevronRight,
  Zap,
  Sparkles,
  Award
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import FeatureCard from '@/components/services/FeatureCard'
import { PageHeader } from '@/components/page-header'
import { ReusableCarousel } from '@/components/shared/carousel'

export default function ServicesPage() {
  const seviceData = [
    {
      title: "Community Garden Initiative",
      description: "Our urban garden now provides fresh produce to 200+ families each month while teaching sustainable practices.",
      image: "/images/garden-project.jpg"
    },
    {
      title: "Youth Mentorship Program",
      description: "87% of participants showed improved academic performance and self-confidence after one year.",
      image: "/images/youth-mentorship.jpg"
    },
    {
      title: "Senior Companion Services",
      description: "Helping older adults remain independent with weekly check-ins and assistance.",
      image: "/images/senior-services.jpg"
    }
  ]

  const tabsData = [
    {
      id: "community",
      label: "Community",
      icon: <Users className="h-5 w-5 mr-2" />,
      badge: "Community Focus",
      badgeIcon: <Target className="h-4 w-4 text-primary" />,
      title: "Community Outreach",
      description: "Our community programs bring people together through events, support services, and neighborhood initiatives that strengthen social bonds and improve quality of life.",
      image: "/images/community.png",
      imageAlt: "Community members at an outdoor event",
      imageCaption: "Building Stronger Communities",
      imageSubtext: "Through collaboration and shared purpose",
      features: [
        {
          icon: <Users className="h-6 w-6" />,
          title: "Monthly Events",
          description: "Food drives, cultural celebrations, and educational workshops",
          gradient: "from-primary/5 to-transparent",
          border: "border-primary/20",
          iconBg: "from-primary to-blue-600"
        },
        {
          icon: <Handshake className="h-6 w-6" />,
          title: "Support Services", 
          description: "Emergency assistance and resource coordination",
          gradient: "from-blue-500/5 to-transparent",
          border: "border-blue-500/20",
          iconBg: "from-blue-600 to-primary"
        }
      ],
      ctaText: "Learn About Our Programs",
      ctaLink: "/community-programs"
    },
    {
      id: "education",
      label: "Education",
      icon: <BookOpen className="h-5 w-5 mr-2" />,
      badge: "Education Focus",
      badgeIcon: <BookOpen className="h-4 w-4 text-blue-600" />,
      title: "Education Initiatives",
      description: "We provide learning opportunities for all ages, from literacy programs to vocational training, helping community members gain skills for better futures.",
      image: "/images/education-program.jpg",
      imageAlt: "Students learning in a classroom",
      imageCaption: "Empowering Through Education",
      imageSubtext: "Knowledge opens doors to opportunity",
      imageOrder: "order-2 md:order-1",
      contentOrder: "order-1 md:order-2",
      features: [
        "After-school tutoring programs",
        "Adult education and GED preparation",
        "Digital literacy workshops"
      ],
      ctaText: "View Education Opportunities",
      ctaLink: "/education-programs",
      ctaGradient: "from-blue-600 to-primary"
    },
    {
      id: "environment",
      label: "Environment",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path><path d="M8.5 8.5v.01"></path><path d="M16 15.5v.01"></path><path d="M12 12v.01"></path><path d="M11 17v.01"></path><path d="M7 14v.01"></path></svg>,
      title: "Environmental Programs Coming Soon",
      description: "We're developing initiatives to promote sustainability and environmental awareness in our community.",
      ctaText: "Get Updates",
      ctaLink: "/contact",
      ctaVariant: "outline",
      isComingSoon: true
    },
    {
      id: "health",
      label: "Health",
      icon: <Heart className="h-5 w-5 mr-2" />,
      title: "Health & Wellness Services",
      description: "Our health initiatives provide access to medical care, mental health support, and wellness education for underserved populations.",
      image: "/images/health-services.jpg",
      imageAlt: "Medical professional assisting patient",
      healthCards: [
        {
          icon: <Heart className="h-8 w-8 mx-auto text-primary mb-2" />,
          title: "Free Health Screenings"
        },
        {
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 mx-auto text-primary mb-2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>,
          title: "Mental Health Support"
        }
      ],
      ctaText: "View Health Programs",
      ctaLink: "/health-services"
    },
    {
      id: "youth",
      label: "Youth",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
      title: "Youth Development Programs",
      description: "We empower young people through mentorship, skill-building activities, and leadership opportunities.",
      ctaButtons: [
        { text: "Learn More", link: "/youth-programs", variant: "default" },
        { text: "Become a Mentor", link: "/volunteer", variant: "outline" }
      ],
      isComingSoon: true
    }
  ]

  const featureCardsData = [
    {
      title: "Direct Services",
      description: "Providing immediate assistance to individuals and families in need through our various programs.",
      icon: <Heart className="h-8 w-8 text-primary" />,
    },
    {
      title: "Education & Training",
      description: "Offering workshops, classes, and resources to help people develop new skills and knowledge.",
      icon: <BookOpen className="h-8 w-8 text-primary" />,
    },
    {
      title: "Advocacy",
      description: "Working to address systemic issues and create positive change at the community and policy levels.",
      icon: <Award className="h-8 w-8 text-primary" />,
    },
    {
      title: "Community Building",
      description: "Creating opportunities for connection and collaboration to strengthen our community.",
      icon: <Users className="h-8 w-8 text-primary" />,
    },
    {
      title: "Resource Coordination",
      description: "Connecting people with the services and support they need, both within our organization and beyond.",
      icon: <Handshake className="h-8 w-8 text-primary" />,
    },
    {
      title: "Volunteer Engagement",
      description: "Engaging community members in meaningful service that makes a difference.",
      icon: <Users className="h-8 w-8 text-primary" />,
    }
  ]

  return (
    <>
      <PageHeader title="Our Services">
        <p className="text-xl text-white/90 max-w-2xl">
          Discover the various ways we're working to make a positive impact in our community through comprehensive support programs.
        </p>
      </PageHeader>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-blue-500/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        
        <div className="container relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/20 to-blue-500/20 backdrop-blur-sm border border-primary/30 text-primary rounded-full mb-6 font-semibold"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Sparkles className="h-4 w-4" />
              Our Focus Areas
            </motion.div>
            <motion.h2 
              className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Transforming Communities Through{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">Targeted Services</span>
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary to-blue-600 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
              </span>
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              Each program is designed to address specific needs while fostering long-term growth and resilience through innovative approaches and community collaboration.
            </motion.p>
          </motion.div>

          <Tabs defaultValue="community" className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <TabsList className="w-full flex-nowrap whitespace-nowrap p-3 rounded-2xl bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-xl border border-border/50 shadow-2xl mb-20 gap-3 scrollbar-thin scrollbar-thumb-primary/30 scrollbar-track-transparent min-h-[72px]">
                {tabsData.map((tab) => (
                  <TabsTrigger 
                    key={tab.id}
                    value={tab.id} 
                    className="px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 hover:bg-primary/10"
                  >
                    {tab.icon}
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            {/* Dynamic Tab Content */}
            {tabsData.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-8">
                {tab.isComingSoon && !tab.image ? (
                  // Coming Soon Layout
                  <motion.div 
                    className="text-center py-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="max-w-3xl mx-auto">
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full mb-8">
                        <Zap className="h-5 w-5 text-primary" />
                        <span className="font-medium text-primary">Coming Soon</span>
                      </div>
                      <h3 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">{tab.title}</h3>
                      <p className="text-xl mb-8 text-muted-foreground leading-relaxed">
                        {tab.description}
                      </p>
                      {tab.ctaButtons ? (
                        <div className="flex justify-center gap-4">
                          {tab.ctaButtons.map((button, index) => (
                            <Button 
                              key={index}
                              asChild 
                              variant={button.variant as any}
                              className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-3 text-lg font-semibold rounded-xl"
                            >
                              <Link href={button.link}>{button.text}</Link>
                            </Button>
                          ))}
                        </div>
                      ) : (
                        <Button asChild variant={tab.ctaVariant as any || "default"}>
                          <Link href={tab.ctaLink}>{tab.ctaText}</Link>
                        </Button>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  // Full Content Layout
                  <motion.div 
                    className="grid md:grid-cols-2 gap-16 items-center"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <motion.div
                      className={tab.contentOrder || ""}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {tab.badge && (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full mb-6">
                          {tab.badgeIcon}
                          <span className="text-sm font-medium text-primary">{tab.badge}</span>
                        </div>
                      )}
                      <h3 className={`text-4xl font-bold mb-6 bg-gradient-to-r ${tab.ctaGradient || 'from-primary to-blue-600'} bg-clip-text text-transparent`}>
                        {tab.title}
                      </h3>
                      <p className="text-xl mb-8 text-muted-foreground leading-relaxed">
                        {tab.description}
                      </p>
                      
                      {/* Features Section */}
                      {tab.features && Array.isArray(tab.features) && tab.features.length > 0 && typeof tab.features[0] === 'object' ? (
                        <div className="space-y-6 mb-10">
                          {(tab.features as any[]).map((feature: any, index: number) => (
                            <motion.div 
                              key={index}
                              className={`flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r ${feature.gradient} border ${feature.border}`}
                              whileHover={{ scale: 1.02, x: 10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className={`flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-r ${feature.iconBg} text-white shadow-lg`}>
                                {feature.icon}
                              </div>
                              <div>
                                <h4 className="font-bold text-lg mb-1">{feature.title}</h4>
                                <p className="text-muted-foreground">{feature.description}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : tab.features && Array.isArray(tab.features) ? (
                        <div className="space-y-4 mb-10">
                          {(tab.features as string[]).map((feature: string, index: number) => (
                            <motion.div
                              key={index}
                              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                              whileHover={{ x: 10 }}
                            >
                              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-600 to-primary" />
                              <span className="font-medium">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      ) : tab.healthCards ? (
                        <div className="grid grid-cols-2 gap-6 mb-10">
                          {tab.healthCards.map((card: any, index: number) => (
                            <motion.div 
                              key={index}
                              className="border-0 rounded-2xl p-6 text-center bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                              whileHover={{ scale: 1.05, y: -5 }}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                            >
                              {card.icon}
                              <p className="font-bold text-lg">{card.title}</p>
                            </motion.div>
                          ))}
                        </div>
                      ) : null}
                      
                      {tab.ctaLink && (
                        <Button asChild className={`bg-gradient-to-r ${tab.ctaGradient || 'from-primary to-blue-600'} hover:from-primary/90 hover:to-blue-600/90 text-white shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-3 text-lg font-semibold rounded-xl`}>
                          <Link href={tab.ctaLink} className="flex items-center gap-2">
                            {tab.ctaText}
                            <ChevronRight className="h-5 w-5" />
                          </Link>
                        </Button>
                      )}
                    </motion.div>
                    
                    {tab.image && (
                      <motion.div 
                        className={`relative h-[500px] rounded-2xl overflow-hidden border-0 shadow-2xl ${tab.imageOrder || ""}`}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                        <Image
                          src={tab.image}
                          alt={tab.imageAlt || tab.title}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                        />
                        {tab.imageCaption && (
                          <div className="absolute bottom-6 left-6 right-6 z-20">
                            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                              <h4 className="font-bold text-lg mb-1">{tab.imageCaption}</h4>
                              <p className="text-sm text-muted-foreground">{tab.imageSubtext}</p>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-secondary/20 to-background">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 font-medium">
              Our Approach
            </span>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Comprehensive <span className="text-primary">Support Systems</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We employ multiple strategies to create meaningful, lasting change in people's lives.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCardsData.map((card, index) => (
              <FeatureCard
                key={index}
                title={card.title}
                description={card.description}
                icon={card.icon}
                className="hover:shadow-lg transition-all border-0 bg-background"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-4 font-medium">
              Impact Stories
            </span>
            <h2 className="text-4xl font-bold tracking-tight mb-4">
              Service <span className="text-primary">Highlights</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See how our programs are making a real difference in people's lives.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <ReusableCarousel
              variant="story"
              height="h-[500px]"
              items={seviceData}
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl text-white/90 mb-8">
              Whether you need support or want to join our mission, we're here to help you take the next step.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" variant="secondary" className="font-medium shadow-lg">
                <Link href="/contact">Get Help</Link>
              </Button>
              <Button asChild size="lg" className="font-medium bg-white text-primary hover:bg-primary hover:text-white border-2 border-white shadow-lg transition-colors">
                <Link href="/volunteer">Volunteer</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}