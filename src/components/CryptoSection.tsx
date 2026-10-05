import React from 'react';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { MarketItem } from '../types/market';
import {
  CRYPTO_HEROES,
  TVL_PROTOCOLS,
  CRYPTO_GAINERS,
  CRYPTO_LOSERS,
} from '../data/marketData';

interface CryptoSectionProps {
  onSelectTicker: (item: MarketItem) => void;
  onOpenScreener: () => void;
}

export const CryptoSection: React.FC<CryptoSectionProps> = ({
  onSelectTicker,
  onOpenScreener,
}) => {
  return (
    <section className="w-full px-4 md:px-8 py-8" id="crypto">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
        {/* Section Title & Macro Stats */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
          <div>
            <button
              onClick={onOpenScreener}
              className="group flex items-center gap-1.5 cursor-pointer text-left"
            >
              <span className="font-['Manrope'] text-2xl md:text-3xl font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                Crypto
              </span>
              <ChevronRight className="w-6 h-6 text-[#787B86] group-hover:translate-x-1 group-hover:text-[#66dabf] transition-all" />
            </button>
            <p className="text-sm text-[#787B86] mt-0.5">
              24/7 decentralized asset telemetry, global TVL metrics, and algorithmic liquidity pools
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#1E222D] text-[#787B86] font-mono text-xs border border-[#2A2E39]">
              Total Market Cap: <strong className="text-[#F0F3FA]">$2.48T</strong>
            </span>
            <span className="px-2.5 py-1 rounded bg-[#1E222D] text-[#787B86] font-mono text-xs border border-[#2A2E39]">
              BTC Dominance: <strong className="text-[#66dabf]">56.4%</strong>
            </span>
          </div>
        </div>

        {/* Live Crypto Hero Cards Grid (4-Up) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CRYPTO_HEROES.map((crypto) => {
            const isPositive = crypto.changePercent >= 0;
            return (
              <div
                key={crypto.symbol}
                onClick={() => onSelectTicker(crypto)}
                className="bg-[#1E222D] hover:bg-[#2A2E39] p-4 rounded-xl shadow-md transition-all cursor-pointer border border-transparent hover:border-[#363A45] group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                          crypto.symbol === 'BTC'
                            ? 'bg-[#f7931a]/20 text-[#f7931a]'
                            : crypto.symbol === 'ETH'
                            ? 'bg-[#2962FF]/20 text-[#b6c4ff]'
                            : crypto.symbol === 'SOL'
                            ? 'bg-[#66dabf]/20 text-[#66dabf]'
                            : 'bg-[#2A2E39] text-[#F0F3FA]'
                        }`}
                      >
                        {crypto.symbol === 'BTC'
                          ? '₿'
                          : crypto.symbol === 'ETH'
                          ? 'Ξ'
                          : crypto.symbol === 'SOL'
                          ? 'SOL'
                          : 'XRP'}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                          {crypto.name}
                        </span>
                        <span className="text-[10px] text-[#787B86] block font-mono">
                          {crypto.exchange}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-xs font-bold tabular-nums ${
                        isPositive
                          ? 'bg-[#089981]/15 text-[#089981]'
                          : 'bg-[#F23645]/15 text-[#F23645]'
                      }`}
                    >
                      {isPositive ? '+' : ''}
                      {crypto.changePercent.toFixed(2)}%
                    </span>
                  </div>

                  <div className="mt-3">
                    <div className="font-['Manrope'] text-2xl font-extrabold text-[#F0F3FA] tabular-nums">
                      ${crypto.price >= 1 ? crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : crypto.price.toFixed(4)}
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#787B86] mt-1 font-mono">
                      <span>MCap {crypto.marketCap}</span>
                      <span>24h Vol {crypto.volume}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full h-8 mt-3">
                  <svg
                    className={`w-full h-full overflow-visible ${
                      isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                    }`}
                    viewBox="0 0 100 20"
                  >
                    <path
                      d={
                        isPositive
                          ? 'M 0,16 Q 30,18 50,8 T 80,6 T 100,2'
                          : 'M 0,4 Q 30,2 50,12 T 80,14 T 100,17'
                      }
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>

        {/* Crypto Sub-Tables (DeFi TVL Rankings + Gainers & Losers) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* DeFi TVL Ranking */}
          <div className="bg-[#1E222D] rounded-xl p-5 shadow-sm border border-transparent hover:border-[#2A2E39] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-['Manrope'] text-lg font-bold text-[#F0F3FA]">
                  Top TVL Protocols
                </h4>
                <p className="text-xs text-[#787B86]">
                  Decentralized protocols ranked by Total Value Locked
                </p>
              </div>
              <button
                onClick={onOpenScreener}
                className="text-xs font-bold text-[#b6c4ff] hover:underline cursor-pointer"
              >
                See all coins
              </button>
            </div>

            <div className="space-y-2">
              {TVL_PROTOCOLS.map((proto) => {
                const isPositive = proto.change7d >= 0;
                return (
                  <div
                    key={proto.rank}
                    onClick={() =>
                      onSelectTicker({
                        symbol: proto.symbol.replace('USD', ''),
                        name: proto.name,
                        price: proto.rank === 1 ? 142.5 : proto.rank === 2 ? 1.88 : proto.rank === 3 ? 0.38 : 7.42,
                        change: 0.8,
                        changePercent: proto.change7d,
                        category: 'crypto',
                      })
                    }
                    className="flex items-center justify-between p-2.5 rounded bg-[#131722] hover:bg-[#2A2E39] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#787B86] w-4">{proto.rank}</span>
                      <div>
                        <span className="text-sm font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                          {proto.name}
                        </span>
                        <span className="text-[11px] text-[#787B86] block font-mono">
                          {proto.subtext}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm font-bold text-[#F0F3FA] tabular-nums">
                        {proto.tvl}
                      </div>
                      <span
                        className={`font-mono text-[10px] font-bold ${
                          isPositive ? 'text-[#089981]' : 'text-[#F23645]'
                        }`}
                      >
                        {isPositive ? '+' : ''}
                        {proto.change7d.toFixed(2)}% 7d
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Crypto Movers: Gainers & Losers */}
          <div className="bg-[#1E222D] rounded-xl p-5 shadow-sm flex flex-col justify-between border border-transparent hover:border-[#2A2E39] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-['Manrope'] text-lg font-bold text-[#F0F3FA]">
                  Top Crypto Outperformers
                </h4>
                <span className="text-[10px] text-[#089981] bg-[#089981]/10 px-2 py-0.5 rounded font-bold font-mono">
                  24H High-Beta
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Top Gainers */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#787B86] block mb-1">TOP GAINERS</span>
                  {CRYPTO_GAINERS.map((g) => (
                    <div
                      key={g.symbol}
                      onClick={() =>
                        onSelectTicker({
                          symbol: g.symbol,
                          name: g.name,
                          price: g.symbol === 'FET' ? 1.48 : g.symbol === 'HNT' ? 7.82 : 0.94,
                          change: 0.12,
                          changePercent: g.changePercent,
                          category: 'crypto',
                        })
                      }
                      className="p-2 rounded bg-[#131722] hover:bg-[#2A2E39] transition-colors cursor-pointer group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                          {g.symbol}
                        </span>
                        <span className="font-mono text-xs text-[#089981] font-bold">
                          +{g.changePercent.toFixed(2)}%
                        </span>
                      </div>
                      <span className="text-[11px] text-[#787B86] block truncate">{g.name}</span>
                    </div>
                  ))}
                </div>

                {/* Top Losers */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#787B86] block mb-1">TOP LOSERS</span>
                  {CRYPTO_LOSERS.map((l) => (
                    <div
                      key={l.symbol}
                      onClick={() =>
                        onSelectTicker({
                          symbol: l.symbol,
                          name: l.name,
                          price: l.symbol === 'PONS' ? 0.082 : l.symbol === 'SAND' ? 0.31 : 1.12,
                          change: -0.05,
                          changePercent: l.changePercent,
                          category: 'crypto',
                        })
                      }
                      className="p-2 rounded bg-[#131722] hover:bg-[#2A2E39] transition-colors cursor-pointer group"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                          {l.symbol}
                        </span>
                        <span className="font-mono text-xs text-[#F23645] font-bold">
                          {l.changePercent.toFixed(2)}%
                        </span>
                      </div>
                      <span className="text-[11px] text-[#787B86] block truncate">{l.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-[#787B86] text-xs border-t border-[#2A2E39]">
              <span>Real-time Binance & Coinbase live data feeds</span>
              <button
                onClick={onOpenScreener}
                className="text-[#b6c4ff] hover:underline cursor-pointer font-semibold"
              >
                Screener →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
