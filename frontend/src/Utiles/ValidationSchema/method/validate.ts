import { z } from "zod";

export const validateForm = (
  data: any,
  schema: z.ZodType<any>,
  setValidationErrors: (errors: Record<string, string>) => void
) => {
  const result: any = schema.safeParse(data);

  if (result.success) {
    setValidationErrors({}); // Clear any previous errors
    return true;
  } else {
    const formattedErrors: Record<string, string> = {};

    result.error.errors.forEach((err: any) => {
      if (err.path.length > 0) {
        formattedErrors[err.path[0] as string] = err.message;
      }
    });

    setValidationErrors(formattedErrors);
    return false;
  }
};
