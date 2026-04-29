import { ImageResponse } from "next/og"

import {
  OPEN_GRAPH_IMAGE_SIZE,
  OpenGraphReceipt,
} from "@/components/open-graph-receipt"

export const alt = "7788 Receipt 付款成功收據產生器"
export const size = OPEN_GRAPH_IMAGE_SIZE
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(<OpenGraphReceipt />, {
    ...OPEN_GRAPH_IMAGE_SIZE,
  })
}
