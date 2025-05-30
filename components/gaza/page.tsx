import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {  Heart, HandHeart } from "lucide-react"
import { CustomImage } from "../custom-image"
import { Button } from "../ui/button"

export default function GazaPage() {
  return (
    <>
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
              Our brothers and sisters in Gaza need our urgent help. We are
              collecting donations to send emergency aid to families who are
              suffering.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12">
            <div className="space-y-6">
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader>
                  <CardTitle className="text-red-800 dark:text-red-200">
                    What We're Doing for Gaza
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-600 mt-2"></div>
                    <p>
                      Collecting donations from our community to send emergency
                      food packages
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-600 mt-2"></div>
                    <p>
                      Working with trusted organizations to deliver aid directly
                      to Gaza families
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-600 mt-2"></div>
                    <p>
                      Organizing special prayer gatherings for our Palestinian
                      brothers and sisters
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-2 w-2 rounded-full bg-red-600 mt-2"></div>
                    <p>
                      Raising awareness in our local community about the
                      situation in Gaza
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white font-medium"
                >
                  <a
                    href="/donate?type=gaza"
                    className="flex items-center gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    Donate for Gaza Now
                  </a>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <CustomImage
                src="/images/gaza-appeal.jpeg"
                alt="Gaza Palestine Emergency Appeal - Send Aid to Gaza & Save Lives Today"
                className="h-[250px]"
                overlay={false}
              />
              <div className="grid grid-cols-2 gap-4">
                <CustomImage
                  src="/images/gaza-solidarity.jpeg"
                  alt="Palestine solidarity with Al-Aqsa Mosque and Palestinian flags"
                  className="h-[120px]"
                  overlay={false}
                />
                <CustomImage
                  src="/images/gaza-child.jpeg"
                  alt="Child in Gaza receiving food aid - showing the urgent humanitarian need"
                  className="h-[120px]"
                  overlay={false}
                />
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
                  Even Rs. 500 can provide a meal for a hungry family in Gaza.
                  Your donation will be sent through trusted Islamic relief
                  organizations to ensure it reaches those who need it most.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white dark:bg-red-800 p-3 rounded-lg">
                    <p className="font-bold text-red-800 dark:text-red-200">
                      Rs. 500
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      One Family Meal
                    </p>
                  </div>
                  <div className="bg-white dark:bg-red-800 p-3 rounded-lg">
                    <p className="font-bold text-red-800 dark:text-red-200">
                      Rs. 2,000
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      Food Package
                    </p>
                  </div>
                  <div className="bg-white dark:bg-red-800 p-3 rounded-lg">
                    <p className="font-bold text-red-800 dark:text-red-200">
                      Rs. 5,000
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      Medical Supplies
                    </p>
                  </div>
                  <div className="bg-white dark:bg-red-800 p-3 rounded-lg">
                    <p className="font-bold text-red-800 dark:text-red-200">
                      Rs. 10,000
                    </p>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      Emergency Kit
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

    </>
  )
}
