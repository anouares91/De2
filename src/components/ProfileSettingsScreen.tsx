import React, { useState } from 'react';
import { UserProfile, ScreenType } from '../types';

interface ProfileSettingsScreenProps {
  user: UserProfile;
  onNavigate: (screen: ScreenType) => void;
  onOpenCoinShop: () => void;
  onLogout: () => void;
  onToast: (msg: string) => void;
}

export const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({
  user,
  onNavigate: _onNavigate,
  onOpenCoinShop,
  onLogout,
  onToast,
}) => {
  const [smartWifiDownload, setSmartWifiDownload] = useState(true);
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [biometricLogin, setBiometricLogin] = useState(true);
  const [midnightAlerts, setMidnightAlerts] = useState(true);
  const [maturityLevel, setMaturityLevel] = useState('+18 (شامل)');

  const cycleMaturity = () => {
    const levels = ['+18 (شامل)', '+16 (يافعين)', '+13 (عائلي)'];
    const next = levels[(levels.indexOf(maturityLevel) + 1) % levels.length];
    setMaturityLevel(next);
    onToast(`تم تعيين تصنيف المحتوى إلى: ${next}`);
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pt-20 pb-28 gap-6 text-[#e1e1f2]">
      {/* Top Section / User Header */}
      <section className="flex flex-col items-center text-center mt-2">
        {/* Avatar Wrapper with Ambient Glow & Action Badge */}
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#e50914] via-[#e11739] to-[#feb700] opacity-40 blur-md group-hover:opacity-75 transition-opacity"></div>
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-[#272936] shadow-2xl border-2 border-[#ffb4aa]/40">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            aria-label="تعديل الصورة"
            onClick={() => onToast('تغيير صورة الملف الشخصي متاح للمشتركين المعتمدين')}
            className="absolute bottom-0 start-0 w-8 h-8 rounded-full bg-[#e50914] text-[#fff7f6] flex items-center justify-center shadow-lg transition-transform active:scale-95 border border-[#0b0d19]"
          >
            <span className="material-symbols-outlined text-[16px]">photo_camera</span>
          </button>
        </div>

        {/* User Details & Verified Film Curator Badge */}
        <div className="mt-3 flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <h1 className="text-[22px] font-black text-[#e1e1f2]">{user.name}</h1>
            <span
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#feb700] text-[#6b4b00]"
              title="ناقد ومقيّم سينمائي موثق"
            >
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </span>
          </div>
          <span className="text-[12px] text-[#ffdb9d] font-bold mt-0.5">{user.role}</span>
          <p className="text-[12px] text-[#e9bcb6] mt-1 flex items-center gap-2">
            <span>{user.email}</span>
            <span className="inline-block w-1 h-1 rounded-full bg-[#5e3f3b]"></span>
            <span>عضو منذ {user.memberSince}</span>
          </p>
        </div>

        {/* VIP Platinum Pass Membership Banner */}
        <div className="w-full mt-4 rounded-xl bg-gradient-to-b from-[#272936] to-[#1d1f2b] p-4 shadow-xl relative overflow-hidden text-start border border-[#323441]">
          <div className="absolute -top-12 -end-12 w-32 h-32 rounded-full bg-[#feb700]/10 blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-lg bg-[#feb700]/15 flex items-center justify-center text-[#feb700] shadow-inner border border-[#feb700]/30">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
              </div>
              <div>
                <span className="text-[14px] font-black text-[#ffdea8] block">
                  {user.vipTier}
                </span>
                <span className="text-[11px] text-[#e9bcb6] block mt-0.5">
                  تجديد تلقائي: {user.vipRenewalDate}
                </span>
              </div>
            </div>
            <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#feb700] text-[#6b4b00]">
              نشط
            </span>
          </div>

          {/* Perks tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-3">
            <span className="px-2 py-1 rounded-full bg-[#323441] text-[#e1e1f2] text-[10px] font-black flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] text-[#ffdb9d]">hd</span>
              جودة 4K HDR
            </span>
            <span className="px-2 py-1 rounded-full bg-[#323441] text-[#e1e1f2] text-[10px] font-black flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] text-[#ffdb9d]">devices</span>
              4 أجهزة متزامنة
            </span>
            <span className="px-2 py-1 rounded-full bg-[#323441] text-[#e1e1f2] text-[10px] font-black flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px] text-[#ffdb9d]">block</span>
              بدون إعلانات
            </span>
          </div>

          {/* Loyalty Progress Bar */}
          <div className="mt-3 flex flex-col gap-1">
            <div className="flex justify-between items-center text-[10px] font-black text-[#e9bcb6]">
              <span>نقاط الولاء للترقية السنوية</span>
              <span className="text-[#ffdb9d] font-bold">
                {user.loyaltyXp.toLocaleString()} / {user.loyaltyTargetXp.toLocaleString()} XP
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#323441] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#feb700] to-[#e50914]"
                style={{ width: `${(user.loyaltyXp / user.loyaltyTargetXp) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Manage Membership CTA */}
          <div className="mt-3 pt-2">
            <button
              onClick={onOpenCoinShop}
              className="w-full py-2.5 px-4 rounded-full bg-[#feb700] hover:bg-[#ffba20] text-[#6b4b00] text-[12px] font-black flex items-center justify-center gap-1.5 shadow-md transition-transform active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[16px]">stars</span>
              <span>ترقية أو إدارة الاشتراك</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid (3 columns) */}
      <section className="grid grid-cols-3 gap-2">
        {/* Stat 1: Coins */}
        <div className="flex flex-col justify-between p-3 rounded-xl bg-[#191b27] border border-[#272936]">
          <div className="flex items-center justify-between text-[#ffdb9d]">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              monetization_on
            </span>
            <button
              onClick={onOpenCoinShop}
              className="w-5 h-5 rounded-full bg-[#272936] text-[#ffdb9d] flex items-center justify-center hover:bg-[#ffdb9d] hover:text-[#412d00] transition-colors"
              title="شحن الرصيد"
            >
              <span className="material-symbols-outlined text-[14px]">add</span>
            </button>
          </div>
          <div className="mt-3 text-start">
            <div className="text-[22px] font-black text-[#e1e1f2] leading-tight">{user.coins}</div>
            <span className="text-[10px] font-black text-[#e9bcb6] block mt-0.5">كوينز سينمائي</span>
          </div>
        </div>

        {/* Stat 2: Completed Dramas */}
        <div className="flex flex-col justify-between p-3 rounded-xl bg-[#191b27] border border-[#272936]">
          <div className="text-[#ffb4aa]">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              task_alt
            </span>
          </div>
          <div className="mt-3 text-start">
            <div className="text-[22px] font-black text-[#e1e1f2] leading-tight">
              {user.completedSeriesCount}
            </div>
            <span className="text-[10px] font-black text-[#e9bcb6] block mt-0.5">مسلسلاً مكتملاً</span>
          </div>
        </div>

        {/* Stat 3: Watch Hours */}
        <div className="flex flex-col justify-between p-3 rounded-xl bg-[#191b27] border border-[#272936]">
          <div className="text-[#ffb3b2]">
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              timer
            </span>
          </div>
          <div className="mt-3 text-start">
            <div className="text-[22px] font-black text-[#e1e1f2] leading-tight">
              {user.watchHoursThisMonth}
            </div>
            <span className="text-[10px] font-black text-[#e9bcb6] block mt-0.5">ساعة هذا الشهر</span>
          </div>
        </div>
      </section>

      {/* Preferences & Settings List */}
      <section className="flex flex-col gap-4">
        {/* Group 1: Viewing & Content Preferences */}
        <div className="flex flex-col gap-1.5">
          <h2 className="text-[11px] font-black text-[#e9bcb6] px-1 uppercase tracking-wider">
            تفضيلات المشاهدة والمحتوى
          </h2>
          <div className="rounded-xl bg-[#191b27] overflow-hidden flex flex-col border border-[#272936] divide-y divide-[#272936]">
            {/* Content Maturity */}
            <button
              onClick={cycleMaturity}
              className="w-full flex items-center justify-between p-3.5 hover:bg-[#1d1f2b] transition-colors text-start"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#272936] flex items-center justify-center text-[#ffb4aa]">
                  <span className="material-symbols-outlined text-[20px]">explicit</span>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-[#e1e1f2] block">
                    تصنيف ونضج المحتوى
                  </span>
                  <span className="text-[12px] text-[#e9bcb6]">التحكم الأبوي وقيود الأعمار</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-full bg-[#e11739] text-[#fff7f6] text-[11px] font-black">
                  {maturityLevel}
                </span>
                <span className="material-symbols-outlined text-[18px] text-[#af8782]">
                  chevron_left
                </span>
              </div>
            </button>

            {/* Subtitles & Audio Language */}
            <button
              onClick={() => onToast('اللغة الحالية: العربية مع ترجمة سينمائية مدبلجة')}
              className="w-full flex items-center justify-between p-3.5 hover:bg-[#1d1f2b] transition-colors text-start"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#272936] flex items-center justify-center text-[#ffdb9d]">
                  <span className="material-symbols-outlined text-[20px]">translate</span>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-[#e1e1f2] block">
                    لغة العرض والترجمة
                  </span>
                  <span className="text-[12px] text-[#e9bcb6]">
                    العربية (مع ترجمة تلقائية ملهمة)
                  </span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#af8782]">
                chevron_left
              </span>
            </button>

            {/* Streaming Quality */}
            <button
              onClick={() => onToast('الجودة محددة على 4K Ultra HD كخيار افتراضي فائق')}
              className="w-full flex items-center justify-between p-3.5 hover:bg-[#1d1f2b] transition-colors text-start"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#272936] flex items-center justify-center text-[#ffdad5]">
                  <span className="material-symbols-outlined text-[20px]">high_res</span>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-[#e1e1f2] block">
                    جودة البث الافتراضية
                  </span>
                  <span className="text-[12px] text-[#e9bcb6]">4K Ultra HD (تلقائي ذكي)</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#af8782]">
                chevron_left
              </span>
            </button>

            {/* Toggle: Smart Download via Wi-Fi only */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3 text-start">
                <div className="w-9 h-9 rounded-lg bg-[#272936] flex items-center justify-center text-[#e9bcb6]">
                  <span className="material-symbols-outlined text-[20px]">wifi</span>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-[#e1e1f2] block">
                    التنزيل الذكي عبر Wi-Fi فقط
                  </span>
                  <span className="text-[12px] text-[#e9bcb6]">حفظ باقة بيانات الجوال تلقائياً</span>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={smartWifiDownload}
                onClick={() => {
                  setSmartWifiDownload(!smartWifiDownload);
                  onToast(!smartWifiDownload ? 'تم تفعيل التنزيل عبر Wi-Fi' : 'تم السماح بالتنزيل عبر البيانات');
                }}
                className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${
                  smartWifiDownload ? 'bg-[#e50914]' : 'bg-[#323441]'
                }`}
              >
                <span
                  className={`w-5 h-5 bg-[#fff7f6] rounded-full absolute top-0.5 transition-transform duration-200 shadow-sm ${
                    smartWifiDownload ? 'start-1' : 'start-5'
                  }`}
                ></span>
              </button>
            </div>

            {/* Toggle: Autoplay next episode */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3 text-start">
                <div className="w-9 h-9 rounded-lg bg-[#272936] flex items-center justify-center text-[#e9bcb6]">
                  <span className="material-symbols-outlined text-[20px]">queue_play_next</span>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-[#e1e1f2] block">
                    التشغيل التلقائي للحلقة التالية
                  </span>
                  <span className="text-[12px] text-[#e9bcb6]">انتقال سينمائي سلس بدون توقف</span>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={autoplayNext}
                onClick={() => {
                  setAutoplayNext(!autoplayNext);
                  onToast(!autoplayNext ? 'تم تفعيل التشغيل التلقائي' : 'تم تعطيل التشغيل التلقائي');
                }}
                className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${
                  autoplayNext ? 'bg-[#e50914]' : 'bg-[#323441]'
                }`}
              >
                <span
                  className={`w-5 h-5 bg-[#fff7f6] rounded-full absolute top-0.5 transition-transform duration-200 shadow-sm ${
                    autoplayNext ? 'start-1' : 'start-5'
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>

        {/* Group 2: Security & Devices */}
        <div className="flex flex-col gap-1.5">
          <h2 className="text-[11px] font-black text-[#e9bcb6] px-1 uppercase tracking-wider">
            أمان الحساب والبيانات
          </h2>
          <div className="rounded-xl bg-[#191b27] overflow-hidden flex flex-col border border-[#272936] divide-y divide-[#272936]">
            {/* Connected Devices */}
            <button
              onClick={() => onToast('الأجهزة المتصلة: Apple TV 4K (غرفة المعيشة), iPhone 15 Pro, iPad Air')}
              className="w-full flex items-center justify-between p-3.5 hover:bg-[#1d1f2b] transition-colors text-start"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#272936] flex items-center justify-center text-[#e9bcb6]">
                  <span className="material-symbols-outlined text-[20px]">devices_other</span>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-[#e1e1f2] block">الأجهزة المتصلة</span>
                  <span className="text-[12px] text-[#e9bcb6]">
                    3 أجهزة نشطة (Apple TV, iPhone, iPad)
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#ffb4aa] text-[11px] font-black">
                <span>إدارة</span>
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </div>
            </button>

            {/* Biometric Login */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3 text-start">
                <div className="w-9 h-9 rounded-lg bg-[#272936] flex items-center justify-center text-[#e9bcb6]">
                  <span className="material-symbols-outlined text-[20px]">fingerprint</span>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-[#e1e1f2] block">
                    تسجيل الدخول البيومتري
                  </span>
                  <span className="text-[12px] text-[#e9bcb6]">
                    Face ID / بصمة الإصبع للفتح السريع
                  </span>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={biometricLogin}
                onClick={() => {
                  setBiometricLogin(!biometricLogin);
                  onToast(!biometricLogin ? 'تم تفعيل التوثيق البيومتري' : 'تم تعطيل التوثيق البيومتري');
                }}
                className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${
                  biometricLogin ? 'bg-[#e50914]' : 'bg-[#323441]'
                }`}
              >
                <span
                  className={`w-5 h-5 bg-[#fff7f6] rounded-full absolute top-0.5 transition-transform duration-200 shadow-sm ${
                    biometricLogin ? 'start-1' : 'start-5'
                  }`}
                ></span>
              </button>
            </div>

            {/* Password & Security */}
            <button
              onClick={() => onToast('أمان الحساب: كلمة المرور قوية ومشفرة بمصادقة ثنائية')}
              className="w-full flex items-center justify-between p-3.5 hover:bg-[#1d1f2b] transition-colors text-start"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#272936] flex items-center justify-center text-[#e9bcb6]">
                  <span className="material-symbols-outlined text-[20px]">shield</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[14px] font-bold text-[#e1e1f2]">كلمة المرور والأمان</span>
                    <span
                      className="w-2 h-2 rounded-full bg-[#feb700]"
                      title="مستوى أمان مرتفع"
                    ></span>
                  </div>
                  <span className="text-[12px] text-[#e9bcb6]">تم التحديث منذ شهرين</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#af8782]">
                chevron_left
              </span>
            </button>
          </div>
        </div>

        {/* Group 3: Notifications & Rewards */}
        <div className="flex flex-col gap-1.5">
          <h2 className="text-[11px] font-black text-[#e9bcb6] px-1 uppercase tracking-wider">
            الإشعارات والمكافآت
          </h2>
          <div className="rounded-xl bg-[#191b27] overflow-hidden flex flex-col border border-[#272936] divide-y divide-[#272936]">
            {/* Midnight Drops & Premieres */}
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3 text-start">
                <div className="w-9 h-9 rounded-lg bg-[#272936] flex items-center justify-center text-[#ffb4aa]">
                  <span className="material-symbols-outlined text-[20px]">notifications_active</span>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-[#e1e1f2] block">
                    حلقات منتصف الليل والعروض الأولى
                  </span>
                  <span className="text-[12px] text-[#e9bcb6]">
                    تنبيهات فورية عند صدور فصول جديدة
                  </span>
                </div>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={midnightAlerts}
                onClick={() => {
                  setMidnightAlerts(!midnightAlerts);
                  onToast(!midnightAlerts ? 'تم تفعيل تنبيهات منتصف الليل' : 'تم تعطيل التنبيهات');
                }}
                className={`w-11 h-6 rounded-full relative transition-colors cursor-pointer ${
                  midnightAlerts ? 'bg-[#e50914]' : 'bg-[#323441]'
                }`}
              >
                <span
                  className={`w-5 h-5 bg-[#fff7f6] rounded-full absolute top-0.5 transition-transform duration-200 shadow-sm ${
                    midnightAlerts ? 'start-1' : 'start-5'
                  }`}
                ></span>
              </button>
            </div>

            {/* Referral & Invite */}
            <button
              onClick={() => {
                onOpenCoinShop();
                onToast('شارك كود الدعوة الخاص بك واحصل على 100 كوينز!');
              }}
              className="w-full flex items-center justify-between p-3.5 hover:bg-[#1d1f2b] transition-colors text-start"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#272936] flex items-center justify-center text-[#feb700]">
                  <span className="material-symbols-outlined text-[20px]">card_giftcard</span>
                </div>
                <div>
                  <span className="text-[14px] font-bold text-[#e1e1f2] block">
                    دعوة الأصدقاء ومكافآت المشاهدة
                  </span>
                  <span className="text-[12px] text-[#ffdb9d]">احصل على 100 كوينز مجاناً لكل دعوة</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#af8782]">
                chevron_left
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer Actions */}
      <footer className="flex flex-col gap-3 mt-1">
        {/* 24/7 Live Concierge Help */}
        <button
          onClick={() => onToast('المحادثة المباشرة مع المستشار السينمائي جارية الآن...')}
          className="w-full py-3 px-4 rounded-full bg-[#1d1f2b] hover:bg-[#272936] text-[#e1e1f2] font-bold text-[14px] flex items-center justify-center gap-2 transition-colors active:scale-[0.99] border border-[#272936]"
        >
          <span className="material-symbols-outlined text-[20px] text-[#ffb4aa]">
            support_agent
          </span>
          <span>الدعم الفني السينمائي المباشر (24/7)</span>
        </button>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full py-3 px-4 rounded-full bg-[#93000a]/30 hover:bg-[#93000a]/50 text-[#ffb4ab] font-bold text-[14px] flex items-center justify-center gap-2 transition-colors active:scale-[0.99] border border-[#93000a]/40"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>تسجيل الخروج من الحساب</span>
        </button>

        {/* Version & DRM Spec */}
        <div className="flex flex-col items-center justify-center text-center mt-2 gap-0.5">
          <span className="text-[11px] font-black text-[#af8782] tracking-wider">
            NOCTURNAL CINEMA v2.4.0
          </span>
          <span className="text-[11px] text-[#5e3f3b] text-[#af8782]/70">
            Widevine L1 &amp; Dolby Atmos Certified DRM
          </span>
        </div>
      </footer>
    </div>
  );
};
