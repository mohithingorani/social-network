import Router from "express";
import { addStory, allStories } from "../controllers/story.controller";
const router = Router();

router.post("/add",addStory);
router.post("/all",allStories);

export default router;