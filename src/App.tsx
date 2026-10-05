/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IndicesSection } from './components/IndicesSection';
import { StocksSection } from './components/StocksSection';
import { CryptoSection } from './components/CryptoSection';
import { CommoditiesForexSection } from './components/CommoditiesForexSection';
import { BondsSection } from './components/BondsSection';
import { EconomySection } from './components/EconomySection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ChartModal } from './components/ChartModal';
import { ScreenerModal } from './components/ScreenerModal';
import { YieldCurveModal } from './components/YieldCurveModal';
import { EconomicCalendarModal } from './components/EconomicCalendarModal';
import { TrialModal } from './components/TrialModal';
import { MarketItem, SovereignBond } from './types/market';
import { MAJOR_INDICES, HIGH_VOLUME_STOCKS } from './data/marketData';

export default function App() {
  const [activeNav, setActiveNav] = useState('Markets');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [selectedCategory, setSelectedCategory] = useState('indices');

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedTickerForChart, setSelectedTickerForChart] = useState<MarketItem | null>(null);
  const [isScreenerOpen, setIsScreenerOpen] = useState(false);
  const [isYieldCurveOpen, setIsYieldCurveOpen] = useState(false);
  const [isEconomicCalendarOpen, setIsEconomicCalendarOpen] = useState(false);
  const [isTrialOpen, setIsTrialOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectBond = (bond: SovereignBond) => {
    setSelectedTickerForChart({
      symbol: bond.code,
      name: bond.country,
      price: bond.price,
      change: bond.change,
      changePercent: bond.change,
      category: 'bond',
    });
  };

  return (
    <div className="min-h-screen bg-[#131722] text-[#dee4e0] font-sans selection:bg-[#20a28a] selection:text-[#F0F3FA] flex flex-col">
      {/* Top Bar Contract Navigation */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenTrial={() => setIsTrialOpen(true)}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main Content Terminal Viewport */}
      <main className="w-full pt-16 flex-1 flex flex-col">
        {/* Hero Section */}
        <HeroSection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />

        {/* 1. Indices Section */}
        <IndicesSection
          onSelectTicker={(item) => setSelectedTickerForChart(item)}
          onOpenAllIndices={() => setIsScreenerOpen(true)}
        />

        {/* 2. US Stocks & Market Movers */}
        <StocksSection
          onSelectTicker={(item) => setSelectedTickerForChart(item)}
          onOpenScreener={() => setIsScreenerOpen(true)}
          onOpenEarnings={() => setIsEconomicCalendarOpen(true)}
        />

        {/* 3. Crypto & DeFi TVL */}
        <CryptoSection
          onSelectTicker={(item) => setSelectedTickerForChart(item)}
          onOpenScreener={() => setIsScreenerOpen(true)}
        />

        {/* 4. Futures, Commodities & Forex */}
        <CommoditiesForexSection
          onSelectTicker={(item) => setSelectedTickerForChart(item)}
          onOpenSpecs={() => setIsScreenerOpen(true)}
          onOpenHeatmap={() => setIsScreenerOpen(true)}
        />

        {/* 5. Government Bonds & Sovereign Benchmarks */}
        <BondsSection
          onSelectBond={handleSelectBond}
          onOpenYieldCurveModal={() => setIsYieldCurveOpen(true)}
          onOpenDebtScreener={() => setIsYieldCurveOpen(true)}
        />

        {/* 6. Economy & Global Indicators */}
        <EconomySection
          onOpenEconomicCalendar={() => setIsEconomicCalendarOpen(true)}
          onOpenTrial={() => setIsTrialOpen(true)}
          onLaunchSupercharts={() => setSelectedTickerForChart(MAJOR_INDICES[0])}
        />
      </main>

      {/* Terminal Footer */}
      <Footer onSelectNav={setActiveNav} />

      {/* Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTicker={(item) => setSelectedTickerForChart(item)}
      />

      <ChartModal
        item={selectedTickerForChart}
        onClose={() => setSelectedTickerForChart(null)}
      />

      <ScreenerModal
        isOpen={isScreenerOpen}
        onClose={() => setIsScreenerOpen(false)}
        onSelectTicker={(item) => setSelectedTickerForChart(item)}
      />

      <YieldCurveModal
        isOpen={isYieldCurveOpen}
        onClose={() => setIsYieldCurveOpen(false)}
      />

      <EconomicCalendarModal
        isOpen={isEconomicCalendarOpen}
        onClose={() => setIsEconomicCalendarOpen(false)}
      />

      <TrialModal
        isOpen={isTrialOpen}
        onClose={() => setIsTrialOpen(false)}
      />
    </div>
  );
}
