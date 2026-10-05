import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { MarketItem } from '../types/market';
import {
  MAJOR_INDICES,
  QUICK_INDICES,
  MEGA_CAPS,
  HIGH_VOLUME_STOCKS,
  CRYPTO_HEROES,
  FUTURES_DATA,
  FOREX_DATA,
  SOVEREIGN_BONDS,
} from '../data/marketData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTicker: (item: MarketItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectTicker,
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'stocks' | 'crypto' | 'indices' | 'forex' | 'futures'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Compile all search items
  const allItems: MarketItem[] = [
    ...MAJOR_INDICES,
    ...QUICK_INDICES,
    ...MEGA_CAPS.map((s) => ({
      symbol: s.symbol,
      name: s.name,
      price: s.price,
      change: s.price * (s.changePercent / 100),
      changePercent: s.changePercent,
      category: 'stock' as const,
      marketCap: s.marketCap,
    })),
    ...HIGH_VOLUME_STOCKS,
    ...CRYPTO_HEROES,
    ...FUTURES_DATA,
    ...FOREX_DATA,
    ...SOVEREIGN_BONDS.map((b) => ({
      symbol: b.code,
      name: b.country,
      price: b.price,
      change: b.change,
      changePercent: b.change,
      category: 'bond' as const,
    })),
  ];

  // Deduplicate by symbol
  const uniqueItems = Array.from(new Map(allItems.map((item) => [item.symbol, item])).values());

  const filteredItems = uniqueItems.filter((item) => {
    const matchesQuery =
      item.symbol.toLowerCase().includes(query.toLowerCase()) ||
      item.name.toLowerCase().includes(query.toLowerCase());

    if (!matchesQuery) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'stocks' && item.category === 'stock') return true;
    if (activeTab === 'crypto' && item.category === 'crypto') return true;
    if (activeTab === 'indices' && item.category === 'index') return true;
    if (activeTab === 'forex' && item.category === 'forex') return true;
    if (activeTab === 'futures' && item.category === 'future') return true;
    return false;
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, activeTab]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < filteredItems.length ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        onSelectTicker(filteredItems[selectedIndex]);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#1E222D] border border-[#2A2E39] rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#2A2E39] gap-3">
          <Search className="w-5 h-5 text-[#66dabf] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search by symbol, company, crypto, or commodity..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[#F0F3FA] placeholder-[#787B86] text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#787B86] hover:text-[#F0F3FA] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] text-[#787B86] font-mono bg-[#2A2E39] px-2 py-0.5 rounded border border-[#363A45]">
            ESC
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 bg-[#171d1b] border-b border-[#2A2E39] overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All Assets' },
            { id: 'stocks', label: 'Stocks' },
            { id: 'crypto', label: 'Crypto' },
            { id: 'indices', label: 'Indices' },
            { id: 'forex', label: 'Forex' },
            { id: 'futures', label: 'Futures' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#2A2E39] text-[#66dabf]'
                  : 'text-[#787B86] hover:text-[#F0F3FA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-[#2A2E39]/40 p-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-[#787B86] text-sm">
              No matching assets found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isPositive = item.changePercent >= 0;
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.symbol}
                  onClick={() => {
                    onSelectTicker(item);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#2A2E39] text-[#F0F3FA]' : 'hover:bg-[#252b29]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-14 px-2 py-1 rounded bg-[#131722] text-[#F0F3FA] font-bold text-xs font-mono text-center border border-[#2A2E39]">
                      {item.symbol}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-[#F0F3FA] flex items-center gap-2">
                        <span>{item.name}</span>
                        <span className="text-[10px] text-[#787B86] uppercase font-mono px-1 rounded bg-[#131722]">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-xs text-[#787B86]">
                        {item.exchange || 'Consolidated Feed'}
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-sm font-bold text-[#F0F3FA]">
                      ${item.price >= 1 ? item.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 }) : item.price.toFixed(4)}
                    </div>
                    <div
                      className={`text-xs font-semibold flex items-center justify-end gap-0.5 ${
                        isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      <span>
                        {isPositive ? '+' : ''}
                        {item.changePercent.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-4 py-2.5 bg-[#171d1b] border-t border-[#2A2E39] flex items-center justify-between text-[11px] text-[#787B86]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="bg-[#2A2E39] px-1.5 py-0.5 rounded text-[10px] text-[#dee4e0] font-mono mr-1">
                ↑
              </kbd>
              <kbd className="bg-[#2A2E39] px-1.5 py-0.5 rounded text-[10px] text-[#dee4e0] font-mono mr-1">
                ↓
              </kbd>
              Navigate
            </span>
            <span>
              <kbd className="bg-[#2A2E39] px-1.5 py-0.5 rounded text-[10px] text-[#dee4e0] font-mono mr-1">
                ↵
              </kbd>
              Open chart
            </span>
          </div>
          <span>TradingView Global Search Engine</span>
        </div>
      </div>
    </div>
  );
};
