import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import {TOKEN_SECRET}  from "../../config.js"
export const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const userFount = await User.findOne({ email });
    if (userFount) return res.status(400).json(["the email is already in use"]);

    const passwordHash = await bcrypt.hash(password, 10); // devuelve un string aleatorio con el password encryptado

    const newUSer = new User({
      email,
      password: passwordHash,
      username,
    });

    const userSave = await newUSer.save();
    const token = await createAccesToken({ id: userSave._id });
    res.cookie("token", token);
    res.json({
      id: userSave._id,
      username: userSave.username,
      email: userSave.email,
      createdAt: userSave.createdAt,
      updatedAt: userSave.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFount = await User.findOne({ email });

    if (!userFount) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, userFount.password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = await createAccesToken({ id: userFount._id });

    res.cookie("token", token);
    res.json({
      id: userFount._id,
      username: userFount.username,
      email: userFount.email,
      createdAt: userFount.createdAt,
      updatedAt: userFount.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFount = await User.findById(req.user.id);

  if (!userFount) return res.status(400).json({ message: "User not found" });

  res.json({
    id: userFount._id,
    username: userFount.username,
    email: userFount.email,
    createdAt: userFount.createdAt,
    updatedAt: userFount.updatedAt,
  });
  res.send("profile");
};

export const verifyToken = async (req, res) => {
  const {token} = req.cookies

  if(!token) return res.status(400).json({ message: "Unauthorized" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if(err) return res.status(401).json({ message: "Unauthorized" });

    const userFount = await User.findById(user.id)
    if(!userFount) return res.status(400).json({ message: "Unauthorized" });

    res.json({
      id: userFount._id,
      username: userFount.username,
      email: userFount.email,
    })
  })
}