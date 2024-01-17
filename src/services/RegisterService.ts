import { AxiosError } from "axios";
import { ApiClient } from "./Client";

export const regUser = async (
  email: string,
  username: string,
  name: string,
  surname: string,
  patronymic: string,
  phone: string,
  birthday: string
) => {
  const loginData = {
    email,
    username,
    name,
    surname,
    patronymic,
    phone,
    birthday,
  };

  try {
    const response = await ApiClient({
      data: loginData,
      method: "POST",
      url: "service-auth/sing-up/email/send",
    });

    const { data, status } = response;
    if (status === 200) {
      return { data, status };
    } else {
      console.error(`Ошибка при входе. Статус: ${status}`);
      return { data: null, status };
    }
  } catch (error) {
    console.error("Ошибка при входе:", error);
    const errorStatus = (error as AxiosError)?.response?.status || 500;
    return { data: null, status: errorStatus };
  }
};

export const confirmEmail = async (
  code: number,
  login: string,
  hash: string
) => {
  const loginData = {
    code,
    login,
    hash,
  };

  try {
    const response = await ApiClient({
      data: loginData,
      method: "POST",
      url: "service-auth/sing-up/email/confirm",
    });

    const { data, status } = response;
    if (status === 200) {
      return { data, status };
    } else {
      console.error(`Ошибка при входе. Статус: ${status}`);
      return { data: null, status };
    }
  } catch (error) {
    console.error("Ошибка при входе:", error);
    const errorStatus = (error as AxiosError)?.response?.status || 500;
    return { data: null, status: errorStatus };
  }
};

export const setPassword = async (
  password: string,
  login: string,
  hash_first: string,
  hash_second: string
) => {
  const loginData = {
    password,
    login,
    hash_first,
    hash_second,
  };

  try {
    const response = await ApiClient({
      data: loginData,
      method: "POST",
      url: "service-auth/sing-up/token",
    });

    const { data, status } = response;
    if (status === 200) {
      localStorage.setItem("JwtToken", data.data.token);
      return { data, status };
    } else {
      console.error(`Ошибка при входе. Статус: ${status}`);
      return { data: null, status };
    }
  } catch (error) {
    console.error("Ошибка при входе:", error);
    const errorStatus = (error as AxiosError)?.response?.status || 500;
    return { data: null, status: errorStatus };
  }
};
