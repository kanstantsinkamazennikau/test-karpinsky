import axios from "axios";

export type ApiError = {
  data: { message: string };
  id: string;
  type: string;
};

export const axiosInstance = axios.create({
  baseURL: "https://test.vmarmysh.com",
});
