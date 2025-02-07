import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        message: "User Already Exists",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({
      message: "User Registered Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user doesn't exist
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Compare provided password with stored password
    const matchPassword = await bcrypt.compare(password, user.password);

    // If passwords do not match
    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SEC, {
      expiresIn: "15d", // 15 days
    });

    // Send token in the response
    res.json({
      message: `Welcome back ${user.name}`,
      token, // Client should store this in localStorage
      user, // Send user details back (except password)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// export const myProfile = async (req, res) => {
//   try {
//     res.json({ user: req.user });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
