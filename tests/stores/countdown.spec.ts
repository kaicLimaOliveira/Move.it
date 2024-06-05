import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

describe('useCountdown store', () => {
  const countdown = useCountdown();
  
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('State', () => {
    it('should have an inital state', () => {
      expect(countdown.$state).toMatchObject({
        time: 25 * 60,
        isActive: false,
        hasCompleted: false,
      });
    });
  });

  describe('Getters', () => {
    it('minutes', () => {
      const minutes = countdown.minutes;
      expect(minutes).toBe(25);
    });

    it('seconds', () => {
      const seconds = countdown.seconds;
      expect(seconds).toBe(0);
    });
  });

  describe('Actions', () => {
    it('set time', () => {
      countdown.setTime(10);
      expect(countdown.time).toBe(10);
    })

    it('reset time', () => {
      countdown.resetTime();
      expect(countdown.time).toBe(25 * 60);
    })

    it('set is active', () => {
      countdown.setIsActive(true);
      expect(countdown.isActive).toBe(true);
    })  

    it('set has completed', () => {
      countdown.setHasCompleted(true);
      expect(countdown.hasCompleted).toBe(true);
    })
  })

})