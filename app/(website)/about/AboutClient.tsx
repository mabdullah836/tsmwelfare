"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "@/components/shared/typewriter";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Heart, Lightbulb } from "lucide-react";
import TeamGrid from "./TeamGrid";
import { Counter } from "@/components/shared/counter";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function AboutClient() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sirat-e-Mustaqeem Welfare Trust",
            "url": "https://www.smwelfare.org/",
            "logo": "/images/smw-logo-transparent.png",
            "description": "A non-profit organization in Pakistan dedicated to community service, education, healthcare, and food distribution.",
            "sameAs": [
              "https://www.facebook.com/smwelfare/"
            ]
          })
        }}
      />
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[70vh] overflow-hidden">
        <Image
          src="/images/about-hero.webp"
          alt="Community helping hands"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="container text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white mb-4"
            >
              Our Mission to <span className="text-primary">Serve</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto"
            >
              We are dedicated to{" "}
              <Typewriter
                words={[
                  "empowering communities",
                  "creating change",
                  "building futures",
                  "inspiring hope",
                ]}
                className="text-primary font-semibold"
              />
            </motion.p>
          </div>
        </div>
      </div>
      {/* Impact Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: 5000, label: "Lives Impacted", plus: true },
              { number: 2016, label: "Founded In", plus: false },
              { number: 12, label: "Programs", plus: true },
              { number: 50, label: "Volunteers", plus: true }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="p-6 rounded-lg bg-white/10 backdrop-blur-sm"
              >
                <div className="text-4xl font-bold mb-2">
                  <Counter from={0} to={stat.number} duration={2} />
                  {stat.plus && "+"}
                </div>
                <div className="text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Our Story Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="text-primary font-semibold mb-2">OUR JOURNEY</div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-lg mb-4">
                Founded in 2016, The Sirat-e-Mustaqeem Welfare Trust began with a simple mission: to guide people towards the straight path through service to humanity. What started as a small group of dedicated volunteers has grown into a thriving organization with a significant impact across communities.
              </p>
              <p className="text-lg mb-4">
                For over {new Date().getFullYear() - 2016} years, we've been committed to serving the needy and underprivileged. Through our various departments including healthcare, education, food distribution, and marriage support for orphans, we've touched thousands of lives.
              </p>
              <p className="text-lg mb-8">
                Today, The Sirat-e-Mustaqeem Welfare Trust continues to be guided by our founding principles of compassion, integrity, and Islamic values as we work to build a better future for all.
              </p>
              <Button variant="outline" size="lg">Learn More About Our Work</Button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/images/our-story.jpg"
                alt="Our organization's journey"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <div className="bg-white/90 text-black px-4 py-2 rounded-lg text-lg font-bold shadow-md">
                  {new Date().getFullYear() - 2016}+ Years of Service
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-muted to-background">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn} className="text-primary font-semibold mb-2">WHAT GUIDES US</motion.div>
            <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-4">Our Core Values</motion.h2>
            <motion.p variants={fadeIn} className="text-lg max-w-2xl mx-auto">
              These principles shape every decision we make and every action we take
            </motion.p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Compassion",
                description:
                  "We approach our work with empathy and understanding, recognizing the dignity of all people.",
                icon: <Heart className="h-8 w-8" />, color: "text-red-500"
              },
              {
                title: "Integrity",
                description: "We are committed to transparency, accountability, and ethical practices in all we do.",
                icon: <Award className="h-8 w-8" />, color: "text-blue-500"
              },
              {
                title: "Innovation",
                description:
                  "We embrace creative solutions and new approaches to address complex community challenges.",
                icon: <Lightbulb className="h-8 w-8" />, color: "text-yellow-500"
              },
              {
                title: "Collaboration",
                description: "We believe in the power of partnerships to create meaningful and lasting change.",
                icon: <Users className="h-8 w-8" />, color: "text-green-500"
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                whileHover={{ y: -10 }}
              >
                <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
                  <CardContent className="p-8">
                    <div className={`h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center ${value.color} mb-6`}>
                      {value.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Team Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeIn} className="text-primary font-semibold mb-2">OUR PEOPLE</motion.div>
            <motion.h2 variants={fadeIn} className="text-4xl font-bold mb-4">Meet Our Team</motion.h2>
            <motion.p variants={fadeIn} className="text-lg max-w-2xl mx-auto">
              Dedicated individuals working together to make a difference
            </motion.p>
          </motion.div>
          <TeamGrid />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link href="/volunteer">
            <Button size="lg">Join Our Team</Button>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8">
              Whether you want to volunteer, donate, or partner with us, we'd love to hear from you. Together, we can create lasting change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">Donate Now</Button>
              <Button variant="secondary" size="lg">Contact Us</Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
} 