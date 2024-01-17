<script setup lang="ts">
import { onMounted } from "vue";
import { setOnline } from "../services/ChatService";
import { useRouter } from "vue-router";
import Message from "./Message.vue";
import ChatHeader from "./ChatHeader.vue";
import ChatInput from "./ChatInput.vue";

interface ChatProps {
  currentUser: string;
  messages: {
    id: number;
    chat_id: number;
    uid: number;
    time: number;
    message: string;
    type: "picture" | "file" | "string";
    file_path: null;
    read: boolean;
  }[];
  currentId: number;
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
}

const props = defineProps<ChatProps>();
const router = useRouter();

onMounted(async () => {
  const { status } = await setOnline();
  if (status !== 200) {
    router.push("auth");
  }
  setInterval(async () => {
    const { status } = await setOnline();
    if (status !== 200) {
      router.push("auth");
    }
  }, 29000);
});
</script>
<template lang="html">
  <ChatHeader
    :current-user="props.currentUser"
    :user-data="props.userData"
    :cid="props.messages ? props.messages[0].chat_id : 0"
  />
  <div
    class="bg-gray-800 h-[89%] w-full flex"
    :class="
      props.messages ? 'items-end justify-start' : 'items-center justify-center'
    "
  >
    <div
      class="p-4 rounded-md bg-cyan-500/80 w-fit h-fit flex flex-col justify-center items-center gap-2"
      v-if="!props.messages"
    >
      <p class="text-md">
        {{
          props.currentUser
            ? "В этом чате нет сообщений"
            : "Начните общаться сейчас!"
        }}
      </p>
      <p class="text-sm">
        {{
          props.currentUser
            ? "Отправьте первое сообщение"
            : "Напишите вашим друзьям"
        }}
      </p>
    </div>
    <div
      v-else
      class="p-3 flex flex-col-reverse gap-2 w-full overflow-y-auto h-full"
      id="messagesBlock"
    >
      <Message
        v-for="(item, index) in props.messages"
        :key="index"
        :id="item.id"
        :uid="item.uid"
        :message-data="item.message"
        :message-time="item.time"
        :message-type="item.type"
        :current-id="props.currentId"
      />
    </div>
  </div>
  <ChatInput :current-user="props.currentUser" />
</template>
<style lang="scss"></style>
