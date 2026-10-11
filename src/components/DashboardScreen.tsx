import React, { useState } from 'react';
import { DramaWork, UserProfile, RecentActivityItem, ScreenType } from '../types';

interface DashboardScreenProps {
  user: UserProfile;
  continueWork: DramaWork;
  recentActivities: RecentActivityItem[];
  onPlayWork: (workId: string, episodeNumber?: number) => void;
  onNavigate: (screen: ScreenType) => void;
  onOpenCoinShop: () => void;
  onToast: (msg: string) => void;
  onAddCoins?: (amount: number) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  continueWork,
  recentActivities,
  onPlayWork,
  onNavigate,
  onOpenCoinShop,
  onToast,
  onAddCoins,
}) => {
  const [autoDownload, setAutoDownload] = useState(true);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [hasClaimedBonus, setHasClaimedBonus] = useState(false);

  const handleTriggerAlert = () => {
    setIsAlertOpen(true);
    onToast('🔔 تنبيه سينمائي عاجل: تم تفعيل تذكرة العرض الليلي الخاص!');
  };

  const handleClaimBonus = () => {
    if (hasClaimedBonus) {
      onToast('لقد حصلت على مكافأة هذا التنبيه بالفعل!');
      setIsAlertOpen(false);
      return;
    }
    setHasClaimedBonus(true);
    if (onAddCoins) {
      onAddCoins(50);
    }
    setIsAlertOpen(false);
    onToast('🎉 مبروك! تمت إضافة +50 كوينز مجانية إلى رصيدك السينمائي.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'سينما ليلية - Nocturnal Cinema',
          text: 'انضم إلي في سينما ليلية واستمتع بأقوى المسلسلات القصيرة والدراما العمودية بجودة 4K!',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      setShareSuccess(true);
      onToast('تم نسخ رابط الدعوة! ستحصل على 100 كوينز عند تسجيل صديقك.');
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md mx-auto px-4 pt-20 pb-28 gap-5">
      {/* Welcome & Profile Quick Bar */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[20px] font-black text-[#e1e1f2]">
                مرحباً مجدداً، {user.name.split(' ')[0]}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#feb700] text-[#6b4b00] text-[10px] font-black shadow-sm">
                <span
                  className="material-symbols-outlined text-[13px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
                عضوية VIP سينمائية
              </span>
            </div>
            <span className="text-[12px] text-[#e9bcb6]">
              أمسيتك السينمائية جاهزة، 3 حلقات جديدة بانتظارك الليلة
            </span>
          </div>

          {/* Coin Pill Counter */}
          <button
            onClick={onOpenCoinShop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#272936] text-[#ffdb9d] hover:bg-[#323441] transition-colors shadow-md shrink-0 border border-[#323441]"
          >
            <span
              className="material-symbols-outlined text-[#ffdb9d] text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              monetization_on
            </span>
            <span className="font-bold text-[15px]">{user.coins}</span>
            <span className="text-[10px] font-black text-[#e9bcb6]">كوينز</span>
          </button>
        </div>

        {/* Continue Watching: Glowing Hero Card */}
        <div className="relative w-full rounded-xl bg-[#191b27] overflow-hidden shadow-xl p-4 flex flex-col justify-between gap-4 border border-[#272936]/60">
          <div className="absolute -top-16 -end-16 w-52 h-52 rounded-full bg-[#e50914]/20 blur-3xl pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-l from-[#191b27] via-[#191b27]/95 to-transparent pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#e50914] animate-pulse"></span>
              <span className="text-[11px] font-black text-[#ffb4aa] tracking-wide uppercase">
                متابعة المشاهدة
              </span>
            </div>
            <h2 className="text-[18px] font-black text-[#e1e1f2] line-clamp-1">
              {continueWork.title}
            </h2>
            <span className="text-[12px] text-[#e9bcb6]">
              الموسم الثاني • الحلقة {continueWork.currentEpisode} (متبقي {continueWork.durationRemainingMinutes} دقيقة)
            </span>
          </div>

          {/* Scrubber & Action Button */}
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <div className="w-full bg-[#323441] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#e50914] h-full rounded-full transition-all duration-500"
                  style={{ width: `${continueWork.watchedPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center text-[#e9bcb6] text-[11px] font-black">
                <span>{continueWork.watchedPercentage}% مكتمل</span>
                <span>28:40 / 42:00</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onPlayWork(continueWork.id, continueWork.currentEpisode)}
                className="flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#e50914] text-[#fff7f6] text-[12px] font-black hover:scale-[0.98] active:scale-95 transition-transform shadow-lg shadow-[#e50914]/25"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
                <span>استئناف العرض</span>
              </button>

              <button
                onClick={() => {
                  onPlayWork(continueWork.id, 1);
                  onToast('تمت إعادة التشغيل من الحلقة الأولى');
                }}
                className="w-9 h-9 rounded-full bg-[#323441]/70 text-[#e1e1f2] flex items-center justify-center hover:bg-[#323441] transition-colors border border-[#af8782]/20"
                title="إعادة تشغيل من البداية"
              >
                <span className="material-symbols-outlined text-[18px]">replay</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Feature: HTML Alert Trigger Button */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-l from-[#e50914]/20 via-[#272936] to-[#1d1f2b] p-4 border border-[#e50914]/30 shadow-xl">
        <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-[#e50914] text-[#fff7f6] flex items-center justify-center shrink-0 shadow-lg shadow-[#e50914]/30">
              <span className="material-symbols-outlined text-[24px]">notifications_active</span>
            </div>
            <div className="flex flex-col text-start min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-black text-[#e1e1f2]">تنبيه العرض الحصري</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#feb700] text-[#412d00]">عاجل</span>
              </div>
              <p className="text-[11px] text-[#e9bcb6] line-clamp-1">
                اضغط لتشغيل تنبيه سينمائي مباشر واستلام مكافأة الكوينز
              </p>
            </div>
          </div>

          {/* Explicit HTML Button Element */}
          <button
            id="main-screen-alert-btn"
            type="button"
            onClick={handleTriggerAlert}
            aria-haspopup="dialog"
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#e50914] hover:bg-[#b80710] text-[#fff7f6] font-black text-[12px] shadow-lg shadow-[#e50914]/25 active:scale-95 transition-all shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>تشغيل التنبيه</span>
          </button>
        </div>
      </section>

      {/* Quick Stats Grid (2x2) */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-black text-[#e1e1f2] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb4aa] text-[20px]">insights</span>
            إحصائيات سريعة
          </h3>
          <span className="text-[11px] font-black text-[#e9bcb6]">آخر 30 يوماً</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Card 1: Watch Time */}
          <div className="bg-[#1d1f2b] rounded-xl p-3.5 shadow-md flex flex-col justify-between gap-3 border border-[#272936]">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-[#272936] flex items-center justify-center text-[#ffb4aa]">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
              </span>
              <span className="text-[11px] font-bold text-[#feb700] bg-[#272936] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[12px]">trending_up</span>
                +12%
              </span>
            </div>
            <div className="flex flex-col text-start">
              <span className="text-[24px] font-black text-[#e1e1f2] leading-none mb-1">
                {user.watchHoursThisMonth}
              </span>
              <span className="text-[12px] text-[#e9bcb6]">ساعات المشاهدة</span>
            </div>
          </div>

          {/* Card 2: Completed Series */}
          <div className="bg-[#1d1f2b] rounded-xl p-3.5 shadow-md flex flex-col justify-between gap-3 border border-[#272936]">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-[#272936] flex items-center justify-center text-[#ffdb9d]">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  emoji_events
                </span>
              </span>
              <span className="text-[11px] font-bold text-[#e9bcb6] bg-[#272936] px-1.5 py-0.5 rounded">
                مستمر
              </span>
            </div>
            <div className="flex flex-col text-start">
              <span className="text-[24px] font-black text-[#e1e1f2] leading-none mb-1">
                {user.completedSeriesCount}
              </span>
              <span className="text-[12px] text-[#e9bcb6]">مسلسلاً مكتملاً</span>
            </div>
          </div>

          {/* Card 3: Watchlist */}
          <div
            onClick={() => onNavigate('watchlist')}
            className="bg-[#1d1f2b] rounded-xl p-3.5 shadow-md flex flex-col justify-between gap-3 border border-[#272936] cursor-pointer hover:border-[#ffb4aa]/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-[#272936] flex items-center justify-center text-[#ffdad5]">
                <span className="material-symbols-outlined text-[20px]">bookmark</span>
              </span>
              <span className="w-2 h-2 rounded-full bg-[#e50914]"></span>
            </div>
            <div className="flex flex-col text-start">
              <span className="text-[24px] font-black text-[#e1e1f2] leading-none mb-1">9</span>
              <span className="text-[12px] text-[#e9bcb6]">أعمال في قائمتي</span>
            </div>
          </div>

          {/* Card 4: Coin Balance & Top Up */}
          <div className="bg-[#1d1f2b] rounded-xl p-3.5 shadow-md flex flex-col justify-between gap-3 border border-[#272936]">
            <div className="flex items-center justify-between">
              <span className="w-8 h-8 rounded-lg bg-[#272936] flex items-center justify-center text-[#feb700]">
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  toll
                </span>
              </span>
              <button
                onClick={onOpenCoinShop}
                className="px-2.5 py-0.5 rounded-full bg-[#e50914] text-[#fff7f6] text-[10px] font-black shadow hover:opacity-90 active:scale-95 transition-all"
              >
                شحن
              </button>
            </div>
            <div className="flex flex-col text-start">
              <span className="text-[24px] font-black text-[#e1e1f2] leading-none mb-1">
                {user.coins}
              </span>
              <span className="text-[12px] text-[#e9bcb6]">+50 كوينز بونص</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-black text-[#e1e1f2] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb4aa] text-[20px]">history</span>
            النشاط الأخير
          </h3>
          <button
            onClick={() => onToast('السجل الكامل محفوظ ومحمي بنظام التشفير DRM')}
            className="text-[11px] font-black text-[#ffb4aa] hover:underline"
          >
            عرض السجل الكامل
          </button>
        </div>

        <div className="bg-[#191b27] rounded-xl shadow-lg p-2 flex flex-col gap-1 border border-[#272936]">
          {recentActivities.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#1d1f2b] transition-colors cursor-pointer"
              onClick={() => onPlayWork('arsh-al-zilal')}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#272936] flex items-center justify-center text-[#e50914] shrink-0 border border-[#323441]">
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                </div>
                <div className="flex flex-col min-w-0 text-start">
                  <span className="text-[14px] font-bold text-[#e1e1f2] truncate">
                    {item.workTitle}
                  </span>
                  <span className="text-[12px] text-[#e9bcb6]">{item.actionText}</span>
                </div>
              </div>

              <span
                className={`text-[10px] font-black px-2 py-1 rounded-full shrink-0 ${
                  item.badgeType === 'secondary'
                    ? 'bg-[#feb700] text-[#6b4b00]'
                    : 'bg-[#323441] text-[#e9bcb6]'
                }`}
              >
                {item.badgeText}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Actions Modules */}
      <section className="flex flex-col gap-3">
        <h3 className="text-[16px] font-black text-[#e1e1f2] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#ffb4aa] text-[20px]">bolt</span>
          إجراءات مقترحة
        </h3>

        <div className="flex flex-col gap-3">
          {/* Action 1: Auto-Download Toggle */}
          <div className="bg-[#1d1f2b] rounded-xl p-3.5 shadow-md flex items-center justify-between gap-3 border border-[#272936]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#272936] flex items-center justify-center text-[#e9bcb6] shrink-0">
                <span className="material-symbols-outlined text-[20px]">download_for_offline</span>
              </div>
              <div className="flex flex-col min-w-0 text-start">
                <span className="text-[14px] font-bold text-[#e1e1f2]">التنزيل التلقائي للحلقات</span>
                <span className="text-[12px] text-[#e9bcb6]">تحميل الحلقة التالية عبر شبكة Wi-Fi فقط</span>
              </div>
            </div>

            <button
              onClick={() => {
                setAutoDownload(!autoDownload);
                onToast(
                  !autoDownload
                    ? 'تم تفعيل التنزيل التلقائي عبر Wi-Fi'
                    : 'تم تعطيل التنزيل التلقائي'
                );
              }}
              className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer shrink-0 ${
                autoDownload ? 'bg-[#e50914]' : 'bg-[#323441]'
              }`}
              role="switch"
              aria-checked={autoDownload}
            >
              <span
                className={`w-5 h-5 bg-[#fff7f6] rounded-full absolute top-0.5 transition-transform duration-200 shadow-sm ${
                  autoDownload ? 'start-1' : 'start-6'
                }`}
              ></span>
            </button>
          </div>

          {/* Action 2: Premiere Showcase */}
          <div className="bg-[#1d1f2b] rounded-xl p-3.5 shadow-md flex items-center justify-between gap-3 relative overflow-hidden border border-[#272936]">
            <div className="flex items-center gap-3 min-w-0 z-10">
              <div className="w-10 h-10 rounded-lg bg-[#e50914]/20 flex items-center justify-center text-[#ffb4aa] shrink-0 border border-[#e50914]/30">
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              </div>
              <div className="flex flex-col min-w-0 text-start">
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-bold text-[#e1e1f2]">عرض الليلة الحصري</span>
                  <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-[#e50914] text-[#fff7f6]">
                    حصري
                  </span>
                </div>
                <span className="text-[12px] text-[#e9bcb6]">العرض الأول لمسلسل &quot;أصوات القبو&quot;</span>
              </div>
            </div>

            <button
              onClick={() => onPlayWork('matraqat-muntasaf-al-layl')}
              className="px-3.5 py-2 rounded-full bg-[#323441] text-[#e1e1f2] text-[11px] font-black hover:bg-[#373846] transition-colors shrink-0 z-10"
            >
              استكشف الآن
            </button>
          </div>

          {/* Action 3: Invite Friend */}
          <div className="bg-gradient-to-l from-[#272936] via-[#1d1f2b] to-[#1d1f2b] rounded-xl p-3.5 shadow-md flex items-center justify-between gap-3 border border-[#272936]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#323441] flex items-center justify-center text-[#ffdb9d] shrink-0">
                <span className="material-symbols-outlined text-[20px]">card_giftcard</span>
              </div>
              <div className="flex flex-col min-w-0 text-start">
                <span className="text-[14px] font-bold text-[#e1e1f2]">
                  ادعُ صديقاً واحصل على 100 كوينز
                </span>
                <span className="text-[12px] text-[#e9bcb6]">
                  شارك رابط المشاهدة المميز مع أصدقائك
                </span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-[#323441] text-[#ffdb9d] flex items-center justify-center hover:bg-[#ffdb9d] hover:text-[#412d00] transition-colors shrink-0 border border-[#af8782]/30"
              title="مشاركة"
            >
              <span className="material-symbols-outlined text-[18px]">
                {shareSuccess ? 'check' : 'share'}
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Cinematic In-App Alert Dialog */}
      {isAlertOpen && (
        <div
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-desc"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div className="relative w-full max-w-sm rounded-2xl bg-[#191b27] border-2 border-[#e50914]/60 shadow-[0_0_50px_rgba(229,9,20,0.35)] p-5 flex flex-col items-center text-center gap-4">
            {/* Top glowing icon */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-[#e50914]/20 border border-[#e50914] flex items-center justify-center text-[#ffb4aa] shadow-inner">
                <span className="material-symbols-outlined text-[36px]">
                  notifications_active
                </span>
              </div>
              <span className="absolute -top-1 -end-1 w-5 h-5 rounded-full bg-[#feb700] text-[#412d00] flex items-center justify-center text-[11px] font-black">
                !
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 id="alert-dialog-title" className="text-[18px] font-black text-[#e1e1f2]">
                تنبيه سينمائي: عرض منتصف الليل السري
              </h3>
              <p id="alert-dialog-desc" className="text-[13px] text-[#e9bcb6] leading-relaxed">
                تم فتح جلسة بث حصرية لمسلسل <strong className="text-[#ffdb9d]">&quot;{continueWork.title}&quot;</strong> بجودة Ultra 4K HDR. لديك فرصة لاقتناص مكافأة المشاهدة الليلية الآن!
              </p>
            </div>

            {/* Bonus Reward Badge */}
            <div className="w-full bg-[#272936] rounded-xl p-3 flex items-center justify-between border border-[#323441]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#feb700] text-[22px]">
                  monetization_on
                </span>
                <span className="text-[12px] font-bold text-[#e1e1f2]">مكافأة الحضور الفوري</span>
              </div>
              <span className="text-[13px] font-black text-[#feb700]">+50 كوينز VIP</span>
            </div>

            {/* Action Buttons using HTML buttons */}
            <div className="flex flex-col w-full gap-2 mt-1">
              <button
                id="alert-claim-reward-btn"
                type="button"
                onClick={handleClaimBonus}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#e50914] to-[#f43f5e] text-[#fff7f6] text-[13px] font-black hover:brightness-110 active:scale-[0.98] transition-transform shadow-lg shadow-[#e50914]/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">redeem</span>
                <span>{hasClaimedBonus ? 'تم استلام المكافأة (إغلاق)' : 'استلام +50 كوينز ومشاهدة'}</span>
              </button>

              <button
                id="alert-dismiss-btn"
                type="button"
                onClick={() => setIsAlertOpen(false)}
                className="w-full py-2 rounded-xl bg-[#272936] text-[#e9bcb6] hover:text-[#e1e1f2] hover:bg-[#323441] text-[12px] font-bold transition-colors cursor-pointer"
              >
                إغلاق التنبيه
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
