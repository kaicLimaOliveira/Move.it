<template>
  <div class="min-h-screen max-w-5xl mx-auto flex flex-col px-5 py-8 md:py-10">
    <ExperienceBar />
    <slot />
  </div>
</template>

<script setup lang="ts">
import ExperienceBar from '~/components/atoms/ExperienceBar.vue';

</script>