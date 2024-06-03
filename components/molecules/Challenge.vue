<template>
  <section class="flex flex-col flex-1 justify-center items-center py-6 px-10 md:px-16">
    <header class="w-full pb-6 border-b-2 border-background">
      <h2 class="text-xl text-blue font-semibold text-center">
        {{ `Ganhe ${props.amount} xp` }}
      </h2>
    </header>

    <main class="flex flex-col flex-1 justify-center items-center mt-6">
      <img :src="`/icons/${props.type}.svg`" :alt="props.type" class="min-h-[70px]">
      <h1 class="font-semibold text-3xl text-title mt-6 mb-2">
        Novo desafio
      </h1>

      <p class="text-center text-base leading-6">
        {{ props.description }}
      </p>
    </main>

    <footer class="flex w-full gap-x-2">
      <button class="button failed" @click="resetChallenges">
        Falhei
      </button>

      <button class="button succeeded" @click="challengesSucceeded">
        Completei
      </button>
    </footer>
  </section>
</template>

<script setup lang="ts">

interface Props {
  type: string;
  description: string;
  amount: number;
}

const props = withDefaults(defineProps<Props>(), {});

const { setCurrentChallengeIndex, completedChallenge } = useChallenges();
const { xp, level, completedChallenges } = storeToRefs(useChallenges());

const { setIsActive, resetTime, setHasCompleted } = useCountdown();

function resetChallenges() {
  resetTime();
  setIsActive(false);
  setHasCompleted(false);
  setCurrentChallengeIndex(null);
}


function challengesSucceeded() {
  resetChallenges();
  completedChallenge(props.amount);
  handleCookie()
}

async function handleCookie() {
  const cookie = {
    level: level.value,
    completedChallenges: completedChallenges.value,
    xp: xp.value,
  }

  await $fetch('/api/token', {
    method: 'POST',
    body: {
      cookie
    }
  })
}
</script>