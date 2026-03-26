import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { User } from "../models/users.model";

export const UsersController = {
  getAllUsers: async (req: Request, res: Response) => {
    
    const users = await User.find({}).exec();

    return res.status(200).json({
      message: "All Users",
      data: users,
    });
  },
  createNew: async (req: Request, res: Response) => {
    try {
      const { name, password, role }: IUser = req.body;
      const email = req.body.email.toLowerCase().replace(/\s/g, "");
        
      const existingUser = await User.findOne({ email }).exec();

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await Bun.password.hash(password); 

      const newUser = await User.create({
        name,
        email: email,
        password: hashedPassword,
        role,
      });
      
      const {password: _, ...rest} = newUser.toObject();

      return res.status(201).json({
        message: "User Created Successfully",
        data: rest,
      });

    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err.message });
    }
  },
};
