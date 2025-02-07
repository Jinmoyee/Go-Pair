import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        identity: {
            type: String,
            required: true,
            default: "pilot", // Automatically set to "pilot"
            immutable: true, // Prevents modifications
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
        },
        vehicleNumber: {
            type: String,
            required: true,
        },
        vehicleSeat: {
            type: Number,
            required: true,
            min: 2, // Ensures the value cannot be 1
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Pilot = mongoose.model("Pilot", schema);
