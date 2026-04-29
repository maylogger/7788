import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SITE_URL } from "@/components/open-graph-receipt"

const siteTitle = "7788 Receipt | 付款成功收據產生器"
const siteDescription =
  "快速建立、調整、下載乾淨俐落的付款成功收據截圖。"
const ogImageUrl = new URL("opengraph-image", SITE_URL).toString()

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: SITE_URL,
    siteName: "7788 Receipt",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "7788 Receipt 付款成功收據產生器",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [ogImageUrl],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="zh-Hant-TW"
      suppressHydrationWarning
      className="antialiased"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
