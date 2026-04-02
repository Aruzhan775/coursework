import { useEffect, useState } from "react";
import { API } from "../services/api";
import Event from "./Event";
import '../App.css';

function Events() {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // ← добавляем состояние для поиска

  useEffect(() => {
    API.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => console.error("Ошибка загрузки мероприятий", err));
  }, []);

  // Фильтрация по названию
  const filteredEvents = events.filter(ev =>
    ev.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1 className="page-title">Мероприятия</h1>

      {/* Поле поиска */}
      <input
        type="text"
        placeholder="Поиск по названию..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Список мероприятий */}
      <div className="events-container">
        {filteredEvents.length ? (
          filteredEvents.map(ev => (
            <Event key={ev._id} event={ev} />
          ))
        ) : (
          <p>Мероприятия не найдены</p>
        )}
      </div>
    </div>
  );
}

export default Events;
