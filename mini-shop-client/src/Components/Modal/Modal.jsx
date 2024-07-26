import React from 'react';

function Modal({ product, onClose }) {
  const categoryNames = {
    0: 'Телефон',
    1: 'Ноутбук',
    2: 'Телевизор',
    3: 'Холодильник',
  };
  return (
    <div className='modal'>
      <div className='modal-content'>
        <button onClick={onClose}>
          Закрыть
          <span>&times;</span>
        </button>

        <h2>{product.title}</h2>
        <p>Цена: {product.price} руб.</p>
        <p>{categoryNames[product.category]}</p>
      </div>
    </div>
  );
}

export default Modal;
