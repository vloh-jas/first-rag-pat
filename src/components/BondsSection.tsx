import React, { useState } from 'react';
import { ChevronRight, SlidersHorizontal, ArrowUpRight } from 'lucide-react';
import { SOVEREIGN_BONDS, YIELD_CURVE_POINTS } from '../data/marketData';
import { SovereignBond } from '../types/market';

interface BondsSectionProps {
  onSelectBond: (bond: SovereignBond) => void;
  onOpenYieldCurveModal: () => void;
  onOpenDebtScreener: () => void;
}

export const BondsSection: React.FC<BondsSectionProps> = ({
  onSelectBond,
  onOpenYieldCurveModal,
  onOpenDebtScreener,
}) => {
  const [hoveredTenor, setHoveredTenor] = useState<string | null>(null);

  return (
    <section className="w-full px-4 md:px-8 py-8" id="bonds">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
        {/* Section Title */}
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={onOpenDebtScreener}
            className="group flex items-center gap-1.5 cursor-pointer text-left"
          >
            <span className="font-['Manrope'] text-2xl md:text-3xl font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
              Government bonds
            </span>
            <ChevronRight className="w-6 h-6 text-[#787B86] group-hover:translate-x-1 group-hover:text-[#66dabf] transition-all" />
          </button>
          <button
            onClick={onOpenYieldCurveModal}
            className="text-xs font-bold text-[#b6c4ff] hover:underline flex items-center gap-1 cursor-pointer"
          >
            Customize yield curves
            <SlidersHorizontal className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        {/* Yield Curve Visualization & Benchmark Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* US Treasury Yield Curve Visual Pane (6 cols) */}
          <div className="lg:col-span-6 bg-[#1E222D] rounded-xl p-5 shadow-sm flex flex-col justify-between border border-transparent hover:border-[#2A2E39] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-['Manrope'] text-lg font-bold text-[#F0F3FA]">
                    US Treasury Yield Curve
                  </h4>
                  <span className="text-xs text-[#787B86]">
                    Spread: 10Y - 2Y = +46.5 bps (Un-inverted)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-[#66dabf]/10 text-[#66dabf] font-mono text-[11px] font-bold">
                  BENCHMARK
                </span>
              </div>

              {/* Inline SVG Yield Curve Representation */}
              <div className="w-full h-44 mt-4 relative bg-[#131722]/80 rounded-lg p-3 border border-[#2A2E39]/50 flex flex-col justify-between">
                {hoveredTenor && (
                  <div className="absolute top-2 right-3 px-2 py-1 rounded bg-[#2A2E39] border border-[#363A45] text-xs font-mono text-[#66dabf] z-10 shadow-lg">
                    {hoveredTenor}:{' '}
                    {YIELD_CURVE_POINTS.find((p) => p.tenor === hoveredTenor)?.rate}%
                  </div>
                )}

                <div className="w-full h-32 relative">
                  <svg
                    className="w-full h-full text-[#66dabf] overflow-visible"
                    preserveAspectRatio="none"
                    viewBox="0 0 400 120"
                  >
                    {/* Grid Lines */}
                    <line
                      stroke="#2A2E39"
                      strokeDasharray="3 3"
                      x1="0"
                      x2="400"
                      y1="20"
                      y2="20"
                    />
                    <line
                      stroke="#2A2E39"
                      strokeDasharray="3 3"
                      x1="0"
                      x2="400"
                      y1="60"
                      y2="60"
                    />
                    <line
                      stroke="#2A2E39"
                      strokeDasharray="3 3"
                      x1="0"
                      x2="400"
                      y1="100"
                      y2="100"
                    />

                    {/* Curve Area Fill */}
                    <path
                      d="M 10,95 Q 60,65 120,45 T 240,28 T 320,18 L 390,16 L 390,120 L 10,120 Z"
                      fill="currentColor"
                      fillOpacity="0.08"
                    />

                    {/* Curve Path */}
                    <path
                      d="M 10,95 Q 60,65 120,45 T 240,28 T 320,18 L 390,16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    />

                    {/* Tenor Points */}
                    <circle
                      cx="10"
                      cy="95"
                      fill="currentColor"
                      r="4"
                      className="cursor-pointer hover:r-6 transition-all"
                      onMouseEnter={() => setHoveredTenor('1M')}
                      onMouseLeave={() => setHoveredTenor(null)}
                    />
                    <circle
                      cx="80"
                      cy="58"
                      fill="currentColor"
                      r="4"
                      className="cursor-pointer hover:r-6 transition-all"
                      onMouseEnter={() => setHoveredTenor('2Y')}
                      onMouseLeave={() => setHoveredTenor(null)}
                    />
                    <circle
                      cx="160"
                      cy="38"
                      fill="currentColor"
                      r="4"
                      className="cursor-pointer hover:r-6 transition-all"
                      onMouseEnter={() => setHoveredTenor('5Y')}
                      onMouseLeave={() => setHoveredTenor(null)}
                    />
                    <circle
                      className="animate-pulse cursor-pointer hover:r-6 transition-all"
                      cx="260"
                      cy="24"
                      fill="#66dabf"
                      r="5.5"
                      onMouseEnter={() => setHoveredTenor('10Y')}
                      onMouseLeave={() => setHoveredTenor(null)}
                    />
                    <circle
                      cx="390"
                      cy="16"
                      fill="currentColor"
                      r="4"
                      className="cursor-pointer hover:r-6 transition-all"
                      onMouseEnter={() => setHoveredTenor('30Y')}
                      onMouseLeave={() => setHoveredTenor(null)}
                    />
                  </svg>
                </div>

                {/* Tenor Labels */}
                <div className="flex justify-between text-[11px] font-mono text-[#787B86] mt-1 px-1">
                  <span
                    className={`cursor-pointer ${hoveredTenor === '1M' ? 'text-[#66dabf]' : ''}`}
                    onClick={() => setHoveredTenor('1M')}
                  >
                    1M
                  </span>
                  <span
                    className={`cursor-pointer ${hoveredTenor === '2Y' ? 'text-[#66dabf]' : ''}`}
                    onClick={() => setHoveredTenor('2Y')}
                  >
                    2Y (4.80%)
                  </span>
                  <span
                    className={`cursor-pointer ${hoveredTenor === '5Y' ? 'text-[#66dabf]' : ''}`}
                    onClick={() => setHoveredTenor('5Y')}
                  >
                    5Y (5.03%)
                  </span>
                  <span
                    className={`text-[#66dabf] font-bold cursor-pointer ${
                      hoveredTenor === '10Y' ? 'underline' : ''
                    }`}
                    onClick={() => setHoveredTenor('10Y')}
                  >
                    10Y (5.267%)
                  </span>
                  <span
                    className={`cursor-pointer ${hoveredTenor === '30Y' ? 'text-[#66dabf]' : ''}`}
                    onClick={() => setHoveredTenor('30Y')}
                  >
                    30Y (5.62%)
                  </span>
                </div>
              </div>

              {/* US Yield Matrix */}
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div
                  onClick={onOpenYieldCurveModal}
                  className="p-2 rounded bg-[#131722] hover:bg-[#2A2E39] transition-colors cursor-pointer"
                >
                  <span className="text-[11px] text-[#787B86] block">US 2Y Yield</span>
                  <span className="font-mono text-sm font-bold text-[#F0F3FA] tabular-nums">
                    4.802%
                  </span>
                  <span className="text-[10px] text-[#089981] font-mono block">+0.05%</span>
                </div>
                <div
                  onClick={onOpenYieldCurveModal}
                  className="p-2 rounded bg-[#131722] hover:bg-[#2A2E39] transition-colors cursor-pointer"
                >
                  <span className="text-[11px] text-[#787B86] block">US 5Y Yield</span>
                  <span className="font-mono text-sm font-bold text-[#F0F3FA] tabular-nums">
                    5.037%
                  </span>
                  <span className="text-[10px] text-[#089981] font-mono block">+0.07%</span>
                </div>
                <div
                  onClick={onOpenYieldCurveModal}
                  className="p-2 rounded bg-[#131722] hover:bg-[#2A2E39] transition-colors cursor-pointer ring-1 ring-[#66dabf]/30"
                >
                  <span className="text-[11px] text-[#66dabf] font-semibold block">US 10Y Yield</span>
                  <span className="font-mono text-sm font-bold text-[#F0F3FA] tabular-nums">
                    5.267%
                  </span>
                  <span className="text-[10px] text-[#089981] font-mono block">+0.06%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Global 10Y Benchmarks (6 cols) */}
          <div className="lg:col-span-6 bg-[#1E222D] rounded-xl p-5 shadow-sm flex flex-col justify-between border border-transparent hover:border-[#2A2E39] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-['Manrope'] text-lg font-bold text-[#F0F3FA]">
                  Major Sovereign 10Y Bonds
                </h4>
                <button
                  onClick={onOpenDebtScreener}
                  className="text-xs font-bold text-[#b6c4ff] hover:underline cursor-pointer"
                >
                  See all 10Y yields
                </button>
              </div>

              <div className="w-full overflow-x-auto no-scrollbar">
                <table className="w-full text-left font-mono text-xs">
                  <thead>
                    <tr className="text-[11px] text-[#787B86] uppercase tracking-wider border-b border-[#2A2E39]">
                      <th className="py-2 px-2">Sovereign Benchmark</th>
                      <th className="py-2 px-2 text-right">Price</th>
                      <th className="py-2 px-2 text-right">Chg</th>
                      <th className="py-2 px-2 text-right">10Y Yield</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2A2E39]/40">
                    {SOVEREIGN_BONDS.map((bond) => (
                      <tr
                        key={bond.code}
                        onClick={() => onSelectBond(bond)}
                        className="hover:bg-[#2A2E39] transition-colors cursor-pointer group"
                      >
                        <td className="py-2.5 px-2">
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: bond.color }}
                            />
                            <span className="text-xs font-sans font-semibold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                              {bond.country}
                            </span>
                          </div>
                        </td>
                        <td className="py-2.5 px-2 text-right text-[#787B86] tabular-nums">
                          {bond.price.toFixed(3)}
                        </td>
                        <td className="py-2.5 px-2 text-right text-[#089981] font-bold tabular-nums">
                          +{bond.change.toFixed(2)}%
                        </td>
                        <td className="py-2.5 px-2 text-right font-bold text-[#F0F3FA] tabular-nums">
                          {bond.yield10y.toFixed(3)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 pt-3 flex items-center justify-between text-[#787B86] text-xs border-t border-[#2A2E39]">
              <span>ICE Data Services Sovereign Benchmarks</span>
              <button
                onClick={onOpenDebtScreener}
                className="text-[#66dabf] hover:underline cursor-pointer font-semibold"
              >
                Global Debt Screener →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
