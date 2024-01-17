<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import { searchMessage } from "../services/MessageService";
import FoundMessage from "./FoundMessage.vue";
interface ChatHeaderProps {
  userData: {
    birthday: string;
    email: string;
    id: number;
    name: string;
    patronymic: string;
    phone: string;
    profile_picture_link: string;
    surname: string;
    username: string;
  };
  currentUser: string;
  cid: number;
}

const props = defineProps<ChatHeaderProps>();

const router = useRouter();

const isOpenSearch = ref(false);

const toggleSearch = () => {
  isOpenSearch.value = !isOpenSearch.value;
};

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

const isEmptyChats = ref(false);
const found = ref();

const search = async (chatId: number, query: string) => {
  const { data } = await searchMessage(query, chatId);
  if (data.data.Messages) {
    isEmptyChats.value = false;
    found.value = data.data.Messages;
    console.log(found.value);
  } else {
    isEmptyChats.value = true;
  }
};

const handleInput = debounce((event) => {
  console.log(props.cid);
  search(props.cid, event.target.value);
}, 500);

const handleFoundMessage = (id: number) => {
  const messagesBlock = document.querySelector("#messagesBlock");
  const targetMessage = document.querySelector(`#message-${id}`);
  if (
    messagesBlock instanceof HTMLElement &&
    targetMessage instanceof HTMLElement
  ) {
    const offsetTop = targetMessage.offsetTop - messagesBlock.offsetTop;
    messagesBlock.scrollTop = offsetTop;
  }
  isOpenSearch.value = false
};
</script>
<template lang="html">
  <div
    class="flex justify-between h-[43px] px-2 items-center bg-[#002F55] relative"
  >
    <div class="flex gap-2 h-[43px] px-2 items-center">
      <Avatar
        :image="props.userData.profile_picture_link"
        class="mr-2 cursor-pointer"
        size="normal"
        v-if="props.userData"
        @click="router.push(`user/${props.userData.username}`)"
      />
      <p class="text-md text-white">
        {{ props.currentUser ? props.currentUser : "Выберите диалог" }}
      </p>
    </div>
    <Button
      icon="pi pi-search"
      severity="secondary"
      text
      rounded
      aria-label="Search"
      @click="toggleSearch"
      v-show="props.currentUser"
    />
    <div
      :class="
        !isOpenSearch ? 'opacity-0 top-[-43px]' : ' opacity-100 top-[48px]'
      "
      class="duration-300 absolute w-full left-0"
    >
      <input
        placeholder="Поиск..."
        class="w-full bg-gray-700"
        @input="handleInput"
      />
      <FoundMessage
        v-for="(item, index) in found"
        :key="index"
        :id="item.id"
        :text="item.message"
        :time="item.time"
        @click="handleFoundMessage(item.id)"
      />
    </div>
  </div>
</template>
<style lang="scss"></style>
