import React, { useState } from 'react';

import { Plus } from 'lucide-react';
import { Input } from '../components/input';
import { Button } from '../components/button';
import { useProducts } from './product-context';
import { convertToFormattedDate } from '../../utils/time-converter';

export const ProductTable = ({ onAddProduct, onUpdateProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { products } = useProducts();

  const filteredProducts = products.filter(product =>
    product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex-1 bg-white relative">
      <div className='flex justify-between items-center px-4 mb-8'>
        <div className='bg-[#8CD50A] rounded-[4px] py-2 px-4'>
          <p className='text-white text-xs'>{filteredProducts.length} Total Products</p>
        </div>

        <div className='flex items-center space-x-4 max-w-[600px] w-full'>
          <div className='border-gray-500 w-[400px]'>
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow text-gray-400 py-2 px-2 focus:ring-[#15c2cf] text-sm font-thin"
            />
          </div>

          <Button
            className="bg-[#06B1CF] shadow-lg shadow-[#15c2cf]/25 text-white text-xs hover:bg-[#13aeb9] font-thin rounded-[8px]"
            onClick={onAddProduct}
          >
            <div className='flex'>
              <Plus className="text-white mr-1" size={16} />
              Add Product
            </div>
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <img
            src="/p.svg"
            alt="No products"
            className="w-64 h-64 mb-4"
          />
          <h2 className="text-xl text-gray-600 mb-2">No Products Yet</h2>
          <p className="text-gray-900 mb-6 font-thin">Click "Add Product" to get started</p>
          <Button
            className="bg-[#06B1CF] text-white hover:bg-[#13aeb9] font-thin rounded-[8px] px-6 py-2"
            onClick={onAddProduct}
          >
            <div className='flex items-center'>
              <Plus className="text-white mr-2" size={16} />
              Add First Product
            </div>
          </Button>
        </div>
      ) : (
        <>
          <div className="p-4">
            <table className="w-full border-collapse border border-gray-300">
              {/* Table headers and rows remain the same as in original implementation */}
              <thead className=''>
                  <tr className="bg-gray-100 w-full items-center ">
                    <th className="p-2 text-sm font-normal">
                      <input type="checkbox" />
                    </th>
                    <th className="items-center p-4 text-sm font-normal">
                      <div className='flex items-center'>
                        <img src="/p.svg" alt="Package" className="w-5 mr-4 text-gray-400" />
                        <p>Products</p>
                      </div>

                    </th>
                    <th className="text-start p-2 text-sm font-normal">
                      <span>Product Category</span>
                    </th>
                    <th className=" items-start text-sm font-normal">
                      <p className='text-start'>Pricing</p>
                    </th>
                    <th className="items-center p-2 text-sm font-normal">
                      <div className='flex items-center'>
                        <img src="/calender.svg" alt="Package" className="w-4 mr-4 text-black" />
                        <span>Date Created</span>
                      </div>


                    </th>
                    <th className="items-center p-2 text-sm font-normal">
                      <div className='flex items-center'>
                        <img src="/calender.svg" alt="Package" className="w-4 mr-4 text-black" />
                        <span>Date Updated</span>
                      </div>
                    </th>
                    <th className="text-start p-2 text-sm font-normal">
                      <span>Brand</span>
                    </th>
                    <th className="text-start p-2 text-sm font-normal">Actions</th>
                  </tr>
                </thead>
              <tbody>
                {currentItems.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => onUpdateProduct(product)}
                  >
                       <td className="p-2">
                        <input type="checkbox" />
                      </td>
                      <td className="p-2  flex items-center space-x-2">
                        <div className=" flex items-center ">
                          <img src={product.image_url} alt="Package" className=" mr-4 w-8 h-8  rounded" />
                        </div>
                        <span className='text-xs text-black'>{product.product_name}</span>
                      </td>
                      <td className="p-2 ">
                        <span className="px-2 py-1 text-xs text-main bg-[#CDEFF5] rounded-full">
                          • {product.category}
                        </span>
                      </td>
                      <td className="p-2  text-sm font-normal text-[#667185]">₦{product.price.toLocaleString()}</td>
                      <td className="p-2  text-sm font-normal text-[#667185]">{convertToFormattedDate(product.created_at)}</td>
                      <td className="p-2  text-sm font-normal text-[#667185]"> {convertToFormattedDate(product.updated_at)}</td>
                      <td className="p-2 text-sm font-normal text-[#667185]">{product.company_name}</td>
                      <td className="p-2 flex space-x-2">
                        <button className="text-blue-500 hover:underline">
                          <img src="/info.svg" alt={""} className="w-4 text-black m-1" />
                        </button>
                        <button className="text-red-500 hover:underline">
                          <img src="/bin.svg" alt={""} className="w-4 text-black m-1" />
                        </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <button
                className="px-3 py-1 bg-transparent border border-gray-400 text-xs rounded disabled:opacity-50"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    className={`px-3 py-1 rounded ${
                      currentPage === index + 1
                        ? "bg-transparent border border-secondary border-[1.5px] text-gray-600 text-xs font-normal"
                        : "bg-transparent text-gray-400 text-xs "
                    }`}
                    onClick={() => handlePageClick(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                className="px-3 py-1 bg-transparent border border-gray-400 text-xs rounded disabled:opacity-50"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};