import { useEffect, useState } from "react";
import { API } from "../services/api";
import '../App.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    API.get("/profile", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })

      .then((res) => {
        setUser(res.data);
        setFormData(res.data);
      })
      .catch((err) => console.error("Ошибка загрузки профиля", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await API.put("/profile", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data.user);
      setEditMode(false);
      alert("Профиль успешно обновлён");
    } catch (err) {
      console.error("Ошибка сохранения профиля", err);
    }
  };

  if (!user) return <p className="error">Необходимо войти в систему</p>;

  return (
    <div className="container">
      <div className="profile-container">
        <h1 className="page-title">Профиль</h1>
        {editMode ? (
          <div className="profile-form">
            <label>Имя:
              <input name="name" value={formData.name || ""} onChange={handleChange} />
            </label>
            <label>Возраст:
              <input name="age" value={formData.age || ""} onChange={handleChange} />
            </label>
            <label>Город:
              <input name="city" value={formData.city || ""} onChange={handleChange} />
            </label>
            <label>Телефон:
              <input name="phone" value={formData.phone || ""} onChange={handleChange} />
            </label>
            <label>Биография:
              <textarea name="bio" value={formData.bio || ""} onChange={handleChange} />
            </label>
            <button className="save-button" onClick={handleSave}>Сохранить</button>
            <button className="cancel-button" onClick={() => setEditMode(false)}>Отмена</button>

          </div>
        ) : (
          <div className="profile-info">
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Дата регистрации:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            <p><strong>Имя:</strong> {user.name}</p>
            <p><strong>Возраст:</strong> {user.age}</p>
            <p><strong>Город:</strong> {user.city}</p>
            <p><strong>Телефон:</strong> {user.phone}</p>
            <p><strong>Биография:</strong> {user.bio}</p>
            <button className="edit-button" onClick={() => setEditMode(true)}>
                Редактировать
            </button>


            <h2>Купленные билеты</h2>
            {user.tickets?.length ? (
              user.tickets.map((ticket, i) => (
                <div key={i} className="ticket-card">
                  <p><strong>Мероприятие:</strong> {ticket.title}</p>
                  <p><strong>Дата:</strong> {new Date(ticket.date).toLocaleString()}</p>
                  <p><strong>Адрес:</strong> {ticket.address}</p>
                  <p><strong>Напоминание:</strong> за день до начала</p>
                </div>
              ))
            ) : (
              <p>У вас пока нет купленных билетов</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
