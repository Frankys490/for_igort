<script setup lang="ts">
interface UserInfoElementProps {
  text: string;
  title: string;
}

const props = defineProps<UserInfoElementProps>();
</script>
<template lang="html">
  <div class="w-full">
    <p class="text-xs">{{ props.title }}</p>
    <div class="flex w-full justify-between items-center">
      <p>{{ props.text }}</p>
    </div>
  </div>
</template>
<style lang="scss"></style>
