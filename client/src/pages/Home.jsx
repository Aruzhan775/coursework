import { Link } from "react-router-dom";
import "../App.css";
import '../App.css';

export default function Home() {
  return (
    <div className="home-container">
      <h1>Главная страница</h1>
      <p>Добро пожаловать в наше приложение для мероприятий!</p>

      <nav className="home-nav">
        <ul>
          <li><Link to="/events">Посмотреть мероприятия</Link></li>
          <li><Link to="/register">Регистрация</Link></li>
          <li><Link to="/login">Вход</Link></li>
          <li><Link to="/profile">Профиль</Link></li>
        </ul>
      </nav>

      <section className="home-info">
        <h2>Что вы можете сделать:</h2>
        <p>✔ Зарегистрироваться и войти в систему</p>
        <p>✔ Купить билеты на интересные мероприятия</p>
        <p>✔ Управлять своим профилем</p>
      </section>
    </div>
  );
}