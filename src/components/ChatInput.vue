<script setup lang="ts">
import { ref } from "vue";
import { sendMessage } from "../services/MessageService";
import { sendFile } from "../services/ChatService";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
interface ChatInputProps {
  currentUser: string;
}

const props = defineProps<ChatInputProps>();
const messageText = ref();

const send = async () => {
  if (messageText.value) {
    await sendMessage(props.currentUser, messageText.value);
  }
  messageText.value = "";
};

const sendMesFile = async (e: any) => {
  if (!e.target.files) {
    console.error("Не удалось получить файлы для отправки.");
    return;
  }
  const formData = new FormData();
  formData.append("receiver_username", props.currentUser);
  for (const file of e.target.files) {
    console.log(file);
    formData.append("photo", file);
  }
  //@ts-ignore
  await sendFile(formData);
};
</script>
<template lang="html">
  <div class="flex items-center pr-2 gap-2">
    <input
      id="inputPhoto"
      type="file"
      multiple
      class="opacity-0 absolute w-1"
      @change="sendMesFile"
    />
    <label for="inputPhoto" class="p-2 w-fit">
      <i class="pi pi-paperclip cursor-pointer" />
    </label>
    <InputText
      placeholder="Введите сообщение..."
      class="w-full bg-gray-700"
      v-model="messageText"
      @keydown.enter="send"
    />
    <Button
      icon="pi pi-send"
      severity="secondary"
      text
      rounded
      aria-label="Search"
      @click="send"
    />
  </div>
</template>
<style lang="scss"></style>
