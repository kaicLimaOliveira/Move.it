<template>
  <div class="flex items-center">
    <img src="https://github.com/kaicLimaOliveira.png" alt="Kaic Dev" class="mr-6 w-20 h-20 rounded-full">
    <div class="flex flex-col w-full">
      <strong class="text-title text-2xl">Kaic Dev</strong>
      <p class="flex items-end">
        <img src="/assets/icons/level.svg" alt="level" class="mr-2">
        <span class="text-base">Level {{ level }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { level } = useChallenges();
</script>