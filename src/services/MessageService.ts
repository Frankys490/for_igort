import { AxiosError } from "axios";
import { ApiClient } from "./Client";

export const sendMessage = async (
  receiver_username: string,
  message: string
) => {
  try {
    const response = await ApiClient({
      data: {
        receiver_username,
        message,
      },
      method: "POST",
      url: `service-chat/chat/send/message`,
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

export const searchMessage = async (search: string, chat_id: number) => {
  try {
    const response = await ApiClient({
      method: "GET",
      url: `service-chat/chat/message/search?search=${search}&chat-id=${chat_id}`,
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
