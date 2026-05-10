import Router from "express";
import { createPost, deletePost, generateUploadUrl, getPosts, likePost, postCount, unlikePost, uploadPost, uploadWithoutImage } from "../controllers/post.controller";
const router = Router();

router.get("/getPosts",getPosts);
router.get("/count",postCount);
router.post("/likePost",likePost);
router.post("/deletePost",deletePost);
router.post("/unlikePost", unlikePost);
router.post("/uploadPost",uploadPost);
router.post("/uploadWithoutImage",uploadWithoutImage);
router.post("/generateUploadUrl",generateUploadUrl);
router.post("/create",createPost);

export default router;