import Router from "express";
import { acceptFriendRequest, getFriendRequests, getFriends, getSuggestions, removeFriend, searchUsers, sendFriendRequest, updateOnlineStatus } from "../controllers/friend.controller";

const router = Router();

router.post("/requests",getFriendRequests);
router.post("/accept",acceptFriendRequest);
router.post("/remove", removeFriend);
router.post("/search", searchUsers);
router.post("/suggestions", getSuggestions);
router.get("/all", getFriends);
router.post("/onlinestatus", updateOnlineStatus);
router.post("/friend/request", sendFriendRequest);




export default router;