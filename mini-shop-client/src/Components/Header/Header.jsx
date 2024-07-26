import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import useAuth from '../../hooks/useAuth';

function Header({ cartItems = [] }) {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth();

  return (
    <div className={styles.header}>
      <Link to='/'>Главная страница</Link>
      <div className={styles.fix}>
        {user && user.role === 'admin' && (
          <>
            <Link to='/delete-product' className={styles.navHead}>
              Удалить товар
            </Link>
            <Link to='/create-product' className={styles.navHead}>
              Создать товар
            </Link>
            <Link to='/change-product' className={styles.navHead}>
              Изменить товар
            </Link>
          </>
        )}
        <div
          className={styles.cart}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link to='/cart' className={styles.navHead}>
            Корзина: {cartItems.length}
          </Link>
          {isHovered && (
            <div className={styles.cartPopover}>
              {cartItems.length === 0 ? (
                <p>Корзина пуста</p>
              ) : (
                <div>
                  {cartItems.map((product, index) => (
                    <div key={index} className={styles.cartItem}>
                      <img src={product.img} alt={product.title} className={styles.cartItemImg} />
                      {product.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {user ? (
          <Link to='/user' className={styles.navHead}>
            {user.name}
          </Link>
        ) : (
          <Link to='/login' className={styles.navHead}>
            Войти
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
