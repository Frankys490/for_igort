import { defineStore } from "pinia";
import { ref } from "vue";

interface userData {
  email: string;
  phone: string;
  name: string;
  surname: string;
  patronymic: string;
  birthday: string;
  username: string;
}

export const useAuthStore = defineStore("auth", () => {
  const value = ref<userData>({
    email: "",
    phone: "",
    name: "",
    surname: "",
    patronymic: "",
    birthday: "",
    username: "",
  });

  const hashFirst = ref("");
  const hashSecond = ref("");

  function addData(data: userData) {
    value.value = data;
  }

  const setFirstHash = (hashValue: string) => {
    hashFirst.value = hashValue;
  };

  const setSecondHash = (hashValue: string) => {
    hashSecond.value = hashValue;
  };

  return { value, addData, hashFirst, hashSecond, setFirstHash, setSecondHash };
});
