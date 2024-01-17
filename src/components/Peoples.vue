<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "primevue/button";
import { searchUser } from "../services/SearchPeopleService";
import { getChats } from "../services/ChatService";
import { useRouter } from "vue-router";
import PeopleSearchBlock from "./PeopleSearchBlock.vue";
import PeopleBlock from "./PeopleBlock.vue";

interface PeoplesEmits {
  (e: "update:currentName", value: string): void;
}

interface IChats {
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
}

const chats = ref<IChats[]>();

const foundUsers = ref<
  {
    username: string;
    password: string;
    profile_picture_link: string;
    last_message: null;
  }[]
>([]);
const isEmptyUsers = ref(true);

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
) => {
  //@ts-ignore
  let timeoutId;
  return (...args: Parameters<T>) => {
    //@ts-ignore
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const router = useRouter();
const emit = defineEmits<PeoplesEmits>();

const changeUser = (name: string) => {
  emit("update:currentName", name);
};

const search = async (username: string) => {
  const { data } = await searchUser(username);
  if (data.data.users) {
    isEmptyUsers.value = false;
    foundUsers.value = data.data.users;
  } else {
    isEmptyUsers.value = true;
  }
};

const handleInput = debounce((event) => {
  search(event.target.value);
}, 500);

const changeSearchUser = (username: string) => {
  changeUser(username);
  isEmptyUsers.value = true;
};

const getAllChats = async () => {
  const { data } = await getChats();
  chats.value = data.data;
};

onMounted(() => {
  getAllChats();
  setInterval(async () => {
    getAllChats();
  }, 2000);
});
</script>
<template lang="html">
  <div class="relative">
    <div class="flex gap-1 items-center">
      <input placeholder="Поиск" class="w-[90%]" @input="handleInput" />
      <Button
        icon="pi pi-cog"
        severity="secondary"
        text
        rounded
        aria-label="Settings"
        @click="router.push('settings')"
      />
    </div>
    <div
      class="absolute top-10 bg-[#002F55] w-full flex flex-col gap-2"
      v-show="!isEmptyUsers"
    >
      <PeopleSearchBlock
        v-for="(item, index) in foundUsers"
        :key="index"
        :is-empty-users="isEmptyUsers"
        @click="changeSearchUser(item.username)"
        :user="item"
      />
    </div>
  </div>
  <div
    class="flex flex-col gap-1 pt-1 h-[94vh] overflow-x-hidden overflow-y-auto bg-gray-800"
  >
    <PeopleBlock
      v-for="(item, index) in chats"
      :key="index"
      :chats-data="item"
      @click="changeSearchUser(item.username)"
    />
  </div>
</template>
<style lang="scss"></style>
