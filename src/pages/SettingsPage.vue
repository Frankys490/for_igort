<script setup lang="ts">
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import { ref, onMounted, watch } from "vue";
import {
  getMyLk,
  changeLk,
  changeEmail,
  changeEmailCode,
} from "../services/LkService";
import InputMask from "primevue/inputmask";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";
import { useRouter } from "vue-router";
import ProgressSpin from "../components/ProgressSpin.vue";
import moment from "moment";
import { addAvatar } from "../services/LkService";
import SettingsElement from "../components/SettingsElement.vue";

const name = ref("");
const surname = ref("");
const patronymic = ref("");
const username = ref("");
const birthday = ref("");
const phone = ref("");
const newEmail = ref("");
const email = ref();
const avatar = ref();

const currentStage = ref(1);

const isEdit = ref(false);
const isEmailEdit = ref(false);
const code = ref("");
const oldPhone = ref();
const oldUsername = ref();

const router = useRouter();

const formData = new FormData();

const sendFile = async (e: any) => {
  formData.append("profile_picture", e.target.files[0]);
  await addAvatar(formData);
};

const toggleIsEdit = () => {
  isEdit.value = !isEdit.value;
};

onMounted(async () => {
  const { data } = await getMyLk();
  avatar.value = data.data.profile_picture_link;
  email.value = data.data.email;
  name.value = data.data.name;
  surname.value = data.data.surname;
  patronymic.value = data.data.patronymic;
  username.value = data.data.username;
  birthday.value = data.data.birthday;
  phone.value = data.data.phone;
  oldPhone.value = data.data.phone;
  oldUsername.value = data.data.username;
});

watch(isEdit, async () => {
  if (!isEdit.value) {
    let newBirthday = "";
    if (birthday.value.length < 11) {
      newBirthday = birthday.value;
    } else {
      moment(birthday.value, moment.ISO_8601).format("DD.MM.yyyy");
    }
    if (
      oldPhone.value !== phone.value &&
      oldUsername.value !== username.value
    ) {
      await changeLk(
        name.value,
        surname.value,
        patronymic.value,
        newBirthday,
        username.value,
        phone.value
      );
    } else if (
      oldPhone.value !== phone.value &&
      oldUsername.value === username.value
    ) {
      await changeLk(
        name.value,
        surname.value,
        patronymic.value,
        newBirthday,
        undefined,
        phone.value
      );
    } else if (
      oldPhone.value === phone.value &&
      oldUsername.value !== username.value
    ) {
      await changeLk(
        name.value,
        surname.value,
        patronymic.value,
        newBirthday,
        username.value
      );
    } else {
      await changeLk(name.value, surname.value, patronymic.value, newBirthday);
    }
  }
});

const newEmailChange = async () => {
  if (newEmail.value) {
    await changeEmail(newEmail.value);
    currentStage.value = 2;
    newEmail.value = "";
  }
};

const close = async () => {
  await changeEmailCode(code.value);
  isEmailEdit.value = false;
  code.value = "";
};

watch(isEmailEdit, () => {
  if (!isEmailEdit.value) {
    currentStage.value = 1;
  }
});
</script>
<template lang="html">
  <div class="flex justify-center items-center h-screen relative">
    <Button
      icon="pi pi-chevron-left"
      severity="secondary"
      text
      rounded
      aria-label="Search"
      class="absolute top-2 left-2"
      @click="router.push('chat')"
    />
    <ProgressSpin v-if="!name" />
    <Card class="w-[30%]" v-else>
      <template #content>
        <div class="flex flex-col items-center p-3">
          <div class="flex items-center flex-col">
            <Avatar :image="avatar" class="mr-2" size="large" />
            <p
              class="text-xs text-blue-500 hover:text-blue-500/70 cursor-pointer"
            >
              <input
                id="inputPhoto"
                type="file"
                multiple
                class="opacity-0 absolute"
                @change="sendFile"
              />
              <label
                for="inputPhoto"
                class="text-blue-500 hover:text-blue-500/80"
              >
                Выбрать новое фото
              </label>
            </p>
          </div>

          <div class="w-full mt-3">
            <p class="text-xs">Email</p>
            <div class="flex w-full justify-between items-center">
              <p>{{ email }}</p>
              <Button
                label="Изменить"
                size="small"
                @click="isEmailEdit = true"
              />
            </div>
          </div>
          <div class="flex flex-col gap-2 w-full mt-3">
            <div class="flex justify-between items-center w-full">
              <p>Основная информация</p>
              <Button
                :label="isEdit ? 'Сохранить' : 'Изменить'"
                @click="toggleIsEdit"
                size="small"
              />
            </div>
            <div>
              <SettingsElement title="Имя">
                <InputText v-model="name" class="w-full" :disabled="!isEdit" />
              </SettingsElement>
              <SettingsElement title="Фамилия">
                <InputText
                  v-model="surname"
                  class="w-full"
                  :disabled="!isEdit"
                />
              </SettingsElement>
              <SettingsElement title="Отчество">
                <InputText
                  v-model="patronymic"
                  class="w-full"
                  :disabled="!isEdit"
                />
              </SettingsElement>
              <SettingsElement title="Имя пользователя">
                <InputText
                  v-model="username"
                  class="w-full"
                  :disabled="!isEdit"
                />
              </SettingsElement>
              <SettingsElement title="Телефон">
                <InputMask
                  mask="+7(999)999-99-99"
                  placeholder="Номер телефона"
                  v-model="phone"
                  class="w-full"
                  :disabled="!isEdit"
                />
              </SettingsElement>
              <SettingsElement title="Дата рождения">
                <Calendar
                  dateFormat="dd.mm.yy"
                  placeholder="Дата рождения"
                  v-model="birthday"
                  class="w-full"
                  :disabled="!isEdit"
                />
              </SettingsElement>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
  <Dialog
    v-model:visible="isEmailEdit"
    modal
    header="Изменение Email"
    :style="{ width: '30rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="flex flex-col gap-2" v-if="currentStage === 1">
      <InputText placeholder="Новый email" class="w-full" v-model="newEmail" />
      <Button label="Далее" class="self-end" @click="newEmailChange" />
    </div>
    <div class="flex flex-col gap-2" v-if="currentStage === 2">
      <v-otp-input :length="4" v-model="code"></v-otp-input>
      <Button label="Завершить" class="self-end" @click="close" />
    </div>
  </Dialog>
</template>
