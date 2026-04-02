import express from "express";
import authMiddleware from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "Пользователь не найден" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { name, age, city, phone, bio } = req.body;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "Пользователь не найден" });

    if (name !== undefined) user.name = name;
    if (age !== undefined) user.age = age;
    if (city !== undefined) user.city = city;
    if (phone !== undefined) user.phone = phone;
    if (bio !== undefined) user.bio = bio;

    await user.save();

    res.json({ message: "Профиль обновлён", user });
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

export default router;
