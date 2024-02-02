import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/userRouter";
import subredditRouter from "./routes/subredditRouter";
import postRouter from "./routes/postRouter";
import commentRouter from "./routes/commentRouter";

dotenv.config();

const app = express();
const port = process.env.PORT;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`📁DATABASE CONNECTED🐳`);
}

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/auth/subreddit", subredditRouter);
app.use("/auth/post", postRouter);
app.use("/auth/comment", commentRouter);

app.get("/", (req, res) => {
  res.send("Welcom on API Reddit");
});

app.listen(port, () =>
  console.log(`Server is listening on port : http://localhost:${port}`)
);
