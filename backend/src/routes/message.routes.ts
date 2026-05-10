import Router from "express";
import {
  createMessage,
  getAllMessages,
  getInbox,
  markRead,
} from "../controllers/message.controller";
const router = Router();

router.post("/create", createMessage);
router.get("/allMessages", getAllMessages);
router.get("/inbox", getInbox);
router.post("/markRead", markRead);

export default router;
