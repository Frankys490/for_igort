<script setup lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import { useAuthStore } from "../store/regStore";
import { confirmEmail } from "../services/RegisterService";
import { ref } from "vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import ProgressSpin from "./ProgressSpin.vue";

interface EmailConfirmEmits {
  (e: "update:currentStage", value: number): void;
}

const emit = defineEmits<EmailConfirmEmits>();

const toast = useToast();
const isEmpty = ref(false);
const responseStatus = ref(false);
const show = () => {
  toast.add({
    severity: "error",
    summary: "Возникла ошибка",
    detail: "Повторите попытку позже",
    life: 3000,
  });
};

const store = useAuthStore();
const code = ref("");

const sendCode = async () => {
  if (!code.value) {
    isEmpty.value = true;
  } else {
    responseStatus.value = true;
    const { status, data } = await confirmEmail(
      +code.value,
      store.value.phone,
      store.hashFirst
    );
    if (status === 200) {
      responseStatus.value = false;
      emit("update:currentStage", 3);
      store.setSecondHash(data.data.hash);
    }
    if (status !== 200) {
      responseStatus.value = false;
      show();
    }
  }
};
</script>
<template lang="html">
  <ProgressSpin v-if="responseStatus" />
  <Toast />
  <div
    class="h-screen w-screen flex flex-col gap-2 justify-center items-center"
  >
    <p
      class="text-[#ff5c5c] text-lg"
      :class="isEmpty ? 'opacity-100' : 'opacity-0'"
    >
      Заполните поле!
    </p>
    <Card class="p-4 w-[30%]">
      <template #header>
        <h2 class="text-lg">Подтверждение почты</h2>
      </template>
      <template #content>
        <v-otp-input :length="4" v-model="code"></v-otp-input>
      </template>
      <template #footer>
        <Button label="Подтвердить" class="mt-2 w-full" @click="sendCode" />
      </template>
    </Card>
  </div>
</template>
<style lang="scss"></style>
