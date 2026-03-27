import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
 
if (import.meta.env.VITE_BACKEND_BASE_URL === undefined) {
  throw new Error(
    "VITE_BACKEND_BASE_URL is not defined. Please set it in your .env file."
  )
}
 
export const AxiosClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
 
AxiosClient.interceptors.request.use(
 
  (config: InternalAxiosRequestConfig) => {
    const rootPersistedState: any = localStorage.getItem("persist:root");
 
      let token: string | undefined;
     
 
      if (rootPersistedState) {
        try {
          const parsedState = JSON.parse(JSON.parse(rootPersistedState).auth);
          token = parsedState.token ? parsedState.token : undefined;
        } catch (err) {
          console.error("Failed to parse token from localStorage:", err);
        }
      }
 
    if (token && config.headers) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 
export const AxiosApiCall = async <TData = any>({
  url,
  method,
  data,
  headers,
  params,
}: {
  url: string;
  method: string;
  data?: any;
  params?: any;
  headers?: Record<string, any>;
}): Promise<TData | any> => {
  try {
   
    const response = await AxiosClient.request<TData>({
      url,
      method,
      data,
      headers,
      params,
    });
    return response;
  } catch (err: any | Error | unknown) {
    console.error("AxiosApiCall error:", err?.response?.data);
    throw new Error(err);
  }
};