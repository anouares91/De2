import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/cinemaData';
import { ScreenType } from '../types';

interface ForgotPasswordScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onNavigate,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isPhoneMode, setIsPhoneMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleToggleMode = () => {
    setIsPhoneMode(!isPhoneMode);
    setInputValue('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      showToast(
        isPhoneMode
          ? 'يرجى إدخال رقم الهاتف المسجل أولاً'
          : 'يرجى إدخال بريدك الإلكتروني أولاً'
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(
        isPhoneMode
          ? 'تم إرسال رمز التحقق المكون من 6 أرقام عبر رسالة SMS بنجاح!'
          : 'تم إرسال رمز التحقق بنجاح! تفقد بريدك الإلكتروني.'
      );
      setTimeout(() => {
        onNavigate('signin');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#11131e] text-[#e1e1f2] flex flex-col relative overflow-hidden pb-10">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#11131e]/85 backdrop-blur-xl shadow-sm pt-safe border-b border-[#272936]/40">
        <div className="h-16 max-w-md mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              aria-label="رجوع"
              onClick={() => onNavigate('signin')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#e1e1f2] hover:bg-[#323441]/40 transition-colors"
            >
              <span className="material-symbols-outlined rtl:rotate-180 text-[24px]">arrow_back</span>
            </button>
            <img
              src={BRAND_ASSETS.logoBig}
              alt="Cinema Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="font-bold text-[16px] text-[#e1e1f2]">Sign In</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#ffb4aa] flex items-center justify-center text-[#690003]">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </header>

      {/* Atmospheric Backgrounds */}
      <div className="absolute top-10 right-1/2 translate-x-1/2 w-72 h-72 rounded-full bg-[#e50914]/15 blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-48 -left-20 w-56 h-56 rounded-full bg-[#feb700]/10 blur-3xl pointer-events-none -z-10"></div>

      {/* Main Container */}
      <main className="w-full max-w-md mx-auto px-4 flex flex-col pt-20 relative z-10">
        {/* Security Badge Pill */}
        <div className="flex justify-center pt-2 pb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#272936]/80 backdrop-blur-md shadow-sm border border-[#323441]/50">
            <span
              className="material-symbols-outlined text-[#ffdb9d] text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield_lock
            </span>
            <span className="text-[11px] font-black text-[#ffdb9d] tracking-wider uppercase">
              أمان الحساب السينمائي
            </span>
          </div>
        </div>

        {/* Dramatic Cinematic Theater Banner with lock_reset */}
        <div className="relative mt-2 mb-4 rounded-xl overflow-hidden bg-[#191b27] shadow-xl border border-[#272936]/60">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b0d19]/70 to-[#0b0d19] pointer-events-none z-10"></div>
          <div
            className="w-full h-36 bg-cover bg-center opacity-40 mix-blend-luminosity"
            style={{ backgroundImage: `url('${BRAND_ASSETS.theaterBackdrop}')` }}
          ></div>
          <div className="relative z-20 px-4 pb-4 -mt-10 flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#323441]/90 backdrop-blur-xl flex items-center justify-center shadow-lg shadow-black/40 mb-2 border border-[#af8782]/30">
              <span className="material-symbols-outlined text-[#ffdad5] text-[26px]">lock_reset</span>
            </div>
            <h1 className="text-[22px] font-black text-[#e1e1f2] mb-1">نسيت كلمة المرور؟</h1>
            <p className="text-[14px] text-[#e9bcb6] max-w-xs leading-relaxed">
              أدخل بريدك الإلكتروني المسجل وسنرسل لك رمز تحقق آمن مكون من 6 أرقام لإعادة تعيين كلمة مرورك ومتابعة المشاهدة.
            </p>
          </div>
        </div>

        {/* Recovery Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1d1f2b]/90 backdrop-blur-md rounded-xl p-4 shadow-lg flex flex-col gap-4 border border-[#272936]"
        >
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                className="text-[14px] font-bold text-[#e1e1f2]"
                htmlFor="recovery-input"
              >
                {isPhoneMode ? 'رقم الهاتف المسجل' : 'البريد الإلكتروني المسجل'}
              </label>
              <span className="text-[11px] font-black text-[#ffdb9d] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffdb9d] animate-ping"></span>
                مطلوب
              </span>
            </div>

            <div className="relative flex items-center rounded-xl bg-[#272936] transition-all duration-300 focus-within:bg-[#323441] shadow-inner border border-[#323441]/60">
              <div className="pr-3 pl-1 flex items-center justify-center text-[#e9bcb6]">
                <span className="material-symbols-outlined text-[20px]">
                  {isPhoneMode ? 'smartphone' : 'mail'}
                </span>
              </div>
              <input
                id="recovery-input"
                dir="ltr"
                type={isPhoneMode ? 'tel' : 'email'}
                inputMode={isPhoneMode ? 'tel' : 'email'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isPhoneMode ? '+966 50 000 0000' : 'name@example.com'}
                className="w-full h-12 bg-transparent text-left text-[14px] text-[#e1e1f2] placeholder:text-[#af8782]/70 focus:outline-none px-2"
                required
              />
              {inputValue && (
                <button
                  type="button"
                  aria-label="مسح الحقل"
                  onClick={() => setInputValue('')}
                  className="pl-3 pr-1 text-[#e9bcb6] hover:text-[#e1e1f2] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">cancel</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 pt-1">
              <span className="material-symbols-outlined text-[#af8782] text-[14px]">info</span>
              <p className="text-[12px] text-[#e9bcb6]">
                {isPhoneMode
                  ? 'سنرسل رمز التحقق برسالة SMS فوراً'
                  : 'سنرسل رمز التحقق إلى هذا العنوان فوراً'}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-full bg-[#e50914] hover:bg-[#e11739] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(229,9,20,0.35)] cursor-pointer group"
          >
            {isSubmitting ? (
              <span className="text-[13px] font-black text-[#fff7f6]">جاري الإرسال...</span>
            ) : (
              <>
                <span className="text-[13px] font-black text-[#fff7f6] tracking-wide">
                  إرسال رمز التحقق
                </span>
                <span className="material-symbols-outlined text-[#fff7f6] text-[18px] rtl:rotate-180 group-hover:translate-x-0.5 transition-transform">
                  arrow_forward
                </span>
              </>
            )}
          </button>

          {/* Alternate Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-[#323441]"></div>
            <span className="text-[10px] font-black text-[#af8782] uppercase tracking-wider">
              خيارات بديلة
            </span>
            <div className="flex-1 h-px bg-[#323441]"></div>
          </div>

          {/* Alternative mode toggle */}
          <button
            type="button"
            onClick={handleToggleMode}
            className="w-full py-2.5 px-3 rounded-xl bg-[#272936] hover:bg-[#323441] text-[#e1e1f2] flex items-center justify-between transition-colors shadow-sm border border-[#323441]/60"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#1d1f2b] flex items-center justify-center text-[#ffdb9d]">
                <span className="material-symbols-outlined text-[18px]">
                  {isPhoneMode ? 'mail' : 'sms'}
                </span>
              </div>
              <span className="text-[13px] font-bold text-[#e1e1f2]">
                {isPhoneMode
                  ? 'أو أرسل الرمز عبر البريد الإلكتروني'
                  : 'أو أرسل الرمز عبر رسالة نصية قصيرة SMS'}
              </span>
            </div>
            <span className="material-symbols-outlined text-[#af8782] text-[18px] rtl:rotate-180">
              chevron_left
            </span>
          </button>
        </form>

        {/* Footer Support & Back to Login */}
        <div className="mt-4 flex flex-col items-center gap-3 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#191b27] shadow-sm border border-[#272936]">
            <span className="material-symbols-outlined text-[#af8782] text-[15px]">verified_user</span>
            <span className="text-[10px] font-bold text-[#af8782]">
              جلسة آمنة ومشفرة بالكامل بمعايير أمان DRM
            </span>
          </div>

          <button
            type="button"
            onClick={() => showToast('فريق الدعم الفني متاح 24/7 لمساعدتك على الفور.')}
            className="text-[12px] text-[#e9bcb6] hover:text-[#ffb4aa] transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[15px]">support_agent</span>
            <span>تواجه مشكلة في استلام الرمز؟ تواصل مع الدعم الفني</span>
          </button>

          <div className="w-full pt-1">
            <button
              type="button"
              onClick={() => onNavigate('signin')}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-4 rounded-full text-[#e9bcb6] hover:text-[#ffb4aa] transition-colors"
            >
              <span className="text-[13px] font-bold">تذكرت كلمة المرور؟</span>
              <span className="text-[13px] font-bold text-[#ffb4aa] underline underline-offset-4">
                العودة لتسجيل الدخول
              </span>
            </button>
          </div>
        </div>

        {/* Toast feedback */}
        {toastMessage && (
          <div className="fixed bottom-6 right-4 left-4 z-50 p-3 rounded-xl bg-[#323441] shadow-2xl backdrop-blur-xl flex items-center justify-between border border-[#ffdb9d]/30 animate-in fade-in slide-in-from-bottom duration-300">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffdb9d] text-[22px]">check_circle</span>
              <p className="text-[13px] text-[#e1e1f2] font-semibold">{toastMessage}</p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-[#af8782] hover:text-[#e1e1f2]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}
      </main>
    </div>
  );
};
