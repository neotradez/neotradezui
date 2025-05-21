"use client"

import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ContactPage() {
  const router = useRouter()

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl">
        <Button
          variant="ghost"
          className="mb-6 -ml-2 flex h-8 items-center gap-1 px-2 text-muted-foreground"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back</span>
        </Button>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Contact Us</h1>
          <p className="mt-4 text-muted-foreground">
            We're here to help with any questions or concerns about NeoTradez.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>For all inquiries:</CardDescription>
              <p className="font-medium mt-1">info@neotradez.com</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                Phone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>Customer Support:</CardDescription>
              <p className="font-medium mt-1">929-494-5130</p>
              <CardDescription className="mt-4">Hours:</CardDescription>
              <p className="font-medium mt-1">Mon-Fri: 9AM - 6PM EST</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
