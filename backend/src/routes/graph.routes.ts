import Router from "express";
import { graph } from "../controllers/graph.controller";

const router = Router();

router.post("/",graph);

export default router;