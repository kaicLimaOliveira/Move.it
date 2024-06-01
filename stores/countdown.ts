interface State {
  time: number;
  isActive: boolean;
  hasCompleted: boolean;
}

const MINUTES = 0.05;

export const useCountdown = defineStore('countdown', {
  state: (): State => ({
    time: MINUTES * 60,
    isActive: false,
    hasCompleted: false,
  }),
  getters: {
    minutes: state => Math.floor(state.time / 60),
    seconds: state => state.time % 60,
  },
  actions: {
    setTime(newTime: number) {
      this.time = newTime;
    },
    resetTime() {
      this.time = MINUTES * 60;
    },
    setIsActive(isActive: boolean) {
      this.isActive = isActive;
    },
    setHasCompleted(hasCompleted: boolean) {
      this.hasCompleted = hasCompleted;
    },
  }
})