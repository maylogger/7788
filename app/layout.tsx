import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const SITE_URL = "https://7788.maylogger.com/"
const siteTitle = "7788 Receipt | 付款成功收據產生器"
const siteDescription = "快速建立、調整、下載乾淨俐落的付款成功收據截圖。"
const ogImage = new URL("og-image.png", SITE_URL)
ogImage.searchParams.set("timestamp", Date.now().toString())
const ogImageUrl = ogImage.toString()

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
    <html lang="zh-Hant-TW" suppressHydrationWarning className="antialiased">
      <head>
        <link rel="preconnect" href="https://rsms.me/" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://rsms.me/inter/inter.css"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
