import { AxiosError } from "axios";
import { ApiClient } from "./Client";

export const getLk = async (username: string) => {
  try {
    const response = await ApiClient({
      method: "GET",
      url: `service-profile/lk?username=${username}`,
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

export const getMyLk = async () => {
  try {
    const response = await ApiClient({
      method: "GET",
      url: `service-profile/lk/me`,
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

export const changeLk = async (
  name: string,
  surname: string,
  patronymic: string,
  birthday: string,
  username?: string,
  phone?: string
) => {
  let myData;
  if (username && phone) {
    myData = {
      name,
      surname,
      patronymic,
      birthday,
      username,
      phone,
    };
  } else if (username && !phone) {
    myData = {
      name,
      surname,
      patronymic,
      birthday,
      username,
    };
  } else if (!username && phone) {
    myData = {
      name,
      surname,
      patronymic,
      birthday,
      phone,
    };
  } else {
    myData = {
      name,
      surname,
      patronymic,
      birthday,
    };
  }

  try {
    const response = await ApiClient({
      data: myData,
      method: "POST",
      url: `service-profile/lk/change/info`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
        Accept: "*/*",
      },
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

export const changeEmail = async (email: string) => {
  const myData = {
    email,
  };
  try {
    const response = await ApiClient({
      data: myData,
      method: "POST",
      url: `service-profile/lk/change/email`,
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

export const changeEmailCode = async (code: string) => {
  const myData = {
    code,
  };
  try {
    const response = await ApiClient({
      data: myData,
      method: "POST",
      url: `service-profile/lk/change/email/confirm`,
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

export const addAvatar = async (formdata: FormData) => {
  try {
    const response = await ApiClient({
      data: formdata,
      method: "POST",
      url: `service-profile/lk/change/avatar`,
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
