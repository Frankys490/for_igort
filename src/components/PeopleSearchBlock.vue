<script setup lang="ts">
import Avatar from "primevue/avatar";

interface PeopleBlockProps {
  user: {
    username: string;
    password: string;
    profile_picture_link: string;
    last_message: null;
  };
  isEmptyUsers: boolean;
}

const props = defineProps<PeopleBlockProps>();
</script>
<template lang="html">
  <div
    class="w-full p-2 flex gap-3 duration-300 cursor-pointer"
    :class="props.isEmptyUsers ? 'translate-y-[-100%]' : 'translate-y-0'"
  >
    <Avatar
      :label="props.user.profile_picture_link ? '' : props.user.username[0]"
      :image="
        props.user.profile_picture_link ? props.user.profile_picture_link : ''
      "
      class="mr-2"
      size="large"
    />
    <p class="text-white">{{ props.user.username }}</p>
  </div>
</template>
<style lang="scss"></style>
