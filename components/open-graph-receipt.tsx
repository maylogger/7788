import type { CSSProperties } from "react"

export const SITE_URL = "https://7788receipt.vercel.app/"

export const OPEN_GRAPH_IMAGE_SIZE = {
  width: 1200,
  height: 630,
} as const

const receiptRows = [
  ["訂單編號", "7788-PAID-READY"],
  ["商店名稱", "****"],
  ["付款方式", "Send Tree Pay"],
] as const

const summaryRows = [
  ["商品明細", "收據截圖"],
  ["小計", "960 + 110"],
] as const

const styles = {
  frame: {
    position: "relative",
    display: "flex",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    background:
      "linear-gradient(135deg, #080808 0%, #161616 42%, #f3f0e8 42%, #f9f7f1 100%)",
    color: "#f9f7f1",
    fontFamily: "Inter, Noto Sans TC, sans-serif",
  },
  noise: {
    position: "absolute",
    inset: 0,
    display: "flex",
    backgroundImage:
      "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.18) 0, rgba(255,255,255,0) 28%), radial-gradient(circle at 78% 16%, rgba(255,255,255,0.2) 0, rgba(255,255,255,0) 24%), radial-gradient(circle at 62% 82%, rgba(0,0,0,0.18) 0, rgba(0,0,0,0) 30%)",
  },
  content: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    padding: "64px 76px",
  },
  hero: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 530,
    height: "100%",
  },
  badge: {
    display: "flex",
    alignSelf: "flex-start",
    border: "1px solid rgba(249,247,241,0.28)",
    borderRadius: 999,
    padding: "12px 18px",
    color: "rgba(249,247,241,0.82)",
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: 1.8,
  },
  titleBlock: {
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  title: {
    margin: 0,
    color: "#ffffff",
    fontSize: 86,
    fontWeight: 900,
    letterSpacing: -4,
    lineHeight: 0.95,
  },
  subtitle: {
    display: "flex",
    maxWidth: 485,
    color: "rgba(249,247,241,0.78)",
    fontSize: 30,
    fontWeight: 600,
    lineHeight: 1.32,
  },
  domain: {
    display: "flex",
    alignSelf: "flex-start",
    borderBottom: "2px solid rgba(249,247,241,0.48)",
    color: "rgba(249,247,241,0.9)",
    fontSize: 24,
    fontWeight: 700,
    letterSpacing: -0.4,
    paddingBottom: 8,
  },
  receiptShell: {
    display: "flex",
    flexDirection: "column",
    width: 455,
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 36,
    background: "#ffffff",
    boxShadow: "0 30px 90px rgba(0,0,0,0.22)",
    color: "#151515",
    overflow: "hidden",
  },
  receiptTop: {
    display: "flex",
    flexDirection: "column",
    gap: 18,
    padding: "38px 38px 28px",
  },
  receiptMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#777",
    fontSize: 17,
    fontWeight: 700,
    letterSpacing: 1.2,
  },
  dot: {
    display: "flex",
    width: 14,
    height: 14,
    borderRadius: 999,
    background: "#18b26b",
    boxShadow: "0 0 0 8px rgba(24,178,107,0.12)",
  },
  receiptTitle: {
    margin: 0,
    color: "#111",
    fontSize: 44,
    fontWeight: 900,
    letterSpacing: -1.6,
  },
  receiptRows: {
    display: "flex",
    flexDirection: "column",
    borderTop: "1px solid #e6e1d7",
  },
  receiptRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: 22,
    borderBottom: "1px solid #e6e1d7",
    padding: "17px 38px",
    fontSize: 21,
    fontWeight: 700,
  },
  rowLabel: {
    display: "flex",
    color: "#6d6a63",
  },
  rowValue: {
    display: "flex",
    color: "#161616",
    textAlign: "right",
  },
  summary: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
    background: "#f5f1e8",
    padding: "28px 38px 34px",
  },
  unit: {
    display: "flex",
    justifyContent: "flex-end",
    color: "#77736b",
    fontSize: 16,
    fontWeight: 700,
  },
  summaryRows: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#333",
    fontSize: 20,
    fontWeight: 750,
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    borderTop: "4px solid #151515",
    marginTop: 12,
    paddingTop: 18,
  },
  totalLabel: {
    display: "flex",
    color: "#151515",
    fontSize: 23,
    fontWeight: 900,
  },
  totalValue: {
    display: "flex",
    color: "#151515",
    fontSize: 42,
    fontWeight: 950,
    letterSpacing: -1.8,
  },
} satisfies Record<string, CSSProperties>

export function OpenGraphReceipt() {
  return (
    <div style={styles.frame}>
      <div style={styles.noise} />

      <div style={styles.content}>
        <div style={styles.hero}>
          <div style={styles.badge}>7788 RECEIPT GENERATOR</div>

          <div style={styles.titleBlock}>
            <h1 style={styles.title}>付款成功收據產生器</h1>
            <div style={styles.subtitle}>
              建立、調整、下載乾淨俐落的付款成功截圖。
            </div>
          </div>

          <div style={styles.domain}>{SITE_URL}</div>
        </div>

        <div style={styles.receiptShell}>
          <div style={styles.receiptTop}>
            <div style={styles.receiptMeta}>
              <span>PAYMENT SUCCESS</span>
              <span style={styles.dot} />
            </div>
            <h2 style={styles.receiptTitle}>付款成功</h2>
          </div>

          <div style={styles.receiptRows}>
            {receiptRows.map(([label, value]) => (
              <div key={label} style={styles.receiptRow}>
                <span style={styles.rowLabel}>{label}</span>
                <span style={styles.rowValue}>{value}</span>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <div style={styles.unit}>單位 Unit：新台幣 NTD</div>
            <div style={styles.summaryRows}>
              {summaryRows.map(([label, value]) => (
                <div key={label} style={styles.summaryRow}>
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
            </div>
            <div style={styles.total}>
              <span style={styles.totalLabel}>應付金額</span>
              <span style={styles.totalValue}>960,110</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
