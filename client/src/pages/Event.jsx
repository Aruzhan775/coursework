import { useState } from "react";
import { API } from "../services/api";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Event({ event }) {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  if (!event) return <p>Мероприятие не найдено</p>;

function scheduleReminder(event) {
  if ("Notification" in window) {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        const eventDate = new Date(event.date);
        const reminderTime = new Date(eventDate.getTime() - 24 * 60 * 60 * 1000); // за день до

        const delay = reminderTime.getTime() - Date.now();
        if (delay > 0) {
          setTimeout(() => {
            new Notification("Напоминание о мероприятии", {
              body: `Завтра состоится: ${event.title} в ${event.address}`,
            });
          }, delay);
        }
      }
    });
  }
}
  const handleBuy = async () => {
    const token = localStorage.getItem("token");
    try {
    const res = await API.post("/events/tickets/buy", { eventId: event._id }, {
  headers: { Authorization: `Bearer ${token}` }
});

      alert("Покупка успешна!");
      scheduleReminder(event);
      navigate("/profile");
    } catch (err) {
      console.error("Ошибка покупки", err);
    }
  };

  return (
    <div className="event-card">
    <img
  src={event.image}
  alt={event.title}
  className="event-image"
  onError={(e) => {
    console.log("Ошибка загрузки картинки");
    e.target.src = "https://picsum.photos/400/300";
  }}
/>
      <h2>{event.title}</h2>
      <p>Дата: {new Date(event.date).toLocaleString()}</p>
      <p>Цена: {event.price} ₸</p>

      {!showDetails ? (
        <button className="button" onClick={() => setShowDetails(true)}>Подробнее</button>
      ) : (
        <div >
          <p>Описание: {event.description}</p>
          <p>Адрес: {event.address}</p>
          <button className="button" onClick={handleBuy}>Купить билет</button>
        </div>
      )}
    </div>
  );
}

export default Event;
