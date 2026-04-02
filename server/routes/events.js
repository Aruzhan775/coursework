import express from "express";
import authMiddleware from "../middleware/auth.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

const router = express.Router();

const events = [
  {
    id: 1,
    title: "Концерт Димаша Кудайбергена",
    price: 5000,
    date: "2026-04-10T19:00:00",
    address: "Астана Арена",
    description: "Большой концерт популярных исполнителей",
    image: "/assets/dimash_concert.jpeg"

  },
  {
    id: 2,
    title: "Фестиваль Comic Con",
    price: 8000,
    date: "2026-05-01T12:00:00",
    address: "Астана Арена",
    description: "Фестиваль посвященный косплею и гик культуре",
    image: "/assets/comic_con.jpg"
  },
  {
    id: 3,
    title: "Выставка Astana Art Air",
    price: 2000,
    date: "2026-06-15T10:00:00",
    address: "Экспо-центр",
    description: "Современное искусство и новые экспонаты",
    image: "/assets/astana_art_air.jpeg"
  }
];

router.post("/tickets/buy", authMiddleware, async (req, res) => {
    try {
      const { eventId } = req.body;

      const user = await User.findById(req.userId);
      if (!user) return res.status(404).json({ message: "Пользователь не найден" });

      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ message: "Мероприятие не найдено" });

      const ticket = {
        eventId,
        title: event.title,
        date: event.date,
        address: event.address
      };

      user.tickets.push(ticket);
      await user.save();


      res.json({ message: "Билет куплен", ticket });
    } catch (err) {
      res.status(500).json({ message: "Ошибка сервера" });
    }
  });

  router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.post("/events", async (req, res) => {
  try {
    const newEvents = await Event.insertMany(req.body);
    res.json({ message: "События созданы", events: newEvents });
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Событие не найдено" });
    }
    res.json({ message: "Событие удалено", event });
  } catch (err) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
});


 export default router;