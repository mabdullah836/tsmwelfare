import { OrganizationHeader } from "@/components/organization-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LogoShowcasePage() {
  return (
    <div className="container py-12 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Enhanced Logo Showcase</h1>
        <p className="text-lg text-muted-foreground">Professional branding variations for our organization</p>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Modern Professional Style</CardTitle>
            <CardDescription>Clean, contemporary design perfect for digital platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <OrganizationHeader variant="modern" size="lg" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enhanced Full Header</CardTitle>
            <CardDescription>Complete organization name with improved typography and gradients</CardDescription>
          </CardHeader>
          <CardContent>
            <OrganizationHeader variant="full" size="lg" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Premium Banner Style</CardTitle>
            <CardDescription>Perfect for page headers and hero sections</CardDescription>
          </CardHeader>
          <CardContent>
            <OrganizationHeader variant="banner" size="md" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Elegant Emblem Style</CardTitle>
            <CardDescription>Sophisticated design for certificates and official documents</CardDescription>
          </CardHeader>
          <CardContent>
            <OrganizationHeader variant="emblem" size="lg" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compact Navigation Style</CardTitle>
            <CardDescription>Space-efficient for navigation and mobile interfaces</CardDescription>
          </CardHeader>
          <CardContent>
            <OrganizationHeader variant="compact" size="md" />
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Small Size Variation</CardTitle>
            </CardHeader>
            <CardContent>
              <OrganizationHeader variant="modern" size="sm" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Extra Large Display</CardTitle>
            </CardHeader>
            <CardContent>
              <OrganizationHeader variant="modern" size="xl" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
