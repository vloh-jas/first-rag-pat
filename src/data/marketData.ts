import {
  MarketItem,
  MegaCapStock,
  VolatileStock,
  EarningsItem,
  TVLProtocol,
  CryptoMover,
  SovereignBond,
  MacroIndicator,
  YieldCurvePoint,
} from '../types/market';

export const MAJOR_INDICES: MarketItem[] = [
  {
    symbol: 'S&P 500',
    name: 'Standard & Poor 500',
    price: 5864.67,
    change: 19.82,
    changePercent: 0.34,
    exchange: 'INDEXSP: INX • CBOE',
    category: 'index',
    sparkline: [5820, 5828, 5815, 5840, 5835, 5850, 5848, 5864.67],
  },
  {
    symbol: 'Nasdaq 100',
    name: 'Nasdaq-100 Index',
    price: 20387.21,
    change: 165.74,
    changePercent: 0.82,
    exchange: 'NASDAQ: NDX',
    category: 'index',
    sparkline: [20180, 20210, 20240, 20280, 20320, 20310, 20360, 20387.21],
  },
  {
    symbol: 'Dow 30',
    name: 'Dow Jones Industrial Average',
    price: 42863.86,
    change: -64.30,
    changePercent: -0.15,
    exchange: 'INDEXDJX: DJI',
    category: 'index',
    sparkline: [42940, 42930, 42910, 42880, 42890, 42870, 42850, 42863.86],
  },
];

export const QUICK_INDICES: MarketItem[] = [
  {
    symbol: 'US 2000',
    name: 'Small Cap Index',
    price: 2238.90,
    change: 10.74,
    changePercent: 0.48,
    category: 'index',
  },
  {
    symbol: 'Nasdaq Comp',
    name: 'IXIC Composite',
    price: 18342.94,
    change: 138.20,
    changePercent: 0.76,
    category: 'index',
  },
  {
    symbol: 'NYSE Comp',
    name: 'NYA New York',
    price: 19654.10,
    change: 23.58,
    changePercent: 0.12,
    category: 'index',
  },
  {
    symbol: 'Nikkei 225',
    name: 'Tokyo Exchange',
    price: 39605.80,
    change: 462.15,
    changePercent: 1.18,
    category: 'index',
  },
  {
    symbol: 'DAX Index',
    name: 'Frankfurt XETR',
    price: 19414.45,
    change: -46.70,
    changePercent: -0.24,
    category: 'index',
  },
  {
    symbol: 'FTSE 100',
    name: 'London LSE',
    price: 8253.65,
    change: 15.68,
    changePercent: 0.19,
    category: 'index',
  },
];

export const WORLD_INDICES: MarketItem[] = [
  { symbol: 'PX1 • CAC 40', name: 'Paris Euronext', price: 7577.88, change: 36.20, changePercent: 0.48, category: 'index' },
  { symbol: 'FTMIB • Milano', name: 'Borsa Italiana', price: 34925.10, change: 215.10, changePercent: 0.62, category: 'index' },
  { symbol: 'IBC • IBEX 35', name: 'Bolsa de Madrid', price: 11908.40, change: -5.95, changePercent: -0.05, category: 'index' },
  { symbol: 'SSE Composite', name: 'Shanghai Exchange', price: 3284.32, change: 66.52, changePercent: 2.07, category: 'index' },
  { symbol: 'HSI • Hang Seng', name: 'Hong Kong Ex', price: 20599.11, change: 314.50, changePercent: 1.55, category: 'index' },
  { symbol: 'NIFTY 50', name: 'National Stock Ex India', price: 24964.25, change: -70.15, changePercent: -0.28, category: 'index' },
  { symbol: 'IBOV • Bovespa', name: 'B3 São Paulo', price: 130352.0, change: 958.0, changePercent: 0.74, category: 'index' },
  { symbol: 'IRUS • Russia', name: 'Moscow MOEX', price: 2752.19, change: -11.60, changePercent: -0.42, category: 'index' },
];

export const MEGA_CAPS: MegaCapStock[] = [
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corp',
    price: 138.07,
    changePercent: 2.45,
    marketCap: '$5.64T Cap',
    sessionChange: { regular: 2.45, pre: 1.15, post: 0.42 },
  },
  {
    symbol: 'AAPL',
    name: 'Apple Inc',
    price: 231.30,
    changePercent: 1.12,
    marketCap: '$4.87T Cap',
    sessionChange: { regular: 1.12, pre: 0.38, post: -0.15 },
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com',
    price: 187.98,
    changePercent: 0.89,
    marketCap: '$2.71T Cap',
    sessionChange: { regular: 0.89, pre: -0.20, post: 0.65 },
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet A',
    price: 165.12,
    changePercent: -0.34,
    marketCap: '$4.18T Cap',
    sessionChange: { regular: -0.34, pre: 0.12, post: -0.08 },
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc',
    price: 217.80,
    changePercent: -1.84,
    marketCap: '$698B Cap',
    sessionChange: { regular: -1.84, pre: -2.30, post: 0.45 },
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft',
    price: 418.00,
    changePercent: 0.43,
    marketCap: '$3.84T Cap',
    sessionChange: { regular: 0.43, pre: 0.25, post: 0.10 },
  },
];

export const HIGH_VOLUME_STOCKS: MarketItem[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 138.07, change: 3.30, changePercent: 2.45, volume: '64.82M', marketCap: '5.64T', category: 'stock', peRatio: 48.2 },
  { symbol: 'MU', name: 'Micron Technology, Inc.', price: 108.40, change: 3.89, changePercent: 3.72, volume: '42.11M', marketCap: '119.5B', category: 'stock', peRatio: 24.1 },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 217.80, change: -4.08, changePercent: -1.84, volume: '38.90M', marketCap: '698.2B', category: 'stock', peRatio: 62.5 },
  { symbol: 'SPCX', name: 'Space Exploration Tech', price: 94.20, change: 4.59, changePercent: 5.12, volume: '31.20M', marketCap: '2.16T', category: 'stock', peRatio: 88.0 },
  { symbol: 'SNDK', name: 'Sandisk Corporation', price: 49.65, change: 1.92, changePercent: 4.02, volume: '27.55M', marketCap: '48.3B', category: 'stock', peRatio: 18.4 },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 156.40, change: 2.88, changePercent: 1.88, volume: '25.70M', marketCap: '253.1B', category: 'stock', peRatio: 42.6 },
];

export const VOLATILE_STOCKS: VolatileStock[] = [
  { symbol: 'DRCT', name: 'Direct Digital Holdings', price: 3.42, changePercent: 28.57, volume: '14.2M', beta: 3.45 },
  { symbol: 'AMOD', name: 'Alpha Modus Holdings', price: 0.89, changePercent: -16.82, volume: '8.4M', beta: 3.12 },
  { symbol: 'FLUX', name: 'Flux Power Holdings', price: 4.15, changePercent: 19.25, volume: '6.1M', beta: 3.28 },
];

export const EARNINGS_ITEMS: EarningsItem[] = [
  { timing: 'TODAY', symbol: 'VFS', name: 'VinFast Auto', estimate: '-0.27 USD', currency: 'USD' },
  { timing: 'TODAY', symbol: 'PKE', name: 'Park Aerospace', estimate: '0.16 USD', currency: 'USD' },
  { timing: 'TOMORROW', symbol: 'RPM', name: 'RPM Intl', estimate: '1.95 USD', currency: 'USD' },
];

export const CRYPTO_HEROES: MarketItem[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67842.10,
    change: 2062.50,
    changePercent: 3.14,
    marketCap: '$1.72T',
    volume: '$38.4B',
    exchange: 'BTC/USD • SPOT',
    category: 'crypto',
    sparkline: [65400, 65800, 66200, 66900, 66500, 67100, 67400, 67842.10],
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2641.50,
    change: 53.00,
    changePercent: 2.05,
    marketCap: '$329.63B',
    volume: '$19.2B',
    exchange: 'ETH/USD • SPOT',
    category: 'crypto',
    sparkline: [2560, 2580, 2595, 2610, 2605, 2630, 2625, 2641.50],
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 158.32,
    change: 8.80,
    changePercent: 5.89,
    marketCap: '$74.2B',
    volume: '$5.1B',
    exchange: 'SOL/USD • SPOT',
    category: 'crypto',
    sparkline: [148, 150, 151, 153, 152, 155, 156, 158.32],
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
    price: 0.5428,
    change: -0.0039,
    changePercent: -0.72,
    marketCap: '$94.72B',
    volume: '$1.8B',
    exchange: 'XRP/USD • SPOT',
    category: 'crypto',
    sparkline: [0.552, 0.550, 0.548, 0.549, 0.545, 0.544, 0.543, 0.5428],
  },
];

export const TVL_PROTOCOLS: TVLProtocol[] = [
  { rank: 1, symbol: 'AAVEUSD', name: 'Aave', subtext: 'AAVEUSD • Lending', tvl: '$32.93 B', change7d: 4.12 },
  { rank: 2, symbol: 'LDOUSD', name: 'Lido DAO', subtext: 'LDOUSD • Liquid Staking', tvl: '$26.60 B', change7d: 1.85 },
  { rank: 3, symbol: 'ENAUSD', name: 'Ethena', subtext: 'ENAUSD • Synthetic Dollar', tvl: '$5.40 B', change7d: 8.40 },
  { rank: 4, symbol: 'UNIUSD', name: 'Uniswap', subtext: 'UNIUSD • Automated Market Maker', tvl: '$3.97 B', change7d: -0.92 },
];

export const CRYPTO_GAINERS: CryptoMover[] = [
  { symbol: 'FET', name: 'ASI Alliance', changePercent: 14.28, type: 'gainer' },
  { symbol: 'HNT', name: 'Helium Network', changePercent: 11.90, type: 'gainer' },
  { symbol: 'VIRTUAL', name: 'Virtuals Protocol', changePercent: 10.16, type: 'gainer' },
];

export const CRYPTO_LOSERS: CryptoMover[] = [
  { symbol: 'PONS', name: 'Pons Protocol', changePercent: -10.33, type: 'loser' },
  { symbol: 'SAND', name: 'The Sandbox', changePercent: -7.65, type: 'loser' },
  { symbol: 'ZAMA', name: 'Zama FHE', changePercent: -7.18, type: 'loser' },
];

export const FUTURES_DATA: MarketItem[] = [
  { symbol: 'GC1!', name: 'Gold Futures', price: 2668.40, change: 12.70, changePercent: 0.48, currency: 'USD', category: 'future' },
  { symbol: 'SI1!', name: 'Silver', price: 31.855, change: 0.39, changePercent: 1.24, currency: 'USD', category: 'future' },
  { symbol: 'CL1!', name: 'Crude Oil WTI', price: 70.82, change: -0.82, changePercent: -1.15, currency: 'USD', category: 'future' },
  { symbol: 'NG1!', name: 'Natural Gas', price: 2.348, change: -0.058, changePercent: -2.40, currency: 'USD', category: 'future' },
  { symbol: 'HG1!', name: 'Copper', price: 4.3820, change: 0.033, changePercent: 0.75, currency: 'USD', category: 'future' },
  { symbol: 'ZC1!', name: 'Corn Futures', price: 408.25, change: -1.31, changePercent: -0.32, currency: 'USd', category: 'future' },
];

export const FOREX_DATA: MarketItem[] = [
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.08724, change: -0.00196, changePercent: -0.18, bid: 1.08724, ask: 1.08732, category: 'forex' },
  { symbol: 'USD/JPY', name: 'US Dollar / Yen', price: 150.182, change: 0.480, changePercent: 0.32, bid: 150.182, ask: 150.195, category: 'forex' },
  { symbol: 'GBP/USD', name: 'British Pound / USD', price: 1.30215, change: 0.00117, changePercent: 0.09, bid: 1.30215, ask: 1.30228, category: 'forex' },
  { symbol: 'AUD/USD', name: 'Aussie / US Dollar', price: 0.66981, change: -0.00282, changePercent: -0.42, bid: 0.66981, ask: 0.66992, category: 'forex' },
  { symbol: 'DXY', name: 'US Dollar Index', price: 103.62, change: 0.23, changePercent: 0.22, bid: 103.62, ask: 103.64, category: 'forex' },
  { symbol: 'USD/CAD', name: 'USD / Canadian Dollar', price: 1.37890, change: 0.00193, changePercent: 0.14, bid: 1.37890, ask: 1.37905, category: 'forex' },
];

export const YIELD_CURVE_POINTS: YieldCurvePoint[] = [
  { tenor: '1M', rate: 4.62 },
  { tenor: '3M', rate: 4.68 },
  { tenor: '6M', rate: 4.74 },
  { tenor: '1Y', rate: 4.76 },
  { tenor: '2Y', rate: 4.802, isBenchmark: true },
  { tenor: '5Y', rate: 5.037 },
  { tenor: '10Y', rate: 5.267, isBenchmark: true },
  { tenor: '20Y', rate: 5.48 },
  { tenor: '30Y', rate: 5.62 },
];

export const SOVEREIGN_BONDS: SovereignBond[] = [
  { country: 'United States (US10Y)', code: 'US10Y', color: '#66dabf', price: 95.105, change: 0.06, yield10y: 5.267 },
  { country: 'United Kingdom (GB10Y)', code: 'GB10Y', color: '#b6c4ff', price: 96.185, change: 0.09, yield10y: 5.379 },
  { country: 'European Union (EU10Y)', code: 'EU10Y', color: '#dce1ff', price: 96.188, change: 0.57, yield10y: 3.461 },
  { country: 'Germany Bund (DE10Y)', code: 'DE10Y', color: '#787B86', price: 96.188, change: 0.57, yield10y: 3.461 },
  { country: 'France OAT (FR10Y)', code: 'FR10Y', color: '#ffb4a3', price: 90.864, change: 0.60, yield10y: 4.862 },
  { country: 'Italy BTP (IT10Y)', code: 'IT10Y', color: '#089981', price: 94.060, change: 0.63, yield10y: 4.613 },
];

export const MACRO_INDICATORS: MacroIndicator[] = [
  { country: 'USA', color: '#66dabf', gdp: '28.78 T', gdpGrowth: 3.00, interestRate: 5.00, inflation: 2.40, unemployment: 4.10, debtToGdp: 122.3 },
  { country: 'Mainland China', color: '#b6c4ff', gdp: '18.53 T', gdpGrowth: 4.60, interestRate: 3.10, inflation: 0.40, unemployment: 5.10, debtToGdp: 83.6 },
  { country: 'European Union', color: '#dce1ff', gdp: '17.10 T', gdpGrowth: 0.90, interestRate: 3.40, inflation: 1.70, unemployment: 5.90, debtToGdp: 88.7 },
  { country: 'Germany', color: '#787B86', gdp: '4.46 T', gdpGrowth: -0.30, interestRate: 3.40, inflation: 1.60, unemployment: 6.00, debtToGdp: 63.6 },
  { country: 'Japan', color: '#ffb4a3', gdp: '4.21 T', gdpGrowth: 0.50, interestRate: 0.25, inflation: 2.50, unemployment: 2.50, debtToGdp: 263.9 },
  { country: 'United Kingdom', color: '#089981', gdp: '3.33 T', gdpGrowth: 0.70, interestRate: 5.00, inflation: 1.70, unemployment: 4.00, debtToGdp: 100.0 },
];
