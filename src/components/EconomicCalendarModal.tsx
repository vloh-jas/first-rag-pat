import React, { useState } from 'react';
import { X, Calendar, AlertCircle, ArrowUpRight } from 'lucide-react';

interface EconomicCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EconomicCalendarModal: React.FC<EconomicCalendarModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [impactFilter, setImpactFilter] = useState<'all' | 'high'>('all');

  const events = [
    { date: 'Oct 05, 08:30 EDT', country: 'USA', event: 'Non-Farm Payrolls (Sep)', impact: 'high', actual: '254K', forecast: '147K', previous: '159K' },
    { date: 'Oct 05, 08:30 EDT', country: 'USA', event: 'Unemployment Rate', impact: 'high', actual: '4.1%', forecast: '4.2%', previous: '4.2%' },
    { date: 'Oct 10, 08:30 EDT', country: 'USA', event: 'Consumer Price Index (CPI YoY)', impact: 'high', actual: '--', forecast: '2.3%', previous: '2.5%' },
    { date: 'Oct 17, 08:15 EDT', country: 'EUR', event: 'ECB Deposit Facility Rate Decision', impact: 'high', actual: '--', forecast: '3.25%', previous: '3.50%' },
    { date: 'Oct 23, 09:45 EDT', country: 'USA', event: 'S&P Global Manufacturing PMI', impact: 'medium', actual: '--', forecast: '47.5', previous: '47.3' },
    { date: 'Oct 30, 08:30 EDT', country: 'USA', event: 'GDP Growth Rate QoQ (Adv Q3)', impact: 'high', actual: '--', forecast: '3.0%', previous: '3.0%' },
    { date: 'Nov 07, 14:00 EST', country: 'USA', event: 'FOMC Federal Funds Rate Decision', impact: 'high', actual: '--', forecast: '4.75%', previous: '5.00%' },
  ];

  if (!isOpen) return null;

  const filtered = events.filter((e) => impactFilter === 'all' || e.impact === 'high');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#1E222D] border border-[#2A2E39] rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2E39] bg-[#171d1b]">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#66dabf]" />
            <div>
              <h2 className="text-lg font-bold font-['Manrope'] text-[#F0F3FA]">
                Global Economic Calendar
              </h2>
              <p className="text-xs text-[#787B86]">
                Macroeconomic releases, central bank decisions & market-moving catalysts
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

        {/* Filter bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-[#131722] border-b border-[#2A2E39]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setImpactFilter('all')}
              className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer ${
                impactFilter === 'all'
                  ? 'bg-[#2962FF] text-[#F0F3FA]'
                  : 'bg-[#1E222D] text-[#787B86] hover:text-[#F0F3FA]'
              }`}
            >
              All Events
            </button>
            <button
              onClick={() => setImpactFilter('high')}
              className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer flex items-center gap-1.5 ${
                impactFilter === 'high'
                  ? 'bg-[#F23645] text-white'
                  : 'bg-[#1E222D] text-[#787B86] hover:text-[#F0F3FA]'
              }`}
            >
              <AlertCircle className="w-3.5 h-3.5" /> High Impact Only
            </button>
          </div>
          <span className="text-xs text-[#787B86] font-mono">Timezone: UTC-4 (EDT)</span>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="text-[11px] text-[#787B86] uppercase tracking-wider border-b border-[#2A2E39]">
                <th className="py-2.5 px-3">Date & Time</th>
                <th className="py-2.5 px-3">Country</th>
                <th className="py-2.5 px-3">Event Catalyst</th>
                <th className="py-2.5 px-3 text-right">Actual</th>
                <th className="py-2.5 px-3 text-right">Forecast</th>
                <th className="py-2.5 px-3 text-right">Previous</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2A2E39]/40">
              {filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#2A2E39] transition-colors">
                  <td className="py-3 px-3 text-[#dee4e0] whitespace-nowrap">{item.date}</td>
                  <td className="py-3 px-3">
                    <span className="px-1.5 py-0.5 rounded bg-[#131722] text-[#66dabf] font-bold">
                      {item.country}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-sans font-medium text-[#F0F3FA]">
                    <div className="flex items-center gap-2">
                      <span>{item.event}</span>
                      {item.impact === 'high' && (
                        <span className="w-2 h-2 rounded-full bg-[#F23645] shrink-0" title="High Market Impact" />
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-[#66dabf] tabular-nums">
                    {item.actual}
                  </td>
                  <td className="py-3 px-3 text-right text-[#dee4e0] tabular-nums">
                    {item.forecast}
                  </td>
                  <td className="py-3 px-3 text-right text-[#787B86] tabular-nums">
                    {item.previous}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
