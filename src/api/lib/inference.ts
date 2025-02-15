import axios, { AxiosResponse } from "axios";
import getApiClient from "../apiClient";
import InferenceRequest from "@/types/InferenceRequest";
import InferenceResponse from "@/types/InferenceResponse";

export class InferenceError extends Error {
  statusCode?: number;
  data?: unknown;

  constructor(message: string, statusCode?: number, data?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}

const API_BASE_URL = "/inference";
const apiClient = getApiClient("http://localhost:80");

const handleApiError = (error: unknown, defaultMessage: string): never => {
  const message = error instanceof Error ? error.message : defaultMessage;

  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    const detailedMessage = error.response?.data?.message || error.message;
    const data = error.response?.data;

    throw new InferenceError(
      detailedMessage
        ? `${defaultMessage}: ${detailedMessage}`
        : defaultMessage,
      statusCode,
      data
    );
  }
  throw new InferenceError(message);
};

export const getInference = async (
  request: InferenceRequest
): Promise<InferenceResponse> => {
  const response: AxiosResponse<InferenceResponse> = await apiClient
    .post(API_BASE_URL, request)
    .catch((error) => handleApiError(error, "Failed to get inference"));
  return response.data;
};
