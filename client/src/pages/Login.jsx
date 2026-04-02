import { useState } from "react";
import { API } from "../services/api";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password }, {
        headers: { "Content-Type": "application/json" }
      });

      alert(res.data.message);
      localStorage.setItem("token", res.data.token);
      navigate("/profile");

    } catch (err) {
      console.error("Ошибка при входе", err);
      alert("Ошибка при входе");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-container" onSubmit={handleSubmit}>
        <h2 className="auth-title">Вход в аккаунт</h2>

        <input 
          type="email"
          placeholder="Введите email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Введите пароль"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="button">Войти</button>

        <p className="auth-link">
          Нет аккаунта? <span onClick={() => navigate('/register')}>Регистрация</span>
        </p>
      </form>
    </div>
  );
}

export default Login;