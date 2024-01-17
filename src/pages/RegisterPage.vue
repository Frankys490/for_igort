<script setup lang="ts">
import Button from "primevue/button";
import Calendar from "primevue/calendar";
import Card from "primevue/card";
import InputMask from "primevue/inputmask";
import InputText from "primevue/inputtext";
import { ref, watch } from "vue";
import { regUser } from "../services/RegisterService";
import ProgressSpin from "../components/ProgressSpin.vue";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import moment from "moment";
import { useAuthStore } from "../store/regStore";
import EmailConfirm from "../components/EmailConfirm.vue";
import SetPassword from "../components/SetPassword.vue";
import { useRouter } from "vue-router";

const toast = useToast();

const email = ref("");
const username = ref("");
const name = ref("");
const surname = ref("");
const patronymic = ref("");
const phone = ref("");
const birthday = ref();

const currentStage = ref(1);

const store = useAuthStore();
const router = useRouter();

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

const register = async () => {
  if (
    !email.value ||
    !username.value ||
    !name.value ||
    !surname.value ||
    !patronymic.value ||
    !phone.value ||
    !birthday.value
  ) {
    isEmpty.value = true;
  } else {
    responseStatus.value = true;
    const { status, data } = await regUser(
      email.value,
      username.value,
      name.value,
      surname.value,
      patronymic.value,
      phone.value,
      moment(birthday.value, moment.ISO_8601).format("DD.MM.yyyy")
    );

    if (status === 200) {
      responseStatus.value = false;
      store.addData({
        email: email.value,
        name: name.value,
        surname: surname.value,
        phone: phone.value,
        patronymic: patronymic.value,
        username: username.value,
        birthday: birthday.value,
      });
      currentStage.value = 2;
      store.setFirstHash(data.data.hash);
    }
    if (status !== 200) {
      responseStatus.value = false;
      show();
    }
  }
};

watch([email, name, patronymic, surname, phone, birthday, username], () => {
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
        <h2 class="text-lg">Регистрация</h2>
      </template>
      <template #content>
        <div class="flex flex-col gap-2">
          <InputText
            aria-describedby="email-help"
            placeholder="Email"
            v-model="email"
          />

          <InputText
            aria-describedby="username-help"
            placeholder="Имя пользователя"
            v-model="username"
          />
          <InputText
            aria-describedby="name-help"
            placeholder="Фамилия"
            v-model="surname"
          />
          <InputText
            aria-describedby="name-help"
            placeholder="Имя"
            v-model="name"
          />
          <InputText
            aria-describedby="name-help"
            placeholder="Отчество"
            v-model="patronymic"
          />
          <InputMask
            mask="+7(999)999-99-99"
            placeholder="Номер телефона"
            v-model="phone"
          />
          <Calendar
            dateFormat="dd.mm.yy"
            placeholder="Дата рождения"
            v-model="birthday"
          />
          <Button label="Зарегистрироваться" class="mt-2" @click="register" />
          <div class="flex justify-center">
            <p
              class="cursor-pointer hover:text-blue-600 duration-300"
              @click="router.push('/')"
            >
              Войти
            </p>
          </div>
        </div>
      </template>
    </Card>
    <EmailConfirm
      v-if="currentStage === 2"
      v-model:current-stage="currentStage"
    />
    <SetPassword v-if="currentStage === 3" />
  </div>
</template>
<style lang="scss"></style>
