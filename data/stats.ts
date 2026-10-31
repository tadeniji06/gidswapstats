export const stats = {
  totalVolume: 95000,
  onrampOfframpVolume: 55000,
  cryptoToCryptoVolume: 40000,
  totalTransactions: 1500,
  settledTransactions: 900,
  successRate: 60,
  averageTransactionSize: 63,
  averageProcessingMinutes: 4,
  dateRange: { from: "2024-01-01", to: "2026-10-31" },
  networks: [
    { name: "BNB Smart Chain", percentage: 85, transactions: 1275 },
    { name: "Polygon",         percentage: 6,  transactions: 90 },
    { name: "Ethereum",        percentage: 4,  transactions: 60 },
    { name: "Base",            percentage: 4,  transactions: 60 },
    { name: "Arbitrum",        percentage: 1,  transactions: 15 },
  ],
  tokens: [
    { name: "USDT", percentage: 65, logo: "/images/usdt.png" },
    { name: "USDC", percentage: 35, logo: "/images/ethereum.png" },
  ],
} as const;

export const tooltipCopy = {
  totalVolume:
    "Combined USD value ($95,000) of all settled onramp, offramp ($55,000), and crypto-to-crypto swap ($40,000) transactions processed between Jan 2024 – Oct 2026.",
  onrampOfframpVolume:
    "Fiat-to-crypto and crypto-to-fiat conversions ($55,000) settled directly to local bank accounts.",
  cryptoToCryptoVolume:
    "Direct crypto-to-crypto swaps ($40,000) completed seamlessly across supported networks.",
  successRate:
    "Percentage of all initiated transactions that settled successfully. Excludes expired and refunded orders.",
  settled:
    "Transactions completed with funds delivered to the destination account or wallet.",
  averageProcessingTime:
    "Median time from order creation to successful settlement, measured across all 900 settled transactions.",
  networks:
    "Blockchains used for settlement. BNB Smart Chain is the primary network for low-fee throughput.",
} as const;

export interface FakeTransaction {
  id: string;
  type: "OFFRAMP" | "ONRAMP" | "SWAP";
  pair: string;
  amount: string;
  network: string;
  duration: string;
}

export const recentTransactions: readonly FakeTransaction[] = [
  { id: "GS-9482", type: "OFFRAMP", pair: "USDT → NGN",  amount: "$120.00",   network: "BNB Chain", duration: "2m 14s" },
  { id: "GS-9481", type: "SWAP",    pair: "BTC → USDT",  amount: "$1,450.00", network: "BNB Chain", duration: "1m 18s" },
  { id: "GS-9480", type: "OFFRAMP", pair: "USDC → NGN",  amount: "$85.50",    network: "Base",      duration: "3m 40s" },
  { id: "GS-9479", type: "SWAP",    pair: "ETH → USDC",  amount: "$840.00",   network: "Arbitrum",  duration: "1m 05s" },
  { id: "GS-9478", type: "ONRAMP",  pair: "NGN → USDT",  amount: "$64.00",    network: "BNB Chain", duration: "4m 05s" },
  { id: "GS-9477", type: "SWAP",    pair: "USDT → SOL",  amount: "$620.00",   network: "Polygon",   duration: "1m 42s" },
  { id: "GS-9476", type: "OFFRAMP", pair: "USDT → NGN",  amount: "$210.00",   network: "BNB Chain", duration: "3m 18s" },
  { id: "GS-9475", type: "SWAP",    pair: "USDC → ETH",  amount: "$1,120.00", network: "Ethereum",  duration: "1m 29s" },
  { id: "GS-9474", type: "OFFRAMP", pair: "USDC → NGN",  amount: "$52.00",    network: "Arbitrum",  duration: "2m 50s" },
  { id: "GS-9473", type: "ONRAMP",  pair: "NGN → USDC",  amount: "$310.00",   network: "Ethereum",  duration: "4m 12s" },
];
