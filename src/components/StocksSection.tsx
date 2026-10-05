import React, { useState } from 'react';
import { ChevronRight, Calendar, ArrowUpRight } from 'lucide-react';
import { MarketItem, MegaCapStock } from '../types/market';
import {
  MEGA_CAPS,
  HIGH_VOLUME_STOCKS,
  VOLATILE_STOCKS,
  EARNINGS_ITEMS,
} from '../data/marketData';

interface StocksSectionProps {
  onSelectTicker: (item: MarketItem) => void;
  onOpenScreener: () => void;
  onOpenEarnings: () => void;
}

type MarketSession = 'regular' | 'pre' | 'post';
type SortField = 'symbol' | 'price' | 'changePercent' | 'volume';

export const StocksSection: React.FC<StocksSectionProps> = ({
  onSelectTicker,
  onOpenScreener,
  onOpenEarnings,
}) => {
  const [session, setSession] = useState<MarketSession>('regular');
  const [sortField, setSortField] = useState<SortField>('volume');
  const [sortAsc, setSortAsc] = useState(false);

  const sortedStocks = [...HIGH_VOLUME_STOCKS].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'symbol') {
      comparison = a.symbol.localeCompare(b.symbol);
    } else if (sortField === 'price') {
      comparison = a.price - b.price;
    } else if (sortField === 'changePercent') {
      comparison = a.changePercent - b.changePercent;
    } else if (sortField === 'volume') {
      const volA = parseFloat(a.volume?.replace('M', '') || '0');
      const volB = parseFloat(b.volume?.replace('M', '') || '0');
      comparison = volA - volB;
    }
    return sortAsc ? comparison : -comparison;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <section className="w-full px-4 md:px-8 py-8" id="us-stocks">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
        {/* Section Title & Session Selector */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
          <div>
            <button
              onClick={onOpenScreener}
              className="group flex items-center gap-1.5 cursor-pointer text-left"
            >
              <span className="font-['Manrope'] text-2xl md:text-3xl font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                US stocks
              </span>
              <ChevronRight className="w-6 h-6 text-[#787B86] group-hover:translate-x-1 group-hover:text-[#66dabf] transition-all" />
            </button>
            <p className="text-sm text-[#787B86] mt-0.5">
              Wall Street powerhouse equities, volumetric leaders, and active pre-market rotations
            </p>
          </div>

          {/* Session Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-[#1E222D] rounded-lg border border-[#2A2E39]">
            {(
              [
                { id: 'regular', label: 'Regular hours' },
                { id: 'pre', label: 'Pre-market' },
                { id: 'post', label: 'Post-market' },
              ] as const
            ).map((s) => (
              <button
                key={s.id}
                onClick={() => setSession(s.id)}
                className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  session === s.id
                    ? 'bg-[#2962FF] text-[#F0F3FA] shadow-sm'
                    : 'text-[#787B86] hover:text-[#F0F3FA]'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mega Cap Market Cap Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {MEGA_CAPS.map((stock: MegaCapStock) => {
            const delta =
              session === 'pre'
                ? stock.sessionChange?.pre ?? stock.changePercent
                : session === 'post'
                ? stock.sessionChange?.post ?? stock.changePercent
                : stock.changePercent;
            const isPositive = delta >= 0;

            return (
              <div
                key={stock.symbol}
                onClick={() =>
                  onSelectTicker({
                    symbol: stock.symbol,
                    name: stock.name,
                    price: stock.price,
                    change: stock.price * (delta / 100),
                    changePercent: delta,
                    category: 'stock',
                    marketCap: stock.marketCap,
                  })
                }
                className="bg-[#1E222D] hover:bg-[#2A2E39] p-3.5 rounded-xl transition-all cursor-pointer border border-transparent hover:border-[#363A45] group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                    {stock.symbol}
                  </span>
                  <span
                    className={`font-mono text-xs font-bold ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {delta.toFixed(2)}%
                  </span>
                </div>
                <div className="font-mono text-lg font-bold text-[#F0F3FA] tabular-nums">
                  ${stock.price.toFixed(2)}
                </div>
                <div className="flex items-center justify-between mt-2 text-[11px] text-[#787B86]">
                  <span className="truncate max-w-[80px]">{stock.name}</span>
                  <span className="text-[#66dabf] font-medium">{stock.marketCap}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dual Data Grid: Volume Leaders vs Volatiles & Earnings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Highest Volume Stocks Table (7 cols) */}
          <div className="lg:col-span-7 bg-[#1E222D] rounded-xl p-5 shadow-sm flex flex-col justify-between border border-transparent hover:border-[#2A2E39] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-['Manrope'] text-lg font-bold text-[#F0F3FA]">
                    Highest volume stocks
                  </h3>
                  <p className="text-xs text-[#787B86]">Most liquid order book activity today</p>
                </div>
                <button
                  onClick={onOpenScreener}
                  className="text-xs font-bold text-[#b6c4ff] hover:underline cursor-pointer"
                >
                  See all movers
                </button>
              </div>

              <div className="w-full overflow-x-auto no-scrollbar">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="text-[11px] text-[#787B86] uppercase tracking-wider border-b border-[#2A2E39]">
                      <th
                        onClick={() => handleSort('symbol')}
                        className="py-2.5 px-3 cursor-pointer hover:text-[#F0F3FA] select-none"
                      >
                        Symbol {sortField === 'symbol' ? (sortAsc ? '▲' : '▼') : ''}
                      </th>
                      <th
                        onClick={() => handleSort('price')}
                        className="py-2.5 px-3 text-right cursor-pointer hover:text-[#F0F3FA] select-none"
                      >
                        Last Price {sortField === 'price' ? (sortAsc ? '▲' : '▼') : ''}
                      </th>
                      <th
                        onClick={() => handleSort('changePercent')}
                        className="py-2.5 px-3 text-right cursor-pointer hover:text-[#F0F3FA] select-none"
                      >
                        24h Chg % {sortField === 'changePercent' ? (sortAsc ? '▲' : '▼') : ''}
                      </th>
                      <th
                        onClick={() => handleSort('volume')}
                        className="py-2.5 px-3 text-right cursor-pointer hover:text-[#F0F3FA] select-none"
                      >
                        Volume {sortField === 'volume' ? (sortAsc ? '▲' : '▼') : ''}
                      </th>
                      <th className="py-2.5 px-3 text-right">Mkt Cap</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2A2E39]/40">
                    {sortedStocks.map((stock) => {
                      const isPositive = stock.changePercent >= 0;
                      return (
                        <tr
                          key={stock.symbol}
                          onClick={() => onSelectTicker(stock)}
                          className="hover:bg-[#2A2E39]/70 transition-colors cursor-pointer group"
                        >
                          <td className="py-3 px-3">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded bg-[#131722] text-[#F0F3FA] font-bold text-xs group-hover:text-[#66dabf] transition-colors">
                                {stock.symbol}
                              </span>
                              <span className="text-xs text-[#787B86] truncate max-w-[120px] md:max-w-[180px]">
                                {stock.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-3 text-right font-semibold text-[#F0F3FA] tabular-nums">
                            ${stock.price.toFixed(2)}
                          </td>
                          <td
                            className={`py-3 px-3 text-right font-bold tabular-nums ${
                              isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                            }`}
                          >
                            {isPositive ? '+' : ''}
                            {stock.changePercent.toFixed(2)}%
                          </td>
                          <td className="py-3 px-3 text-right text-[#F0F3FA] tabular-nums">
                            {stock.volume}
                          </td>
                          <td className="py-3 px-3 text-right text-[#787B86] tabular-nums">
                            {stock.marketCap}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-[#787B86] text-xs border-t border-[#2A2E39]">
              <span>Aggregated NYSE & NASDAQ Consolidated Tape</span>
              <button
                onClick={onOpenScreener}
                className="text-[#66dabf] hover:underline cursor-pointer font-semibold"
              >
                Launch Screener →
              </button>
            </div>
          </div>

          {/* Most Volatile & Earnings Calendar Widget (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Volatile Stocks Tile */}
            <div className="bg-[#1E222D] rounded-xl p-5 shadow-sm border border-transparent hover:border-[#2A2E39] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-['Manrope'] text-lg font-bold text-[#F0F3FA]">
                  Most volatile stocks
                </h4>
                <span className="text-[10px] text-[#089981] bg-[#089981]/10 px-2 py-0.5 rounded font-bold font-mono">
                  Delta Beta &gt; 3.0
                </span>
              </div>

              <div className="space-y-2">
                {VOLATILE_STOCKS.map((vol) => {
                  const isPositive = vol.changePercent >= 0;
                  return (
                    <div
                      key={vol.symbol}
                      onClick={() =>
                        onSelectTicker({
                          symbol: vol.symbol,
                          name: vol.name,
                          price: vol.price,
                          change: vol.price * (vol.changePercent / 100),
                          changePercent: vol.changePercent,
                          volume: vol.volume,
                          category: 'stock',
                        })
                      }
                      className="flex items-center justify-between p-2 rounded bg-[#131722] hover:bg-[#2A2E39] transition-colors cursor-pointer group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                            {vol.symbol}
                          </span>
                          <span className="text-[11px] text-[#787B86] truncate max-w-[140px]">
                            {vol.name}
                          </span>
                        </div>
                        <div className="font-mono text-xs text-[#F0F3FA] font-semibold mt-0.5 tabular-nums">
                          ${vol.price.toFixed(2)}
                        </div>
                      </div>

                      <div className="text-right">
                        <span
                          className={`px-2 py-0.5 rounded font-mono text-xs font-bold inline-block tabular-nums ${
                            isPositive
                              ? 'bg-[#089981]/15 text-[#089981]'
                              : 'bg-[#F23645]/15 text-[#F23645]'
                          }`}
                        >
                          {isPositive ? '+' : ''}
                          {vol.changePercent.toFixed(2)}%
                        </span>
                        <div className="text-[10px] text-[#787B86] mt-0.5">Vol {vol.volume}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Earnings Calendar Widget */}
            <div className="bg-[#1E222D] rounded-xl p-5 shadow-sm flex flex-col justify-between border border-transparent hover:border-[#2A2E39] transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#66dabf]" />
                  <h4 className="font-['Manrope'] text-lg font-bold text-[#F0F3FA]">
                    Earnings Calendar
                  </h4>
                </div>
                <button
                  onClick={onOpenEarnings}
                  className="text-xs font-bold text-[#b6c4ff] hover:underline cursor-pointer"
                >
                  See full calendar
                </button>
              </div>

              <div className="space-y-2">
                {EARNINGS_ITEMS.map((earn) => (
                  <div
                    key={earn.symbol}
                    onClick={() =>
                      onSelectTicker({
                        symbol: earn.symbol,
                        name: earn.name,
                        price: earn.symbol === 'VFS' ? 4.12 : earn.symbol === 'PKE' ? 18.25 : 124.8,
                        change: 0.15,
                        changePercent: 1.2,
                        category: 'stock',
                      })
                    }
                    className="flex items-center justify-between p-2 rounded bg-[#131722] hover:bg-[#2A2E39] transition-colors text-xs cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          earn.timing === 'TODAY'
                            ? 'bg-[#20a28a] text-[#003027]'
                            : 'bg-[#2A2E39] text-[#787B86]'
                        }`}
                      >
                        {earn.timing}
                      </span>
                      <span className="font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                        {earn.symbol}
                      </span>
                      <span className="text-[#787B86] text-[11px] truncate max-w-[100px]">
                        {earn.name}
                      </span>
                    </div>
                    <div className="text-right font-mono text-[11px]">
                      <span className="text-[#787B86]">Est: </span>
                      <span className="text-[#F0F3FA] font-semibold">{earn.estimate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
