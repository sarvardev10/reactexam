import React, { useState, useEffect } from "react";
import axios from "axios";
import "./product.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(4);
  const [showAll, setShowAll] = useState(false);
  const [pageNumbers, setPageNumbers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
      pageNumbers.push(i);
    }
    setPageNumbers(pageNumbers);
  }, [products.length, productsPerPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = showAll
    ? products
    : products.slice(indexOfFirstProduct, indexOfLastProduct);

  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePerPageChange = (e) => {
    const perPage = parseInt(e.target.value);
    setProductsPerPage(perPage);
    setCurrentPage(1);
  };

  const showAllProducts = () => {
    setShowAll(true);
    setCurrentPage(1);
  };

  const returnToPagination = () => {
    setShowAll(false);
  };

  return (
    <div>
      <div className="container">
        {currentProducts.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.title} />
            <div className="card-content">
              <h2 className="title">{product.title}</h2>
              <div className="price">${product.price}</div>
              <p className="description">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1 || showAll}>
          Previous
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={currentPage === number ? "active" : ""}
            disabled={showAll}
          >
            {number}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={
            currentPage === Math.ceil(products.length / productsPerPage) ||
            showAll
          }
        >
          Next
        </button>
      </div>
      {!showAll && (
        <div className="limit">
          <label htmlFor="limit">Products per Page:</label>
          <input
            type="number"
            id="limit"
            value={productsPerPage}
            onChange={handlePerPageChange}
            min="1"
          />
        </div>
      )}
      {!showAll ? (
        <div className="show-all">
          <button onClick={showAllProducts}>Show All</button>
        </div>
      ) : (
        <div className="return-to-pagination">
          <button onClick={returnToPagination}>Return to Pagination</button>
        </div>
      )}
    </div>
  );
};

export default Products;
