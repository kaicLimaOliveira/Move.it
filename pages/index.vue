<template>
  <section class="flex flex-col lg:flex-row flex-1 lg:flex-none lg:mt-16 sm:gap-x-10 md:gap-x-20">
    <div class="flex flex-col w-full lg:w-1/2">
      <Profile />
      <CompletedChallenges />
      <Countdown @completed="getNewChallenge" />

      <button 
        v-if="hasCompleted"
        disabled
        class="button completed"
      >
        Cycle completed
      </button>

      <button
        v-else-if="isActive"
        class="button abandon"
        @click="setCountdownState(false)"
      >
        Abandon cycle
      </button>

      <button
        v-else
        class="button start"
        @click="setCountdownState(true)"
      >
        Start a cycle
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import CompletedChallenges from '~/components/atoms/CompletedChallenges.vue';
import Countdown from '~/components/molecules/Countdown.vue';
import Profile from '~/components/molecules/Profile.vue';

const { setHasCompleted, setIsActive } = useCountdown();
const { isActive, hasCompleted } = storeToRefs(useCountdown());

useSeoMeta({
  title: "Home | move.it",
})

onMounted(() => {
  if ('Notification' in window) {
    Notification.requestPermission()
  }
}) 

function getNewChallenge() {
  setHasCompleted(true)

  if (Notification?.permission === 'granted') {
    playAudio('./notification.mp3')
    sendNotification('New Challenge!', {
      body: 'A new challenge has started! Go complete it!',
      icon: './favicon.png'
    })
  }
}

function setCountdownState(flag: boolean) {
  setHasCompleted(false);
  setIsActive(flag)
}
</script>