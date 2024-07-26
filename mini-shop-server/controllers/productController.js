import Product from '../models/product.js';

export const createProduct = async (req, res) => {
  const { img, title, price, category } = req.body;

  console.log('Received product data:', { img, title, price, category });

  try {
    const newProduct = new Product({
      img,
      title,
      price,
      category,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Ошибка при создании продукта:', error);
    res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении товара', error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении товара', error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.status(200).json({ message: 'Товар успешно удален' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении товара', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, img, category } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, price, img, category },
      { new: true },
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Товар не найден' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при изменении товара', error: error.message });
  }
};
