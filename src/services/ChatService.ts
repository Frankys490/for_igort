import { AxiosError } from "axios";
import { ApiClient } from "./Client";

export const getChats = async () => {
  try {
    const response = await ApiClient({
      method: "GET",
      url: `service-chat/chat/get-all`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
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

export const setOnline = async () => {
  try {
    const response = await ApiClient({
      method: "GET",
      url: `service-chat/online`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        Accept: "*/*",
      },
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

export const getChatByUsername = async (username: string) => {
  try {
    const response = await ApiClient({
      data: {
        username,
      },
      method: "POST",
      url: `service-chat/chat/search/get`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        Accept: "*/*",
        "Content-Type": "a/form-data",
      },
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

export const sendFile = async (formdata: FormData) => {
  try {
    const response = await ApiClient({
      data: formdata,
      method: "POST",
      url: `service-chat/chat/send/file`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        Accept: "*/*",
        "Content-Type": "multipart/form-data",
      },
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
