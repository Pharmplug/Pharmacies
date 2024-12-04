import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async (pharmacyId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api-pharmplug.onrender.com/api/store/get-product-by-pharmacy/${pharmacyId}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Source': 'web-login'
        }
      });

      if (response.data.statusCode === 200) {
        setProducts(response.data.data);
        return response.data.data;
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch products';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addNewProduct = useCallback(async (productData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://api-pharmplug.onrender.com/api/store/add-product', productData, {
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Source': 'web-login'
        }
      });

      if (response.status === 200 && response.data.statusCode === 200) {
        setProducts(prevProducts => [...prevProducts, response.data.data]);
        return response.data.data;
      }
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to add product';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ProductContext.Provider value={{ 
      products, 
      isLoading, 
      error, 
      fetchProducts, 
      addNewProduct 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};