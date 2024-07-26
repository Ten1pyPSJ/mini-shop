import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ChangeProduct.module.css';

const categories = ['Телефон', 'Ноутбук', 'Телевизор', 'Холодильник'];
const categoryMap = {
  0: 'Телефон',
  1: 'Ноутбук',
  2: 'Телевизор',
  3: 'Холодильник',
};

function ChangeProduct() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    img: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product');
        console.log('Ответ сервера:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Не выводятся товары');
      }
    };
    fetchProducts();
  }, []);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title,
      category: product.category,
      price: product.price,
      img: product.img,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Получаем токен из localStorage
      await axios.put(`http://localhost:3000/product/${selectedProduct._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Добавляем заголовок авторизации
        },
      });
      setProducts(
        products.map((product) =>
          product._id === selectedProduct._id ? { ...product, ...formData } : product,
        ),
      );
      setSelectedProduct(null);
      setFormData({
        title: '',
        category: '',
        price: '',
        img: '',
      });
    } catch (error) {
      console.error('Ошибка при изменении товара', error);
    }
  };

  return (
    <div>
      <h2>Изменить товар</h2>
      <div className={styles.block}>
        <div className={styles.block_put}>
          {products.map((product) => (
            <div key={product._id}>
              <p>Название: {product.title}</p>
              <p>Категория: {categoryMap[product.category]}</p>
              <p>Цена: {product.price}</p>
              <button onClick={() => handleSelectProduct(product)}>Изменить</button>
            </div>
          ))}
        </div>
        {selectedProduct && (
          <form onSubmit={handleSubmit}>
            <div>
              <label>Название:</label>
              <input type='text' name='title' value={formData.title} onChange={handleChange} />
            </div>
            <div>
              <label>Категория:</label>
              <select name='category' value={formData.category} onChange={handleChange}>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Цена:</label>
              <input type='text' name='price' value={formData.price} onChange={handleChange} />
            </div>
            <div>
              <label>Картинка (URL):</label>
              <input type='text' name='img' value={formData.img} onChange={handleChange} />
            </div>
            <button type='submit'>Сохранить изменения</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ChangeProduct;
