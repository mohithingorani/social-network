import Router from "express";
import { createMessage, getAllMessages } from "../controllers/message.controller";
const router = Router();

router.post("/create", createMessage);
router.get("/allMessages", getAllMessages);

export default router;