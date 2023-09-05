import express, { json } from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import projectsRouter from "./routes/projectsRouter.js";
import tasksRouter from "./routes/tasksRouter.js";

const app = express();
app.use(json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello! I'm running Mr.Patrick");
});

app.use("/api/users", userRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/tasks", tasksRouter);

mongoose
  .connect(
    "mongodb://salmanpatrick5:nullreference404@ac-udwippi-shard-00-00.ggtw5vj.mongodb.net:27017,ac-udwippi-shard-00-01.ggtw5vj.mongodb.net:27017,ac-udwippi-shard-00-02.ggtw5vj.mongodb.net:27017/?ssl=true&replicaSet=atlas-zl36w0-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("App connected to database");
    app.listen(4000, () => {
      console.log(`App is listening to port: 4000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
