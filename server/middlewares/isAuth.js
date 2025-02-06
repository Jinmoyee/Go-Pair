import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuth = async (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(403).json({ message: "Please Login" });
    }

    // Verify the token
    const decodedData = jwt.verify(token, process.env.JWT_SEC);

    // Attach the user to the request object (optional: exclude password)
    req.user = await User.findById(decodedData._id).select("-password");

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: "Invalid or Expired Token" });
  }
};
