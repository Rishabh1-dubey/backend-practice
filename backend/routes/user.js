import express from "express";
import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
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
  const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res.status(201).json({
    message: "User enter Successfully",
    newUser,
    token,
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

  const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .json({
      message: `User loggedIN successfully !!! Welcome back ${user.firstName}`,
      email,
      matchPassword,
      token,
    });
});

router.get("/logout", (_, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ success: true, message: "User logout Successfully" });
  } catch (error) {
    console.log(error);
  }
});

export default router;
