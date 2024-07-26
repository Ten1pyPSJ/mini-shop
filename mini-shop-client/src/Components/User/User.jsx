import React from 'react';
import { useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/login');
  };

  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  return (
    <div>
      <h1>Информация о пользователе</h1>
      <p>Имя: {name}</p>
      <p>Email: {email}</p>
      <button onClick={handleLogout}>Выйти из аккаунта</button>
    </div>
  );
}

export default User;
