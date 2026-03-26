import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        loggedin_user_id: string;
        loggedin_user_name?: string;
        loggedin_user_role: string;
      };
    }
  }
}
