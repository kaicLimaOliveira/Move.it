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
        Ciclo completo
      </button>

      <button
        v-else-if="isActive"
        class="button abandon"
        @click="setCountdownState(false)"
      >
        Abandonar ciclo
      </button>

      <button
        v-else
        class="button start"
        @click="setCountdownState(true)"
      >
        Iniciar ciclo
      </button>
    </div>

    <Card id="challenge" class="w-full lg:w-1/2" />
  </section>
</template>

<script setup lang="ts">
import Card from '~/components/organisms/Card.vue';
import CompletedChallenges from '~/components/atoms/CompletedChallenges.vue';
import Countdown from '~/components/molecules/Countdown.vue';
import Profile from '~/components/molecules/Profile.vue';

const { setHasCompleted, setIsActive } = useCountdown();
const { isActive, hasCompleted } = storeToRefs(useCountdown());

const { setCurrentChallengeIndex } = useChallenges();
const { challengesLength } = storeToRefs(useChallenges());


useSeoMeta({
  title: "Home | move.it",
})


onMounted(() => {
  if ('Notification' in window) {
    Notification.requestPermission();
  }
}) 

const challenge = ref('');

function getNewChallenge() {
  const index = getRandomNumber(0, challengesLength.value);
  setHasCompleted(true);
  setCurrentChallengeIndex(index);

  if (Notification?.permission === 'granted') {
    playAudio('./notification.mp3');
    sendNotification('New Challenge!', {
      body: 'A new challenge has started! Go complete it!',
      icon: './favicon.png'
    });
  }

  nextTick(() => {
    scrollToElement('#challenge')
  })
}

function setCountdownState(flag: boolean) {
  setHasCompleted(false);
  setIsActive(flag)
}
</script>