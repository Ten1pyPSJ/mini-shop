import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Product from './Components/Product/Product';
import CreateProduct from './Components/CreateProduct/CreateProduct';
import Cart from './Components/Cart/Cart';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import NotFound from './Components/NotFound';
import DeleteProduct from './Components/DeleteProduct/DeleteProduct';
import ChangeProduct from './Components/ChangeProduct/ChangeProduct';
import Register from './Components/User/Register';
import Login from './Components/User/Login';
import User from './Components/User/User';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <div>
      <Header cartItems={cartItems} />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Product addToCart={addToCart} />} />
          <Route path='/create-product' element={<CreateProduct />} />
          <Route path='/delete-product' element={<DeleteProduct />} />
          <Route path='/change-product' element={<ChangeProduct />} />
          <Route path='/cart' element={<Cart cartItems={cartItems} />} />
          <Route path='/product/:id' element={<ProductDetails />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user' element={<User />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
