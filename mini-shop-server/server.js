import express from 'express';
import mongoose from 'mongoose';
import {
  createProduct,
  getAllProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from './controllers/productController.js';
import { register, login, getUserInfo } from './controllers/userController.js';
import { authMiddleware, checkRole } from './authMiddleware.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

mongoose
  .connect('mongodb://localhost:27017/mini-shop')
  .then(() => console.log('Бд подключилось'))
  .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cors());

app.post('/product', authMiddleware, checkRole(['admin']), createProduct);
app.get('/product', getAllProduct);
app.get('/product/:id', getProductById);
app.delete('/product/:id', authMiddleware, checkRole(['admin']), deleteProduct);
app.put('/product/:id', authMiddleware, checkRole(['admin']), updateProduct);

app.post('/register', register);
app.post('/login', login);
app.get('/user', authMiddleware, getUserInfo);

app.listen(3000, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log('Сервер запустился');
});
