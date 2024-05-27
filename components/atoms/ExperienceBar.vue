<template>
  <header class="pb-10 flex items-center">
    <p class="text-sm">
      {{ `${store.xp.start} xp` }}
    </p>
    <div class="mx-4 lg:mx-6 flex-1 bg-gray-line h-1 rounded-md">
      <div class="relative bg-green h-1" :style="{ width: `${getter.currentXpPercentage}%` }">
        <p class="text-sm absolute right-4 w-max top-2">
          {{ `${store.xp.current} xp (${getter.currentXpPercentage}%)` }}
        </p>
      </div>
    </div>
    <p class="text-sm">
      {{ `${store.xp.end}` }}
    </p>
  </header>
</template>

<script setup lang="ts">
import { useChallengesStore } from '@/stores/Challenges/index'
import getter from '@/stores/Challenges/getters'

const store = useChallengesStore();


</script>