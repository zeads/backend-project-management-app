import express from "express";
import "dotenv/config";
import dbConnect from "./config/db";
import authRouter from "./routes/auth.route";
import projectRouter from "./routes/project.route";
import userRouter from "./routes/user.route";
import taskRouter from "./routes/task.route";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

dbConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
