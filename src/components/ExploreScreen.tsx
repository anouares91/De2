import React, { useState, useMemo } from 'react';
import { DramaWork } from '../types';
import { GENRE_CATEGORIES } from '../data/cinemaData';

interface ExploreScreenProps {
  works: DramaWork[];
  onPlayWork: (workId: string) => void;
  onToggleWatchlist: (workId: string) => void;
  onToast: (msg: string) => void;
}

export interface FilmReviewItem {
  id: string;
  filmTitle: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const INITIAL_REVIEWS: FilmReviewItem[] = [
  {
    id: 'rev-1',
    filmTitle: 'مطرقة منتصف الليل',
    reviewerName: 'د. طارق السينمائي',
    rating: 9,
    comment: 'حبكة استثنائية وإضاءة نوار متقنة تجعلك مشدوداً لكل دقيقة حتى المشهد الأخير.',
    createdAt: 'منذ ساعتين',
  },
  {
    id: 'rev-2',
    filmTitle: 'أسرار ما بعد منتصف الليل',
    reviewerName: 'سارة خالد',
    rating: 10,
    comment: 'تصوير 4K عمودي متطور جداً ودراما نفسية تأخذ الأنفاس!',
    createdAt: 'منذ 5 ساعات',
  },
];

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  works,
  onPlayWork,
  onToggleWatchlist,
  onToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('أسرار الليل');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'rating' | 'match'>('rating');

  // Interactive Form State (HTML form)
  const [reviews, setReviews] = useState<FilmReviewItem[]>(INITIAL_REVIEWS);
  const [formFilmTitle, setFormFilmTitle] = useState('مطرقة منتصف الليل');
  const [formReviewerName, setFormReviewerName] = useState('');
  const [formRating, setFormRating] = useState(9);
  const [formComment, setFormComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formFilmTitle.trim() || !formReviewerName.trim() || !formComment.trim()) {
      onToast('يرجى ملء جميع حقول النموذج قبل الإرسال.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newRev: FilmReviewItem = {
        id: `rev-${Date.now()}`,
        filmTitle: formFilmTitle.trim(),
        reviewerName: formReviewerName.trim(),
        rating: formRating,
        comment: formComment.trim(),
        createdAt: 'الآن',
      };
      setReviews((prev) => [newRev, ...prev]);
      setFormReviewerName('');
      setFormComment('');
      setIsSubmitting(false);
      onToast(`تم نشر تقييمك السينمائي لـ "${formFilmTitle}" بنجاح! شكرًا لمشاركتك.`);
    }, 350);
  };

  const filteredWorks = useMemo(() => {
    return works.filter((w) => {
      const matchSearch =
        !searchQuery.trim() ||
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.synopsis.toLowerCase().includes(searchQuery.toLowerCase());

      const matchGenre =
        selectedGenre === 'all' ||
        (selectedGenre === 'action' && w.category.includes('أكشن')) ||
        (selectedGenre === 'scifi' && w.category.includes('خيال')) ||
        (selectedGenre === 'drama' && w.category.includes('دراما')) ||
        (selectedGenre === 'noir' && w.category.includes('نوار')) ||
        (selectedGenre === 'horror' && w.category.includes('رعب')) ||
        (selectedGenre === 'docs' && w.category.includes('وثائقي'));

      return matchSearch && matchGenre;
    });
  }, [works, searchQuery, selectedGenre]);

  return (
    <div className="flex flex-col w-full max-w-md mx-auto pt-20 pb-28">
      {/* Ambient Header Glow */}
      <div className="relative w-full overflow-hidden pointer-events-none -mb-12 h-28">
        <div className="absolute -top-16 start-1/2 -translate-x-1/2 w-80 h-36 bg-[#e50914]/20 blur-[60px] rounded-full"></div>
        <div className="absolute -top-8 start-8 w-32 h-24 bg-[#feb700]/10 blur-[40px] rounded-full"></div>
      </div>

      {/* Search Hero Container */}
      <div className="px-4 relative z-10 flex flex-col gap-2">
        {/* Large Input Surface */}
        <div className="relative flex items-center w-full bg-[#272936] rounded-full p-1 shadow-xl border border-[#323441] focus-within:border-[#e50914]/50 focus-within:bg-[#323441] transition-all">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-[#ffb4aa] shrink-0">
            <span className="material-symbols-outlined text-[24px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث بالاسم، المخرج، نوع العمل..."
            className="w-full bg-transparent px-2 text-[#e1e1f2] font-bold text-[14px] placeholder:text-[#e9bcb6]/50 focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              aria-label="مسح البحث"
              onClick={() => setSearchQuery('')}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#e9bcb6] hover:text-[#e1e1f2] hover:bg-[#323441] transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <div className="w-px h-5 bg-[#323441] mx-1 shrink-0"></div>
          <button
            type="button"
            aria-label="تصفية متقدمة"
            onClick={() => onToast('خيارات الفرز: دقة 4K • نوار • دراما عمودية')}
            className="w-10 h-10 rounded-full bg-[#e50914] text-[#fff7f6] flex items-center justify-center shrink-0 shadow-md hover:brightness-110 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>

        {/* Quick Dynamic Tag Recommendations */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <span className="text-[11px] font-black text-[#e9bcb6]/70 shrink-0 ms-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px] text-[#feb700]">bolt</span>
            اقتراحات سريعة:
          </span>
          {['أسرار المدينة 🌃', 'تحقيق نوار 🕵️', '4K أصلي ⚡'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSearchQuery(tag.split(' ')[0])}
              className="px-3 py-1 rounded-full bg-[#1d1f2b] hover:bg-[#323441] text-[#e1e1f2] text-[12px] shrink-0 transition-colors border border-[#272936]"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Genre Chips Horizontal Rail */}
      <div className="mt-4 w-full flex flex-col gap-1">
        <div className="px-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-4 bg-[#e50914] rounded-full"></span>
            <span className="text-[16px] font-black text-[#e1e1f2]">التصنيفات الرائجة</span>
          </div>
          <button
            onClick={() => setSelectedGenre('all')}
            className="text-[11px] font-black text-[#feb700] hover:underline"
          >
            تصفح الفئات
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-none">
          {GENRE_CATEGORIES.map((genre) => {
            const isActive = selectedGenre === genre.id;
            return (
              <button
                key={genre.id}
                onClick={() => setSelectedGenre(genre.id)}
                className={`px-4 py-2 rounded-full text-[11px] font-black flex items-center gap-1.5 shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#e50914] text-[#fff7f6] shadow-lg shadow-[#e50914]/20 scale-[1.02]'
                    : 'bg-[#272936] text-[#e1e1f2] hover:bg-[#323441] border border-[#323441]'
                }`}
              >
                {genre.icon && (
                  <span className="material-symbols-outlined text-[16px]">{genre.icon}</span>
                )}
                {genre.emoji && <span>{genre.emoji}</span>}
                <span>{genre.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search Meta Bar: Count & View Switchers */}
      <div className="mt-3 px-4 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-[20px] font-black text-[#e50914]">
            {filteredWorks.length > 0 ? filteredWorks.length * 6 : 24}
          </span>
          <span className="text-[14px] text-[#e9bcb6]">عملاً سينمائياً عالي الدقة</span>
        </div>

        <div className="flex items-center gap-1 bg-[#191b27] p-1 rounded-full border border-[#272936]">
          {/* Grid View */}
          <button
            onClick={() => setViewMode('grid')}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              viewMode === 'grid'
                ? 'bg-[#323441] text-[#e1e1f2] shadow-sm'
                : 'text-[#e9bcb6] hover:text-[#e1e1f2]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">grid_view</span>
          </button>
          {/* List View */}
          <button
            onClick={() => setViewMode('list')}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              viewMode === 'list'
                ? 'bg-[#323441] text-[#e1e1f2] shadow-sm'
                : 'text-[#e9bcb6] hover:text-[#e1e1f2]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">view_agenda</span>
          </button>
          {/* Sort Pill */}
          <button
            onClick={() => {
              setSortBy(sortBy === 'rating' ? 'match' : 'rating');
              onToast(sortBy === 'rating' ? 'تم الترتيب حسب نسبة التطابق' : 'تم الترتيب حسب التقييم الأعلى');
            }}
            className="flex items-center gap-1 px-2.5 h-8 rounded-full bg-[#272936] text-[#e9bcb6] hover:text-[#e1e1f2] text-[11px] font-black"
          >
            <span className="material-symbols-outlined text-[15px]">sort</span>
            <span>{sortBy === 'rating' ? 'الأعلى تقييماً' : 'الأكثر تطابقاً'}</span>
          </button>
        </div>
      </div>

      {/* 2-Column Cinematic Media Grid */}
      {viewMode === 'grid' ? (
        <div className="mt-3 px-4 grid grid-cols-2 gap-3">
          {filteredWorks.slice(0, 4).map((work) => (
            <div
              key={work.id}
              className="group flex flex-col bg-[#1d1f2b] rounded-xl overflow-hidden shadow-lg border border-[#272936] hover:border-[#e50914]/30 transition-all duration-300"
            >
              {/* Poster Container */}
              <div className="relative w-full aspect-[0.68] overflow-hidden bg-[#0b0d19]">
                <img
                  src={work.posterUrl}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Top Badges */}
                <div className="absolute top-2 inset-x-2 flex items-center justify-between pointer-events-none">
                  <span
                    className={`px-1.5 py-0.5 rounded-sm text-[10px] font-black shadow-sm ${
                      work.tagType === 'primary'
                        ? 'bg-[#e50914] text-[#fff7f6]'
                        : work.tagType === 'secondary'
                        ? 'bg-[#feb700] text-[#6b4b00]'
                        : 'bg-[#323441] text-[#e1e1f2]'
                    }`}
                  >
                    {work.tag}
                  </span>
                  <span className="px-1.5 py-0.5 rounded-sm bg-[#0b0d19]/80 backdrop-blur-md text-[#ffdea8] text-[10px] font-black">
                    {work.techBadge}
                  </span>
                </div>

                {/* Rating & Play Disc */}
                <div className="absolute bottom-2 inset-x-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#0b0d19]/90 backdrop-blur-md">
                    <span
                      className="material-symbols-outlined text-[14px] text-[#feb700]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="text-[11px] font-black text-[#e1e1f2]">{work.rating}</span>
                  </div>

                  <button
                    onClick={() => onPlayWork(work.id)}
                    aria-label={`تشغيل ${work.title}`}
                    className="w-9 h-9 rounded-full bg-[#e50914] text-[#fff7f6] flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
                  >
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      play_arrow
                    </span>
                  </button>
                </div>
              </div>

              {/* Card Metadata */}
              <div className="p-2.5 flex flex-col gap-1 text-start">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-[#e50914]">
                    تطابق {work.matchPercentage}%
                  </span>
                  <span className="text-[12px] text-[#e9bcb6]">{work.year}</span>
                </div>
                <span className="text-[14px] font-bold text-[#e1e1f2] truncate">
                  {work.title}
                </span>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-[12px] text-[#e9bcb6]">
                    سلسلة • {work.episodesCount} حلقة
                  </span>
                  <button
                    onClick={() => onToggleWatchlist(work.id)}
                    aria-label="إضافة لقائمتي"
                    className={`transition-colors ${
                      work.inWatchlist ? 'text-[#e50914]' : 'text-[#e9bcb6] hover:text-[#e50914]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={work.inWatchlist ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      bookmark_add
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List Mode */
        <div className="mt-3 px-4 flex flex-col gap-3">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              className="flex bg-[#1d1f2b] rounded-xl overflow-hidden p-2.5 gap-3 border border-[#272936] hover:border-[#e50914]/30 transition-colors"
            >
              <div className="relative w-20 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-[#0b0d19]">
                <img src={work.posterUrl} alt={work.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => onPlayWork(work.id)}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center text-[#fff7f6] hover:bg-black/20"
                >
                  <span
                    className="material-symbols-outlined text-[24px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_circle
                  </span>
                </button>
              </div>
              <div className="flex flex-col justify-between flex-1 text-start min-w-0">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="px-1.5 py-0.2 rounded bg-[#e50914]/20 text-[#ffb4aa] text-[10px] font-black">
                      {work.tag}
                    </span>
                    <span className="text-[10px] font-bold text-[#feb700]">★ {work.rating}</span>
                  </div>
                  <h4 className="text-[15px] font-bold text-[#e1e1f2] truncate">{work.title}</h4>
                  <p className="text-[12px] text-[#e9bcb6] line-clamp-2 mt-0.5">{work.synopsis}</p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-[#af8782]">{work.techBadge}</span>
                  <button
                    onClick={() => onToggleWatchlist(work.id)}
                    className="text-[12px] font-bold text-[#ffb4aa] hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {work.inWatchlist ? 'bookmark_added' : 'bookmark_add'}
                    </span>
                    <span>{work.inWatchlist ? 'في قائمتي' : 'حفظ'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Featured Search of the Week: Wide Theatrical Card */}
      <div className="mt-6 px-4 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#e50914] text-[20px]">trending_up</span>
            <span className="text-[16px] font-black text-[#e1e1f2]">
              العمل الأكثر بحثاً هذا الأسبوع
            </span>
          </div>
          <span className="text-[11px] font-black text-[#e9bcb6]">تحديث فوري</span>
        </div>

        {/* Wide Theatrical Card with Gradient Scrim */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#1d1f2b] shadow-2xl border border-[#272936]">
          <div
            className="w-full h-48 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZ6N9FTCek3fahoKtgWQ8Yqg7xiyLBgRBE4siT5a-u31HPZZj3nUesX2D4xzzqZc_D_O5adl8GaHrAGDn5kfC8rDMUf1Wr8K32QQjNqFLlG416ZlzGWpDVKH1-cctDqViEHHYGs908vnKuYA4GsaPJFGbbmv7thTn4_Nd5rUCgBVsTjeSGdhsmtUQoNWNz5aBRvgBatjMHRjDNu3LBOjiopXfOm_3nU3whIHqTjGaEbOWzeOyon5k')`,
            }}
          ></div>

          {/* Scrim Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1d1f2b] via-[#1d1f2b]/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#1d1f2b]/90 via-transparent to-transparent"></div>

          {/* Foreground Content */}
          <div className="absolute inset-0 p-4 flex flex-col justify-end text-start">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full bg-[#e50914] text-[#fff7f6] text-[10px] font-black">
                #1 في عمليات البحث
              </span>
              <span className="flex items-center gap-1 text-[#feb700] text-[11px] font-black">
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                9.9 خارق
              </span>
            </div>

            <span className="text-[20px] font-black text-[#e1e1f2]">مطرقة منتصف الليل</span>
            <p className="text-[12px] text-[#e9bcb6] line-clamp-1 mt-0.5">
              عندما تتشابك خيوط الجريمة في عاصمة الضباب، لا أحد يستطيع الهروب من ماضيه.
            </p>

            {/* CTA Row */}
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => onPlayWork('matraqat-muntasaf-al-layl')}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#e50914] text-[#fff7f6] text-[11px] font-black hover:brightness-110 active:scale-95 shadow-lg transition-transform"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
                مشاهدة فورية
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="مشاركة العمل"
                  onClick={() => onToast('تم نسخ رابط مطرقة منتصف الليل')}
                  className="w-9 h-9 rounded-full bg-[#323441]/80 backdrop-blur-md text-[#e1e1f2] flex items-center justify-center hover:bg-[#373846] transition-colors border border-[#af8782]/30"
                >
                  <span className="material-symbols-outlined text-[18px]">share</span>
                </button>
                <button
                  type="button"
                  aria-label="حفظ في قائمتي"
                  onClick={() => {
                    onToggleWatchlist('matraqat-muntasaf-al-layl');
                    onToast('تمت إضافة مطرقة منتصف الليل إلى قائمتك');
                  }}
                  className="w-9 h-9 rounded-full bg-[#323441]/80 backdrop-blur-md text-[#e1e1f2] flex items-center justify-center hover:bg-[#373846] transition-colors border border-[#af8782]/30"
                >
                  <span className="material-symbols-outlined text-[18px]">playlist_add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Feature: HTML Film Review & Critique Form */}
      <section className="px-4 mt-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#e50914]/20 text-[#ffb4aa] flex items-center justify-center border border-[#e50914]/30">
              <span className="material-symbols-outlined text-[18px]">rate_review</span>
            </span>
            <div className="flex flex-col text-start">
              <h3 className="text-[15px] font-black text-[#e1e1f2]">
                شارك بانطباعك ونقدك السينمائي
              </h3>
              <span className="text-[11px] text-[#e9bcb6]">
                نموذج تفاعلي لتقييم الأعمال وكتابة المراجعات النقدية
              </span>
            </div>
          </div>
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#272936] text-[#feb700] border border-[#323441]">
            HTML Form
          </span>
        </div>

        {/* Semantic HTML Form Container */}
        <form
          id="film-critique-form"
          onSubmit={handleSubmitReview}
          className="bg-[#191b27] rounded-2xl p-4 border border-[#272936] shadow-xl flex flex-col gap-3.5 text-start"
        >
          {/* Form Field 1: Film Selection Input */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="film-select-input"
              className="text-[12px] font-bold text-[#e1e1f2] flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[#ffb4aa] text-[15px]">movie</span>
              العمل السينمائي
            </label>
            <select
              id="film-select-input"
              name="filmTitle"
              value={formFilmTitle}
              onChange={(e) => setFormFilmTitle(e.target.value)}
              required
              className="w-full bg-[#272936] text-[#e1e1f2] text-[13px] font-medium rounded-xl px-3 py-2.5 border border-[#323441] focus:outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] transition-colors"
            >
              {works.map((w) => (
                <option key={w.id} value={w.title} className="bg-[#191b27] text-[#e1e1f2]">
                  {w.title} ({w.category})
                </option>
              ))}
              <option value="عمل آخر خارج القائمة" className="bg-[#191b27] text-[#e1e1f2]">
                عمل آخر خارج القائمة
              </option>
            </select>
          </div>

          {/* Form Field 2: Reviewer Name Input */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="reviewer-name-input"
              className="text-[12px] font-bold text-[#e1e1f2] flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[#ffb4aa] text-[15px]">person</span>
              اسم الناقد / المراجع
            </label>
            <input
              id="reviewer-name-input"
              name="reviewerName"
              type="text"
              required
              value={formReviewerName}
              onChange={(e) => setFormReviewerName(e.target.value)}
              placeholder="اكتب اسمك أو لقبك النقدي (مثال: أحمد المنصوري)..."
              className="w-full bg-[#272936] text-[#e1e1f2] text-[13px] font-medium rounded-xl px-3 py-2.5 border border-[#323441] focus:outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] transition-colors placeholder:text-[#e9bcb6]/40"
            />
          </div>

          {/* Form Field 3: Rating Slider Input */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="film-rating-range"
                className="text-[12px] font-bold text-[#e1e1f2] flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[#feb700] text-[15px]">star</span>
                تقييمك للعمل
              </label>
              <span className="text-[12px] font-black text-[#feb700] flex items-center gap-0.5">
                {formRating} / 10
              </span>
            </div>
            <input
              id="film-rating-range"
              name="rating"
              type="range"
              min="1"
              max="10"
              step="1"
              value={formRating}
              onChange={(e) => setFormRating(Number(e.target.value))}
              className="w-full accent-[#e50914] cursor-pointer h-2 bg-[#272936] rounded-lg"
            />
          </div>

          {/* Form Field 4: Critique Textarea */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="review-comment-textarea"
              className="text-[12px] font-bold text-[#e1e1f2] flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[#ffb4aa] text-[15px]">edit_note</span>
              الانطباع والملاحظات النقدية
            </label>
            <textarea
              id="review-comment-textarea"
              name="comment"
              required
              rows={3}
              value={formComment}
              onChange={(e) => setFormComment(e.target.value)}
              placeholder="اكتب مراجعتك السينمائية حول جودة الإخراج، أداء الممثلين، والموسيقى..."
              className="w-full bg-[#272936] text-[#e1e1f2] text-[13px] font-medium rounded-xl p-3 border border-[#323441] focus:outline-none focus:border-[#e50914] focus:ring-1 focus:ring-[#e50914] transition-colors placeholder:text-[#e9bcb6]/40 resize-none"
            />
          </div>

          {/* Submit & Reset Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <button
              id="submit-review-btn"
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2.5 rounded-xl bg-[#e50914] hover:bg-[#b80710] text-[#fff7f6] font-black text-[13px] shadow-lg shadow-[#e50914]/20 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>{isSubmitting ? 'جاري النشر...' : 'إرسال التقييم والنقد'}</span>
            </button>

            <button
              type="reset"
              onClick={() => {
                setFormReviewerName('');
                setFormComment('');
              }}
              className="px-4 py-2.5 rounded-xl bg-[#272936] hover:bg-[#323441] text-[#e9bcb6] hover:text-[#e1e1f2] font-bold text-[12px] transition-colors cursor-pointer"
            >
              مسح
            </button>
          </div>
        </form>

        {/* Live Community Reviews Feed */}
        <div className="flex flex-col gap-2.5 mt-2">
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-black text-[#e1e1f2] flex items-center gap-1">
              <span className="material-symbols-outlined text-[#feb700] text-[16px]">forum</span>
              أحدث التقييمات المنشورة ({reviews.length})
            </span>
            <span className="text-[10px] text-[#e9bcb6]">محدث مباشرة</span>
          </div>

          <div className="flex flex-col gap-2.5">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-[#1d1f2b] rounded-xl p-3 border border-[#272936] flex flex-col gap-2 text-start transition-all hover:border-[#323441]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#323441] text-[#ffdb9d] flex items-center justify-center font-black text-[11px] shrink-0">
                      {rev.reviewerName.charAt(0)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[12px] font-bold text-[#e1e1f2] truncate">
                        {rev.reviewerName}
                      </span>
                      <span className="text-[10px] text-[#e9bcb6] truncate">
                        عن: {rev.filmTitle} • {rev.createdAt}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-md bg-[#272936] text-[#feb700] text-[11px] font-black shrink-0 flex items-center gap-0.5">
                    <span
                      className="material-symbols-outlined text-[13px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    {rev.rating}.0
                  </span>
                </div>

                <p className="text-[12px] text-[#e9bcb6] leading-relaxed bg-[#191b27] p-2.5 rounded-lg border border-[#272936]/60">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
