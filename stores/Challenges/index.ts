import allChallenges from '@/assets/challenges/data';
import type { State } from './types';
import { defineStore } from 'pinia'
import { Mutations, type MutationsInterface } from './types';

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
    [Mutations.SET_CURRENT_CHALLENGE_INDEX] (state, index) {
      state.currentChallengeIndex = index;
    },
    [Mutations.SET_IS_LEVEL_UP_MODAL_OPEN] (state, flag) {
      state.isLevelUpModalOpen = flag;
    },
    [Mutations.COMPLETE_CHALLENGE] (state, xpAmount) {
      const { current, end } = state.xp;
      const currentTotalXP = current + xpAmount;
      const shouldLevelUp = currentTotalXP >= end;
  
      state.completedChallenges += 1;
  
      if (shouldLevelUp) {
        state.level += 1;
  
        const remainingXp = currentTotalXP - end;
        const experienceToNextLevel = Math.pow((state.level + 1) * 4, 2);
  
        state.xp = {
          current: remainingXp,
          start: 0,
          end: experienceToNextLevel,
        };
  
        state.isLevelUpModalOpen = true;
        return;
      }
  
      state.xp = {
        ...state.xp,
        current: currentTotalXP,
      };
    },
    [Mutations.SAVE_COOKIE_DATA] (state, cookie) {
      state.level = cookie.level;
      state.xp = cookie.xp;
      state.completedChallenges = cookie.completedChallenges;
    },
  } as MutationsInterface
})