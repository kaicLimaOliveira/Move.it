<template>
  <Transition name="slide-fade">
    <div 
      v-if="challenges.isLevelUpModalOpen"
      class="overlay flex justify-center items-center bg-gray-line fixed inset-0"
      @click="challenges.setIsLevelUpModalOpen(false)"
    >
      <div class="bg-white w-fill max-w-md p-10 rounded-md shadow-lg text-center relative" @click.stop>
        <header class="text-9xl font-semibold text-blue bg-contain">
          {{ challenges.level }}
        </header>

        <strong class="text-2xl text-text mt-1">
          Parabéns!
        </strong>
        <p>
          Você alcançou um novo de level!
        </p>

        <button 
          type="button" 
          class="absolute right-2 top-2 bg-transparent border-0 text-[0]"
          @click="challenges.setIsLevelUpModalOpen(false)"
        >
          <img src="/icons/close.svg" alt="Close modal">
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const challenges = useChallenges();
</script>

<style scoped>
.overlay {
  background-color: rgba(242, 243, 245, 0.8);
}

header {
  background: url('/icons/levelUp.svg') no-repeat center;
}
</style>