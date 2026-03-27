import { AxiosError } from "axios";
import { AxiosApiCall } from "../Api/AxiosClient";
import { useMutation } from "@tanstack/react-query";

export const useTenStackMutation = <
  T extends ApiMutationGenerics = ApiMutationGenerics
>(
  params: ApiMutationParams<T["variables"]> & { headers?: Record<string, any> },
  options?: ApiMutationHookOptions<T, T, T>
): ApiMutationHookReturn<any, any, any> => {
  const { url, method, data, headers } = params;

 return useMutation<T["data"], AxiosError, T["variables"], T["context"]>({
   mutationFn: (variables: any) =>
     AxiosApiCall<T["data"]>({
       url,
       method,
       data:
         variables instanceof FormData
           ? variables
           : typeof variables === "object" && !Array.isArray(variables)
           ? { ...(data || {}), ...variables }
           : variables,

       headers:
         variables instanceof FormData
           ? { ...headers, "Content-Type": "multipart/form-data" }
           : headers,
     }),
   ...options,
 });
};

