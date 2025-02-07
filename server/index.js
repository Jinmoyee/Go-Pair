import express from "express";
import dotenv from "dotenv";
import connectDb from "./database/db.js";
import cors from "cors";

dotenv.config();
const app = express();

// using middlewares
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend URL
  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));

import userRoutes from "./routes/user.js";
import passengerRoutes from "./routes/passenger.js";
import pilotRoutes from "./routes/pilot.js"

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello")
})

app.use("/api", userRoutes);
app.use("/api", passengerRoutes);
app.use("/api", pilotRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDb();
});
