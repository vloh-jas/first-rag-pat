import React, { useState } from 'react';
import { X, Search, Filter, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { MarketItem } from '../types/market';
import {
  HIGH_VOLUME_STOCKS,
  MEGA_CAPS,
  CRYPTO_HEROES,
  MAJOR_INDICES,
} from '../data/marketData';

interface ScreenerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTicker: (item: MarketItem) => void;
}

export const ScreenerModal: React.FC<ScreenerModalProps> = ({
  isOpen,
  onClose,
  onSelectTicker,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'gainers' | 'losers' | 'mega'>('all');
  const [search, setSearch] = useState('');

  const combinedList: MarketItem[] = [
    ...HIGH_VOLUME_STOCKS,
    ...MEGA_CAPS.map((m) => ({
      symbol: m.symbol,
      name: m.name,
      price: m.price,
      change: m.price * (m.changePercent / 100),
      changePercent: m.changePercent,
      category: 'stock' as const,
      marketCap: m.marketCap,
    })),
    ...CRYPTO_HEROES,
  ];

  // Deduplicate
  const uniqueItems = Array.from(new Map(combinedList.map((i) => [i.symbol, i])).values());

  const filtered = uniqueItems.filter((item) => {
    const matchSearch =
      item.symbol.toLowerCase().includes(search.toLowerCase()) ||
      item.name.toLowerCase().includes(search.toLowerCase());
    if (!matchSearch) return false;

    if (filterType === 'gainers') return item.changePercent > 0;
    if (filterType === 'losers') return item.changePercent < 0;
    if (filterType === 'mega') return item.marketCap?.includes('T');
    return true;
  });

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#1E222D] border border-[#2A2E39] rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2E39] bg-[#171d1b]">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-[#66dabf]" />
            <div>
              <h2 className="text-lg font-bold font-['Manrope'] text-[#F0F3FA]">
                Quantitative Market Screener
              </h2>
              <p className="text-xs text-[#787B86]">
                Screening 140+ global exchanges by liquidity, volatility & capitalization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#2A2E39] hover:bg-[#353a38] text-[#787B86] hover:text-[#F0F3FA] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-[#131722] border-b border-[#2A2E39]">
          <div className="flex items-center gap-1.5">
            {[
              { id: 'all', label: 'All Equities & Crypto' },
              { id: 'gainers', label: 'Top Gainers' },
              { id: 'losers', label: 'Top Decliners' },
              { id: 'mega', label: 'Trillion+ Mega Caps' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id as any)}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  filterType === f.id
                    ? 'bg-[#2962FF] text-[#F0F3FA]'
                    : 'text-[#787B86] hover:text-[#F0F3FA] bg-[#1E222D]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="relative w-64">
            <Search className="w-4 h-4 text-[#787B86] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter list..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#1E222D] border border-[#2A2E39] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#F0F3FA] focus:outline-none focus:border-[#66dabf]"
            />
          </div>
        </div>

        {/* Screener Table */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-[11px] text-[#787B86] uppercase tracking-wider border-b border-[#2A2E39]">
                <th className="py-2.5 px-3">Symbol & Asset</th>
                <th className="py-2.5 px-3 text-right">Price</th>
                <th className="py-2.5 px-3 text-right">24H Return</th>
                <th className="py-2.5 px-3 text-right">Volume</th>
                <th className="py-2.5 px-3 text-right">Market Cap</th>
                <th className="py-2.5 px-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E39]/40">
              {filtered.map((item) => {
                const isPositive = item.changePercent >= 0;
                return (
                  <tr
                    key={item.symbol}
                    className="hover:bg-[#2A2E39] transition-colors cursor-pointer"
                    onClick={() => {
                      onSelectTicker(item);
                      onClose();
                    }}
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#131722] text-[#66dabf] font-bold">
                          {item.symbol}
                        </span>
                        <span className="text-xs text-[#F0F3FA] font-sans font-medium">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-[#F0F3FA] tabular-nums">
                      ${item.price >= 1 ? item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : item.price.toFixed(4)}
                    </td>
                    <td
                      className={`py-3 px-3 text-right font-bold tabular-nums ${
                        isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {item.changePercent.toFixed(2)}%
                    </td>
                    <td className="py-3 px-3 text-right text-[#dee4e0] tabular-nums">
                      {item.volume || '18.4M'}
                    </td>
                    <td className="py-3 px-3 text-right text-[#787B86] tabular-nums">
                      {item.marketCap || 'N/A'}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="text-xs text-[#66dabf] hover:underline flex items-center justify-center gap-1">
                        Chart <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
