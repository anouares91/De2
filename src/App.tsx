import { useState } from 'react';
import { ScreenType, DramaWork, UserProfile } from './types';
import {
  MOCK_USER_PROFILE,
  DRAMA_WORKS,
  RECENT_ACTIVITIES,
} from './data/cinemaData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SignInScreen } from './components/SignInScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ExploreScreen } from './components/ExploreScreen';
import { ProfileSettingsScreen } from './components/ProfileSettingsScreen';
import { WatchlistScreen } from './components/WatchlistScreen';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { CoinShopModal } from './components/CoinShopModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [user, setUser] = useState<UserProfile>(MOCK_USER_PROFILE);
  const [works, setWorks] = useState<DramaWork[]>(DRAMA_WORKS);
  const [activeVideoWork, setActiveVideoWork] = useState<DramaWork | null>(null);
  const [activeEpisodeNumber, setActiveEpisodeNumber] = useState(1);
  const [isCoinShopOpen, setIsCoinShopOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showQuickSwitcher, setShowQuickSwitcher] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handlePlayWork = (workId: string, episodeNumber?: number) => {
    const found = works.find((w) => w.id === workId) || works[0];
    setActiveVideoWork(found);
    setActiveEpisodeNumber(episodeNumber || found.currentEpisode || 1);
  };

  const handleToggleWatchlist = (workId: string) => {
    setWorks((prev) =>
      prev.map((item) =>
        item.id === workId ? { ...item, inWatchlist: !item.inWatchlist } : item
      )
    );
  };

  const handleBuyCoins = (amount: number, bonus: number) => {
    setUser((prev) => ({
      ...prev,
      coins: prev.coins + amount + bonus,
    }));
  };

  const handleSpendCoins = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      coins: Math.max(0, prev.coins - amount),
    }));
  };

  const handleAddCoins = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      coins: prev.coins + amount,
    }));
  };

  const handleUpgradeVip = (tierName: string) => {
    setUser((prev) => ({
      ...prev,
      vipTier: tierName,
    }));
  };

  const handleLogin = (name: string, email: string) => {
    setUser((prev) => ({
      ...prev,
      name: name || prev.name,
      email: email || prev.email,
    }));
    setCurrentScreen('dashboard');
    showToast(`مرحباً بك مجدداً في سينما ليلية، ${name || user.name}!`);
  };

  const handleLogout = () => {
    setCurrentScreen('welcome');
    showToast('تم تسجيل الخروج بنجاح. نتمنى لك ليلة هانئة.');
  };

  // Check if current screen is one of the main app tabs
  const isMainTab = ['dashboard', 'explore', 'watchlist', 'profile'].includes(
    currentScreen
  );

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#11131e] text-[#e1e1f2] font-['Cairo',sans-serif] flex flex-col relative overflow-x-hidden selection:bg-[#e50914] selection:text-white"
    >
      {/* Top Header for main logged-in screens */}
      {isMainTab && (
        <Header
          user={user}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onOpenCoinShop={() => setIsCoinShopOpen(true)}
        />
      )}

      {/* Main Screens */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'welcome' && (
          <WelcomeScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            onExplore={() => setCurrentScreen('dashboard')}
          />
        )}

        {currentScreen === 'signin' && (
          <SignInScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
            onLogin={handleLogin}
          />
        )}

        {currentScreen === 'forgot-password' && (
          <ForgotPasswordScreen
            onNavigate={(screen) => setCurrentScreen(screen)}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardScreen
            user={user}
            continueWork={works[0]}
            recentActivities={RECENT_ACTIVITIES}
            onPlayWork={handlePlayWork}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenCoinShop={() => setIsCoinShopOpen(true)}
            onToast={showToast}
            onAddCoins={handleAddCoins}
          />
        )}

        {currentScreen === 'explore' && (
          <ExploreScreen
            works={works}
            onPlayWork={handlePlayWork}
            onToggleWatchlist={handleToggleWatchlist}
            onToast={showToast}
          />
        )}

        {currentScreen === 'watchlist' && (
          <WatchlistScreen
            works={works}
            onPlayWork={handlePlayWork}
            onToggleWatchlist={handleToggleWatchlist}
            onToast={showToast}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileSettingsScreen
            user={user}
            onNavigate={(screen) => setCurrentScreen(screen)}
            onOpenCoinShop={() => setIsCoinShopOpen(true)}
            onLogout={handleLogout}
            onToast={showToast}
          />
        )}
      </main>

      {/* Bottom Navigation for main tabs */}
      {isMainTab && (
        <BottomNav
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
        />
      )}

      {/* Video Player Modal */}
      <VideoPlayerModal
        work={activeVideoWork}
        initialEpisodeNumber={activeEpisodeNumber}
        isOpen={Boolean(activeVideoWork)}
        onClose={() => setActiveVideoWork(null)}
        coins={user.coins}
        onSpendCoins={handleSpendCoins}
        onToast={showToast}
      />

      {/* Coin & VIP Subscription Shop Modal */}
      <CoinShopModal
        currentCoins={user.coins}
        isOpen={isCoinShopOpen}
        onClose={() => setIsCoinShopOpen(false)}
        onBuyCoins={handleBuyCoins}
        onUpgradeVip={handleUpgradeVip}
        onToast={showToast}
      />

      {/* Quick Screen Preview Switcher (Allows instant jumping between all 6 designs) */}
      <div className="fixed bottom-20 start-4 z-40">
        <div className="flex flex-col items-start gap-1">
          {showQuickSwitcher && (
            <div className="bg-[#191b27]/95 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-[#323441] flex flex-col gap-1 mb-2 animate-in slide-in-from-bottom-2 duration-200">
              <span className="text-[10px] font-black text-[#ffdb9d] px-2 py-0.5 uppercase tracking-wider">
                معاينة الشاشات التصميمية
              </span>
              {[
                { id: 'welcome', label: '1. شاشة الترحيب (Welcome)', icon: 'movie' },
                { id: 'signin', label: '2. تسجيل الدخول (Sign In)', icon: 'login' },
                { id: 'forgot-password', label: '3. نسيت كلمة المرور (Recovery)', icon: 'lock_reset' },
                { id: 'dashboard', label: '4. الرئيسية (Dashboard)', icon: 'dashboard' },
                { id: 'explore', label: '5. الاستكشاف والبحث (Explore)', icon: 'search' },
                { id: 'watchlist', label: '6. قائمتي (Watchlist)', icon: 'bookmark' },
                { id: 'profile', label: '7. الملف الشخصي (Profile)', icon: 'person' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentScreen(item.id as ScreenType);
                    setShowQuickSwitcher(false);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-[12px] font-bold flex items-center gap-2 text-start transition-colors ${
                    currentScreen === item.id
                      ? 'bg-[#e50914] text-[#fff7f6]'
                      : 'text-[#e1e1f2] hover:bg-[#272936]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          )}

          <button
            onClick={() => setShowQuickSwitcher(!showQuickSwitcher)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#272936]/90 backdrop-blur-md text-[#e1e1f2] text-[11px] font-black shadow-lg border border-[#323441] hover:bg-[#323441] active:scale-95 transition-all"
            title="تبديل الشاشات"
          >
            <span className="material-symbols-outlined text-[15px] text-[#feb700]">
              layers
            </span>
            <span>الشاشات ({currentScreen})</span>
          </button>
        </div>
      </div>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 inset-x-4 max-w-sm mx-auto z-50 p-3.5 rounded-2xl bg-[#272936]/95 backdrop-blur-xl shadow-2xl border border-[#feb700]/30 text-[#e1e1f2] flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-3 duration-300">
          <div className="flex items-center gap-2.5">
            <span
              className="material-symbols-outlined text-[#feb700] text-[22px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              notifications_active
            </span>
            <p className="text-[13px] font-bold leading-snug">{toastMessage}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#af8782] hover:text-[#e1e1f2] p-1"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
