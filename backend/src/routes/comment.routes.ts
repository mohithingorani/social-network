import Router from "express";
import { addComment, getAllComments } from "../controllers/comment.controller";

const router = Router();

router.post("/add",addComment);
router.post("/all",getAllComments);

export default router;