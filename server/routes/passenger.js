import express from "express";
import {
    loginPassenger,
    registerPassenger,
    getAll
} from "../controllers/passenger.js";

const router = express.Router();

router.post("/passenger/register", registerPassenger);
router.post("/passenger/login", loginPassenger);
router.get("/passenger/getAll", getAll)

export default router;
