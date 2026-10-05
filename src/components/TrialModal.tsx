import React, { useState } from 'react';
import { X, Check, Zap, Sparkles } from 'lucide-react';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'pro_plus' | 'premium'>('pro_plus');
  const [activated, setActivated] = useState(false);

  if (!isOpen) return null;

  const plans = [
    {
      id: 'pro',
      name: 'Essential Pro',
      price: '$14.95',
      features: ['5 indicators per chart', '2 charts in one layout', '20 server-side price alerts', 'Ad-free experience'],
    },
    {
      id: 'pro_plus',
      name: 'Pro+ (Most Popular)',
      price: '$29.95',
      popular: true,
      features: ['10 indicators per chart', '4 charts in one layout', '100 server-side price alerts', 'Intraday Bar Replay', 'Volume Profile indicators'],
    },
    {
      id: 'premium',
      name: 'Institutional Premium',
      price: '$59.95',
      features: ['25 indicators per chart', '8 charts in one layout', '400 server-side price alerts', 'Second-based intervals', 'Pine Script debugger'],
    },
  ];

  const handleActivate = () => {
    setActivated(true);
    setTimeout(() => {
      onClose();
      setActivated(false);
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#1E222D] border border-[#2A2E39] rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2E39] bg-[#171d1b]">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-[#66dabf]" />
            <div>
              <h2 className="text-lg font-bold font-['Manrope'] text-[#F0F3FA]">
                Start Free 30-Day Pro Trial
              </h2>
              <p className="text-xs text-[#787B86]">
                No commitment • Cancel anytime with one click
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((p) => {
              const isSelected = selectedPlan === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlan(p.id as any)}
                  className={`p-5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between relative ${
                    isSelected
                      ? 'bg-[#2A2E39] border-[#66dabf] shadow-lg ring-1 ring-[#66dabf]'
                      : 'bg-[#131722] border-[#2A2E39] hover:border-[#363A45]'
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-[#2962FF] text-[#F0F3FA] text-[10px] font-bold font-mono uppercase tracking-wider shadow">
                      Recommended
                    </span>
                  )}
                  <div>
                    <h3 className="font-bold text-sm text-[#F0F3FA]">{p.name}</h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="font-mono text-2xl font-extrabold text-[#F0F3FA]">{p.price}</span>
                      <span className="text-xs text-[#787B86]">/month</span>
                    </div>
                    <div className="text-[11px] text-[#66dabf] font-medium mt-1">30 days free</div>

                    <ul className="mt-4 space-y-2 text-xs text-[#dee4e0]">
                      {p.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#66dabf] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#2A2E39]/50">
                    <span className={`text-xs font-bold block text-center ${isSelected ? 'text-[#66dabf]' : 'text-[#787B86]'}`}>
                      {isSelected ? '✓ Selected' : 'Select Plan'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {activated && (
            <div className="p-3 rounded-lg bg-[#089981]/20 border border-[#089981] text-xs text-[#66dabf] flex items-center justify-center gap-2 font-bold animate-in fade-in">
              <Sparkles className="w-4 h-4" />
              Pro Trial Activated! Welcome to institutional-grade execution.
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-[#171d1b] border-t border-[#2A2E39] flex items-center justify-between">
          <span className="text-xs text-[#787B86]">
            30 days free, then renews at chosen tier. No charge today.
          </span>
          <button
            onClick={handleActivate}
            className="px-6 py-2.5 rounded-lg bg-[#2962FF] text-[#F0F3FA] font-bold text-xs hover:bg-[#1e50dc] transition-all cursor-pointer shadow-md active:scale-[0.98]"
          >
            Start 30-Day Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};
