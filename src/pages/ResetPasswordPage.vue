<script setup lang="ts">
import Button from "primevue/button";
import Card from "primevue/card";
import { ref, watch } from "vue";
import ProgressSpin from "../components/ProgressSpin.vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import InputMask from "primevue/inputmask";
import { useRegStore } from "../store/loginStore";
import { useRouter } from "vue-router";
import {
  resetPasswordFirst,
  resetPasswordCode,
  newPassword,
} from "../services/ResetPasswordService";
import InputText from "primevue/inputtext";
const toast = useToast();

const currentStage = ref(1);

const phone = ref("");
const password = ref("");

const code = ref("");

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

const store = useRegStore();
const router = useRouter();

const login = async () => {
  if (!phone.value) {
    isEmpty.value = true;
  } else {
    const { status, data } = await resetPasswordFirst(phone.value);
    responseStatus.value = true;
    if (status === 200) {
      store.setValues(data.data.hash, phone.value);
      responseStatus.value = false;
      currentStage.value = 2;
    }
    if (status !== 200) {
      show();
    }
  }
};

const sendCode = async () => {
  if (!code.value) {
    isEmpty.value = true;
  } else {
    responseStatus.value = true;
    const { status } = await resetPasswordCode(
      store.login,
      +code.value,
      store.hash
    );
    if (status === 200) {
      responseStatus.value = false;
      currentStage.value = 3;
    }
    if (status !== 200) {
      responseStatus.value = false;
      show();
    }
  }
};

const newPass = async () => {
  if (!password.value) {
    isEmpty.value = true;
  } else {
    responseStatus.value = true;
    const { status } = await newPassword(
      store.login,
      +code.value,
      store.hash,
      password.value
    );
    if (status === 200) {
      responseStatus.value = false;
      currentStage.value = 3;
    }
    if (status !== 200) {
      responseStatus.value = false;
      show();
    }
  }
};

watch([phone, password], () => {
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
      Заполните все поля!
    </p>
    <Card class="p-4 w-[30%]" v-if="currentStage === 1">
      <template #header>
        <h2 class="text-lg">Сброс пароля</h2>
      </template>
      <template #content>
        <div class="flex flex-col gap-2">
          <InputMask
            mask="+7(999)999-99-99"
            placeholder="Номер телефона"
            v-model="phone"
          />
          <Button label="Продолжить" class="mt-2" @click="login" />
          <div class="flex justify-center mt-3">
            <p
              class="cursor-pointer hover:text-blue-600 duration-300 text-sm"
              @click="router.push('/')"
            >
              Случайно вспомнил пароль и хочу войти
            </p>
          </div>
        </div>
      </template>
    </Card>
    <Card class="p-4 w-[30%]" v-else-if="currentStage === 2">
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
    <Card class="p-4 w-[30%]" v-else>
      <template #header>
        <h2 class="text-lg">Придумайте новый пароль</h2>
      </template>
      <template #content>
        <InputText placeholder="Пароль" v-model="password" type="password" />
      </template>
      <template #footer>
        <Button label="Завершить" class="mt-2 w-full" @click="newPass" />
      </template>
    </Card>
  </div>
</template>
<style lang="scss"></style>
