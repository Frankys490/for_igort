<script setup lang="ts">
import Avatar from "primevue/avatar";
import Button from "primevue/button";
import Card from "primevue/card";
import { ref, onMounted } from "vue";
import { getLk } from "../services/LkService";
import { useRoute, useRouter } from "vue-router";
import ProgressSpin from "../components/ProgressSpin.vue";
import UserInfoElement from "../components/UserInfoElement.vue";

const router = useRouter();
const route = useRoute();
const userData = ref();

onMounted(async () => {
  //@ts-ignore
  const { data } = await getLk(route.params.username);
  userData.value = data.data;
});
</script>
<template lang="html">
  <ProgressSpin v-if="!userData" />
  <div class="flex justify-center items-center h-screen relative" v-else>
    <Button
      icon="pi pi-chevron-left"
      severity="secondary"
      text
      rounded
      aria-label="Search"
      class="absolute top-2 left-2"
      @click="router.push('/chat')"
    />
    <Card class="w-[30%]">
      <template #content>
        <div class="flex flex-col items-center p-3">
          <div class="flex items-center flex-col">
            <Avatar
              class="mr-2"
              size="large"
              :image="userData.profile_picture_link"
            />
          </div>

          <div class="w-full mt-3">
            <p class="text-xs">Email</p>
            <div class="flex w-full justify-between items-center">
              <p>{{ userData.email }}</p>
            </div>
          </div>
          <div class="flex flex-col gap-2 w-full mt-3">
            <div class="flex justify-between items-center w-full">
              <p>Основная информация</p>
            </div>
            <UserInfoElement title="Имя" :text="userData.name" />
            <UserInfoElement title="Фамилия" :text="userData.surname" />
            <UserInfoElement title="Отчество" :text="userData.patronymic" />
            <UserInfoElement
              title="Имя пользователя"
              :text="userData.username"
            />
            <UserInfoElement title="Телефон" :text="userData.phone" />
            <UserInfoElement title="Дата рождения" :text="userData.birthday" />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
