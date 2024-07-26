import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = ['Телефон', 'Ноутбук', 'Телевизор', 'Холодильник'];

const CreateProduct = () => {
  const [product, setProduct] = useState({
    img: '',
    title: '',
    price: '',
    category: categories[0], // Установим значение по умолчанию
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting product:', {
      ...product,
      price: Number(product.price),
    });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/product',
        {
          ...product,
          price: Number(product.price),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log('Product created:', response.data);
      navigate('/');
    } catch (error) {
      console.error(
        'Error creating product:',
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <div>
      <h1>Создать товар</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>URL изображения:</label>
          <input type='text' name='img' value={product.img} onChange={handleChange} />
        </div>
        <div>
          <label>Название:</label>
          <input type='text' name='title' value={product.title} onChange={handleChange} />
        </div>
        <div>
          <label>Цена:</label>
          <input type='text' name='price' value={product.price} onChange={handleChange} />
        </div>
        <div>
          <label>Категория:</label>
          <select name='category' value={product.category} onChange={handleChange}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <button type='submit'>Создать товар</button>
      </form>
    </div>
  );
};

export default CreateProduct;
