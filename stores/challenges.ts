import allChallenges from '@/assets/challenges/data';
import type { Challenge, Cookie, XP } from '~/interfaces/Generic';

interface State {
  level: number;
  xp: XP;
  completedChallenges: number;
  currentChallengeIndex: number | null;
  isLevelUpModalOpen: boolean;
  allChallenges: Challenge[];
}

export const useChallenges = defineStore('challenges', {
  state: (): State => ({
		level: 1,
		xp: {
			current: 32,
			start: 0,
			end: 64,
		},
		completedChallenges: 0,
		currentChallengeIndex: null,
		isLevelUpModalOpen: false,
		allChallenges,
	}),
  getters: {
    challengesLength: state => state.allChallenges.length,
    currentXpPercentage: (state) => {
      const percentage = (state.xp.current / state.xp.end) * 100;
      return Number(percentage.toFixed(2));
    },
    currentChallenge: state =>
      (typeof state.currentChallengeIndex === 'number')
        ? state.allChallenges[state.currentChallengeIndex]
        : null,
  },
  actions: {
    setCurrentChallengeIndex (index: number) {
      this.currentChallengeIndex = index;
    },
    setIsLevelUpModalOpen (flag: boolean) {
      this.isLevelUpModalOpen = flag;
    },
    completeChallenge (xpAmount: number) {
      const { current, end } = this.xp;
      const currentTotalXP = current + xpAmount;
      const shouldLevelUp = currentTotalXP >= end;
  
      this.completedChallenges += 1;
  
      if (shouldLevelUp) {
        this.level += 1;
  
        const remainingXp = currentTotalXP - end;
        const experienceToNextLevel = Math.pow((this.level + 1) * 4, 2);
  
        this.xp = {
          current: remainingXp,
          start: 0,
          end: experienceToNextLevel,
        };
  
        this.isLevelUpModalOpen = true;
        return;
      }
  
      this.xp = {
        ...this.xp,
        current: currentTotalXP,
      };
    },
    saveCookieData (cookie: Cookie) {
      this.level = cookie.level;
      this.xp = cookie.xp;
      this.completedChallenges = cookie.completedChallenges;
    },
  }
})