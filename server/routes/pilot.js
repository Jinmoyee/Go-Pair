import express from "express";
import {
    loginPilot,
    registerPilot,
} from "../controllers/pilot.js";

const router = express.Router();

router.post("/pilot/register", registerPilot);
router.post("/pilot/login", loginPilot);

export default router;
