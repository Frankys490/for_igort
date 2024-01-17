import { defineStore } from "pinia";
import { ref } from "vue";

export const useRegStore = defineStore("auth", () => {
  const hash = ref("");
  const login = ref("");

  const setValues = (hashValue: string, loginValue: string) => {
    hash.value = hashValue;
    login.value = loginValue;
  };

  return { hash, setValues, login };
});
