<template>
  <div class="flex justify-between items-center pb-5 border-b-2 border-gray-line mt-8 lg:mt-14 font-medium">
    <p class="text-lg">
      Desafios Completos
    </p>
    <p class="text-2xl">
      {{ completedChallenges }}
    </p>
  </div>
</template>

<script setup lang="ts">
const { completedChallenges } = storeToRefs(useChallenges());
</script>