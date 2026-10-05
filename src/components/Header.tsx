import React, { useState } from 'react';
import { Search, ChevronDown, User, Check, Globe } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenTrial: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenTrial,
  activeNav,
  setActiveNav,
}) => {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('EN');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  const languages = [
    { code: 'EN', name: 'English (US)' },
    { code: 'JA', name: '日本語' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'ES', name: 'Español' },
    { code: 'FR', name: 'Français' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#1E222D]/95 backdrop-blur-md border-b border-[#2A2E39]">
      <div className="h-16 w-full px-4 md:px-8 flex items-center justify-between gap-3">
        {/* Brand & Search & Nav Links */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-1 text-[#F0F3FA] hover:text-[#66dabf] transition-colors focus-visible:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-[#2A2E39] flex items-center justify-center border border-[#2A2E39] hover:border-[#66dabf]/50 transition-colors shadow-sm">
              <span className="font-['Manrope'] text-lg font-extrabold tracking-tight text-[#66dabf]">
                TV
              </span>
            </div>
          </a>

          {/* Quick Search Bar */}
          <div className="relative hidden sm:flex items-center">
            <button
              onClick={onOpenSearch}
              className="flex items-center bg-[#131722] border border-[#2A2E39] hover:border-[#363A45] rounded-lg px-3 py-1.5 w-56 lg:w-72 transition-colors cursor-pointer text-left group"
              type="button"
            >
              <Search className="w-4 h-4 text-[#787B86] group-hover:text-[#F0F3FA] mr-2 shrink-0 transition-colors" />
              <span className="text-xs text-[#787B86] group-hover:text-[#F0F3FA] flex-1 truncate transition-colors">
                Search markets, stocks, crypto...
              </span>
              <span className="text-[11px] text-[#787B86] bg-[#2A2E39] px-1.5 py-0.5 rounded border border-[#2A2E39] font-mono shrink-0">
                Ctrl+K
              </span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 h-16">
            {['Products', 'Community', 'Markets', 'Brokers'].map((item) => {
              const isActive = activeNav === item;
              return (
                <button
                  key={item}
                  onClick={() => setActiveNav(item)}
                  className={`text-sm font-semibold transition-colors py-5 border-b-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-[#F0F3FA] border-[#66dabf]'
                      : 'text-[#bcc9c4] hover:text-[#dee4e0] border-transparent'
                  }`}
                >
                  {item}
                </button>
              );
            })}

            {/* More Menu */}
            <div className="relative">
              <button
                onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                className="text-sm font-semibold text-[#bcc9c4] hover:text-[#dee4e0] transition-colors py-5 flex items-center gap-1 cursor-pointer"
              >
                More
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {moreMenuOpen && (
                <div
                  className="absolute left-0 top-full mt-1 w-48 bg-[#1E222D] border border-[#2A2E39] rounded-lg shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setMoreMenuOpen(false)}
                >
                  <a
                    href="#indices"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-[#dee4e0] hover:bg-[#2A2E39] transition-colors"
                  >
                    World Indices
                  </a>
                  <a
                    href="#us-stocks"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-[#dee4e0] hover:bg-[#2A2E39] transition-colors"
                  >
                    US Stock Screener
                  </a>
                  <a
                    href="#crypto"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-[#dee4e0] hover:bg-[#2A2E39] transition-colors"
                  >
                    Crypto & DeFi TVL
                  </a>
                  <a
                    href="#bonds"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-[#dee4e0] hover:bg-[#2A2E39] transition-colors"
                  >
                    Treasury Yield Curves
                  </a>
                  <a
                    href="#economy"
                    onClick={() => setMoreMenuOpen(false)}
                    className="block px-4 py-2 text-xs text-[#dee4e0] hover:bg-[#2A2E39] transition-colors"
                  >
                    Macroeconomic Indicators
                  </a>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Mobile search trigger */}
          <button
            onClick={onOpenSearch}
            className="sm:hidden p-2 rounded-lg text-[#787B86] hover:text-[#F0F3FA] hover:bg-[#2A2E39] transition-colors"
            title="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[#787B86] hover:text-[#F0F3FA] hover:bg-[#2A2E39] transition-colors text-xs font-semibold uppercase tracking-wider cursor-pointer"
              type="button"
            >
              <Globe className="w-3.5 h-3.5 mr-0.5 text-[#787B86]" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {langMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-40 bg-[#1E222D] border border-[#2A2E39] rounded-lg shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                onMouseLeave={() => setLangMenuOpen(false)}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang.code);
                      setLangMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs text-left text-[#dee4e0] hover:bg-[#2A2E39] transition-colors cursor-pointer"
                  >
                    <span>{lang.name}</span>
                    {selectedLang === lang.code && (
                      <Check className="w-3.5 h-3.5 text-[#66dabf]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Get Started Button */}
          <button
            onClick={onOpenTrial}
            className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#2962FF] text-[#F0F3FA] font-bold text-xs hover:bg-[#1e50dc] transition-all shadow-sm cursor-pointer whitespace-nowrap active:scale-[0.98]"
            type="button"
          >
            Get started
          </button>

          {/* User Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-8 h-8 rounded-full bg-[#66dabf] hover:bg-[#84f7db] transition-colors flex items-center justify-center cursor-pointer shadow-sm focus-visible:ring-2 focus-visible:ring-[#66dabf]"
              type="button"
              title="User Account"
            >
              <User className="w-4 h-4 text-[#00382e]" />
            </button>

            {userMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 bg-[#1E222D] border border-[#2A2E39] rounded-lg shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs"
                onMouseLeave={() => setUserMenuOpen(false)}
              >
                <div className="px-3 py-2 border-b border-[#2A2E39] mb-1">
                  <div className="font-bold text-[#F0F3FA]">Pro Trader Suite</div>
                  <div className="text-[11px] text-[#787B86] truncate">somk-swt-webmaster@sony.com</div>
                </div>
                <button
                  onClick={() => {
                    setUserMenuOpen(false);
                    onOpenTrial();
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#2A2E39] text-[#66dabf] font-semibold flex items-center justify-between"
                >
                  <span>Active Pro Status</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#66dabf]/20 text-[10px]">TIER 1</span>
                </button>
                <button
                  onClick={() => setUserMenuOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-[#2A2E39] text-[#dee4e0]"
                >
                  Watchlists & Alerts
                </button>
                <button
                  onClick={() => setUserMenuOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-[#2A2E39] text-[#dee4e0]"
                >
                  Pine Script Editor
                </button>
                <button
                  onClick={() => setUserMenuOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-[#2A2E39] text-[#dee4e0]"
                >
                  Chart Layout Settings
                </button>
                <div className="border-t border-[#2A2E39] my-1"></div>
                <button
                  onClick={() => setUserMenuOpen(false)}
                  className="w-full text-left px-3 py-2 hover:bg-[#2A2E39] text-[#ffb4ab]"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
