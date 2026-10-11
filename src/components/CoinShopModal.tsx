import React, { useState } from 'react';
import { COIN_PACKAGES, VIP_TIERS, CoinPackage, VipTierItem } from '../data/cinemaData';

interface CoinShopModalProps {
  currentCoins: number;
  isOpen: boolean;
  onClose: () => void;
  onBuyCoins: (amount: number, bonus: number) => void;
  onUpgradeVip: (tierName: string) => void;
  onToast: (msg: string) => void;
}

export const CoinShopModal: React.FC<CoinShopModalProps> = ({
  currentCoins,
  isOpen,
  onClose,
  onBuyCoins,
  onUpgradeVip,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<'coins' | 'vip'>('coins');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#191b27] border border-[#323441] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-[#272936] to-[#1d1f2b] border-b border-[#272936] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#feb700]/15 flex items-center justify-center text-[#feb700] border border-[#feb700]/30">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                monetization_on
              </span>
            </div>
            <div className="text-start">
              <h2 className="text-[16px] font-black text-[#e1e1f2]">متجر الكوينز والاشتراكات VIP</h2>
              <span className="text-[11px] text-[#e9bcb6]">
                رصيدك الحالي: <strong className="text-[#feb700]">{currentCoins} كوينز</strong>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#323441] text-[#e9bcb6] hover:text-[#e1e1f2] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Tab switcher */}
        <div className="p-3 bg-[#11131e] flex gap-2 border-b border-[#272936]">
          <button
            onClick={() => setActiveTab('coins')}
            className={`flex-1 py-2 rounded-xl text-[12px] font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'coins'
                ? 'bg-[#e50914] text-[#fff7f6] shadow-md'
                : 'bg-[#191b27] text-[#e9bcb6] hover:bg-[#272936]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">toll</span>
            <span>باقات شحن الكوينز</span>
          </button>
          <button
            onClick={() => setActiveTab('vip')}
            className={`flex-1 py-2 rounded-xl text-[12px] font-black transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'vip'
                ? 'bg-[#feb700] text-[#6b4b00] shadow-md'
                : 'bg-[#191b27] text-[#e9bcb6] hover:bg-[#272936]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
            <span>عضويات VIP السينمائية</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto flex flex-col gap-3 scrollbar-none">
          {activeTab === 'coins' ? (
            <>
              <div className="bg-[#272936]/60 p-3 rounded-xl border border-[#323441] text-[12px] text-[#e9bcb6] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#feb700] text-[20px]">bolt</span>
                <span>تُستخدم الكوينز لفتح الحلقات المقفلة مبكراً ومكافأة صناع المحتوى والدراما.</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {COIN_PACKAGES.map((pkg: CoinPackage) => (
                  <div
                    key={pkg.id}
                    className={`relative p-3.5 rounded-xl bg-[#1d1f2b] border transition-all flex flex-col justify-between gap-3 text-start ${
                      pkg.popular
                        ? 'border-[#feb700] shadow-lg shadow-[#feb700]/10'
                        : 'border-[#272936]'
                    }`}
                  >
                    {pkg.popular && (
                      <span className="absolute -top-2.5 start-3 px-2 py-0.5 rounded-full bg-[#feb700] text-[#6b4b00] text-[9px] font-black shadow">
                        الأكثر طلباً 🔥
                      </span>
                    )}

                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[22px] font-black text-[#e1e1f2]">{pkg.coins}</span>
                        <span className="text-[10px] text-[#feb700] font-black">كوينز</span>
                      </div>
                      {pkg.bonusCoins > 0 && (
                        <span className="text-[10px] font-black text-[#feb700] bg-[#feb700]/10 px-1.5 py-0.5 rounded inline-block mt-1">
                          +{pkg.bonusCoins} كوينز بونص مجاني
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        onBuyCoins(pkg.coins, pkg.bonusCoins);
                        onToast(`تمت إضافة ${pkg.coins + pkg.bonusCoins} كوينز إلى محفظتك بنجاح!`);
                        onClose();
                      }}
                      className="w-full py-2 rounded-lg bg-[#e50914] hover:bg-[#e11739] text-[#fff7f6] text-[12px] font-black transition-all active:scale-95 shadow"
                    >
                      {pkg.price}
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* VIP Tiers */
            <div className="flex flex-col gap-3">
              {VIP_TIERS.map((tier: VipTierItem) => (
                <div
                  key={tier.id}
                  className={`relative p-4 rounded-xl bg-[#1d1f2b] border transition-all flex flex-col gap-2.5 text-start ${
                    tier.highlighted
                      ? 'border-[#feb700] bg-gradient-to-l from-[#1d1f2b] to-[#272936]'
                      : 'border-[#272936]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[15px] font-black text-[#e1e1f2]">{tier.name}</h3>
                      <span className="text-[14px] font-bold text-[#feb700]">{tier.price}</span>
                    </div>
                    {tier.highlighted && (
                      <span className="px-2 py-0.5 rounded-full bg-[#feb700] text-[#6b4b00] text-[10px] font-black">
                        الخيار المثالي
                      </span>
                    )}
                  </div>

                  <ul className="flex flex-col gap-1 text-[11px] text-[#e9bcb6]">
                    {tier.perks.map((perk: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#feb700] text-[14px]">
                          check
                        </span>
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      onUpgradeVip(tier.name);
                      onToast(`تمت الترقية إلى ${tier.name} بنجاح! شكراً لدعمك سينما ليلية.`);
                      onClose();
                    }}
                    className={`w-full py-2.5 rounded-xl font-black text-[12px] transition-all active:scale-95 shadow ${
                      tier.highlighted
                        ? 'bg-[#feb700] hover:bg-[#ffba20] text-[#6b4b00]'
                        : 'bg-[#323441] hover:bg-[#373846] text-[#e1e1f2]'
                    }`}
                  >
                    اشترك الآن
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer Guarantee */}
        <div className="p-3 bg-[#11131e] border-t border-[#272936] text-center flex items-center justify-center gap-1.5 text-[10px] text-[#af8782]">
          <span className="material-symbols-outlined text-[14px]">lock</span>
          <span>دفع آمن 100% مع ضمان استرداد فوري وتفعيل لحظي على جميع أجهزتك</span>
        </div>
      </div>
    </div>
  );
};
