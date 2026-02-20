import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import friendRoutes from "./routes/friend.routes";
import commentRoutes from "./routes/comment.routes";
import postRoutes from "./routes/post.routes";
import messageRoutes from "./routes/message.routes";
import graphRoutes from "./routes/graph.routes";
import storyRoutes from "./routes/story.routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



app.use("/uploads", express.static("uploads"));
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/friends", friendRoutes);
app.use("/comments", commentRoutes);
app.use("/stories", storyRoutes);
app.use("/messages", messageRoutes);
app.use("/graph", graphRoutes);

export default app;   