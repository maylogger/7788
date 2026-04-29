"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { RefreshCw } from "lucide-react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const CURRENCIES = [
  { code: "NTD", label: "新台幣 NTD", symbol: "NT$" },
  { code: "USD", label: "美元 USD", symbol: "$" },
  { code: "JPY", label: "日圓 JPY", symbol: "¥" },
  { code: "EUR", label: "歐元 EUR", symbol: "€" },
  { code: "GBP", label: "英鎊 GBP", symbol: "£" },
  { code: "CNY", label: "人民幣 CNY", symbol: "¥" },
]

function generateOrderNumber() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  return Array.from({ length: 20 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

function formatNumber(n: number) {
  return n.toLocaleString("en-US")
}

export default function Page() {
  const [title, setTitle] = useState("付款成功")
  const [orderNumber, setOrderNumber] = useState("")

  useEffect(() => {
    setOrderNumber(generateOrderNumber())
  }, [])
  const [shopName, setShopName] = useState("台灣民眾黨")
  const [paymentMethod, setPaymentMethod] = useState("Send Tree Pay")
  const [itemName, setItemName] = useState("民眾黨捐款")
  const [amount, setAmount] = useState("77 + 88")
  const [total, setTotal] = useState("960110")
  const [currency, setCurrency] = useState("NTD")

  const currencyInfo = CURRENCIES.find((c) => c.code === currency)!

  return (
    <div className="flex min-h-svh">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 border-r bg-muted/30 p-6 space-y-5 overflow-y-auto">
        <h2 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">設定</h2>

        <div className="space-y-1.5">
          <Label htmlFor="title">標題</Label>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="orderNumber">訂單編號</Label>
          <div className="relative">
            <Input id="orderNumber" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} className="pr-8" />
            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setOrderNumber(generateOrderNumber())}>
              <RefreshCw className="size-4" />
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="shopName">商店名稱</Label>
          <Input id="shopName" value={shopName} onChange={(e) => setShopName(e.target.value)} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="paymentMethod">付款方式</Label>
          <Input id="paymentMethod" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
        </div>

        <Separator />

        <div className="space-y-1.5">
          <Label htmlFor="currency">幣別</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger id="currency">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((c) => (
                <SelectItem key={c.code} value={c.code}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="itemName">商品名稱</Label>
          <Input id="itemName" value={itemName} onChange={(e) => setItemName(e.target.value)} />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="amount">金額</Label>
          <Input id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="例: 77 + 88" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="total">應付金額</Label>
          <Input id="total" value={total} onChange={(e) => setTotal(e.target.value)} />
        </div>
      </aside>

      {/* Preview */}
      <main className="flex-1 flex items-start justify-center p-10">
        <div className="light w-full max-w-md space-y-6 border border-border/20 bg-white text-foreground shadow-lg p-8" style={{ "--background": "oklch(1 0 0)", "--foreground": "oklch(0.141 0.005 285.823)", "--muted": "oklch(0.967 0.001 286.375)", "--muted-foreground": "oklch(0.552 0.016 285.938)", "--border": "oklch(0.60 0.004 286.32)" } as React.CSSProperties}>
          {/* Title */}
          <h1 className="text-2xl font-bold text-center">{title}</h1>

          {/* Table 1: Order Info */}
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="bg-muted/50">訂單編號</TableCell>
                <TableCell>{orderNumber || "—"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-muted/50">商店名稱</TableCell>
                <TableCell>{shopName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="bg-muted/50">付款方式</TableCell>
                <TableCell>{paymentMethod}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Table 2: Item Details */}
          <div className="flex justify-end px-2 pt-2">
            <span className="text-xs text-muted-foreground">
              單位 Unit：{currencyInfo.label}
            </span>
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
                <TableCell>{itemName}</TableCell>
                <TableCell className="text-right font-mono">
                  {amount}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter className="border-t-2 bg-transparent">
              <TableRow>
                <TableCell>應付金額</TableCell>
                <TableCell className="text-right font-mono text-lg">
                  {currencyInfo.symbol}{formatNumber(Number(total) || 0)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </main>
    </div>
  )
}
