<template>
  <div class="flex justify-center items-center mt-8 lg:mt-14 text-9xl text-title font-rajdhani">
    <CountdownDigits :digits="minutes" />
    <span class="bg-background px-2">:</span>
    <CountdownDigits :digits="seconds" />
  </div>
</template>

<script setup lang="ts">
import CountdownDigits from "~/components/atoms/CountdownDigits.vue";


const emit = defineEmits<{
  "completed": []
}>()

const { setTime, resetTime } = useCountdown();
const { time, isActive, minutes, seconds } = storeToRefs(useCountdown());


let TIMEOUT_REFERENCE: ReturnType<typeof setTimeout>;
function runCountdown(flag: boolean) {

  if (isActive && flag) {
    TIMEOUT_REFERENCE = setTimeout(() => setTime(time.value - 1), 1000);
  
  } else {
    clearTimeout(TIMEOUT_REFERENCE);
  }
}


watch(
  () => isActive.value,
  (newValue) => {
    runCountdown(newValue);

    if (!newValue) {
      resetTime();
    }
  }
)

watch(
  () => time.value,
  (newValue) => {
    if (newValue > 0) {runCountdown(true);}
    else {emit("completed")}
  }
)
</script>