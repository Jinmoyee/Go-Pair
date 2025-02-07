import { Passenger } from "../models/Passenger.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerPassenger = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if user already exists
        let passenger = await Passenger.findOne({ email });
        if (passenger) {
            return res.status(400).json({ message: "User Already Exists" });
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new passenger
        passenger = await Passenger.create({
            name,
            email,
            phone,
            password: hashPassword,
        });

        res.status(201).json({ message: "User Registered Successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const loginPassenger = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const passenger = await Passenger.findOne({ email });
        if (!passenger) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // Compare passwords
        const matchPassword = await bcrypt.compare(password, passenger.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        res.cookie("identity", "passenger");

        // Send response without exposing password
        res.json({
            message: `Welcome back ${passenger.name}`,
            passenger: {
                _id: passenger._id,
                name: passenger.name,
                email: passenger.email,
                phone: passenger.phone,
                createdAt: passenger.createdAt,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
