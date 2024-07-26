import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const categoryNames = {
    0: 'Телефон',
    1: 'Ноутбук',
    2: 'Телевизор',
    3: 'Холодильник',
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error('ID продукта не определен');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:3000/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных о продукте', error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h2>{product.title}</h2>
      <img src={product.img} alt={product.title} className='img-cart' />
      <p>{product.description}</p>
      <h3>{product.price} руб.</h3>
      <h2>{categoryNames[product.category]}</h2>
    </div>
  );
}

export default ProductDetails;
