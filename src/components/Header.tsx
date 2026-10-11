import React from 'react';
import { BRAND_ASSETS } from '../data/cinemaData';
import { ScreenType, UserProfile } from '../types';

interface HeaderProps {
  currentScreen?: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  user: UserProfile;
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  isEnglish?: boolean;
  onToggleLanguage?: () => void;
  onOpenNotifications?: () => void;
  onOpenSearch?: () => void;
  onOpenCoinShop?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen = 'dashboard',
  onNavigate,
  user,
  title = 'Dashboard',
  subtitle = 'NOCTURNAL',
  showBack = false,
  onBack,
  onOpenNotifications,
  onOpenSearch,
  onOpenCoinShop,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#0b0d19]/85 backdrop-blur-xl pt-safe shadow-[0_4px_20px_rgba(0,0,0,0.4)] border-b border-[#1f2233]/40">
      <div className="h-16 max-w-md mx-auto px-4 flex items-center justify-between">
        {showBack ? (
          <div className="flex items-center gap-2">
            <button
              aria-label="رجوع"
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#e1e1f2] hover:bg-[#323441]/40 transition-colors"
            >
              <span className="material-symbols-outlined rtl:rotate-180 text-[24px]">arrow_back</span>
            </button>
            <img
              src={BRAND_ASSETS.logoBig}
              alt="Cinema Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-bold text-[16px] text-[#e1e1f2] line-clamp-1">{title}</span>
          </div>
        ) : (
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <img
              src={BRAND_ASSETS.headerBadge}
              alt="Nocturnal Logo"
              className="h-8 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span className="font-black text-[18px] text-[#e1e1f2] tracking-tight leading-none">
                {title}
              </span>
              <span className="text-[10px] font-black text-[#e9bcb6] tracking-wider uppercase mt-0.5">
                {subtitle}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          {!showBack && (
            <>
              <button
                aria-label="البحث"
                onClick={onOpenSearch || (() => onNavigate('explore'))}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  currentScreen === 'explore'
                    ? 'text-[#e50914] bg-[#e50914]/10'
                    : 'text-[#e9bcb6] hover:text-[#e1e1f2] hover:bg-[#323441]/40'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">search</span>
              </button>

              <button
                aria-label="الإشعارات"
                onClick={onOpenNotifications}
                className="w-10 h-10 rounded-full flex items-center justify-center text-[#e9bcb6] hover:text-[#e1e1f2] hover:bg-[#323441]/40 transition-colors relative"
              >
                <span className="material-symbols-outlined text-[22px]">notifications</span>
                <span className="absolute top-2.5 start-2.5 w-2 h-2 rounded-full bg-[#e50914] animate-pulse"></span>
              </button>
            </>
          )}

          <button
            aria-label="الملف الشخصي"
            onClick={() => onNavigate('profile')}
            className="ps-1 flex items-center group"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className={`w-8 h-8 rounded-full object-cover ring-2 transition-all ${
                currentScreen === 'profile'
                  ? 'ring-[#e50914] ring-offset-2 ring-offset-[#0b0d19]'
                  : 'ring-[#e50914]/50 group-hover:ring-[#e50914]'
              }`}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
