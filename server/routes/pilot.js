import express from "express";
import {
    loginPilot,
    registerPilot,
    getAll
} from "../controllers/pilot.js";

const router = express.Router();

router.post("/pilot/register", registerPilot);
router.post("/pilot/login", loginPilot);
router.get("/pilot/getAll", getAll);

export default router;
