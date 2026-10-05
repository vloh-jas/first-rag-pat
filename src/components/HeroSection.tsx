import React, { useState } from 'react';
import { ChevronDown, Check, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedRegion,
  onSelectRegion,
}) => {
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

  const regions = [
    { id: 'global', name: 'Global (All 140+ Exchanges)', subtext: 'Worldwide consolidated stream' },
    { id: 'americas', name: 'Americas / US Markets', subtext: 'NYSE, NASDAQ, CBOE, TSX, B3' },
    { id: 'europe', name: 'Europe, UK & Middle East', subtext: 'LSE, XETR, Euronext, SIX, MOEX' },
    { id: 'apac', name: 'Asia-Pacific / APAC', subtext: 'Tokyo TSE, HKEX, Shanghai, NSE India' },
  ];

  const categories = [
    { id: 'indices', label: 'Indices', target: '#indices' },
    { id: 'us-stocks', label: 'US stocks', target: '#us-stocks' },
    { id: 'world-stocks', label: 'World stocks', target: '#world-stocks' },
    { id: 'crypto', label: 'Crypto', target: '#crypto' },
    { id: 'futures', label: 'Futures', target: '#futures' },
    { id: 'forex', label: 'Forex', target: '#forex' },
    { id: 'bonds', label: 'Bonds', target: '#bonds' },
    { id: 'etfs', label: 'ETFs', target: '#us-stocks' },
    { id: 'economy', label: 'Economy', target: '#economy' },
  ];

  const currentRegionLabel =
    regions.find((r) => r.id === selectedRegion)?.name.split(' (')[0] || 'everywhere';

  return (
    <section className="w-full px-4 md:px-8 pt-10 pb-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Atmospheric Ambient Glows */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#66dabf]/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/4 -right-24 w-80 h-80 bg-[#2962FF]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
        {/* Title with Region Dropdown */}
        <div className="relative">
          <button
            onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
            className="group inline-flex items-center gap-2 cursor-pointer transition-all duration-200 select-none py-1 focus-visible:outline-none"
            type="button"
          >
            <h1 className="font-['Manrope'] text-4xl sm:text-5xl md:text-[56px] md:leading-[64px] font-extrabold tracking-tight text-[#F0F3FA] group-hover:text-[#66dabf] transition-colors">
              Markets, {selectedRegion === 'global' ? 'everywhere' : currentRegionLabel}
            </h1>
            <ChevronDown className="w-8 h-8 md:w-9 md:h-9 text-[#787B86] group-hover:text-[#66dabf] group-hover:translate-y-0.5 transition-transform duration-200 shrink-0" />
          </button>

          {/* Region Picker Dropdown */}
          {regionDropdownOpen && (
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-80 sm:w-96 bg-[#1E222D] border border-[#2A2E39] rounded-xl shadow-2xl p-2 z-50 text-left animate-in fade-in zoom-in-95 duration-150"
              onMouseLeave={() => setRegionDropdownOpen(false)}
            >
              <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#787B86] border-b border-[#2A2E39] mb-1 flex items-center justify-between">
                <span>Select Macro Region</span>
                <Sparkles className="w-3.5 h-3.5 text-[#66dabf]" />
              </div>
              {regions.map((reg) => (
                <button
                  key={reg.id}
                  onClick={() => {
                    onSelectRegion(reg.id);
                    setRegionDropdownOpen(false);
                  }}
                  className={`w-full flex items-start justify-between p-2.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    selectedRegion === reg.id
                      ? 'bg-[#2A2E39] text-[#F0F3FA]'
                      : 'text-[#bcc9c4] hover:bg-[#252b29] hover:text-[#dee4e0]'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-[13px]">{reg.name}</div>
                    <div className="text-[11px] text-[#787B86] mt-0.5">{reg.subtext}</div>
                  </div>
                  {selectedRegion === reg.id && (
                    <Check className="w-4 h-4 text-[#66dabf] mt-1 shrink-0 ml-2" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="mt-2 text-sm sm:text-base text-[#787B86] max-w-2xl px-2">
          Real-time telemetry, institutional depth, and quantitative screener matrices across 140+ global exchanges.
        </p>

        {/* Category Filter Pills Bar */}
        <div className="mt-8 w-full max-w-5xl overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center justify-start md:justify-center gap-2 min-w-max px-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    const el = document.querySelector(cat.target);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#2A2E39] text-[#F0F3FA] shadow-sm ring-1 ring-[#363A45]'
                      : 'bg-[#1E222D] text-[#787B86] hover:text-[#F0F3FA] hover:bg-[#2A2E39]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
