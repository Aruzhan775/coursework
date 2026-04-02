import { useState } from "react";
import { API } from "../services/api";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", { email, password });
    alert(res.data.message);
    localStorage.setItem("token", res.data.token);
    navigate("/profile");
  } catch (err) {
    alert(err.response?.data?.message || "Ошибка");
  }
};

  return (
    <div className="auth-page">
      <form className="auth-container" onSubmit={handleSubmit}>
        <h2 className="auth-title">Регистрация</h2>

        <input
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button className="button">Создать аккаунт</button>
      </form>
    </div>
  );
}

export default Register;
