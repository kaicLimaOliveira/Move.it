import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockNuxtImport, mountSuspended } from '@nuxt/test-utils/runtime'

import Countdown from "~/components/molecules/Countdown.vue";
import Index from "~/pages/index.vue";

vi.mock('~/utils', () => ({
  scrollToElement: vi.fn(),
  getRandomNumber: vi.fn(),
  playAudio: vi.fn(),
  sendNotification: vi.fn(),
  splitValue: vi.fn(),
}))

import { 
  getRandomNumber, 
  playAudio, 
  sendNotification,
} from '~/utils';

describe('page index', () => {
  const countdown = useCountdown();

  beforeEach(() => {
    global.Notification = {
			requestPermission: vi.fn(),
			permission: 'default',
		} as unknown as typeof Notification;
    
    useCountdown().$reset();
  });

  describe('Snapshots', () => {
    it('should render all child components and start a cycle button', async () => {
      const wrapper = await mountSuspended(Index);
      expect(wrapper.html()).toMatchSnapshot();
    })

    it('should render all child components and abandon cycle button', async () => {
			countdown.isActive = true;
			const wrapper = await mountSuspended(Index);
			expect(wrapper.html()).toMatchSnapshot();
		});

    it('should render all child components and abandon cycle button', async () => {
			countdown.hasCompleted = true;
			const wrapper = await mountSuspended(Index);
			expect(wrapper.html()).toMatchSnapshot();
		});
  })

  describe('Meta info', () => {
    it('should have a meta title', async () => {
      const wrapper = await mountSuspended(Index)
      // expect(wrapper.element.title).toBe('Home | move.it')
    })
  })

  describe('Mounted', () => {
    it('should request Notification permissions when mounted', async () => {
      await mountSuspended(Index);
      expect(global.Notification.requestPermission).toHaveBeenCalled();
    })

    it('should not request permissions if Notification doesnt exist', async () => {
      delete (global as any).Notification;
      await mountSuspended(Index);
      expect(global.Notification).toBe(undefined);
    })
  })
  
  describe('Button clicks', () => {
    it('should request Notification permissions when mounted', async() => {
      const wrapper = await mountSuspended(Index);
      const button = wrapper.find('button');
      await button.trigger('click');

      const newButtonRendered = wrapper.find('button');
      expect(newButtonRendered.text()).toBe('Abandonar ciclo');
    })

    it('should abandon cycle when abandon cycle button is clicked', async () => {
			const wrapper = await mountSuspended(Index);

			const button = wrapper.find('button');
			await button.trigger('click');

      const secondButton = wrapper.find('button');
			await secondButton.trigger('click');

			const newButton = wrapper.find('button');
			expect(newButton.text()).toBe('Iniciar ciclo');
		});
  })

  describe('Emitted events', () => {
		it('should run getNewChallenge and play audio and send notification', async () => {
			global.Notification = {
				requestPermission: vi.fn(),
				permission: 'granted',
			} as unknown as typeof Notification;

			mockNuxtImport('getRandomNumber', () => getRandomNumber);
      getRandomNumber(1, 1);

			const wrapper = await mountSuspended(Index);

			const setCurrentChallengeIndex = vi.spyOn(wrapper.vm, 'setCurrentChallengeIndex');

			const countdown = wrapper.findComponent(Countdown);
			await countdown.vm.$emit('completed');

			const button = wrapper.find('button');

			expect(button.text()).toBe('Ciclo completo');
			// expect(setCurrentChallengeIndex.mock).toBe(1);
			expect(playAudio).toHaveBeenCalledWith('./notification.mp3');
			expect(sendNotification).toHaveBeenCalledWith('New Challenge!', {
				body: 'A new challenge has started! Go complete it!',
				icon: './favicon.png',
			});
			// expect(scrollToElement).toBe('#challenge');
		});

		// it('should run getNewChallenge but doesnt play audio and doesnt send notification', async () => {
			
    //   const { getRandomNumber } = vi.hoisted(() => {
    //     return {
    //       getRandomNumber: vi.fn().mockImplementation(() => 1)
    //     }
    //   })

    //   mockNuxtImport('getRandomNumber', () => {
    //     return getRandomNumber
    //   })
      
    //   getRandomNumber.mockImplementation(() => 1)

		// 	const wrapper = await mountSuspended(Index);

		// 	const setCurrentChallengeIndex = vi.spyOn(wrapper.vm, 'setCurrentChallengeIndex');

		// 	const countdown = wrapper.findComponent(Countdown);
		// 	await countdown.vm.emit('completed');

		// 	const button = wrapper.find('button');

		// 	expect(button.text()).toBe('Ciclo completo');
		// 	expect(setCurrentChallengeIndex).toHaveBeenCalledWith(1);
		// 	expect(playAudio).not.toHaveBeenCalled();
		// 	expect(sendNotification).not.toHaveBeenCalled();
		// 	// expect(scrollToElement).toHaveBeenCalledWith('#challenge');
		// });
	});
})
