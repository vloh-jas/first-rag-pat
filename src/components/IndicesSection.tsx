import React from 'react';
import { ChevronRight, ArrowUpRight, ArrowUp, ArrowDown } from 'lucide-react';
import { MarketItem } from '../types/market';
import { MAJOR_INDICES, QUICK_INDICES, WORLD_INDICES } from '../data/marketData';

interface IndicesSectionProps {
  onSelectTicker: (item: MarketItem) => void;
  onOpenAllIndices: () => void;
}

export const IndicesSection: React.FC<IndicesSectionProps> = ({
  onSelectTicker,
  onOpenAllIndices,
}) => {
  return (
    <section className="w-full px-4 md:px-8 py-8" id="indices">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={onOpenAllIndices}
            className="group flex items-center gap-1.5 cursor-pointer text-left"
          >
            <span className="font-['Manrope'] text-2xl md:text-3xl font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
              Indices
            </span>
            <ChevronRight className="w-6 h-6 text-[#787B86] group-hover:translate-x-1 group-hover:text-[#66dabf] transition-all" />
          </button>
          <button
            onClick={onOpenAllIndices}
            className="text-xs font-bold text-[#b6c4ff] hover:underline flex items-center gap-1 cursor-pointer"
          >
            See all major indices
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bento 3-Up Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* S&P 500 */}
          <div
            onClick={() => onSelectTicker(MAJOR_INDICES[0])}
            className="bg-[#1E222D] hover:bg-[#2A2E39] p-5 rounded-xl transition-all duration-200 shadow-md group cursor-pointer flex flex-col justify-between h-48 border border-transparent hover:border-[#363A45]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F23645] text-[#F0F3FA] flex items-center justify-center text-xs font-black shadow-sm">
                  500
                </div>
                <div>
                  <h3 className="font-['Manrope'] text-lg font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                    S&P 500
                  </h3>
                  <span className="text-[10px] text-[#787B86] font-bold uppercase tracking-wider">
                    INDEXSP: INX • CBOE
                  </span>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-[#089981]/15 text-[#089981] font-mono text-xs font-bold flex items-center gap-0.5">
                <ArrowUp className="w-3.5 h-3.5" />
                +0.34%
              </span>
            </div>

            <div className="flex items-end justify-between mt-auto">
              <div>
                <div className="font-['Manrope'] text-[32px] leading-tight font-extrabold tracking-tight text-[#F0F3FA] tabular-nums">
                  5,864.67
                </div>
                <div className="font-mono text-xs font-semibold text-[#089981] tabular-nums mt-0.5">
                  +19.82 pts
                </div>
              </div>

              {/* Sparkline */}
              <div className="w-32 h-12">
                <svg className="w-full h-full text-[#089981] overflow-visible" viewBox="0 0 100 40">
                  <path
                    d="M 0,32 Q 25,38 45,22 T 75,15 T 100,6"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2.4"
                  />
                  <circle cx="100" cy="6" fill="currentColor" r="3.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Nasdaq 100 */}
          <div
            onClick={() => onSelectTicker(MAJOR_INDICES[1])}
            className="bg-[#1E222D] hover:bg-[#2A2E39] p-5 rounded-xl transition-all duration-200 shadow-md group cursor-pointer flex flex-col justify-between h-48 border border-transparent hover:border-[#363A45]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2962FF] text-[#F0F3FA] flex items-center justify-center text-xs font-black shadow-sm">
                  100
                </div>
                <div>
                  <h3 className="font-['Manrope'] text-lg font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                    Nasdaq 100
                  </h3>
                  <span className="text-[10px] text-[#787B86] font-bold uppercase tracking-wider">
                    NASDAQ: NDX
                  </span>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-[#089981]/15 text-[#089981] font-mono text-xs font-bold flex items-center gap-0.5">
                <ArrowUp className="w-3.5 h-3.5" />
                +0.82%
              </span>
            </div>

            <div className="flex items-end justify-between mt-auto">
              <div>
                <div className="font-['Manrope'] text-[32px] leading-tight font-extrabold tracking-tight text-[#F0F3FA] tabular-nums">
                  20,387.21
                </div>
                <div className="font-mono text-xs font-semibold text-[#089981] tabular-nums mt-0.5">
                  +165.74 pts
                </div>
              </div>

              <div className="w-32 h-12">
                <svg className="w-full h-full text-[#089981] overflow-visible" viewBox="0 0 100 40">
                  <path
                    d="M 0,35 Q 20,30 40,28 T 70,12 T 100,4"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2.4"
                  />
                  <circle cx="100" cy="4" fill="currentColor" r="3.5" />
                </svg>
              </div>
            </div>
          </div>

          {/* Dow 30 */}
          <div
            onClick={() => onSelectTicker(MAJOR_INDICES[2])}
            className="bg-[#1E222D] hover:bg-[#2A2E39] p-5 rounded-xl transition-all duration-200 shadow-md group cursor-pointer flex flex-col justify-between h-48 border border-transparent hover:border-[#363A45]"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#20a28a] text-[#003027] flex items-center justify-center text-xs font-black shadow-sm">
                  30
                </div>
                <div>
                  <h3 className="font-['Manrope'] text-lg font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                    Dow 30
                  </h3>
                  <span className="text-[10px] text-[#787B86] font-bold uppercase tracking-wider">
                    INDEXDJX: DJI
                  </span>
                </div>
              </div>
              <span className="px-2 py-1 rounded bg-[#F23645]/15 text-[#F23645] font-mono text-xs font-bold flex items-center gap-0.5">
                <ArrowDown className="w-3.5 h-3.5" />
                -0.15%
              </span>
            </div>

            <div className="flex items-end justify-between mt-auto">
              <div>
                <div className="font-['Manrope'] text-[32px] leading-tight font-extrabold tracking-tight text-[#F0F3FA] tabular-nums">
                  42,863.86
                </div>
                <div className="font-mono text-xs font-semibold text-[#F23645] tabular-nums mt-0.5">
                  -64.30 pts
                </div>
              </div>

              <div className="w-32 h-12">
                <svg className="w-full h-full text-[#F23645] overflow-visible" viewBox="0 0 100 40">
                  <path
                    d="M 0,10 Q 30,8 50,22 T 80,30 T 100,34"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2.4"
                  />
                  <circle cx="100" cy="34" fill="currentColor" r="3.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Index Ribbon Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_INDICES.map((idx) => {
            const isPositive = idx.changePercent >= 0;
            return (
              <div
                key={idx.symbol}
                onClick={() => onSelectTicker(idx)}
                className="bg-[#1E222D] hover:bg-[#2A2E39] p-3 rounded-lg flex flex-col justify-between transition-colors cursor-pointer border border-transparent hover:border-[#363A45]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#F0F3FA]">{idx.symbol}</span>
                  <span
                    className={`text-[10px] font-mono font-bold ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {idx.changePercent.toFixed(2)}%
                  </span>
                </div>
                <div className="font-mono text-base font-semibold text-[#F0F3FA] mt-1 tabular-nums">
                  {idx.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[11px] text-[#787B86] truncate">{idx.name}</span>
              </div>
            );
          })}
        </div>

        {/* World Indices Table Strip */}
        <div className="bg-[#1E222D] rounded-xl p-5 shadow-sm overflow-x-auto no-scrollbar border border-transparent hover:border-[#2A2E39] transition-colors" id="world-stocks">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#787B86]">
              Major World Indices Overview
            </h4>
            <span className="text-[10px] text-[#787B86]">Continuous Real-time Settlement</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 min-w-[760px]">
            {WORLD_INDICES.map((wIdx) => {
              const isPositive = wIdx.changePercent >= 0;
              return (
                <div
                  key={wIdx.symbol}
                  onClick={() => onSelectTicker(wIdx)}
                  className="flex flex-col p-2.5 rounded bg-[#131722] hover:bg-[#2A2E39] transition-colors cursor-pointer group"
                >
                  <span className="text-xs font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors truncate">
                    {wIdx.symbol}
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#F0F3FA] mt-1 tabular-nums">
                    {wIdx.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                  <span
                    className={`font-mono text-[11px] font-bold ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                  >
                    {isPositive ? '+' : ''}
                    {wIdx.changePercent.toFixed(2)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
