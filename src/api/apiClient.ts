import axios, { AxiosRequestConfig } from "axios";

const timeout = 180000;

const getApiClient = (baseUrl: string) => {
  const apiClient = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    timeout: timeout,
  } satisfies AxiosRequestConfig);
  return apiClient;
};

export default getApiClient;
