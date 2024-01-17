<script setup lang="ts">
import { ref } from "vue";
interface FoundMessageProps {
  text: string;
  id: number;
  time: number;
}

const props = defineProps<FoundMessageProps>();

const minutes = ref(String(new Date(props.time * 1000).getMinutes()));
const hours = ref(String(new Date(props.time * 1000).getHours()));
</script>
<template lang="html">
  <div class="bg-[#002F55] w-full flex justify-between p-2 items-center mt-[2px] cursor-pointer">
    <p class="text-white">{{ props.text }}</p>
    <p class="text-xs self-end text-white">
      {{
        `${hours.length < 2 ? `0${hours}` : hours}:${
          minutes.length < 2 ? `0${minutes}` : minutes
        }`
      }}
    </p>
  </div>
</template>
<style lang="scss"></style>
