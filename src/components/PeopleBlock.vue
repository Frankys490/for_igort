<script setup lang="ts">
import Avatar from 'primevue/avatar';

interface PeopleBlockProps {
  chatsData: {
    chats: {
      active: boolean;
      create_date: bigint;
      host_uid: number;
      id: number;
      last_host_user: boolean;
      message: {
        last_message: string;
        number_of_unread: number;
        time: bigint;
      };
    };
    uid: number;
    online: boolean;
    profile_picture_link: string;
    username: string;
  };
}

const props = defineProps<PeopleBlockProps>();
</script>
<template lang="html">
  <div class="w-full p-2 bg-[#002F55] cursor-pointer h-[70px]">
    <div class="w-full flex gap-2 items-center">
      <div class="relative">
        <Avatar
          :label="
            props.chatsData.profile_picture_link
              ? ''
              : props.chatsData.username[0]
          "
          :image="
            props.chatsData.profile_picture_link
              ? props.chatsData.profile_picture_link
              : ''
          "
          class="mr-2"
          size="large"
        />
        <div
          class="w-[10px] h-[10px] bg-green-500 rounded-full absolute bottom-[-3px] right-1"
          v-show="props.chatsData.online"
        />
      </div>

      <div class="w-[80%]">
        <p class="text-white">{{ props.chatsData.username }}</p>
        <div class="pl-2 mt-2">
          <p class="text-xs text-white max-h-[16px] whitespace-nowrap">
            {{ props.chatsData.chats.message.last_message }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss"></style>
