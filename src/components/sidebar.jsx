import React from 'react';
import { MapPin } from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { usePharmacy } from '../context/pharmacy-context';


export const Sidebar = () => {

  const navigate = useNavigate();
  const { pharmacyData } = usePharmacy();
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="bg-[#06B1CF] w-64 flex flex-col justify-between items-center py-8 px-2">


      <div className='items-center w-full'>
        <div className="bg-white  rounded-[3px] w-full">
          <img src="/logo.svg" alt={""} className="w-32 h-12 my-2" />
        </div>

        <div className="bg-[#8CD50A] rounded-[3px] px-6 py-4 w-full flex">
          <img src="/package.png" alt={""} className="w-6 mr-4" />
          <h3 className="text-white font-normal">Products</h3>

        </div>
        <div className='bg-[#80BBFF] w-full h-[1px] mt-4'></div>
      </div>

      <div className='flex items-center justify-between w-full'>
        <div className='flex items-center'>
          <div className='border border-white bg-[#8CD50A] rounded-[100px] mr-1'>
            <img src={pharmacyData?.logo || '/p.svg'} alt={""} className="w-6 text-black m-1" />
          </div>

          <div>
            <h1 className="text-xs font-normal text-white mb-1"> {pharmacyData?.name || 'Pharmacy Name'}</h1>
            <div className='flex items-center'>
              <MapPin className="text-white mr-1" size={12} />
              <p className='text-[10px] font-normal text-white'>  {pharmacyData?.city || 'Pharmacy City'},  {pharmacyData?.state || 'Pharmacy State'}</p>
            </div>
          </div>
        </div>

        <img src='/exit.svg' onClick={handleLogout} alt={""} className="w-5 text-black m-1" />
      </div>


    </div>
  );
};