import { AxiosError } from "axios";
import { ApiClient } from "./Client";

export const resetPasswordFirst = async (login: string) => {
  const myData = {
    login,
  };

  try {
    const response = await ApiClient({
      data: myData,
      method: "POST",
      url: "service-auth/recover/email/send",
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

export const resetPasswordCode = async (
  login: string,
  code: number,
  hash: string
) => {
  const myData = {
    login,
    code,
    hash,
  };

  try {
    const response = await ApiClient({
      data: myData,
      method: "POST",
      url: "service-auth/recover/email/confirm",
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

export const newPassword = async (
  login: string,
  code: number,
  hash: string,
  password: string
) => {
  const myData = {
    login,
    code,
    hash,
    password,
  };

  try {
    const response = await ApiClient({
      data: myData,
      method: "POST",
      url: "service-auth/recover/password",
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
