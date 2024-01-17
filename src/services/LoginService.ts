import { AxiosError } from "axios";
import { ApiClient } from "./Client";

// interface LoginResult {
//   token: string | null;
//   status: number | null;
// }

export const loginUser = async (login: string, password: string) => {
  const loginData = {
    login,
    password,
  };

  try {
    const response = await ApiClient({
      data: loginData,
      method: "POST",
      url: "service-auth/sing-in/hash",
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

export const confirmLoginEmail = async (
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
      url: "service-auth/sing-in/token",
    });

    const { data, status } = response;
    if (status === 200) {
      const jwt = data.data.token;

      localStorage.setItem("JwtToken", jwt);
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

export const confirmDfa = async (login: string, hash: string) => {
  const loginData = {
    login,
    hash,
  };

  try {
    const response = await ApiClient({
      data: loginData,
      method: "POST",
      url: "service-auth/sing-in/dfa",
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
