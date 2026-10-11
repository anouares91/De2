import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  watchlistCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  watchlistCount = 9,
}) => {
  const tabs = [
    {
      id: 'dashboard' as ScreenType,
      label: 'لوحة التحكم',
      icon: 'dashboard',
    },
    {
      id: 'explore' as ScreenType,
      label: 'استكشف',
      icon: 'travel_explore',
    },
    {
      id: 'watchlist' as ScreenType,
      label: 'قائمتي',
      icon: 'bookmark_added',
      badge: watchlistCount > 0 ? watchlistCount : undefined,
    },
    {
      id: 'profile' as ScreenType,
      label: 'حسابي',
      icon: 'account_circle',
    },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#0b0d19]/92 backdrop-blur-xl border-t border-[#1f2233]/60 shadow-[0_-4px_24px_rgba(0,0,0,0.6)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 min-w-[64px] py-1 transition-all duration-200 relative ${
                isActive
                  ? 'text-[#e50914] scale-105'
                  : 'text-[#e9bcb6]/75 hover:text-[#e1e1f2]'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {tab.icon}
                </span>
                {tab.badge && (
                  <span className="absolute -top-1 -end-2 w-4 h-4 bg-[#e50914] text-[#fff7f6] text-[10px] font-black rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] font-black tracking-wide ${isActive ? 'text-[#e50914]' : 'text-inherit'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
