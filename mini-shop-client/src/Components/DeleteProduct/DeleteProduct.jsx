import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './DeleteProduct.module.css';

function DeleteProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product');
        console.log('Ответ сервера:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Не выводятся товары', error.response ? error.response.data : error.message);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`http://localhost:3000/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Ответ удаления:', response.data);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error(
        'Ошибка при удалении товара',
        error.response ? error.response.data : error.message,
      );
    }
  };

  return (
    <div>
      <h2>Выберите что удалить</h2>
      <div>
        {products.map((product) => (
          <div key={product._id} className={styles.block}>
            <p>Название: {product.title}</p>
            <p>Цена: {product.price}</p>
            <button onClick={() => handleDelete(product._id)}>Удалить товар</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeleteProduct;
