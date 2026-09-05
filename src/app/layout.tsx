import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "next-themes"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Cloud Verge | Engineering Scalable Systems & High-Performance Architecture",
  description:
    "Cloud Verge is a premium software agency based in Lahore, Pakistan delivering enterprise-grade backend systems, scalable web platforms, mobile applications, and DevOps solutions.",
  keywords: [
    "software agency",
    "web development",
    "backend architecture",
    "Django",
    "DevOps",
    "mobile apps",
    "cloud infrastructure",
    "API development",
    "Cloud Verge",
    "Lahore Pakistan",
  ],
  authors: [{ name: "Cloud Verge" }],
  openGraph: {
    title: "Cloud Verge | Engineering Scalable Systems",
    description: "Architects of high-throughput backend systems, robust REST/GraphQL APIs, and scalable cloud infrastructures.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  )
}
