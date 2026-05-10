import Router from "express";
import { getUser, getDetails, createUser, updatePicture, updateUsername } from "../controllers/user.controller";
const router = Router();

router.get("/getUser", getUser);
router.get("/details",getDetails);
router.post("/createUser",createUser);
router.post("/updatePicture", updatePicture);
router.post("/updateUsername", updateUsername);
export default router;