<template>
  <p class="w-1/2 flex gap-x-1">
    <span 
      v-for="digit, index in splittedDigits"
      :key="index"
      class="w-1/2 bg-white rounded-md flex items-center justify-center py-3"
    >
      {{ digit }}
    </span>
  </p>
</template>

<script setup lang="ts">

interface Props {
  digits: number;
}

const props = withDefaults(defineProps<Props>(), {
  digits: 0
})

const splittedDigits = computed(() => splitValue(props.digits))
</script>