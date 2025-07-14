import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CallToActionSection = () => (
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
              <Link href="/donate">Donate Money</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/20 font-medium hover:bg-white/20"
            >
              <Link href="/volunteer">Volunteer Your Time</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/20 font-medium hover:bg-white/20"
            >
              <Link href="/apply">Apply for Assistance</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
);

export default CallToActionSection; 