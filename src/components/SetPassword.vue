<script setup lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import { useAuthStore } from "../store/regStore";
import { setPassword } from "../services/RegisterService";
import { ref } from "vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import ProgressSpin from "./ProgressSpin.vue";
import InputText from "primevue/inputtext";
import { watch } from "vue";
import { useRouter } from 'vue-router';

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
const password = ref("");

const router = useRouter()

const sendCode = async () => {
  if (!password.value) {
    isEmpty.value = true;
  } else {
    responseStatus.value = true;
    const { status } = await setPassword(
      password.value,
      store.value.phone,
      store.hashFirst,
      store.hashSecond
    );
    if (status === 200) {
      responseStatus.value = false;
      emit("update:currentStage", 3);
      router.push('chat')
    }
    if (status !== 200) {
      responseStatus.value = false;
      show();
    }
  }
};

watch(password, () => {
  isEmpty.value = false;
});
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
        <h2 class="text-lg">Новый пароль</h2>
      </template>
      <template #content>
        <div class="flex flex-col gap-2">
          <label for="username">Логин</label>
          <InputText disabled :value="store.value.phone" />
        </div>

        <div class="flex flex-col gap-2 mt-2">
          <label for="username">Новый пароль</label>
          <InputText type="password" v-model="password" />
        </div>
      </template>
      <template #footer>
        <Button
          label="Завершить регистрацию"
          class="mt-2 w-full"
          @click="sendCode"
        />
      </template>
    </Card>
  </div>
</template>
<style lang="scss"></style>
