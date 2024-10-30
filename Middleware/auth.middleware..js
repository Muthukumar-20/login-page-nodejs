import jwt from "jsonwebtoken";
import User from "../Models/user.schema.js";
import dotenv from "dotenv";

dotenv.config();

const authmiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.stutas(401).json({ message: "token error" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded;
    const user = await User.findById(req.user._id);

    if (user.role != "user") {
      return res.status(401).json({ message: "denied" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export default authmiddleware;

