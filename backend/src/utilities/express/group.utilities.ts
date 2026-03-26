import { Router, type Request, type Response } from "express";


export const expressGroup = (router: Router) => {
  return {
    group: (prefix: string, callback: (groupRouter: Router) => void) => {
      const groupRouter = Router();
      callback(groupRouter);
      router.use(prefix, groupRouter);
    },
  };
}
