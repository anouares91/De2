import React, { useState } from 'react';
import { DramaWork } from '../types';

interface WatchlistScreenProps {
  works: DramaWork[];
  onPlayWork: (workId: string) => void;
  onToggleWatchlist: (workId: string) => void;
  onToast: (msg: string) => void;
}

export const WatchlistScreen: React.FC<WatchlistScreenProps> = ({
  works,
  onPlayWork,
  onToggleWatchlist,
  onToast,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'continue' | 'saved' | 'downloads'>('all');

  const watchlistItems = works.filter((w) => w.inWatchlist);

  const filteredItems = watchlistItems.filter((w) => {
    if (activeTab === 'continue') return (w.watchedPercentage || 0) > 0;
    if (activeTab === 'downloads') return w.isDownloaded;
    if (activeTab === 'saved') return !w.watchedPercentage || w.watchedPercentage === 0;
    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-md mx-auto pt-20 pb-28 px-4 text-[#e1e1f2]">
      {/* Page Title & Count */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[20px] font-black text-[#e1e1f2] flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[#e50914] text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bookmark_added
            </span>
            قائمتي السينمائية
          </h1>
          <span className="text-[12px] text-[#e9bcb6]">
            {watchlistItems.length} أعمال محفوظة للمشاهدة بدون إعلانات
          </span>
        </div>

        <button
          onClick={() => onToast('تم فرز قائمتك حسب آخر ما شاهدت')}
          className="p-2 rounded-full bg-[#272936] text-[#e9bcb6] hover:text-[#e1e1f2] transition-colors border border-[#323441]"
          title="ترتيب القائمة"
        >
          <span className="material-symbols-outlined text-[18px]">swap_vert</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none mb-4">
        {[
          { id: 'all', label: `الكل (${watchlistItems.length})` },
          { id: 'continue', label: 'جارية المشاهدة (3)' },
          { id: 'saved', label: 'محفوظة لاحقاً' },
          { id: 'downloads', label: 'تنزيلات أوفلاين (2)' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-black shrink-0 transition-all ${
                isActive
                  ? 'bg-[#e50914] text-[#fff7f6] shadow-md shadow-[#e50914]/20'
                  : 'bg-[#191b27] text-[#e9bcb6] hover:bg-[#272936] border border-[#272936]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* List Content */}
      <div className="flex flex-col gap-3">
        {filteredItems.map((work) => (
          <div
            key={work.id}
            className="flex bg-[#1d1f2b] rounded-xl overflow-hidden p-3 gap-3 border border-[#272936] hover:border-[#e50914]/30 transition-all shadow-md group"
          >
            {/* Poster Thumbnail */}
            <div className="relative w-20 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-[#0b0d19]">
              <img
                src={work.posterUrl}
                alt={work.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <button
                onClick={() => onPlayWork(work.id)}
                className="absolute inset-0 bg-black/40 flex items-center justify-center text-[#fff7f6] hover:bg-black/20 transition-colors"
              >
                <span
                  className="material-symbols-outlined text-[26px] drop-shadow-md text-[#e50914]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_circle
                </span>
              </button>

              {work.isDownloaded && (
                <span
                  className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-[#323441] text-[#ffb4aa] flex items-center justify-center text-[11px]"
                  title="متاح للمشاهدة بدون إنترنت"
                >
                  <span className="material-symbols-outlined text-[13px]">download_done</span>
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-between flex-1 text-start min-w-0">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="px-1.5 py-0.2 rounded bg-[#e50914]/20 text-[#ffb4aa] text-[10px] font-black">
                    {work.tag}
                  </span>
                  <div className="flex items-center gap-1 text-[#feb700] text-[11px] font-bold">
                    <span
                      className="material-symbols-outlined text-[13px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span>{work.rating}</span>
                  </div>
                </div>

                <h3 className="text-[15px] font-bold text-[#e1e1f2] truncate">{work.title}</h3>
                <span className="text-[12px] text-[#e9bcb6] block mt-0.5">
                  {work.category} • {work.episodesCount} حلقة
                </span>
              </div>

              {/* Progress bar if ongoing */}
              {work.watchedPercentage ? (
                <div className="flex flex-col gap-1 my-1">
                  <div className="w-full bg-[#323441] rounded-full h-1 overflow-hidden">
                    <div
                      className="bg-[#e50914] h-full rounded-full"
                      style={{ width: `${work.watchedPercentage}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-[#e9bcb6] font-semibold">
                    وصلت للحلقة {work.currentEpisode || 1} ({work.watchedPercentage}%)
                  </span>
                </div>
              ) : null}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => onPlayWork(work.id)}
                  className="px-3 py-1 rounded-full bg-[#e50914] text-[#fff7f6] text-[11px] font-bold flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[14px]">play_arrow</span>
                  <span>{work.watchedPercentage ? 'استئناف' : 'بدء العرض'}</span>
                </button>

                <button
                  onClick={() => {
                    onToggleWatchlist(work.id);
                    onToast(`تمت إزالة ${work.title} من قائمتك`);
                  }}
                  className="text-[12px] text-[#af8782] hover:text-[#ffb4ab] transition-colors p-1"
                  title="إزالة من القائمة"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-[48px] text-[#af8782]">bookmark_border</span>
            <p className="text-[14px] text-[#e9bcb6]">لا توجد أعمال في هذا القسم حالياً</p>
          </div>
        )}
      </div>
    </div>
  );
};
