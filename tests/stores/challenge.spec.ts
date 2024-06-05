import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import allChallenges from '~/assets/challenges/data';

describe('useChallenges store', () => {
  const challenge = useChallenges();

  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('State', () => {
    it('should have an inital state', () => {
      expect(challenge.$state).toMatchObject({
        level: 1,
        xp: {
          current: 0,
          start: 0,
          end: 64,
        },
        completedChallenges: 0,
        currentChallengeIndex: null,
        isLevelUpModalOpen: false,
        allChallenges,
      });
    });
  });

  describe('Getters', () => {
    it('challenges length', () => {
      const allChallenges = challenge.challengesLength;
      expect(allChallenges).toBe(12);
    });

    it('current xp percentage', () => {
      const currentXpPercentage = challenge.currentXpPercentage;
      expect(currentXpPercentage).toBe(0);
    });

    it('current challenge', () => {
      const currentChallenge = challenge.currentChallenge;
      expect(currentChallenge).toBe(null);
    });
  });

  describe('Actions', () => {
    it('set current challenge index', () => {
      challenge.setCurrentChallengeIndex(0);
      expect(challenge.currentChallengeIndex).toBe(0);
      expect(challenge.currentChallenge).toMatchObject(allChallenges[0]);
    });

    it('set is level up modal open', () => {
      challenge.setIsLevelUpModalOpen(true);
      expect(challenge.isLevelUpModalOpen).toBeTruthy();
    });

    it('completed challenge', () => {
      challenge.completedChallenge(44);
      expect(challenge.xp).toMatchObject({
        current: 44,
        start: 0,
        end: 64
      });
    })

    it('save cookie data', () => {
      const cookie = {
        xp: {
          current: 34,
          start: 0,
          end: 64
        },
        level: 2,
        completedChallenges: 2,
      };

      challenge.saveCookieData(cookie);
      expect(challenge.xp).toMatchObject({
        current: 34,
        start: 0,
        end: 64
      });
      expect(challenge.completedChallenges).toBe(2);
      expect(challenge.level).toBe(2);
    });
  });
});