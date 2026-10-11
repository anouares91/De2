import React, { useState } from 'react';
import { BRAND_ASSETS } from '../data/cinemaData';
import { ScreenType } from '../types';

interface SignInScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onSuccessLogin?: () => void;
  onLogin?: (name: string, email: string) => void;
}

export const SignInScreen: React.FC<SignInScreenProps> = ({
  onNavigate,
  onSuccessLogin,
  onLogin,
}) => {
  const [identifier, setIdentifier] = useState('ahmed.curator@nocturnal.film');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [biometricStatus, setBiometricStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  const triggerLoginSuccess = () => {
    if (onLogin) {
      onLogin('أحمد المنصوري', identifier || 'ahmed.curator@nocturnal.film');
    } else if (onSuccessLogin) {
      onSuccessLogin();
    } else {
      onNavigate('dashboard');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        triggerLoginSuccess();
      }, 800);
    }, 1200);
  };

  const handleBiometric = () => {
    setBiometricStatus('scanning');
    if (navigator.vibrate) {
      navigator.vibrate([40, 60, 40]);
    }
    setTimeout(() => {
      setBiometricStatus('success');
      setTimeout(() => {
        triggerLoginSuccess();
      }, 700);
    }, 1100);
  };

  return (
    <div className="min-h-screen bg-[#11131e] text-[#e1e1f2] flex flex-col relative overflow-hidden pb-10">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#11131e]/85 backdrop-blur-xl shadow-sm pt-safe border-b border-[#272936]/40">
        <div className="h-16 max-w-md mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              aria-label="رجوع"
              onClick={() => onNavigate('welcome')}
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

      {/* Atmospheric Cinematic Glow Backdrops */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-96 h-80 rounded-full bg-[#e50914]/15 blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/2 -right-24 w-60 h-60 rounded-full bg-[#feb700]/5 blur-[90px] pointer-events-none"></div>

      {/* Screen Content Container */}
      <main className="w-full max-w-md mx-auto px-4 flex flex-col pt-20 relative z-10">
        {/* Brand Emblem & Visual Anchor */}
        <div className="flex flex-col items-center justify-center text-center mt-2 mb-4">
          <div className="relative flex items-center justify-center mb-3 group">
            <div className="absolute inset-0 rounded-2xl bg-[#e50914]/30 blur-xl transition-all duration-500 group-hover:blur-2xl"></div>
            <div className="relative w-20 h-20 rounded-2xl bg-[#272936] shadow-2xl flex items-center justify-center border border-[#323441]/70">
              <svg
                className="w-12 h-12 text-[#e50914] drop-shadow-[0_0_14px_rgba(229,9,20,0.8)]"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8V40M12 24L24 16V32L12 24Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3.5"
                ></path>
                <path
                  d="M24 16L38 24L24 32"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3.5"
                ></path>
              </svg>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#272936] text-[#ffdb9d] text-[11px] font-black mb-2 shadow-sm border border-[#323441]/50">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            <span>بوابتك إلى الدراما الليلية الفاخرة</span>
          </span>

          <h1 className="text-[22px] font-black text-[#e1e1f2] tracking-tight mb-1">
            مرحباً بعودتك مجدداً!
          </h1>
          <p className="text-[14px] text-[#e9bcb6] max-w-xs leading-relaxed">
            استكمل مشاهدة سلاسلك القصيرة المفضلة بجودة سينمائية فائقة ومغامرات لا تنتهي.
          </p>
        </div>

        {/* Interactive Authentication Form */}
        <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
          {/* Email / Identifier Field */}
          <div className="flex flex-col gap-1">
            <label
              className="text-[14px] font-bold text-[#e1e1f2] flex items-center justify-between"
              htmlFor="identifierInput"
            >
              <span>البريد الإلكتروني أو اسم المستخدم</span>
              <span className="text-[10px] font-bold text-[#e9bcb6] bg-[#272936] px-2 py-0.5 rounded-full">
                مطلوب
              </span>
            </label>
            <div className="relative flex items-center rounded-xl bg-[#272936] shadow-inner transition-all duration-200 focus-within:bg-[#323441] border border-[#323441]/50 focus-within:border-[#e50914]/50">
              <div className="pr-3 pl-2 flex items-center justify-center text-[#e9bcb6] pointer-events-none">
                <span className="material-symbols-outlined text-[20px]">alternate_email</span>
              </div>
              <input
                id="identifierInput"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
                className="w-full h-12 bg-transparent text-[#e1e1f2] placeholder:text-[#af8782]/70 text-[14px] pr-1 pl-4 rounded-xl focus:outline-none"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-[14px] font-bold text-[#e1e1f2]" htmlFor="passwordInput">
                كلمة المرور
              </label>
              <button
                type="button"
                onClick={() => onNavigate('forgot-password')}
                className="text-[12px] text-[#ffb4aa] hover:text-[#ffdad5] transition-colors"
              >
                نسيت كلمة المرور؟
              </button>
            </div>
            <div className="relative flex items-center rounded-xl bg-[#272936] shadow-inner transition-all duration-200 focus-within:bg-[#323441] border border-[#323441]/50 focus-within:border-[#e50914]/50">
              <div className="pr-3 pl-2 flex items-center justify-center text-[#e9bcb6] pointer-events-none">
                <span className="material-symbols-outlined text-[20px]">lock</span>
              </div>
              <input
                id="passwordInput"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full h-12 bg-transparent text-[#e1e1f2] placeholder:text-[#af8782]/70 text-[14px] pr-1 pl-12 rounded-xl focus:outline-none font-mono"
                placeholder="••••••••••••"
                required
              />
              <button
                type="button"
                aria-label="إظهار أو إخفاء كلمة المرور"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-2 w-9 h-9 flex items-center justify-center rounded-lg text-[#e9bcb6] hover:text-[#e1e1f2] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? 'visibility' : 'visibility_off'}
                </span>
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between py-1">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-5 h-5 rounded-md bg-[#272936] border border-[#323441] flex items-center justify-center peer-checked:bg-[#e50914] peer-checked:border-[#e50914] transition-all">
                {rememberMe && (
                  <span className="material-symbols-outlined text-[16px] text-[#fff7f6]">
                    check
                  </span>
                )}
              </div>
              <span className="text-[14px] text-[#e1e1f2]">تذكر بيانات تسجيل دخولي</span>
            </label>
          </div>

          {/* Main High-Voltage CTA */}
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className={`w-full h-12 rounded-full font-black text-[12px] tracking-wider flex items-center justify-center gap-2 shadow-[0_4px_24px_rgba(229,9,20,0.45)] hover:shadow-[0_6px_30px_rgba(229,9,20,0.6)] active:scale-[0.98] transition-all mt-1 ${
              isSuccess
                ? 'bg-[#feb700] text-[#6b4b00]'
                : 'bg-[#e50914] text-[#fff7f6]'
            }`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-[#fff7f6]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>جاري التحقق والدخول...</span>
              </>
            ) : isSuccess ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>تم تسجيل الدخول بنجاح!</span>
              </>
            ) : (
              <>
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
                <span>تسجيل الدخول إلى حسابك</span>
              </>
            )}
          </button>
        </form>

        {/* Visual Divider */}
        <div className="relative flex items-center justify-center my-5">
          <div className="w-full h-px bg-[#323441]"></div>
          <span className="absolute px-3 bg-[#11131e] text-[11px] font-bold text-[#e9bcb6] uppercase">
            أو المتابعة عبر
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            type="button"
            onClick={onSuccessLogin}
            className="h-12 px-3 rounded-xl bg-[#272936] hover:bg-[#323441] text-[#e1e1f2] flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-[0.98] border border-[#323441]/50"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.86c.61-.75 1.04-1.8 0.92-2.86-.92.04-2.06.62-2.73 1.39-.56.63-1.07 1.67-.93 2.7 1.03.08 2.12-.53 2.74-1.23z"></path>
            </svg>
            <span className="font-bold text-[14px]">Apple ID</span>
          </button>

          <button
            type="button"
            onClick={onSuccessLogin}
            className="h-12 px-3 rounded-xl bg-[#272936] hover:bg-[#323441] text-[#e1e1f2] flex items-center justify-center gap-2 transition-colors shadow-sm active:scale-[0.98] border border-[#323441]/50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                fill="#4285F4"
              ></path>
              <path
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                fill="#34A853"
              ></path>
              <path
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.04 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                fill="#EA4335"
              ></path>
            </svg>
            <span className="font-bold text-[14px]">Google</span>
          </button>
        </div>

        {/* Biometric Quick Access Disc Banner */}
        <div className="w-full rounded-2xl bg-[#191b27] p-3 flex items-center justify-between shadow-lg mb-4 border border-[#272936]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#1d1f2b] flex items-center justify-center text-[#ffdb9d] border border-[#323441]">
              <span className="material-symbols-outlined text-[24px]">fingerprint</span>
            </div>
            <div className="flex flex-col text-start">
              <span className="font-bold text-[14px] text-[#e1e1f2]">الدخول البيومتري السريع</span>
              <span className="text-[12px] text-[#e9bcb6]">بصمة الإصبع أو Face ID الفوري</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleBiometric}
            className="h-9 px-3.5 rounded-full bg-[#323441] hover:bg-[#373846] text-[#ffdb9d] text-[11px] font-black flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
          >
            {biometricStatus === 'scanning' ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-pulse">fingerprint</span>
                <span>جارٍ المسح...</span>
              </>
            ) : biometricStatus === 'success' ? (
              <>
                <span className="material-symbols-outlined text-[16px] text-green-400">done</span>
                <span className="text-green-400">تم التوثيق</span>
              </>
            ) : (
              <>
                <span>تفعيل</span>
                <span className="material-symbols-outlined text-[16px]">touch_app</span>
              </>
            )}
          </button>
        </div>

        {/* Micro Teaser Preview Card: Trending Series */}
        <div
          onClick={() => onNavigate('dashboard')}
          className="w-full rounded-2xl bg-[#1d1f2b] p-3 flex items-center gap-3 mb-4 shadow-md border border-[#272936] cursor-pointer hover:border-[#e50914]/40 transition-colors"
        >
          <div className="relative w-16 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#272936]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyB7tBDIx-xxQcXBqREY4MwfJCHFtxarvysoCxQl_9G1Nckuh6J4nWdTLovNheDoQX0_5uxczFQZK22gufvhl7T4xePbgv8ujq9Bs8feJOq2WuFvu5iGzEcZ6MaZ8XN9xNSlIA0wM8tHsVDiER4C32t4QVzlmyazZ5_B61CZbxy0jTd_3wIFZ7N0JKkGLYeJcSOvLdKGvabJVw6Pi55Od1uOMN21-g-jN3qeDLkG9jB-PTOvSon-o"
              alt="أسرار ما بعد منتصف الليل"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11131e]/90 via-transparent to-transparent"></div>
            <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#e50914] flex items-center justify-center text-[#fff7f6]">
              <span
                className="material-symbols-outlined text-[12px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </div>
          </div>
          <div className="flex flex-col min-w-0 flex-1 text-start">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="px-1.5 py-0.5 rounded bg-[#e50914]/20 text-[#ffb4aa] text-[10px] font-black">
                حلقات جديدة
              </span>
              <div className="flex items-center gap-0.5 text-[#ffdb9d]">
                <span
                  className="material-symbols-outlined text-[12px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="text-[10px] font-black">4.9</span>
              </div>
            </div>
            <span className="font-bold text-[14px] text-[#e1e1f2] truncate">
              أسرار ما بعد منتصف الليل
            </span>
            <span className="text-[12px] text-[#e9bcb6] line-clamp-1">
              سجل دخولك لمتابعة الحلقة 24 المفتوحة لجميع المشتركين
            </span>
          </div>
        </div>

        {/* Footer Registration Link */}
        <div className="flex items-center justify-center gap-1 text-center mb-3">
          <span className="text-[14px] text-[#e9bcb6]">ليس لديك حساب بعد؟</span>
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="font-bold text-[14px] text-[#ffb4aa] hover:text-[#ffdad5] transition-colors"
          >
            اشترك الآن مجاناً
          </button>
        </div>

        {/* Security & DRM Footnote */}
        <div className="flex items-center justify-center gap-1.5 text-[#e9bcb6]/60 text-[10px] font-semibold pb-2">
          <span className="material-symbols-outlined text-[14px]">verified_user</span>
          <span>اتصال مشفر وآمن بمعايير الحماية السينمائية الدولية DRM</span>
        </div>
      </main>
    </div>
  );
};
