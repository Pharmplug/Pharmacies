import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import axios from 'axios';
import { baseurl } from '../config/config';
import { usePharmacy } from './pharmacy-context';


// Create the context
const ProductsContext = createContext(null);

// Provider component
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteItem, setDeleteItem] = useState(false);
  const [error, setError] = useState(null);
  const [productUpdated, setProductUpdated] = useState(false);
  const [productAdded, setProductAdded] = useState(false);
  const { pharmacyData } = usePharmacy();

  // Fetch products for a specific pharmacy
  const fetchProducts = useCallback(async (pharmacyId) => {
    if (!pharmacyId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${baseurl}/api/store/get-product-by-pharmacy/${pharmacyId}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Source': 'web-login'
        }
      });

      if (response.data.statusCode === 200) {
        console.log(response.data.data)
        setProducts(response.data.data);
      } else {
        setError(response.data.message || 'Failed to fetch products');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add a new product
  const addProduct = useCallback(async (productData) => {
    if (!pharmacyData?.id) {
      setError('No pharmacy selected');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        ...productData,
        pharmacyCode: pharmacyData.id,
        price: productData.price.toString()
      };

      const response = await axios.post(`${baseurl}/api/store/add-product`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Source': 'web-login'
        }
      });

      if (response.status === 200 && response.data.statusCode === 200) {
        const newProduct = response.data.data;
        setProducts(prev => [...prev, newProduct]);
        setProductAdded(true)
        fetchProducts(pharmacyData.id);
        return newProduct;
      } else {
        setError(response.data.message || 'Failed to add product');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fetchProducts, pharmacyData]);

  // Update an existing product
  const updateProduct = useCallback(async ( productData) => {
    console.log(productData)
    setIsLoading(true);
    setError(null);
   const productId= productData.productCode;
   const payload = {
    ...productData,
    productCode:productData.productCode,
    pharmacyCode: pharmacyData.id,
  };
  console.log(payload)
    try {
      const response = await axios.patch(`${baseurl}/api/store/update-product/${productId}`, payload, {
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Source': 'web-login'
        }
      });
      console.log(response.data)
      if (response.status === 200 && response.data.statusCode === 200) {
        console.log(response.data)
        const updatedProduct = response.data.data;
        setProducts(prev =>
          prev.map(product =>
            product.id === productId ? updatedProduct : product
          )
        );
        setProductUpdated(true);
        fetchProducts(pharmacyData.id);
        return updatedProduct;
      } else {
        setError(response.data.message || 'Failed to update product');
        return null;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [fetchProducts, pharmacyData]);

  // Delete a product
  const deleteProduct = useCallback(async (productId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${baseurl}/api/store/delete-product/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
          'X-Request-Source': 'web-login'
        }
      });

      if (response.status === 200 && response.data.statusCode === 200) {
        console.log(response.data)

        setDeleteItem(true)
        setProducts(prev => prev.filter(product => product.id !== productId));
        fetchProducts(pharmacyData.id);
        return true;
      } else {
        setError(response.data.message || 'Failed to delete product');
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [fetchProducts, pharmacyData]);

  // Filter products by search term
  const filteredProducts = useCallback((searchTerm='') => {
    return products.filter(product =>
      product.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products]);

  // Automatically fetch products when pharmacy data changes
  useEffect(() => {
    console.log("here", pharmacyData?.id)
    if (pharmacyData?.id) {
      console.log(pharmacyData.id)
      fetchProducts(pharmacyData.id);
    }
  }, [pharmacyData, fetchProducts]);

  const contextValue = {
    products,
    isLoading,
    error,
    productAdded,
    setProductAdded,
    productUpdated,
    setProductUpdated,
    deleteItem,
    setDeleteItem,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    filteredProducts
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};


export const useProducts = () => useContext(ProductsContext);