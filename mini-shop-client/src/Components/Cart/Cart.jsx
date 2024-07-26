import React from 'react';

function Cart({ cartItems }) {
  const totalPrice = cartItems.reduce((total, product) => total + product.price, 0);

  return (
    <div>
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul>
          {cartItems.map((product, index) => (
            <li key={index}>
              <img className='img-cart' src={product.img} alt={product.title} />
              {product.title}
            </li>
          ))}
        </ul>
      )}
      <h3>Общая стоимость: {totalPrice} руб.</h3>
    </div>
  );
}

export default Cart;
