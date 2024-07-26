import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [register, setRegister] = useState({
    email: '',
    name: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', register);
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h3>Регистрация</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input type='text' name='email' value={register.email} onChange={handleChange} />
          </div>
          <div>
            <label>Имя:</label>
            <input type='text' name='name' value={register.name} onChange={handleChange} />
          </div>
          <div>
            <label>Пароль:</label>
            <input
              type='password'
              name='password'
              value={register.password}
              onChange={handleChange}
            />
          </div>
          <button type='submit'>Зарегистрироваться</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
