
 type ApiMutationHookReturn<TData, TVariables, TContext> =
  UseMutationResult<TData, AxiosError, TVariables, TContext>;

 type ApiMutationHookOptions<TData, TVariables, TContext> =
  UseMutationOptions<TData, AxiosError, TVariables, TContext>;

 interface ApiMutationParams<TVariables> {
  url: string;
  method: "post" | "get" | "patch" | "delete" | "put"
  data?: Partial<TVariables>;
}

 interface ApiMutationGenerics<
  TData = any, TVariables = Record<string, any>, TContext = unknown
> {
  data: TData; variables: TVariables; context: TContext;
}


 // for Query
 interface TenStackQueryParams<TData> {
   key: string[]; // queryKey
   url: string;
   params?: Record<string, any>; // for query params
   headers?: Record<string, any>;
   options?: Omit<
     UseQueryOptions<TData, AxiosError, TData, string[]>,
     "queryKey" | "queryFn"
   >;
 }

