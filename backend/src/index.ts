import express, { type Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import UsersRouter from "./routes/users.routes";
import { connectToMongoDB } from "./db/db";
import AuthRouter from "./routes/auth.routes";
import PostRouter from "./routes/post.routes";
import CommentRouter from "./routes/comment.routes";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/users", UsersRouter);
app.use("/auth", AuthRouter);
app.use("/post", PostRouter);
app.use("/comment", CommentRouter);

const PORT: number = Number(process.env.PORT) || 9002;

connectToMongoDB()
            .then(() => console.log("Database is Connected Successfully 🚀"))
            .catch((err) =>  console.error("DB Error:", err))

app.listen(PORT, () => {
  console.log("\x1b[32mServer is running on port " + "\x1b[33m " + PORT + "\x1b[0m");
})
