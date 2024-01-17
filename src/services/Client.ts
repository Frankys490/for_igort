import axios, { AxiosRequestConfig } from "axios";

interface Client {
  data?: unknown | undefined;
  method?: string | undefined;
  url: string | undefined;
  params?: string | undefined;
  body?: unknown | undefined;
  headers?:
    | {
        [key: string]: string;
      }
    | undefined;
}

const REQUEST_TIMEOUT = 5000;

const API = axios.create({
  baseURL: "https://center.web-gen.ru:444/api/",
  timeout: REQUEST_TIMEOUT,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": true,
  },
});

export const ApiClient = async ({
  data,
  method = "GET",
  url,
  params,
  headers,
}: Client) => {
  const requestParams: AxiosRequestConfig = {
    method,
    url,
    params,
    data,
    responseType: "json",
  };

  API.defaults.headers = { ...API.defaults.headers, ...headers };

  return API(requestParams)
    .then((res) => ({ data: res.data, status: res.status }))
    .catch((err) => {
      console.error(
        "\nERROR MESSAGE:",
        err.response.data.message,
        `\nSTATUS: ${err.response.data.status}`
      );

      return { data: "isError", status: err.response.status };
    });
};
