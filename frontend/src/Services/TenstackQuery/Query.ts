import { useQuery } from "@tanstack/react-query";
import { AxiosApiCall } from "../Api/AxiosClient";
import type { AxiosError } from "axios";
import { HTTPAxiosMethod } from "../../Types/Enums/Methods";

export const useTenStackQuery = <TData = any>({
  key,
  url,
  params,
  headers,
  options,
}: TenStackQueryParams<TData>) => {
  return useQuery<TData, AxiosError, TData, string[]>({
    queryKey: key,
    queryFn: async () =>
      AxiosApiCall<TData>({
        url,
        method: HTTPAxiosMethod.GET,
        params,
        headers,
      }),
    ...options,
  });
};


// export const useTenStackQuery = <TData = any>({
//   key,
//   url,
//   params,
//   headers,
//   options,
// }: TenStackQueryParams<TData>) => {
//   return useQuery<TData, AxiosError, TData, string[]>({
//     queryKey: key,
//     queryFn: async () =>
//       AxiosApiCall<TData>({
//         url,
//         method: HTTPAxiosMethod.GET,
//         params,  // ✅ FIXED
//         headers,
//       }),
//     ...options,
//   });
// };
