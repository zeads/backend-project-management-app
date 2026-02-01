import express from "express";
import "dotenv/config";
import dbConnect from "./config/db";
import authRouter from "./routes/auth.route";
import projectRouter from "./routes/project.route";
import userRouter from "./routes/user.route";
import taskRouter from "./routes/task.route";

// dbConnect();
async function init() {
  try {
    const result = await dbConnect();
    console.log("Database status : ", result);

    const app = express();

    app.use(express.json());

    app.use("/api/auth", authRouter);
    app.use("/api/project", projectRouter);
    app.use("/api/user", userRouter);
    app.use("/api/task", taskRouter);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
