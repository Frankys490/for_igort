<script setup lang="ts">
</script>
<template lang="html">
  <Teleport to="body">
    <div
      class="absolute top-0 w-screen h-screen bg-gray-400/30 flex items-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        :size="69"
        :width="6"
      ></v-progress-circular>
    </div>
  </Teleport>
</template>
<style lang="scss"></style>
