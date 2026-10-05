import React from 'react';

interface FooterProps {
  onSelectNav: (item: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectNav }) => {
  return (
    <footer className="w-full bg-[#1E222D] border-t border-[#2A2E39] py-8">
      <div className="w-full px-4 md:px-8 max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[#787B86] text-xs">
        <div className="flex items-center gap-4">
          <div className="w-7 h-7 rounded bg-[#2A2E39] flex items-center justify-center border border-[#2A2E39]">
            <span className="font-['Manrope'] font-extrabold text-sm text-[#66dabf]">
              TV
            </span>
          </div>
          <span className="font-medium">TradingView, Inc. © 2026. All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6">
          {['Products', 'Community', 'Markets', 'Brokers'].map((link) => (
            <button
              key={link}
              onClick={() => onSelectNav(link)}
              className="hover:text-[#F0F3FA] transition-colors cursor-pointer"
            >
              {link}
            </button>
          ))}
          <a
            href="#indices"
            className="hover:text-[#F0F3FA] transition-colors"
          >
            Terminal Top ↑
          </a>
        </div>
      </div>
    </footer>
  );
};
