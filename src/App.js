import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/login';
import { Dashboard } from './pages/dashboard';
import { PharmacyProvider } from './context/pharmacy-context';
import { ProductsProvider } from './context/products-context';

const App = () => {
  return (
    <Router>
       <PharmacyProvider>
       <ProductsProvider>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      </ProductsProvider>
      </PharmacyProvider>
    </Router>
  );
};

export default App;