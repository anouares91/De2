import React, { useState, useEffect, useRef } from 'react';
import { DramaWork } from '../types';

interface VideoPlayerModalProps {
  work: DramaWork | null;
  initialEpisodeNumber?: number;
  isOpen: boolean;
  onClose: () => void;
  coins: number;
  onSpendCoins: (amount: number) => void;
  onToast: (msg: string) => void;
}

interface EpisodeComment {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  likes: number;
}

const DEFAULT_COMMENTS: EpisodeComment[] = [
  {
    id: 'c1',
    author: 'فيصل الناقد',
    avatar: 'ف',
    timeAgo: 'منذ 10 دقائق',
    content: 'مشهد المطاردة على الجسر بالدقيقة 15 أسطوري! التصوير النوار والإنارة الليلية قمة في الإبداع 🔥',
    likes: 142,
  },
  {
    id: 'c2',
    author: 'ليلى السينمائية',
    avatar: 'ل',
    timeAgo: 'منذ 25 دقيقة',
    content: 'الموسيقى التصويرية تحبس الأنفاس! أحسن مسلسل دراما عمودية شفته هذه السنة.',
    likes: 89,
  },
  {
    id: 'c3',
    author: 'طارق عبد الله',
    avatar: 'ط',
    timeAgo: 'منذ 40 دقيقة',
    content: 'فتحت الحلقة بالكوينز وماتندمت، ننتظر الحلقة القادمة بفارغ الصبر!',
    likes: 54,
  },
];

const SUBTITLES_STREAM = [
  '«السرعة في هذا الضباب ليست مجرد خيار... إنها مسألة بقاء.»',
  '«المطاردة بدأت للتو عبر الجسر المعلق، لا تلتفت إلى الخلف!»',
  '«إشارات التتبع تؤكد وصولهم إلى مخرج المدينة القديمة...»',
  '«لقد أغلقوا الممر الغربي بالكامل، علينا الالتفاف فوراً!»',
  '«ساعة الصفر اقتربت، استعدوا للمواجهة الكبرى قبل بزوغ الفجر.»',
];

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  work,
  initialEpisodeNumber = 1,
  isOpen,
  onClose,
  coins,
  onSpendCoins,
  onToast,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState(initialEpisodeNumber);
  const [progress, setProgress] = useState(28); // percentage 0-100
  const [quality, setQuality] = useState<'4K HDR' | '1080p' | '720p'>('4K HDR');
  const [playbackSpeed, setPlaybackSpeed] = useState<'1.0x' | '1.25x' | '1.5x'>('1.0x');
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [showEpisodesDrawer, setShowEpisodesDrawer] = useState(false);
  const [showCommentsDrawer, setShowCommentsDrawer] = useState(false);
  const [unlockedEpisodes, setUnlockedEpisodes] = useState<number[]>([1, 2, 3]);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(14280);
  const [isSaved, setIsSaved] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [tapFeedback, setTapFeedback] = useState<'play' | 'pause' | null>(null);

  // Comments state
  const [comments, setComments] = useState<EpisodeComment[]>(DEFAULT_COMMENTS);
  const [newCommentText, setNewCommentText] = useState('');

  const autoHideTimeoutRef = useRef<any>(null);

  useEffect(() => {
    if (initialEpisodeNumber) {
      setCurrentEpisode(initialEpisodeNumber);
    }
  }, [initialEpisodeNumber]);

  // Autoplay and timer simulation
  useEffect(() => {
    let timer: any;
    if (isPlaying && isOpen) {
      const speedMultiplier = playbackSpeed === '1.5x' ? 1.5 : playbackSpeed === '1.25x' ? 1.25 : 1.0;
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 0.3 * speedMultiplier;
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isOpen, playbackSpeed]);

  // Controls auto-hide after 3.5s of activity
  useEffect(() => {
    if (!controlsVisible || !isPlaying) return;

    if (autoHideTimeoutRef.current) {
      clearTimeout(autoHideTimeoutRef.current);
    }

    autoHideTimeoutRef.current = setTimeout(() => {
      setControlsVisible(false);
    }, 3500);

    return () => {
      if (autoHideTimeoutRef.current) {
        clearTimeout(autoHideTimeoutRef.current);
      }
    };
  }, [controlsVisible, isPlaying]);

  if (!isOpen || !work) return null;

  const currentSubtitleIndex = Math.min(
    SUBTITLES_STREAM.length - 1,
    Math.floor((progress / 100) * SUBTITLES_STREAM.length)
  );
  const currentSubtitle = SUBTITLES_STREAM[currentSubtitleIndex];

  const totalDurationSeconds = 42 * 60; // 42 minutes
  const currentSeconds = Math.floor((progress / 100) * totalDurationSeconds);
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const handleVideoSurfaceTap = () => {
    if (!controlsVisible) {
      setControlsVisible(true);
    } else {
      const nextPlay = !isPlaying;
      setIsPlaying(nextPlay);
      setTapFeedback(nextPlay ? 'play' : 'pause');
      setTimeout(() => setTapFeedback(null), 700);
    }
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextPlay = !isPlaying;
    setIsPlaying(nextPlay);
    setTapFeedback(nextPlay ? 'play' : 'pause');
    setTimeout(() => setTapFeedback(null), 700);
    setControlsVisible(true);
  };

  const handleRewind10 = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProgress((p) => Math.max(0, p - (10 / totalDurationSeconds) * 100));
    onToast('تم ترجيع 10 ثوانٍ');
    setControlsVisible(true);
  };

  const handleForward10 = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProgress((p) => Math.min(100, p + (10 / totalDurationSeconds) * 100));
    onToast('تم تقديم 10 ثوانٍ');
    setControlsVisible(true);
  };

  const handleUnlockEpisode = (epNum: number, cost: number) => {
    if (coins < cost) {
      onToast('رصيدك من الكوينز غير كافٍ! يرجى شحن محفظتك من المتجر.');
      return;
    }
    onSpendCoins(cost);
    setUnlockedEpisodes([...unlockedEpisodes, epNum]);
    setCurrentEpisode(epNum);
    setProgress(0);
    setIsPlaying(true);
    onToast(`تم فتح الحلقة ${epNum} بنجاح (-${cost} كوينز).`);
  };

  const handleSelectEpisode = (epNum: number) => {
    const isLocked = epNum > 3 && !unlockedEpisodes.includes(epNum);
    if (isLocked) {
      handleUnlockEpisode(epNum, 20);
    } else {
      setCurrentEpisode(epNum);
      setProgress(0);
      setIsPlaying(true);
      setShowEpisodesDrawer(false);
      onToast(`جاري تشغيل الحلقة ${epNum}`);
    }
  };

  const handleNextEpisode = () => {
    if (currentEpisode < (work.episodesCount || 18)) {
      handleSelectEpisode(currentEpisode + 1);
    } else {
      onToast('أنت تشاهد الحلقة الأخيرة في هذا الموسم.');
    }
  };

  const handlePrevEpisode = () => {
    if (currentEpisode > 1) {
      handleSelectEpisode(currentEpisode - 1);
    } else {
      onToast('أنت تشاهد الحلقة الأولى بالفعل.');
    }
  };

  const handleLikeToggle = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeCount((prev) => prev - 1);
      onToast('تمت إزالة الإعجاب');
    } else {
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      onToast('أعجبك هذا المشهد!');
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const commentItem: EpisodeComment = {
      id: `c-${Date.now()}`,
      author: 'أنت (الناقد المعتمد)',
      avatar: 'أ',
      timeAgo: 'الآن',
      content: newCommentText.trim(),
      likes: 1,
    };
    setComments([commentItem, ...comments]);
    setNewCommentText('');
    onToast('تمت إضافة تعليقك على الحلقة بنجاح.');
  };

  const activeBackdropImage = work.backdropUrl || work.posterUrl;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-50 bg-[#06070c] flex flex-col justify-between text-[#e1e1f2] select-none overflow-hidden"
    >
      {/* 1. Full-Screen Visual Backdrop / Video Frame */}
      <div
        onClick={handleVideoSurfaceTap}
        className="absolute inset-0 w-full h-full cursor-pointer overflow-hidden bg-black flex items-center justify-center"
      >
        {/* Background Artwork with Cinematic Subtle Drift */}
        <img
          src={activeBackdropImage}
          alt={work.title}
          className={`w-full h-full object-cover object-center transition-transform duration-1000 ${
            isPlaying ? 'scale-105 brightness-95' : 'scale-100 brightness-75'
          }`}
        />

        {/* Cinematic Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/90 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/40 pointer-events-none"></div>

        {/* Ambient Neon Lighting Flare */}
        <div className="absolute top-1/3 start-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#e50914]/15 blur-[90px] pointer-events-none"></div>

        {/* Tap Feedback Animation */}
        {tapFeedback && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20 animate-ping">
              <span
                className="material-symbols-outlined text-[42px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {tapFeedback === 'play' ? 'play_arrow' : 'pause'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Top Header Bar (Overlay) */}
      <header
        className={`relative z-30 px-4 pt-4 pb-6 bg-gradient-to-b from-black/95 via-black/60 to-transparent flex items-center justify-between transition-opacity duration-300 ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Left/Start: Close & Episode Meta */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            aria-label="إغلاق المشغل"
            className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-[#e1e1f2] hover:bg-[#e50914] transition-colors border border-white/10 shrink-0 cursor-pointer shadow-lg"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>

          <div className="flex flex-col min-w-0 text-start">
            <h2 className="text-[15px] font-black text-[#e1e1f2] truncate leading-tight">
              {work.title}
            </h2>
            <div className="flex items-center gap-2 text-[11px] text-[#e9bcb6] mt-0.5">
              <span>الحلقة {currentEpisode} من {work.episodesCount}</span>
              <span className="w-1 h-1 rounded-full bg-[#af8782]"></span>
              <span className="text-[#feb700] font-black">{quality}</span>
            </div>
          </div>
        </div>

        {/* Right/End: Player Options */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Speed Selector */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const nextSpeed = playbackSpeed === '1.0x' ? '1.25x' : playbackSpeed === '1.25x' ? '1.5x' : '1.0x';
              setPlaybackSpeed(nextSpeed);
              onToast(`سرعة التشغيل: ${nextSpeed}`);
            }}
            className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-black text-[#e1e1f2] border border-white/10 hover:bg-white/10 transition-colors"
          >
            {playbackSpeed}
          </button>

          {/* Quality Switcher */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const nextQ = quality === '4K HDR' ? '1080p' : quality === '1080p' ? '720p' : '4K HDR';
              setQuality(nextQ);
              onToast(`تم تغيير دقة البث إلى ${nextQ}`);
            }}
            className="px-2.5 py-1 rounded-full bg-[#feb700]/20 text-[#feb700] border border-[#feb700]/40 backdrop-blur-md text-[11px] font-black hover:bg-[#feb700]/30 transition-colors"
          >
            {quality}
          </button>

          {/* Episodes Drawer Toggle */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowEpisodesDrawer(!showEpisodesDrawer);
            }}
            aria-label="قائمة الحلقات"
            className="w-9 h-9 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-[#e1e1f2] hover:bg-white/10 border border-white/10"
            title="الحلقات"
          >
            <span className="material-symbols-outlined text-[20px]">video_library</span>
          </button>
        </div>
      </header>

      {/* 3. Center Screen Play/Pause & Seek Controls (Perfect Mathematical Centering) */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center justify-center gap-7 transition-all duration-300 ${
            controlsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          {/* Rewind 10s Button */}
          <button
            type="button"
            onClick={handleRewind10}
            aria-label="ترجيع 10 ثوانٍ"
            className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-[#e1e1f2] flex items-center justify-center hover:bg-[#e50914] hover:text-white transition-all border border-white/15 active:scale-90 shadow-xl cursor-pointer"
          >
            <span className="material-symbols-outlined text-[26px]">replay_10</span>
          </button>

          {/* Big Center Play/Pause Button */}
          <button
            type="button"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
            className="w-16 h-16 rounded-full bg-[#e50914] text-[#fff7f6] flex items-center justify-center shadow-[0_0_35px_rgba(229,9,20,0.6)] hover:brightness-110 active:scale-95 transition-all cursor-pointer border-2 border-white/20"
          >
            <span
              className="material-symbols-outlined text-[38px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>

          {/* Forward 10s Button */}
          <button
            type="button"
            onClick={handleForward10}
            aria-label="تقديم 10 ثوانٍ"
            className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md text-[#e1e1f2] flex items-center justify-center hover:bg-[#e50914] hover:text-white transition-all border border-white/15 active:scale-90 shadow-xl cursor-pointer"
          >
            <span className="material-symbols-outlined text-[26px]">forward_10</span>
          </button>
        </div>
      </div>

      {/* 4. Subtitles Overlay (Cinematic lower-third) */}
      {showSubtitles && (
        <div className="absolute bottom-28 inset-x-6 z-20 flex justify-center pointer-events-none">
          <div className="px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-center max-w-sm shadow-2xl animate-fade-in">
            <p className="text-[13px] font-bold text-[#fff7f6] leading-relaxed drop-shadow-md">
              {currentSubtitle}
            </p>
          </div>
        </div>
      )}

      {/* 5. Side Action Stack (Thumb-friendly Right side in RTL) */}
      <div className="absolute start-4 bottom-24 z-30 flex flex-col items-center gap-3.5">
        {/* Like Button */}
        <button
          type="button"
          onClick={handleLikeToggle}
          aria-label="إعجاب"
          className={`w-11 h-11 rounded-full backdrop-blur-md flex flex-col items-center justify-center transition-all active:scale-90 border shadow-lg ${
            isLiked
              ? 'bg-[#e50914] text-white border-[#e50914] shadow-[#e50914]/40'
              : 'bg-black/50 text-[#e1e1f2] border-white/15 hover:bg-black/70'
          }`}
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={isLiked ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            favorite
          </span>
          <span className="text-[9px] font-bold mt-0.5">
            {(likeCount / 1000).toFixed(1)}k
          </span>
        </button>

        {/* Comments Button */}
        <button
          type="button"
          onClick={() => setShowCommentsDrawer(true)}
          aria-label="التعليقات"
          className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md text-[#e1e1f2] flex flex-col items-center justify-center border border-white/15 hover:bg-black/70 shadow-lg active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">chat_bubble</span>
          <span className="text-[9px] font-bold mt-0.5">{comments.length}</span>
        </button>

        {/* Watchlist / Save Button */}
        <button
          type="button"
          onClick={() => {
            setIsSaved(!isSaved);
            onToast(!isSaved ? 'تمت إضافة العمل إلى قائمتك' : 'تمت الإزالة من قائمتك');
          }}
          aria-label="حفظ في قائمتي"
          className={`w-11 h-11 rounded-full backdrop-blur-md flex flex-col items-center justify-center transition-all active:scale-90 border shadow-lg ${
            isSaved
              ? 'bg-[#feb700] text-[#412d00] border-[#feb700]'
              : 'bg-black/50 text-[#e1e1f2] border-white/15 hover:bg-black/70'
          }`}
        >
          <span
            className="material-symbols-outlined text-[20px]"
            style={isSaved ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            bookmark
          </span>
          <span className="text-[9px] font-bold mt-0.5">حفظ</span>
        </button>

        {/* Subtitles Toggle */}
        <button
          type="button"
          onClick={() => {
            setShowSubtitles(!showSubtitles);
            onToast(showSubtitles ? 'تم إخفاء الترجمة' : 'تم تفعيل الترجمة العربية');
          }}
          aria-label="الترجمة"
          className={`w-11 h-11 rounded-full backdrop-blur-md flex flex-col items-center justify-center transition-all active:scale-90 border shadow-lg ${
            showSubtitles
              ? 'bg-[#272936] text-[#feb700] border-[#feb700]/30'
              : 'bg-black/50 text-[#af8782] border-white/10'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">closed_caption</span>
          <span className="text-[9px] font-bold mt-0.5">CC</span>
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={() => {
            if (navigator.share) {
              navigator
                .share({
                  title: work.title,
                  text: `أشاهد الآن مسلسل ${work.title} بجودة 4K على سينما ليلية!`,
                  url: window.location.href,
                })
                .catch(() => {});
            } else {
              onToast('تم نسخ رابط مشاهدة الحلقة!');
            }
          }}
          aria-label="مشاركة"
          className="w-11 h-11 rounded-full bg-black/50 backdrop-blur-md text-[#e1e1f2] flex flex-col items-center justify-center border border-white/15 hover:bg-black/70 shadow-lg active:scale-90 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">share</span>
          <span className="text-[9px] font-bold mt-0.5">مشاركة</span>
        </button>
      </div>

      {/* 6. Bottom Controls Bar (Scrubber, Progress, Navigation) */}
      <footer
        className={`relative z-30 px-4 pt-3 pb-5 bg-gradient-to-t from-black via-black/85 to-transparent flex flex-col gap-2.5 transition-opacity duration-300 ${
          controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Scrubber Slider */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono font-bold text-[#e1e1f2] tabular-nums shrink-0">
            {formatTime(currentSeconds)}
          </span>

          <div
            onClick={(e) => {
              e.stopPropagation();
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
              setProgress(newProgress);
            }}
            className="relative flex-1 h-3 bg-white/20 rounded-full cursor-pointer flex items-center group"
          >
            {/* Progress Fill */}
            <div
              className="h-full bg-gradient-to-r from-[#e50914] to-[#f43f5e] rounded-full relative transition-all duration-100"
              style={{ width: `${progress}%` }}
            >
              {/* Scrub Handle Thumb */}
              <div className="absolute end-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-white shadow-lg border-2 border-[#e50914] scale-90 group-hover:scale-125 transition-transform"></div>
            </div>
          </div>

          <span className="text-[11px] font-mono text-[#af8782] tabular-nums shrink-0">
            {formatTime(totalDurationSeconds)}
          </span>
        </div>

        {/* Media Toolbar Controls */}
        <div className="flex items-center justify-between">
          {/* Episode Navigation & Playback */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevEpisode();
              }}
              aria-label="الحلقة السابقة"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#e1e1f2] hover:bg-white/10 transition-colors"
              title="الحلقة السابقة"
            >
              <span className="material-symbols-outlined text-[20px]">skip_previous</span>
            </button>

            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label={isPlaying ? 'إيقاف مؤقت' : 'تشغيل'}
              className="w-8 h-8 rounded-full bg-[#e50914] text-white flex items-center justify-center hover:brightness-110 transition-all shadow-md"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNextEpisode();
              }}
              aria-label="الحلقة التالية"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#e1e1f2] hover:bg-white/10 transition-colors"
              title="الحلقة التالية"
            >
              <span className="material-symbols-outlined text-[20px]">skip_next</span>
            </button>

            <div className="w-px h-4 bg-white/20 mx-1"></div>

            {/* Mute/Volume Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsMuted(!isMuted);
                onToast(!isMuted ? 'تم كتم الصوت' : 'تم تشغيل الصوت');
              }}
              aria-label="كتم/تشغيل الصوت"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#e1e1f2] hover:text-[#feb700] transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isMuted ? 'volume_off' : 'volume_up'}
              </span>
            </button>
          </div>

          {/* Episode Drawer Trigger */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowEpisodesDrawer(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-[#e1e1f2] text-[12px] font-bold backdrop-blur-md transition-colors"
          >
            <span className="material-symbols-outlined text-[16px] text-[#feb700]">
              format_list_bulleted
            </span>
            <span>كل الحلقات ({work.episodesCount})</span>
          </button>
        </div>
      </footer>

      {/* 7. Slide-Over Episodes Drawer */}
      {showEpisodesDrawer && (
        <div
          role="dialog"
          aria-label="قائمة الحلقات"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-start animate-fade-in"
          onClick={() => setShowEpisodesDrawer(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-80 max-w-[85vw] h-full bg-[#131524] p-4 flex flex-col border-e border-[#272936] shadow-2xl animate-in slide-in-from-start duration-200"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#272936]">
              <div className="flex flex-col text-start">
                <h3 className="text-[16px] font-black text-[#e1e1f2]">حلقات {work.title}</h3>
                <span className="text-[12px] text-[#e9bcb6]">
                  رصيدك الحالي: <strong className="text-[#feb700] font-black">{coins} كوينز</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowEpisodesDrawer(false)}
                className="w-8 h-8 rounded-full bg-[#272936] text-[#e9bcb6] hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Episodes List */}
            <div className="flex-1 overflow-y-auto py-3 flex flex-col gap-2.5">
              {Array.from({ length: work.episodesCount || 18 }, (_, i) => i + 1).map((epNum) => {
                const isCurrent = epNum === currentEpisode;
                const isLocked = epNum > 3 && !unlockedEpisodes.includes(epNum);

                return (
                  <div
                    key={epNum}
                    onClick={() => handleSelectEpisode(epNum)}
                    className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all border ${
                      isCurrent
                        ? 'bg-[#e50914]/25 border-[#e50914] text-[#fff7f6] shadow-lg shadow-[#e50914]/20'
                        : 'bg-[#1d1f2b] border-[#272936] hover:bg-[#272936] text-[#e1e1f2]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-black shrink-0 ${
                          isCurrent
                            ? 'bg-[#e50914] text-white'
                            : 'bg-[#272936] text-[#e9bcb6]'
                        }`}
                      >
                        {epNum}
                      </span>
                      <div className="flex flex-col min-w-0 text-start">
                        <span className="text-[13px] font-bold truncate">الحلقة {epNum}</span>
                        <span className="text-[11px] text-[#af8782]">42 دقيقة • Ultra 4K</span>
                      </div>
                    </div>

                    {isLocked ? (
                      <div className="flex items-center gap-1 text-[#feb700] text-[11px] font-black bg-[#feb700]/15 px-2.5 py-1 rounded-full border border-[#feb700]/30 shrink-0">
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                        <span>20 كوينز</span>
                      </div>
                    ) : (
                      <span className="material-symbols-outlined text-[20px] text-[#e50914] shrink-0">
                        {isCurrent ? 'play_arrow' : 'check_circle'}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 8. Interactive Comments Bottom Sheet */}
      {showCommentsDrawer && (
        <div
          role="dialog"
          aria-label="التعليقات"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end justify-center animate-fade-in"
          onClick={() => setShowCommentsDrawer(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#131524] rounded-t-3xl p-4 flex flex-col max-h-[75vh] border-t border-[#272936] shadow-2xl animate-in slide-in-from-bottom duration-250"
          >
            {/* Grab Bar & Header */}
            <div className="w-10 h-1 bg-[#323441] rounded-full mx-auto mb-3"></div>
            <div className="flex items-center justify-between pb-3 border-b border-[#272936]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ffb4aa] text-[20px]">
                  chat_bubble
                </span>
                <h3 className="text-[16px] font-black text-[#e1e1f2]">
                  نقاش الجمهور حول الحلقة {currentEpisode} ({comments.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCommentsDrawer(false)}
                className="w-7 h-7 rounded-full bg-[#272936] text-[#e9bcb6] hover:text-white flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto py-3 flex flex-col gap-3">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-[#1d1f2b] p-3 rounded-xl border border-[#272936] flex flex-col gap-1.5 text-start"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#e50914]/20 text-[#ffb4aa] text-[11px] font-black flex items-center justify-center border border-[#e50914]/30">
                        {comment.avatar}
                      </div>
                      <span className="text-[12px] font-bold text-[#e1e1f2]">
                        {comment.author}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#af8782]">{comment.timeAgo}</span>
                  </div>
                  <p className="text-[12px] text-[#e9bcb6] leading-relaxed">
                    {comment.content}
                  </p>
                  <div className="flex items-center justify-end gap-1 text-[11px] text-[#af8782] mt-1">
                    <span className="material-symbols-outlined text-[13px] text-[#e50914]">
                      favorite
                    </span>
                    <span>{comment.likes}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Comment Input Form */}
            <form onSubmit={handleAddComment} className="pt-2 flex items-center gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder="اكتب تعليقك حول هذا المشهد..."
                className="flex-1 bg-[#1d1f2b] text-[#e1e1f2] text-[13px] rounded-xl px-3.5 py-2.5 border border-[#323441] focus:outline-none focus:border-[#e50914] placeholder:text-[#e9bcb6]/40"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-xl bg-[#e50914] text-white flex items-center justify-center shadow-md hover:brightness-110 active:scale-95 transition-all shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
