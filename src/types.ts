export interface DramaEpisode {
  id: number;
  number: number;
  title: string;
  durationMinutes: number;
  isUnlocked: boolean;
  coinsRequired?: number;
  thumbnailUrl?: string;
  watchedPercentage?: number;
}

export interface DramaWork {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  tag: string;
  tagType: 'primary' | 'secondary' | 'accent';
  techBadge: string;
  rating: number;
  matchPercentage: number;
  year: number;
  episodesCount: number;
  currentEpisode?: number;
  watchedPercentage?: number;
  durationRemainingMinutes?: number;
  posterUrl: string;
  backdropUrl?: string;
  synopsis: string;
  inWatchlist?: boolean;
  isDownloaded?: boolean;
  episodes: DramaEpisode[];
}

export interface UserProfile {
  name: string;
  role: string;
  email: string;
  memberSince: string;
  avatarUrl: string;
  coins: number;
  completedSeriesCount: number;
  watchHoursThisMonth: number;
  vipTier: string;
  vipRenewalDate: string;
  loyaltyXp: number;
  loyaltyTargetXp: number;
}

export interface RecentActivityItem {
  id: string;
  workTitle: string;
  actionText: string;
  timeAgo: string;
  badgeText: string;
  badgeType: 'secondary' | 'primary' | 'neutral';
  icon: string;
}

export type ScreenType =
  | 'welcome'
  | 'signin'
  | 'forgot-password'
  | 'dashboard'
  | 'explore'
  | 'watchlist'
  | 'profile';
