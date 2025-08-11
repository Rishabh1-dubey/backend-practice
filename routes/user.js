import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstName, email, password } = req.body;

  if (!firstName || !email || !password) {
    return res.status(401).json({
      message: "Pleases enter a valid credentails",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({ email });
  if (user) {
    return res.status(402).json({
      success: false,
      message: "Email is already Exist",
    });
  }

  const newUser = await User.create({
    firstName,
    email,
    password: hashPassword,
  });
  return res.status(201).json({
    message: "User enter Successfully",
    newUser,
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "Please enter valid email or password" });
  }

  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid Email or Password",
    });
  }
  
  const matchPassword = await bcrypt.compare(password, user.password);
     if (!matchPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
  return res
    .status(201)
    .json({ message: `User loggedIN successfully !!! Welcome back ${user.firstName}`, email, matchPassword });
});

export default router;