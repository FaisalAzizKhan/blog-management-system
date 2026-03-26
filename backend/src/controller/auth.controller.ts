import type { Request, Response } from "express";
import { User } from "../models/users.model";
import { createToken } from "../utilities/token/token.utilities";

export const AuthController = {
    login: async (req: Request, res: Response) => {
       try {

        const email = req.body.email.toLowerCase().replace(/\s/g, "");
        const password = req.body.password;

        if (!email || email === "" || email.lenght === 0 || !password || password === "" || password.lenght === 0) {
          return res.status(400).json({ message: "email and password are required" });
        }
        
        const users = await User.findOne({ email: email }).select("+password").exec();
        console.log(email, password, users?.password);

        if (!users) {
          return res.status(400).json({ message: "User does not exist" });
        }

        const matched = await Bun.password.verify(password, users?.password);

        if (!matched) {
          return res.status(400).json({ message: "Password does not match" });
        }

        const {password: _, ...rest} = users.toObject();

        const token = await createToken(users._id, users.role)

         return res.status(200).json({
           message: "Login Successful",
           data: {
             ...rest,
             token,
           },
         });

       } catch (err: any) {

        console.error(err);
        return res.status(500).json({ message: err.message });

       }
    },
}