import Router from "express";
import { getUser, getDetails, createUser } from "../controllers/user.controller";
const router = Router();

router.get("/getUser", getUser);
router.get("/details",getDetails);
router.post("/createUser",createUser);
export default router;