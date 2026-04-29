import type { MetadataRoute } from "next"

import { SITE_URL } from "@/components/open-graph-receipt"

const siteOrigin = new URL(SITE_URL).origin

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "Facebot",
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    host: siteOrigin,
  }
}
