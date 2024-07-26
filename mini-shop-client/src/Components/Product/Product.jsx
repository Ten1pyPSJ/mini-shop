import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from '../Modal/Modal';
import Sort from '../Sort/Sort';
import Filter from '../Filter/Filter';

function Product({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 3;

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/product');
        console.log('Ответ сервера:', response.data);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Не выводятся товары');
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== '') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (searchTerm !== '') {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    let startPage = currentPage === 1 ? 1 : currentPage - 1;
    let endPage = startPage + 2;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = endPage - 2 > 0 ? endPage - 2 : 1;
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  };

  return (
    <div className='container'>
      <div className='search'>
        <Sort onSearch={handleSearch} />
        <div className='count-page'>Текущая страница: {currentPage}</div>
        <Filter onFilter={handleFilter} />
      </div>

      <div className='Shop'>
        {currentProducts.map((product) => (
          <div key={product._id}>
            <h2>{product.title}</h2>
            <img src={product.img} className='img-cart' alt={product.title} />
            <h3>{product.price}</h3>
            <button onClick={() => addToCart(product)} className='button-product'>
              Добавить в корзину
            </button>{' '}
            <br />
            <button onClick={() => openModal(product)} className='button-product'>
              Показать характеристику в окне
            </button>{' '}
            <br />
            <Link to={`/product/${product._id}`}>
              <button className='button-product'>Показать полностью характеристику</button>
            </Link>
          </div>
        ))}

        {selectedProduct && <Modal product={selectedProduct} onClose={closeModal} />}
      </div>

      <div className='pagination'>
        <button className='btn' onClick={handlePrevPage} disabled={currentPage === 1}>
          &laquo;
        </button>
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={`btn ${currentPage === pageNumber ? 'active' : ''}`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          className='btn'
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
}

export default Product;
