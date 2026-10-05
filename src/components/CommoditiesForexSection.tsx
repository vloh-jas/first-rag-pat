import React from 'react';
import { ChevronRight, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { MarketItem } from '../types/market';
import { FUTURES_DATA, FOREX_DATA } from '../data/marketData';

interface CommoditiesForexSectionProps {
  onSelectTicker: (item: MarketItem) => void;
  onOpenSpecs: () => void;
  onOpenHeatmap: () => void;
}

export const CommoditiesForexSection: React.FC<CommoditiesForexSectionProps> = ({
  onSelectTicker,
  onOpenSpecs,
  onOpenHeatmap,
}) => {
  return (
    <section className="w-full px-4 md:px-8 py-8" id="futures">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Commodities & Energy Futures (6 cols) */}
        <div className="lg:col-span-6 bg-[#1E222D] rounded-xl p-5 shadow-sm flex flex-col justify-between border border-transparent hover:border-[#2A2E39] transition-colors">
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onOpenSpecs}
                className="group flex items-center gap-1.5 cursor-pointer text-left"
              >
                <span className="font-['Manrope'] text-lg md:text-xl font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                  Futures & Commodities
                </span>
                <ChevronRight className="w-5 h-5 text-[#787B86] group-hover:translate-x-1 group-hover:text-[#66dabf] transition-all" />
              </button>
              <button
                onClick={onOpenSpecs}
                className="text-xs font-bold text-[#b6c4ff] hover:underline cursor-pointer"
              >
                All Metals & Energies
              </button>
            </div>

            <div className="w-full overflow-x-auto no-scrollbar">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="text-[11px] text-[#787B86] uppercase tracking-wider border-b border-[#2A2E39]">
                    <th className="py-2 px-2">Contract</th>
                    <th className="py-2 px-2 text-right">Settlement</th>
                    <th className="py-2 px-2 text-right">Change</th>
                    <th className="py-2 px-2 text-right">Trend</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2E39]/40">
                  {FUTURES_DATA.map((fut) => {
                    const isPositive = fut.changePercent >= 0;
                    return (
                      <tr
                        key={fut.symbol}
                        onClick={() => onSelectTicker(fut)}
                        className="hover:bg-[#2A2E39] transition-colors cursor-pointer group"
                      >
                        <td className="py-2.5 px-2">
                          <div className="flex items-center gap-2">
                            <span className="px-1.5 py-0.5 rounded bg-[#131722] text-[#F0F3FA] font-bold text-[11px] group-hover:text-[#66dabf] transition-colors">
                              {fut.symbol}
                            </span>
                            <span className="text-xs font-sans text-[#F0F3FA] font-medium">
                              {fut.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-right font-semibold text-[#F0F3FA] tabular-nums">
                          {fut.price >= 100
                            ? fut.price.toLocaleString(undefined, { minimumFractionDigits: 2 })
                            : fut.price.toFixed(fut.symbol === 'HG1!' ? 4 : 3)}{' '}
                          {fut.currency}
                        </td>
                        <td
                          className={`py-2.5 px-2 text-right font-bold tabular-nums ${
                            isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                          }`}
                        >
                          {isPositive ? '+' : ''}
                          {fut.changePercent.toFixed(2)}%
                        </td>
                        <td
                          className={`py-2.5 px-2 text-right ${
                            isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                          }`}
                        >
                          <div className="flex items-center justify-end">
                            {isPositive ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between text-[#787B86] text-xs border-t border-[#2A2E39]">
            <span>COMEX, NYMEX & CBOT Delayed 10m</span>
            <button
              onClick={onOpenSpecs}
              className="text-[#66dabf] hover:underline cursor-pointer font-semibold"
            >
              Contract Specs →
            </button>
          </div>
        </div>

        {/* Forex Majors & Currency Indices (6 cols) */}
        <div
          className="lg:col-span-6 bg-[#1E222D] rounded-xl p-5 shadow-sm flex flex-col justify-between border border-transparent hover:border-[#2A2E39] transition-colors"
          id="forex"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={onOpenHeatmap}
                className="group flex items-center gap-1.5 cursor-pointer text-left"
              >
                <span className="font-['Manrope'] text-lg md:text-xl font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                  Forex & Currencies
                </span>
                <ChevronRight className="w-5 h-5 text-[#787B86] group-hover:translate-x-1 group-hover:text-[#66dabf] transition-all" />
              </button>
              <button
                onClick={onOpenHeatmap}
                className="text-xs font-bold text-[#b6c4ff] hover:underline cursor-pointer"
              >
                All FX Pairs
              </button>
            </div>

            <div className="w-full overflow-x-auto no-scrollbar">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="text-[11px] text-[#787B86] uppercase tracking-wider border-b border-[#2A2E39]">
                    <th className="py-2 px-2">Pair</th>
                    <th className="py-2 px-2 text-right">Bid</th>
                    <th className="py-2 px-2 text-right">Ask</th>
                    <th className="py-2 px-2 text-right">Chg %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2E39]/40">
                  {FOREX_DATA.map((fx) => {
                    const isPositive = fx.changePercent >= 0;
                    return (
                      <tr
                        key={fx.symbol}
                        onClick={() => onSelectTicker(fx)}
                        className="hover:bg-[#2A2E39] transition-colors cursor-pointer group"
                      >
                        <td className="py-2.5 px-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-1.5 py-0.5 rounded font-bold text-[11px] ${
                                fx.symbol === 'DXY'
                                  ? 'bg-[#20a28a] text-[#003027]'
                                  : 'bg-[#131722] text-[#F0F3FA]'
                              } group-hover:text-[#66dabf] transition-colors`}
                            >
                              {fx.symbol}
                            </span>
                            <span className="text-xs font-sans text-[#787B86]">
                              {fx.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-right font-semibold text-[#F0F3FA] tabular-nums">
                          {fx.bid?.toFixed(fx.symbol === 'USD/JPY' || fx.symbol === 'DXY' ? 2 : 5)}
                        </td>
                        <td className="py-2.5 px-2 text-right font-semibold text-[#F0F3FA] tabular-nums">
                          {fx.ask?.toFixed(fx.symbol === 'USD/JPY' || fx.symbol === 'DXY' ? 2 : 5)}
                        </td>
                        <td
                          className={`py-2.5 px-2 text-right font-bold tabular-nums ${
                            isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                          }`}
                        >
                          {isPositive ? '+' : ''}
                          {fx.changePercent.toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between text-[#787B86] text-xs border-t border-[#2A2E39]">
            <span>Global Interbank Liquidity Pricing</span>
            <button
              onClick={onOpenHeatmap}
              className="text-[#66dabf] hover:underline cursor-pointer font-semibold"
            >
              Cross Rates Heatmap →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
