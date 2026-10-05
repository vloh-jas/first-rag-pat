export interface MarketItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
  marketCap?: string;
  sparkline?: number[];
  category: 'index' | 'stock' | 'crypto' | 'future' | 'forex' | 'bond';
  currency?: string;
  exchange?: string;
  bid?: number;
  ask?: number;
  high24h?: number;
  low24h?: number;
  peRatio?: number;
}

export interface MegaCapStock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  marketCap: string;
  sessionChange?: {
    regular: number;
    pre: number;
    post: number;
  };
}

export interface VolatileStock {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  volume: string;
  beta: number;
}

export interface EarningsItem {
  timing: 'TODAY' | 'TOMORROW';
  symbol: string;
  name: string;
  estimate: string;
  currency: string;
}

export interface TVLProtocol {
  rank: number;
  symbol: string;
  name: string;
  subtext: string;
  tvl: string;
  change7d: number;
}

export interface CryptoMover {
  symbol: string;
  name: string;
  changePercent: number;
  type: 'gainer' | 'loser';
}

export interface SovereignBond {
  country: string;
  code: string;
  color: string;
  price: number;
  change: number;
  yield10y: number;
}

export interface MacroIndicator {
  country: string;
  color: string;
  gdp: string;
  gdpGrowth: number;
  interestRate: number;
  inflation: number;
  unemployment: number;
  debtToGdp: number;
}

export interface YieldCurvePoint {
  tenor: string;
  rate: number;
  isBenchmark?: boolean;
}
