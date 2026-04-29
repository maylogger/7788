"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { domToPng } from "modern-screenshot"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Copy, Download, RefreshCw } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const FORM_STORAGE_KEY = "receipt-form-state"

const DEFAULT_FORM_STATE = {
  title: "付款成功",
  orderNumber: "",
  shopName: "∎∎∎∎",
  paymentMethod: "Send Tree Pay",
  itemName: "∎∎∎∎",
  amount: "960 + 110",
  total: "960110",
  unit: "單位 Unit：新台幣 NTD",
}

type ReceiptFormState = typeof DEFAULT_FORM_STATE

function generateOrderNumber() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  return Array.from(
    { length: 20 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("")
}

function formatNumber(n: number) {
  return n.toLocaleString("en-US")
}

export default function Page() {
  const [form, setForm] = useState<ReceiptFormState>(DEFAULT_FORM_STATE)
  const [hasLoadedStoredForm, setHasLoadedStoredForm] = useState(false)

  useEffect(() => {
    const storedForm = window.localStorage.getItem(FORM_STORAGE_KEY)

    if (!storedForm) {
      setForm({ ...DEFAULT_FORM_STATE, orderNumber: generateOrderNumber() })
      setHasLoadedStoredForm(true)
      return
    }

    try {
      const parsedForm = JSON.parse(storedForm) as Partial<ReceiptFormState>

      setForm({
        ...DEFAULT_FORM_STATE,
        ...parsedForm,
        orderNumber: parsedForm.orderNumber ?? generateOrderNumber(),
      })
    } catch {
      window.localStorage.removeItem(FORM_STORAGE_KEY)
      setForm({ ...DEFAULT_FORM_STATE, orderNumber: generateOrderNumber() })
    }

    setHasLoadedStoredForm(true)
  }, [])

  useEffect(() => {
    if (!hasLoadedStoredForm) return

    const timeoutId = window.setTimeout(() => {
      window.localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(form))
    }, 500)

    return () => window.clearTimeout(timeoutId)
  }, [form, hasLoadedStoredForm])

  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const receiptRef = useRef<HTMLDivElement>(null)

  const updateFormField = useCallback(
    <K extends keyof ReceiptFormState>(
      field: K,
      value: ReceiptFormState[K]
    ) => {
      setForm((currentForm) => ({ ...currentForm, [field]: value }))
    },
    []
  )

  const handleResetForm = useCallback(() => {
    window.localStorage.removeItem(FORM_STORAGE_KEY)
    setForm({ ...DEFAULT_FORM_STATE, orderNumber: generateOrderNumber() })
  }, [])

  const getReceiptPng = useCallback(async () => {
    if (!receiptRef.current) return null
    return domToPng(receiptRef.current, { scale: 2 })
  }, [])

  const handleDownload = useCallback(async () => {
    const dataUrl = await getReceiptPng()
    if (!dataUrl) return
    const link = document.createElement("a")
    link.download = `receipt-${form.orderNumber}.png`
    link.href = dataUrl
    link.click()
    setDownloading(true)
    setTimeout(() => setDownloading(false), 2000)
  }, [form.orderNumber, getReceiptPng])

  const handleCopy = useCallback(async () => {
    const dataUrl = await getReceiptPng()
    if (!dataUrl) return
    const res = await fetch(dataUrl)
    const blob = await res.blob()
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [getReceiptPng])

  return (
    <div
      className={cn(
        "flex min-h-svh flex-col md:flex-row",
        !hasLoadedStoredForm && "pointer-events-none opacity-0"
      )}
    >
      {/* Sidebar */}
      <aside className="order-2 w-full shrink-0 space-y-5 overflow-y-auto border-b bg-muted/30 p-6 md:order-1 md:w-72 md:border-r md:border-b-0">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
          設定
        </h2>

        <div className="space-y-1.5">
          <Label htmlFor="title">標題</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => updateFormField("title", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="orderNumber">訂單編號</Label>
          <div className="relative">
            <Input
              id="orderNumber"
              value={form.orderNumber}
              onChange={(e) => updateFormField("orderNumber", e.target.value)}
              className="pr-8"
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={() =>
                updateFormField("orderNumber", generateOrderNumber())
              }
            >
              <RefreshCw className="size-4" />
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="shopName">商店名稱</Label>
          <Input
            id="shopName"
            value={form.shopName}
            onChange={(e) => updateFormField("shopName", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="paymentMethod">付款方式</Label>
          <Input
            id="paymentMethod"
            value={form.paymentMethod}
            onChange={(e) => updateFormField("paymentMethod", e.target.value)}
          />
        </div>

        <Separator />

        <div className="space-y-1.5">
          <Label htmlFor="unit">幣別</Label>
          <Input
            id="unit"
            value={form.unit}
            onChange={(e) => updateFormField("unit", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="itemName">商品明細</Label>
          <Input
            id="itemName"
            value={form.itemName}
            onChange={(e) => updateFormField("itemName", e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="amount">金額</Label>
          <Input
            id="amount"
            value={form.amount}
            onChange={(e) => updateFormField("amount", e.target.value)}
            placeholder="例: 960 + 110"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="total">應付金額</Label>
          <Input
            id="total"
            value={form.total}
            onChange={(e) => updateFormField("total", e.target.value)}
          />
        </div>

        <button
          type="button"
          className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          onClick={handleResetForm}
        >
          恢復預設值
        </button>
      </aside>

      {/* Preview */}
      <main className="order-1 flex flex-1 flex-col items-center gap-4 p-4 md:order-2 md:p-10">
        <div
          ref={receiptRef}
          className="light w-full max-w-md space-y-2 border border-border/20 bg-white p-8 text-foreground shadow-lg"
          style={
            {
              "--background": "oklch(1 0 0)",
              "--foreground": "oklch(0.145 0 0)",
              "--muted": "oklch(0.97 0 0)",
              "--muted-foreground": "oklch(0.556 0 0)",
              "--border": "oklch(0.922 0 0)",
            } as React.CSSProperties
          }
        >
          {/* Title */}
          <h1 className="text-center text-2xl font-bold">{form.title}</h1>

          {/* Table 1: Order Info */}
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="bg-muted/50">訂單編號</TableCell>
                <TableCell>{form.orderNumber || "—"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-muted/50">商店名稱</TableCell>
                <TableCell>{form.shopName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-muted/50">付款方式</TableCell>
                <TableCell>{form.paymentMethod}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Table 2: Item Details */}
          <div className="flex justify-end px-2 pt-2">
            <span className="text-xs text-muted-foreground">{form.unit}</span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-muted/50">商品明細</TableHead>
                <TableHead className="bg-muted/50 text-right">小計</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{form.itemName}</TableCell>
                <TableCell className="text-right">{form.amount}</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter className="border-t-3 border-t-[oklch(0.5_0_0)] bg-transparent">
              <TableRow>
                <TableCell>應付金額</TableCell>
                <TableCell className="text-right text-lg">
                  {formatNumber(Number(form.total) || 0)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div className="flex w-full max-w-md gap-2">
          <Button variant="outline" className="flex-1" onClick={handleDownload}>
            {downloading ? (
              <Check className="mr-2 size-4" />
            ) : (
              <Download className="mr-2 size-4" />
            )}
            {downloading ? "Downloaded!" : "Download PNG"}
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleCopy}>
            {copied ? (
              <Check className="mr-2 size-4" />
            ) : (
              <Copy className="mr-2 size-4" />
            )}
            {copied ? "Copied!" : "Copy PNG"}
          </Button>
        </div>
      </main>
    </div>
  )
}
