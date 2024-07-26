import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from './User.module.css';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { fetchUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      localStorage.setItem('token', response.data.token);
      await fetchUser();
      navigate('/');
    } catch (error) {
      console.error('Ошибка при входе в систему:', error);
    }
  };

  return (
    <div className={style.block}>
      <div className={style.registerContainer}>
        <h2>Войти в систему</h2>
        <form className={style.forma} onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type='email'
              placeholder='Введите почту'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Пароль:</label>
            <input
              type='password'
              placeholder='Введите пароль'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit'>Войти</button>
          <p>
            Нет аккаунта? <Link to='/register'>Создать</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
