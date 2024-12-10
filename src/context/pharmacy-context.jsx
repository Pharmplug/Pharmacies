import React, { createContext, useState, useContext, useEffect } from 'react';
import { retrieveData } from '../utils/storage';

const PharmacyContext = createContext(null);

export const PharmacyProvider = ({ children }) => {
  const [pharmacyData, setPharmacyData] = useState(retrieveData());
  return (
    <PharmacyContext.Provider value={{ pharmacyData, setPharmacyData }}>
      {children}
    </PharmacyContext.Provider>
  );
};

export const usePharmacy = () => useContext(PharmacyContext);