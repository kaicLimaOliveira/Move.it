export interface XP {
  current: number;
  start: number;
  end: number;
}
  
export interface Challenge {
  type: string;
  description: string;
  amount: number;
}

export interface Cookie {
  level: number;
  xp: XP;
  completedChallenges: number;
}