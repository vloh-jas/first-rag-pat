import React, { useState } from 'react';
import { X, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';
import { YIELD_CURVE_POINTS, SOVEREIGN_BONDS } from '../data/marketData';

interface YieldCurveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const YieldCurveModal: React.FC<YieldCurveModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [spreadShift, setSpreadShift] = useState(0);
  const [selectedBenchmark, setSelectedBenchmark] = useState<'US' | 'DE' | 'UK'>('US');

  if (!isOpen) return null;

  const currentSpread = 46.5 + spreadShift;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#1E222D] border border-[#2A2E39] rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2E39] bg-[#171d1b]">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-5 h-5 text-[#66dabf]" />
            <div>
              <h2 className="text-lg font-bold font-['Manrope'] text-[#F0F3FA]">
                Customize Yield Curves & Spreads
              </h2>
              <p className="text-xs text-[#787B86]">
                Institutional sovereign curve modeler and term structure analytics
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

        <div className="p-6 space-y-6 flex-1 overflow-y-auto no-scrollbar">
          {/* Country Benchmark Selector */}
          <div>
            <label className="text-xs text-[#787B86] font-bold uppercase tracking-wider block mb-2">
              Select Sovereign Term Structure
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'US', label: 'US Treasuries (UST)', rate: '5.267%' },
                { id: 'DE', label: 'Germany Bund (BUND)', rate: '3.461%' },
                { id: 'UK', label: 'UK Gilts (GILT)', rate: '5.379%' },
              ].map((bench) => (
                <button
                  key={bench.id}
                  onClick={() => setSelectedBenchmark(bench.id as any)}
                  className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                    selectedBenchmark === bench.id
                      ? 'bg-[#2A2E39] border-[#66dabf] text-[#F0F3FA]'
                      : 'bg-[#131722] border-[#2A2E39] text-[#787B86] hover:text-[#F0F3FA]'
                  }`}
                >
                  <div className="font-bold text-sm">{bench.label}</div>
                  <div className="font-mono text-xs text-[#66dabf] mt-1">{bench.rate} 10Y Yield</div>
                </button>
              ))}
            </div>
          </div>

          {/* Spread Simulator */}
          <div className="bg-[#131722] p-4 rounded-xl border border-[#2A2E39] space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-[#787B86] uppercase font-bold">10Y - 2Y Curve Spread</span>
                <div className="font-mono text-xl font-bold text-[#F0F3FA] mt-0.5">
                  {currentSpread >= 0 ? '+' : ''}{currentSpread.toFixed(1)} bps
                  <span className="text-xs text-[#089981] ml-2 font-normal">
                    {currentSpread >= 0 ? '(Normal / Un-inverted)' : '(Inverted Yield Curve)'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSpreadShift(0)}
                className="flex items-center gap-1 text-xs text-[#66dabf] hover:underline cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#787B86] font-mono">
                <span>-50 bps (Deep Inversion)</span>
                <span>Neutral (0)</span>
                <span>+100 bps (Steepening)</span>
              </div>
              <input
                type="range"
                min="-60"
                max="60"
                value={spreadShift}
                onChange={(e) => setSpreadShift(parseFloat(e.target.value))}
                className="w-full accent-[#66dabf] cursor-pointer"
              />
            </div>
          </div>

          {/* Tenor Rates Grid */}
          <div>
            <label className="text-xs text-[#787B86] font-bold uppercase tracking-wider block mb-2">
              Active Tenor Yield Matrix
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 font-mono text-xs">
              {YIELD_CURVE_POINTS.map((pt) => {
                const adjRate = pt.rate + spreadShift * 0.01;
                return (
                  <div
                    key={pt.tenor}
                    className="p-2.5 rounded-lg bg-[#131722] border border-[#2A2E39] text-center"
                  >
                    <span className="text-[#787B86] block text-[11px] font-sans">{pt.tenor}</span>
                    <span className="text-[#F0F3FA] font-bold text-sm block mt-0.5 tabular-nums">
                      {adjRate.toFixed(3)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-[#171d1b] border-t border-[#2A2E39] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#2962FF] text-[#F0F3FA] font-bold text-xs hover:bg-[#1e50dc] cursor-pointer"
          >
            Apply Curve Model
          </button>
        </div>
      </div>
    </div>
  );
};
