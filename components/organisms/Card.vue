<template>
  <div class="bg-white rounded-md flex flex-1 w-full mt-8 lg:mt-0 shadow-sm">
    <Challenge v-if="currentChallenge" v-bind="currentChallenge" />
    <StartCycle v-else />
    <LevelUpModal />
  </div>
</template>

<script setup lang="ts">
import Challenge from '~/components/molecules/Challenge.vue';
import StartCycle from '~/components/atoms/StartCycle.vue';
import LevelUpModal from '~/components/atoms/LevelUpModal.vue';

import { useChallenges } from '~/stores/challenges'


const { currentChallenge } = storeToRefs(useChallenges());
</script>