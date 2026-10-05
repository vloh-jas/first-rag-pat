import React from 'react';
import { ChevronRight, Calendar, Terminal } from 'lucide-react';
import { MACRO_INDICATORS } from '../data/marketData';

interface EconomySectionProps {
  onOpenEconomicCalendar: () => void;
  onOpenTrial: () => void;
  onLaunchSupercharts: () => void;
}

export const EconomySection: React.FC<EconomySectionProps> = ({
  onOpenEconomicCalendar,
  onOpenTrial,
  onLaunchSupercharts,
}) => {
  return (
    <section className="w-full px-4 md:px-8 py-8 mb-12" id="economy">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
          <div>
            <button
              onClick={onOpenEconomicCalendar}
              className="group flex items-center gap-1.5 cursor-pointer text-left"
            >
              <span className="font-['Manrope'] text-2xl md:text-3xl font-bold text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
                Economy & Global Indicators
              </span>
              <ChevronRight className="w-6 h-6 text-[#787B86] group-hover:translate-x-1 group-hover:text-[#66dabf] transition-all" />
            </button>
            <p className="text-sm text-[#787B86] mt-0.5">
              Key macroeconomic indicators matrix across primary industrialized economies
            </p>
          </div>
          <button
            onClick={onOpenEconomicCalendar}
            className="text-xs font-bold text-[#b6c4ff] hover:underline flex items-center gap-1 cursor-pointer"
          >
            See full economic calendar
            <Calendar className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        {/* Macro Heatmap Table */}
        <div className="bg-[#1E222D] rounded-xl p-5 shadow-sm overflow-x-auto no-scrollbar border border-transparent hover:border-[#2A2E39] transition-colors">
          <table className="w-full text-left font-mono text-xs min-w-[840px]">
            <thead>
              <tr className="text-[11px] text-[#787B86] uppercase tracking-wider border-b border-[#2A2E39]">
                <th className="py-3 px-3">Country / Region</th>
                <th className="py-3 px-3 text-right">GDP (USD)</th>
                <th className="py-3 px-3 text-right">GDP Growth YoY</th>
                <th className="py-3 px-3 text-right">Interest Rate</th>
                <th className="py-3 px-3 text-right">Inflation YoY</th>
                <th className="py-3 px-3 text-right">Unemployment</th>
                <th className="py-3 px-3 text-right">Gov Debt / GDP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E39]/40">
              {MACRO_INDICATORS.map((macro) => {
                const isGrowthPositive = macro.gdpGrowth >= 0;
                return (
                  <tr
                    key={macro.country}
                    onClick={onOpenEconomicCalendar}
                    className="hover:bg-[#2A2E39] transition-colors cursor-pointer group"
                  >
                    <td className="py-3 px-3 font-semibold text-[#F0F3FA] flex items-center gap-2.5 font-sans">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: macro.color }}
                      />
                      <span className="group-hover:text-[#66dabf] transition-colors">
                        {macro.country}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-medium text-[#F0F3FA] tabular-nums">
                      {macro.gdp}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span
                        className={`px-2 py-0.5 rounded font-bold tabular-nums inline-block ${
                          isGrowthPositive
                            ? 'bg-[#089981]/15 text-[#089981]'
                            : 'bg-[#F23645]/15 text-[#F23645]'
                        }`}
                      >
                        {isGrowthPositive ? '+' : ''}
                        {macro.gdpGrowth.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right text-[#F0F3FA] font-bold tabular-nums">
                      {macro.interestRate.toFixed(2)}%
                    </td>
                    <td
                      className={`py-3 px-3 text-right font-medium tabular-nums ${
                        macro.inflation >= 2.0 ? 'text-[#F23645]' : 'text-[#089981]'
                      }`}
                    >
                      {macro.inflation.toFixed(2)}%
                    </td>
                    <td className="py-3 px-3 text-right text-[#787B86] tabular-nums">
                      {macro.unemployment.toFixed(2)}%
                    </td>
                    <td
                      className={`py-3 px-3 text-right font-medium tabular-nums ${
                        macro.debtToGdp >= 100.0 ? 'text-[#F23645]' : 'text-[#787B86]'
                      }`}
                    >
                      {macro.debtToGdp.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Live Terminal Action Bar / Global Banner Strip */}
        <div className="bg-[#1E222D] rounded-xl p-6 shadow-md flex flex-col md:flex-row items-center justify-between gap-4 border border-[#2A2E39]">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-lg bg-[#2A2E39] flex items-center justify-center text-[#66dabf] border border-[#363A45] shrink-0">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-['Manrope'] text-lg font-bold text-[#F0F3FA]">
                Ready to supercharge your charts?
              </h4>
              <p className="text-xs text-[#787B86] mt-0.5">
                Unlock level-2 market depth, Pine Script v6 backtesting, and sub-second multi-exchange feeds.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenTrial}
              className="w-full md:w-auto text-center px-5 py-2.5 rounded-lg bg-[#2962FF] text-[#F0F3FA] hover:bg-[#1e50dc] font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              Start free 30-day trial
            </button>
            <button
              onClick={onLaunchSupercharts}
              className="w-full md:w-auto text-center px-4 py-2.5 rounded-lg bg-[#2A2E39] hover:bg-[#353a38] text-[#787B86] hover:text-[#F0F3FA] font-bold text-xs transition-all cursor-pointer whitespace-nowrap border border-[#363A45]"
            >
              Launch Supercharts
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
