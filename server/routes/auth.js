import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password, name, age, city, phone, bio } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Заполните поля" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Такой пользователь уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      age,
      city,
      phone,
      bio,
      tickets: []
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ message: "Успешная регистрация", token });
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Заполните поля" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Неверный пароль" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Успешный вход", token });
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

export default router;
