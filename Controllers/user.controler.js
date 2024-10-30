import User from "../Models/user.schema.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashPassword, role });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User register successfully ", data: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "invalid password" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "5h",
    });
    user.token = token;
    await user.save();
    res.status(200).json({ message: "user logged", token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    //const userId = req.user._id;
    const user = await User.find();
    res.status(200).json({ message: "Authorized User", data: user });
  } catch (error) {
        res.status(500).json({ message: error.message });
  }
};
