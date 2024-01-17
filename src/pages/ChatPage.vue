<script setup lang="ts">
import Chat from "../components/Chat.vue";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Peoples from "../components/Peoples.vue";
import { useElementSize } from "@vueuse/core";
import { ref, watch } from "vue";
import { getChatByUsername } from "../services/ChatService";
import { getLk } from "../services/LkService";

const peoples = ref();
const chat = ref();

const currentName = ref("");
const currentId = ref();
const userData = ref();

const { width: peoplesWidth } = useElementSize(peoples);
const messages = ref();

const getChat = async () => {
  const { data } = await getChatByUsername(currentName.value);
  if (data.data) {
    messages.value = data.data.messages;
    currentId.value = data.data.requested_user_id;
  } else {
    messages.value = [];
  }
};

const getUserData = async () => {
  const { data } = await getLk(currentName.value);
  userData.value = data.data;
};

watch(currentName, () => {
  getChat();
  getUserData();
});

setInterval(() => {
  if (currentName.value !== "") {
    getChat();
  }
}, 1000);
</script>
<template lang="html">
  <Splitter class="h-screen">
    <SplitterPanel :size="25" :min-size="20" ref="peoples">
      <Peoples v-model:current-name="currentName" :width="peoplesWidth" />
    </SplitterPanel>
    <SplitterPanel :size="75" :min-size="35" ref="chat">
      <Chat
        :user-data="userData"
        :current-user="currentName"
        :messages="messages"
        :current-id="currentId"
      />
    </SplitterPanel>
  </Splitter>
</template>
<style lang="scss"></style>
