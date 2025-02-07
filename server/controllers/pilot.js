import { Pilot } from "../models/Pilot.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerPilot = async (req, res) => {
    try {
        const { name, email, phone, vehicleNumber, vehicleSeat, password } = req.body;

        // Check if pilot already exists
        let pilot = await Pilot.findOne({ email });
        if (pilot) {
            return res.status(400).json({ message: "Pilot Already Exists" });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new pilot
        pilot = await Pilot.create({
            name,
            email,
            phone,
            vehicleNumber,
            vehicleSeat,
            password: hashPassword,
        });

        res.status(201).json({ message: "Pilot Registered Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginPilot = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find pilot
        const pilot = await Pilot.findOne({ email });
        if (!pilot) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare passwords
        const matchPassword = await bcrypt.compare(password, pilot.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Set the identity cookie
        res.cookie("identity", "pilot");

        res.json({
            message: `Welcome back ${pilot.name}`,
            pilot: {
                _id: pilot._id,
                name: pilot.name,
                email: pilot.email,
                phone: pilot.phone,
                vehicleNumber: pilot.vehicleNumber,
                vehicleSeat: pilot.vehicleSeat,
                createdAt: pilot.createdAt,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

