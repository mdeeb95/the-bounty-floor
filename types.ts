
export enum BountyStatus {
  AVAILABLE = 'AVAILABLE',
  HOT = 'HOT',
  ELITE = 'ELITE',
  URGENT = 'URGENT',
  CLAIMED = 'CLAIMED',
  COMPLETED = 'COMPLETED'
}

export interface Bounty {
  id: string;
  project: string;
  title: string;
  value: number;
  endsIn: string;
  status: BountyStatus;
  tags: string[];
  description: string;
  requirements: string[];
  difficulty: 'CRITICAL' | 'HARD' | 'MEDIUM' | 'EASY';
}

export interface Shark {
  id: string;
  name: string;
  earned: number;
  rank: number;
  avatar: string;
}

export interface UserProfile {
  username: string;
  netWorth: number;
  level: number;
  inventory: string[];
}
