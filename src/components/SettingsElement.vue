<script setup lang="ts">
interface SettingsElementProps {
  title: string;
}

const props = defineProps<SettingsElementProps>();
</script>
<template lang="html">
  <div class="w-full">
    <p class="text-xs">{{ props.title }}</p>
    <div class="flex w-full justify-between items-center">
      <slot />
    </div>
  </div>
</template>
<style lang="scss"></style>
