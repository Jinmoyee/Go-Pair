import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        identity: {
            type: String,
            required: true,
            default: "passenger", // Automatically set to "pilot"
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
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Passenger = mongoose.model("Passenger", schema);
