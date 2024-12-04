import React, { createContext, useState, useContext, useEffect } from 'react';

const PharmacyContext = createContext();

export const PharmacyProvider = ({ children }) => {
  const [pharmacyData, setPharmacyData] = useState(null);

  useEffect(() => {
    const storedPharmacyData = sessionStorage.getItem('pharmacy-data');
    if (storedPharmacyData) {
      try {
        const parsedData = JSON.parse(storedPharmacyData);
        if (parsedData && parsedData.name) {
          setPharmacyData(parsedData);
        }
      } catch (error) {
        console.error('Error parsing pharmacy data:', error);
      }
    }
  }, []);

  const logout = () => {
    sessionStorage.removeItem('pharmacy-data');
    setPharmacyData(null);
  };

  return (
    <PharmacyContext.Provider value={{ 
      pharmacyData, 
      setPharmacyData,
      logout 
    }}>
      {children}
    </PharmacyContext.Provider>
  );
};

export const usePharmacy = () => {
  const context = useContext(PharmacyContext);
  if (!context) {
    throw new Error('usePharmacy must be used within a PharmacyProvider');
  }
  return context;
};