import { beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from '@vue/test-utils'

import Countdown from "~/components/molecules/Countdown.vue";
import Index from "~/pages/index.vue";

vi.mock('~/utils', () => ({
  scrollToElement: vi.fn(() => 'mocked scrollToElement'),
  getRandomNumber: vi.fn(() => 'mocked getRandomNumber'),
  playAudio: vi.fn(() => 'mocked playAudio'),
  sendNotification: vi.fn(() => 'mocked sendNotification'),
  splitValue: vi.fn(() => 'mocked splitValue'),
}))

describe('page index', () => {
  const countdown = useCountdown();

  beforeEach(() => {
    
  })

  describe('Snapshots', () => {
    it('should render all child components and start a cycle button', () => {
      const wrapper = mount(Index)
      expect(wrapper.html()).toMatchSnapshot();
    })

    it('should render all child components and abandon cycle button', () => {
			countdown.isActive = true;
			const wrapper = mount(Index);
			expect(wrapper.html()).toMatchSnapshot();
		});

    it('should render all child components and abandon cycle button', () => {
			countdown.hasCompleted = true;
			const wrapper = mount(Index);
			expect(wrapper.html()).toMatchSnapshot();
		});
  })

  describe('Meta info', () => {
    it('should have a meta title', () => {
      const wrapper = mount(Index)
      expect(wrapper.vm.useSeoMeta).toBe('Home | move.it')
    })
  })
  
})
