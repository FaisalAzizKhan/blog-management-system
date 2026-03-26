import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const headers: any = req.headers
    const authorization = headers.authorization

    if (!Bun.env.JWT_SECRET_KEY) {
      return res.status(500).json({ message: "ENV is missing" });
    }

    if (!authorization) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    const decoded: any = jwt.verify(token, Bun.env.JWT_SECRET_KEY);

    req.user = {
      loggedin_user_id: decoded.loggedin_user_id,
      loggedin_user_name: decoded.loggedin_user_name,
      loggedin_user_role: decoded.loggedin_user_role,
    };

    next();
  } catch (err: any) {
    return res.status(401).json({
      message: err.message || "Unauthorized",
    });
  }
};


export const createToken = async (
  user_id: any,
  user_role: string,
  expireTime: string = "36h"
): Promise<string> => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is missing");
  }

  const payload = {
    loggedin_user_id: user_id,
    loggedin_user_role: user_role,
  };

  const secret = Bun.env.JWT_SECRET_KEY || "";

  const token = jwt.sign(payload, secret);

  return token;
};