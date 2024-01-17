import { AxiosError } from "axios";
import { ApiClient } from "./Client";

export const searchUser = async (username: string) => {
  try {
    const response = await ApiClient({
      method: "GET",
      url: `service-chat/chat/search?search=${username}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        Accept: '*/*'
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
