<script setup lang="ts">
import { ref } from "vue";
interface MessageProps {
  messageType: "string" | "file" | "picture";
  messageData: string;
  currentId: number;
  uid: number;
  id: number;
  messageTime: number;
}
const props = defineProps<MessageProps>();

const minutes = ref(String(new Date(props.messageTime * 1000).getMinutes()));
const hours = ref(String(new Date(props.messageTime * 1000).getHours()));
</script>
<template lang="html">
  <div
    class="inline-block min-w-[170px] max-w-[400px] rounded-md p-3"
    :class="
      props.currentId === props.uid
        ? 'self-end bg-cyan-500/80'
        : 'self-start bg-cyan-700/80'
    "
    :id="`message-${String(props.id)}`"
  >
    <div class="flex flex-col">
      <p class="text-white" v-if="props.messageType === 'string'">
        {{ props.messageData }}
      </p>
      <img
        :src="props.messageData"
        v-else-if="props.messageType === 'picture'"
        class="w-[300px] h-[300px] object-cover"
      />
      <a
        :href="props.messageData"
        download
        class="text-blue-500 hover:underline cursor-pointer"
        v-else-if="props.messageType === 'file'"
      >
        <i class="pi pi-file text-white"></i>
        {{ props.messageData.split("/")[5] }}
      </a>
      <p class="text-xs self-end">
        {{
          `${hours.length < 2 ? `0${hours}` : hours}:${
            minutes.length < 2 ? `0${minutes}` : minutes
          }`
        }}
      </p>
    </div>
  </div>
</template>
<style lang="scss"></style>
