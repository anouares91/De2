import React from 'react';
import { BRAND_ASSETS } from '../data/cinemaData';
import { ScreenType } from '../types';

interface WelcomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onPlayWork?: (workId: string) => void;
  onExplore?: () => void;
  isEnglish?: boolean;
  onToggleLanguage?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNavigate,
  onPlayWork,
  onExplore,
  isEnglish = false,
  onToggleLanguage,
}) => {
  return (
    <div className="min-h-screen bg-[#11131e] text-[#e1e1f2] flex flex-col relative overflow-hidden px-4 pb-8 pt-safe">
      {/* Atmospheric Glow Backdrops */}
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-[#e50914]/20 blur-[90px] pointer-events-none"></div>
      <div className="absolute top-1/3 -right-24 w-72 h-72 rounded-full bg-[#e11739]/15 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full bg-[#feb700]/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-between relative z-10">
        {/* Top Utilities Bar: Language Switcher & VIP Badge */}
        <header className="flex items-center justify-between pt-3 mb-4">
          <div className="inline-flex items-center gap-1.5 bg-[#272936]/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-[#323441]/50">
            <span
              className="material-symbols-outlined text-[#ffdb9d] text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            <span className="text-[11px] text-[#ffdb9d] font-black tracking-wider uppercase">
              VIP PREMIERE
            </span>
          </div>

          {/* Language Selector Pill */}
          <button
            aria-label="تبديل اللغة"
            onClick={onToggleLanguage}
            className="flex items-center gap-1.5 bg-[#272936]/90 hover:bg-[#323441] active:scale-95 transition-all px-3 py-1.5 rounded-full text-[#e1e1f2] shadow-sm border border-[#323441]/50"
            type="button"
          >
            <span className="material-symbols-outlined text-[#e9bcb6] text-[16px]">language</span>
            <span className="text-[12px] font-bold text-[#e1e1f2]">
              {isEnglish ? 'English' : 'العربية'}
            </span>
            <span className="text-[10px] text-[#af8782] font-medium">/ {isEnglish ? 'AR' : 'EN'}</span>
          </button>
        </header>

        {/* Central Hero Card / Logo Projection */}
        <section className="flex flex-col items-center text-center my-2">
          {/* Ambient Logo Disc */}
          <div className="relative flex items-center justify-center p-3 mb-3">
            <div className="absolute inset-0 rounded-2xl bg-[#e50914]/25 blur-xl"></div>
            <div className="relative w-28 h-28 rounded-2xl bg-[#0b0d19] flex items-center justify-center shadow-2xl p-2.5 overflow-hidden border border-[#323441]/60">
              <img
                src={BRAND_ASSETS.logoBig}
                alt="Nocturnal Cinema Logo"
                className="w-full h-full object-contain rounded-xl drop-shadow-md"
              />
            </div>
          </div>

          {/* Platform Name & Tagline */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-pulse"></span>
            <span className="text-[11px] text-[#ffb4aa] tracking-widest font-black uppercase">
              NOCTURNAL CINEMA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] animate-pulse"></span>
          </div>

          <h1 className="text-[28px] font-black text-[#e1e1f2] tracking-tight mb-2">
            سينما ليلية
          </h1>
          <p className="text-[14px] text-[#e9bcb6] max-w-[320px] mx-auto leading-relaxed">
            عالمك السينمائي المفضل بلمسة واحدة — شاهد أحدث الإنتاجات الحصرية والدراما العمودية بجودة سينمائية غامرة.
          </p>
        </section>

        {/* Curated Highlights Strip */}
        <section className="w-full my-4">
          <div className="grid grid-cols-3 gap-2">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#1d1f2b]/80 backdrop-blur-sm border border-[#272936]/60 shadow-sm transition-transform active:scale-95">
              <div className="w-9 h-9 rounded-full bg-[#323441] flex items-center justify-center mb-1.5 text-[#ffb4aa]">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  high_quality
                </span>
              </div>
              <span className="text-[13px] font-bold text-[#e1e1f2] leading-snug">دقة 4K فائقة</span>
              <span className="text-[10px] text-[#af8782] mt-0.5">Ultra HD HDR</span>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#1d1f2b]/80 backdrop-blur-sm border border-[#272936]/60 shadow-sm transition-transform active:scale-95">
              <div className="w-9 h-9 rounded-full bg-[#323441] flex items-center justify-center mb-1.5 text-[#ffdb9d]">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  block
                </span>
              </div>
              <span className="text-[13px] font-bold text-[#e1e1f2] leading-snug">بدون إعلانات</span>
              <span className="text-[10px] text-[#af8782] mt-0.5">مشاهدة متواصلة</span>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center p-3 rounded-xl bg-[#1d1f2b]/80 backdrop-blur-sm border border-[#272936]/60 shadow-sm transition-transform active:scale-95">
              <div className="w-9 h-9 rounded-full bg-[#323441] flex items-center justify-center mb-1.5 text-[#ffb4aa]">
                <span className="material-symbols-outlined text-[20px]">download_for_offline</span>
              </div>
              <span className="text-[13px] font-bold text-[#e1e1f2] leading-snug">تحميل أوفلاين</span>
              <span className="text-[10px] text-[#af8782] mt-0.5">شاهد بلا إنترنت</span>
            </div>
          </div>
        </section>

        {/* Visual Teaser Cards (Atmospheric Mini Showcase) */}
        <section className="w-full my-3 overflow-hidden">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[11px] font-black text-[#af8782] tracking-wider uppercase">
              عروض الليلة الحصرية
            </span>
            <div className="flex items-center gap-1 text-[#ffdb9d]">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                bolt
              </span>
              <span className="text-[10px] font-black">عرض مستمر</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Poster 1 */}
            <div
              onClick={() => onPlayWork?.('asrar-baad-layl')}
              className="relative h-28 rounded-xl overflow-hidden bg-[#191b27] shadow-md group cursor-pointer border border-[#272936]/50"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdYJSeT1tUO3yU5GSG9dgc-zKPBQ4zinx_Bi_8ZHYfP2fvb7M_3dGwFQ4fKy8-su25IE601g9H6UtpLJt2JLS192mD32N31YFYih2j_okY3WcjkgkFyjXKYw1So4lR0-F7pU8L8EqOMX1-OxKrXjxx_r4QCIZ9NPr020fIkKYsPtzvaQ90KbT6prkf8yR-L0fUs7HnNNMp0KuUMR0pKuTeMPIFFsDMRx609PCBkyn3JH2qTYT00GU"
                alt="أسرار منتصف الليل"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d19] via-[#0b0d19]/40 to-transparent flex flex-col justify-end p-2.5">
                <span className="text-[10px] text-[#ffb4aa] font-black">أصلي • حلقة جديدة</span>
                <span className="font-bold text-[14px] text-[#e1e1f2] truncate">أسرار منتصف الليل</span>
              </div>
            </div>

            {/* Poster 2 */}
            <div
              onClick={() => onPlayWork?.('arsh-al-zilal')}
              className="relative h-28 rounded-xl overflow-hidden bg-[#191b27] shadow-md group cursor-pointer border border-[#272936]/50"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIwxK0VMa3p82c_nhbJL0EsfXiMhGJgHcsVEASACOPl6Qj8QBQXEk5onaid6VeBY7V0WsavcTLSrQpeW-NLUPnrE8ZA0jyvuhMDufMLDICO_OEcxLU1gOovJYu3f_rPn1ZJjxXFE9f-i4npwgE2EcNmC9Ibs5oBJdlG3uZIN8Hy9p-ZyLP5WYjOGPynpYVtRy97Umk0bffADgLhmZLDp9xYiQeC3XfUNU42nnTUDrJ_jV540NhyZM"
                alt="عرش الظلال"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d19] via-[#0b0d19]/40 to-transparent flex flex-col justify-end p-2.5">
                <span className="text-[10px] text-[#ffdb9d] font-black">الأكثر مشاهدة ★ 9.8</span>
                <span className="font-bold text-[14px] text-[#e1e1f2] truncate">عرش الظلال</span>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Action Suite (CTAs) */}
        <section className="flex flex-col gap-3 mt-4">
          <button
            onClick={() => onNavigate('signin')}
            className="w-full h-12 rounded-full bg-[#e50914] hover:bg-[#e11739] active:scale-[0.98] text-[#fff7f6] text-[12px] flex items-center justify-center gap-2 font-black tracking-wider transition-all duration-200 shadow-xl shadow-[#e50914]/25"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">login</span>
            <span>تسجيل الدخول</span>
          </button>

          <button
            onClick={() => onNavigate('signin')}
            className="w-full h-12 rounded-full bg-[#272936] hover:bg-[#323441] active:scale-[0.98] text-[#e1e1f2] text-[12px] flex items-center justify-center gap-2 font-black tracking-wider transition-all duration-200 border border-[#323441]/50"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] text-[#ffdb9d]">person_add</span>
            <span>إنشاء حساب جديد</span>
          </button>

          <div className="flex items-center justify-center pt-1">
            <button
              onClick={() => onNavigate('dashboard')}
              className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-full text-[#e9bcb6] hover:text-[#e1e1f2] active:opacity-75 transition-colors text-[14px] font-medium"
              type="button"
            >
              <span>تصفح العروض كضيف مجاناً</span>
              <span className="material-symbols-outlined text-[16px] rtl:rotate-180">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Footer Microcopy */}
        <footer className="text-center mt-4">
          <p className="text-[11px] text-[#5e3f3b] text-[#af8782] leading-tight">
            بالاستمرار، أنت توافق على شروط الخدمة وسياسة الخصوصية لمنصة Nocturnal Cinema.
          </p>
        </footer>
      </div>
    </div>
  );
};
