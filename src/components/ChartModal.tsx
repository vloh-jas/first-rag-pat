import React, { useState, useMemo } from 'react';
import { X, TrendingUp, TrendingDown, BarChart2, Activity, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { MarketItem } from '../types/market';

interface ChartModalProps {
  item: MarketItem | null;
  onClose: () => void;
}

export const ChartModal: React.FC<ChartModalProps> = ({ item, onClose }) => {
  const [timeframe, setTimeframe] = useState<'1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y'>('1M');
  const [chartType, setChartType] = useState<'area' | 'candles'>('area');
  const [activeIndicators, setActiveIndicators] = useState<{ [key: string]: boolean }>({
    volume: true,
    ma20: false,
    rsi: false,
  });

  // Trading panel state
  const [orderSide, setOrderSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [quantity, setQuantity] = useState('10');
  const [orderSuccess, setOrderSuccess] = useState<string | null>(null);

  // Generate deterministic chart data based on timeframe & base price
  const chartData = useMemo(() => {
    if (!item) return [];
    const basePrice = item.price;
    const count = timeframe === '1D' ? 24 : timeframe === '5D' ? 30 : timeframe === '1M' ? 30 : 50;
    const volatility = item.category === 'crypto' ? 0.03 : 0.015;

    let current = basePrice * (1 - (item.changePercent / 100) * 0.7);
    const data = [];

    for (let i = 0; i < count; i++) {
      const delta = (Math.sin(i * 0.5) + (Math.random() - 0.48)) * volatility * basePrice;
      const open = current;
      const close = i === count - 1 ? basePrice : current + delta;
      const high = Math.max(open, close) + Math.random() * volatility * basePrice * 0.5;
      const low = Math.min(open, close) - Math.random() * volatility * basePrice * 0.5;
      const volume = Math.floor(Math.random() * 500000 + 100000);

      data.push({
        index: i,
        open,
        close,
        high,
        low,
        volume,
        label: `${i + 1}`,
      });
      current = close;
    }
    return data;
  }, [item, timeframe]);

  if (!item) return null;

  const isPositive = item.changePercent >= 0;
  const numQty = parseFloat(quantity) || 0;
  const estimatedTotal = numQty * item.price;

  const minPrice = Math.min(...chartData.map((d) => d.low));
  const maxPrice = Math.max(...chartData.map((d) => d.high));
  const range = maxPrice - minPrice || 1;

  const handlePlaceOrder = () => {
    setOrderSuccess(
      `Filled ${orderSide.toUpperCase()} ${numQty} ${item.symbol} @ $${item.price.toFixed(2)} ($${estimatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})`
    );
    setTimeout(() => {
      setOrderSuccess(null);
    }, 4000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#1E222D] border border-[#2A2E39] rounded-2xl w-full max-w-6xl max-h-[92vh] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2E39] bg-[#171d1b]">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#2A2E39] flex items-center justify-center font-bold text-sm font-mono text-[#66dabf] border border-[#363A45]">
              {item.symbol.slice(0, 4)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-['Manrope'] text-[#F0F3FA]">
                  {item.symbol}
                </h2>
                <span className="text-xs text-[#787B86]">{item.name}</span>
                <span className="text-[10px] text-[#66dabf] uppercase font-mono px-2 py-0.5 rounded bg-[#20a28a]/20 font-bold">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="font-mono text-2xl font-extrabold text-[#F0F3FA] tabular-nums">
                  ${item.price >= 1 ? item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : item.price.toFixed(4)}
                </span>
                <span
                  className={`font-mono text-xs font-bold flex items-center gap-1 tabular-nums ${
                    isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                  }`}
                >
                  {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {isPositive ? '+' : ''}
                  {item.changePercent.toFixed(2)}% ({isPositive ? '+' : ''}${Math.abs(item.change).toFixed(2)})
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#787B86] hidden sm:inline-block font-mono">
              Market Open • Real-time Level 2
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#2A2E39] hover:bg-[#353a38] text-[#787B86] hover:text-[#F0F3FA] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content: Chart (Left) + Order Ladder (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto no-scrollbar">
          {/* Main Chart Area (8 cols) */}
          <div className="lg:col-span-8 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#2A2E39] bg-[#131722]/60">
            {/* Chart Controls Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              {/* Timeframes */}
              <div className="flex items-center gap-1 bg-[#1E222D] p-1 rounded-lg border border-[#2A2E39]">
                {(['1D', '5D', '1M', '6M', 'YTD', '1Y'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors cursor-pointer ${
                      timeframe === tf
                        ? 'bg-[#2962FF] text-[#F0F3FA]'
                        : 'text-[#787B86] hover:text-[#F0F3FA]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Chart type & indicators */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-[#1E222D] p-1 rounded-lg border border-[#2A2E39]">
                  <button
                    onClick={() => setChartType('area')}
                    className={`px-2 py-1 rounded text-xs font-semibold cursor-pointer ${
                      chartType === 'area'
                        ? 'bg-[#2A2E39] text-[#66dabf]'
                        : 'text-[#787B86] hover:text-[#F0F3FA]'
                    }`}
                  >
                    Area
                  </button>
                  <button
                    onClick={() => setChartType('candles')}
                    className={`px-2 py-1 rounded text-xs font-semibold cursor-pointer ${
                      chartType === 'candles'
                        ? 'bg-[#2A2E39] text-[#66dabf]'
                        : 'text-[#787B86] hover:text-[#F0F3FA]'
                    }`}
                  >
                    Candles
                  </button>
                </div>

                <button
                  onClick={() =>
                    setActiveIndicators((prev) => ({ ...prev, ma20: !prev.ma20 }))
                  }
                  className={`px-2.5 py-1 rounded text-xs font-mono border cursor-pointer ${
                    activeIndicators.ma20
                      ? 'border-[#66dabf] text-[#66dabf] bg-[#66dabf]/10'
                      : 'border-[#2A2E39] text-[#787B86] hover:text-[#F0F3FA]'
                  }`}
                >
                  EMA 20
                </button>
                <button
                  onClick={() =>
                    setActiveIndicators((prev) => ({ ...prev, volume: !prev.volume }))
                  }
                  className={`px-2.5 py-1 rounded text-xs font-mono border cursor-pointer ${
                    activeIndicators.volume
                      ? 'border-[#2962FF] text-[#b6c4ff] bg-[#2962FF]/10'
                      : 'border-[#2A2E39] text-[#787B86] hover:text-[#F0F3FA]'
                  }`}
                >
                  Volume
                </button>
              </div>
            </div>

            {/* Interactive SVG Chart Canvas */}
            <div className="w-full h-80 relative bg-[#171d1b]/40 rounded-xl p-4 border border-[#2A2E39]">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 700 280">
                {/* Horizontal gridlines & Price labels */}
                {[0.2, 0.4, 0.6, 0.8].map((ratio, idx) => {
                  const y = ratio * 240;
                  const price = maxPrice - ratio * range;
                  return (
                    <g key={idx}>
                      <line
                        x1="0"
                        x2="640"
                        y1={y}
                        y2={y}
                        stroke="#2A2E39"
                        strokeDasharray="4 4"
                      />
                      <text
                        x="648"
                        y={y + 4}
                        fill="#787B86"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        ${price.toFixed(2)}
                      </text>
                    </g>
                  );
                })}

                {/* Volume bars at bottom */}
                {activeIndicators.volume &&
                  chartData.map((d, i) => {
                    const x = (i / (chartData.length - 1)) * 620;
                    const maxVol = Math.max(...chartData.map((v) => v.volume));
                    const barHeight = (d.volume / maxVol) * 50;
                    const isBarGreen = d.close >= d.open;
                    return (
                      <rect
                        key={i}
                        x={x}
                        y={270 - barHeight}
                        width="8"
                        height={barHeight}
                        fill={isBarGreen ? '#089981' : '#F23645'}
                        opacity="0.3"
                      />
                    );
                  })}

                {chartType === 'area' ? (
                  <>
                    {/* Area fill */}
                    <path
                      d={`M 0,${240 - ((chartData[0].close - minPrice) / range) * 220} ${chartData
                        .map((d, i) => {
                          const x = (i / (chartData.length - 1)) * 620;
                          const y = 240 - ((d.close - minPrice) / range) * 220;
                          return `L ${x},${y}`;
                        })
                        .join(' ')} L 620,270 L 0,270 Z`}
                      fill={isPositive ? '#089981' : '#F23645'}
                      fillOpacity="0.12"
                    />
                    {/* Stroke line */}
                    <path
                      d={`M 0,${240 - ((chartData[0].close - minPrice) / range) * 220} ${chartData
                        .map((d, i) => {
                          const x = (i / (chartData.length - 1)) * 620;
                          const y = 240 - ((d.close - minPrice) / range) * 220;
                          return `L ${x},${y}`;
                        })
                        .join(' ')}`}
                      fill="none"
                      stroke={isPositive ? '#089981' : '#F23645'}
                      strokeWidth="2.5"
                    />
                  </>
                ) : (
                  /* Candlesticks */
                  chartData.map((d, i) => {
                    const x = (i / (chartData.length - 1)) * 620 + 4;
                    const yOpen = 240 - ((d.open - minPrice) / range) * 220;
                    const yClose = 240 - ((d.close - minPrice) / range) * 220;
                    const yHigh = 240 - ((d.high - minPrice) / range) * 220;
                    const yLow = 240 - ((d.low - minPrice) / range) * 220;
                    const isGreen = d.close >= d.open;
                    const candleColor = isGreen ? '#089981' : '#F23645';

                    return (
                      <g key={i}>
                        {/* Wick */}
                        <line
                          x1={x}
                          x2={x}
                          y1={yHigh}
                          y2={yLow}
                          stroke={candleColor}
                          strokeWidth="1.2"
                        />
                        {/* Body */}
                        <rect
                          x={x - 3}
                          y={Math.min(yOpen, yClose)}
                          width="6"
                          height={Math.max(Math.abs(yClose - yOpen), 2)}
                          fill={candleColor}
                        />
                      </g>
                    );
                  })
                )}

                {/* EMA 20 line if active */}
                {activeIndicators.ma20 && (
                  <path
                    d={`M 0,${240 - ((chartData[0].close * 0.99 - minPrice) / range) * 220} ${chartData
                      .map((d, i) => {
                        const x = (i / (chartData.length - 1)) * 620;
                        const y = 240 - ((d.close * 0.99 - minPrice) / range) * 220;
                        return `L ${x},${y}`;
                      })
                      .join(' ')}`}
                    fill="none"
                    stroke="#66dabf"
                    strokeWidth="1.8"
                    strokeDasharray="3 3"
                  />
                )}
              </svg>
            </div>

            {/* Quick Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#2A2E39] text-xs">
              <div>
                <span className="text-[#787B86] block">24h Low / High</span>
                <span className="font-mono text-[#F0F3FA] font-bold">
                  ${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-[#787B86] block">Market Volume</span>
                <span className="font-mono text-[#F0F3FA] font-bold">
                  {item.volume || '34.82M'}
                </span>
              </div>
              <div>
                <span className="text-[#787B86] block">Market Cap</span>
                <span className="font-mono text-[#F0F3FA] font-bold">
                  {item.marketCap || '$2.14T'}
                </span>
              </div>
              <div>
                <span className="text-[#787B86] block">P/E Ratio</span>
                <span className="font-mono text-[#F0F3FA] font-bold">
                  {item.peRatio ? `${item.peRatio.toFixed(1)}x` : '32.4x'}
                </span>
              </div>
            </div>
          </div>

          {/* Trade Execution & Order Book Panel (4 cols) */}
          <div className="lg:col-span-4 p-6 bg-[#1E222D] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[#787B86] uppercase tracking-wider">
                  Paper Trading Terminal
                </span>
                <span className="flex items-center gap-1 text-[11px] text-[#66dabf] font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" /> Simulation
                </span>
              </div>

              {/* Order Side Tabs (BUY / SELL) */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => setOrderSide('buy')}
                  className={`py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    orderSide === 'buy'
                      ? 'bg-[#089981] text-[#003027] shadow-md'
                      : 'bg-[#131722] text-[#787B86] hover:text-[#F0F3FA]'
                  }`}
                >
                  Buy {item.symbol}
                </button>
                <button
                  onClick={() => setOrderSide('sell')}
                  className={`py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    orderSide === 'sell'
                      ? 'bg-[#F23645] text-white shadow-md'
                      : 'bg-[#131722] text-[#787B86] hover:text-[#F0F3FA]'
                  }`}
                >
                  Sell {item.symbol}
                </button>
              </div>

              {/* Order Type Tabs */}
              <div className="flex items-center gap-2 mb-4 text-xs font-mono">
                <button
                  onClick={() => setOrderType('market')}
                  className={`px-3 py-1 rounded cursor-pointer ${
                    orderType === 'market'
                      ? 'bg-[#2A2E39] text-[#66dabf]'
                      : 'text-[#787B86] hover:text-[#F0F3FA]'
                  }`}
                >
                  Market
                </button>
                <button
                  onClick={() => setOrderType('limit')}
                  className={`px-3 py-1 rounded cursor-pointer ${
                    orderType === 'limit'
                      ? 'bg-[#2A2E39] text-[#66dabf]'
                      : 'text-[#787B86] hover:text-[#F0F3FA]'
                  }`}
                >
                  Limit
                </button>
              </div>

              {/* Quantity Input */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-[#787B86] block mb-1">
                    Units / Shares
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full bg-[#131722] border border-[#2A2E39] focus:border-[#2962FF] rounded-lg px-3 py-2 text-sm text-[#F0F3FA] font-mono focus:outline-none"
                    />
                    <span className="absolute right-3 top-2 text-xs text-[#787B86] font-mono">
                      {item.symbol}
                    </span>
                  </div>
                </div>

                <div className="bg-[#131722] p-3 rounded-lg border border-[#2A2E39] space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-[#787B86]">
                    <span>Execution Price</span>
                    <span className="text-[#F0F3FA]">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#787B86]">
                    <span>Est. Fee (0%)</span>
                    <span className="text-[#089981]">$0.00</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold border-t border-[#2A2E39] pt-1 mt-1">
                    <span className="text-[#F0F3FA]">Total Amount</span>
                    <span className="text-[#66dabf]">
                      ${estimatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {orderSuccess && (
                  <div className="p-2.5 rounded-lg bg-[#089981]/20 border border-[#089981] text-xs text-[#66dabf] flex items-center gap-2">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>{orderSuccess}</span>
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  className={`w-full py-3 rounded-lg font-bold text-xs uppercase tracking-wider text-white shadow-lg transition-all cursor-pointer active:scale-[0.98] ${
                    orderSide === 'buy'
                      ? 'bg-[#089981] hover:bg-[#07856e]'
                      : 'bg-[#F23645] hover:bg-[#d82a38]'
                  }`}
                >
                  Confirm {orderSide.toUpperCase()} Order
                </button>
              </div>
            </div>

            {/* Mini Depth Ladder */}
            <div className="mt-4 pt-3 border-t border-[#2A2E39]">
              <div className="text-[11px] font-bold text-[#787B86] uppercase mb-2">
                Order Book Depth
              </div>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-[#F23645]">
                  <span>${(item.price + 0.12).toFixed(2)}</span>
                  <span>1,420 vol</span>
                </div>
                <div className="flex justify-between text-[#F23645]">
                  <span>${(item.price + 0.05).toFixed(2)}</span>
                  <span>3,850 vol</span>
                </div>
                <div className="flex justify-between text-[#66dabf] font-bold border-y border-[#2A2E39] py-0.5">
                  <span>${item.price.toFixed(2)} (Spread $0.02)</span>
                  <span>LAST</span>
                </div>
                <div className="flex justify-between text-[#089981]">
                  <span>${(item.price - 0.04).toFixed(2)}</span>
                  <span>4,120 vol</span>
                </div>
                <div className="flex justify-between text-[#089981]">
                  <span>${(item.price - 0.10).toFixed(2)}</span>
                  <span>2,900 vol</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
