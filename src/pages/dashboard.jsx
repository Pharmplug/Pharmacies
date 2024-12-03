import React, { useState } from 'react';
import { MapPin, Plus, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


// Local component implementations to replace @components
const Modal = ({ open, children }) => {
  if (!open) return null;
  return (
    <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-[600px]">
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

const ModalBody = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

const ModalFooter = ({ children }) => (
  <div className="p-6 ">
    {children}
  </div>
);




const Input = ({ type, placeholder, value, onChange, className }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full rounded-lg border ${className}`}
  />
);

const Button = ({ children, onClick, className, variant }) => {
  const baseClasses = "px-6 py-3 rounded-[100px] font-thin transition-colors";
  const variantClasses = variant === "secondary"
    ? "bg-white text-[#15c2cf] hover:bg-gray-100"
    : "bg-[#15c2cf] text-white hover:bg-[#13aeb9]";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [products] = useState([
    { id: 1, img:'/imgHolder.svg', name: "Triple Action Toothpaste", category: "Tooth Care", price: 6700, dateCreated: "02 May 2024", dateUpdated: "02 May 2024", brand: "Sensodyne" },
    { id: 2,img:'/imgHolder.svg', name: "Triple Action Toothpaste", category: "Tooth Care", price: 6700, dateCreated: "02 May 2024", dateUpdated: "02 May 2024", brand: "Sensodyne" },
    { id: 3,img:'/imgHolder.svg', name: "Triple Action Toothpaste", category: "Tooth Care", price: 6700, dateCreated: "02 May 2024", dateUpdated: "02 May 2024", brand: "Sensodyne" },
    { id: 4,img:'/imgHolder.svg', name: "Triple Action Toothpaste", category: "Tooth Care", price: 6700, dateCreated: "02 May 2024", dateUpdated: "02 May 2024", brand: "Sensodyne" },
    { id: 5,img:'/imgHolder.svg', name: "Triple Action Toothpaste", category: "Tooth Care", price: 6700, dateCreated: "02 May 2024", dateUpdated: "02 May 2024", brand: "Sensodyne" },
    { id: 6,img:'/imgHolder.svg', name: "Triple Action Toothpaste", category: "Tooth Care", price: 6700, dateCreated: "02 May 2024", dateUpdated: "02 May 2024", brand: "Sensodyne" },
    { id: 7,img:'/imgHolder.svg', name: "Triple Action Toothpaste", category: "Tooth Care", price: 6700, dateCreated: "02 May 2024", dateUpdated: "02 May 2024", brand: "Sensodyne" },
    { id: 8,img:'/imgHolder.svg', name: "Triple Action Toothpaste", category: "Tooth Care", price: 6700, dateCreated: "02 May 2024", dateUpdated: "02 May 2024", brand: "Sensodyne" },
    { id: 9,img:'/imgHolder.svg', name: "Triple Action Toothpaste", category: "Tooth Care", price: 6700, dateCreated: "02 May 2024", dateUpdated: "02 May 2024", brand: "Sensodyne" },
    { id: 10,img:'/imgHolder.svg', name: "Triple Action Toothpaste", category: "Tooth Care", price: 6700, dateCreated: "02 May 2024", dateUpdated: "02 May 2024", brand: "Sensodyne" },
    { id: 11,img:'/imgHolder.svg', name: "Triple Action Toothpaste", category: "Tooth Care", price: 6700, dateCreated: "02 May 2024", dateUpdated: "02 May 2024", brand: "Sensodyne" },
    { id: 12,img:'/imgHolder.svg', name: "Triple Action Toothpaste", category: "Tooth Care", price: 6700, dateCreated: "02 May 2024", dateUpdated: "02 May 2024", brand: "Sensodyne" },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the displayed items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Total pages
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handlers for pagination
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };


  const handleAddProduct = () => {
    setShowModal(true);
  };
  const handleUpdateProduct = (p) => {
    setShowUpdateModal(true);
    setSelectedProduct(p)

  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };
  const handleSave = (e) => {
    // e.preventDefault();
    setShowModal(false);
  };
  const handleUpdate = (e) => {
    // e.preventDefault();
    setShowUpdateModal(false);
  };
  const handleLogout = (e) => {
    // e.preventDefault();
    navigate('/login');
  };


  return (
    <div className="flex h-screen">
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
              <img src="/package.png" alt={""} className="w-6 text-black m-1" />
            </div>

            <div>
              <h1 className="text-xs font-normal text-white mb-1">HealthRite</h1>
              <div className='flex items-center'>
                <MapPin className="text-white mr-1" size={12} />
                <p className='text-[10px] font-normal text-white'>Ikoyi,Lagos</p>
              </div>
            </div>
          </div>

          <img src='/exit.svg' onClick={handleLogout} alt={""} className="w-5 text-black m-1" />
        </div>


      </div>
      <div className="flex-1 bg-white relative">
        <div className=" bg-[#CDEFF5] px-8 py-4 flex items-center justify-between mb-4">
          <p></p>
          <div className='flex items-center'>
            <div className='border border-white bg-[#8CD50A] rounded-[100px] mr-1'>
              <img src="/package.png" alt={""} className="w-6 text-black m-1" />
            </div>

            <div>
              <h1 className="text-xs font-normal text-black mb-1">HealthRite</h1>
              <div className='flex items-center'>
                <MapPin className="text-[#8CD50A] mr-1" size={12} />
                <p className='text-[10px] font-normal text-[#8CD50A]'>Ikoyi,Lagos</p>
              </div>
            </div>
          </div>




        </div>
        <div className='flex justify-between items-center px-4 mb-8'>
          <div className='bg-[#8CD50A] rounded-[4px] py-2 px-4'>
            <p className='text-white text-xs'>10,800 Total Products</p>
          </div>

          <div className='flex items-center space-x-4 max-w-[600px] w-full'>
            <div className='border-gray-500 w-[400px]'>
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow text-gray-400  py-2 px-2 focus:ring-[#15c2cf] text-sm font-thin"
              />
            </div>


            <Button
              className="bg-[#06B1CF] shadow-lg shadow-[#15c2cf]/25 text-white text-xs hover:bg-[#13aeb9] font-thin rounded-[8px]"
              onClick={handleAddProduct}
            >
              <div className='flex'>
                <Plus className="text-white mr-1" size={16} />
                Add Product
              </div>
            </Button>
          </div>
        </div>

        <div className="p-4">
          <table className="w-full border-collapse border border-gray-300">
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
              {currentItems.map((filteredProduct) => (
                <tr
                  key={filteredProduct.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    handleUpdateProduct(filteredProduct)
                    //alert(`Clicked on product ID: ${filteredProducts.id}`)
                  }}
                >
                  <td className="p-2">
                    <input type="checkbox" />
                  </td>
                  <td className="p-2  flex items-center space-x-2">
                    <div className=" flex items-center ">
                    <img src="/imgHolder.svg" alt="Package" className=" mr-4 w-8 h-8  rounded" />
                    </div>
                    <span className='text-xs text-black'>{filteredProduct.name}</span>
                  </td>
                  <td className="p-2 ">
                    <span className="px-2 py-1 text-xs text-main bg-[#CDEFF5] rounded-full">
                      • {filteredProduct.category}
                    </span>
                  </td>
                  <td className="p-2  text-sm font-thin text-[#667185]">₦{filteredProduct.price.toLocaleString()}</td>
                  <td className="p-2  text-sm font-thin text-[#667185]">{filteredProduct.dateCreated}</td>
                  <td className="p-2  text-sm font-thin text-[#667185]">{filteredProduct.dateUpdated}</td>
                  <td className="p-2 text-sm font-thin text-[#667185]">{filteredProduct.brand}</td>
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
              className="px-3 py-1  bg-transparent border  border-gray-400 text-xs rounded disabled:opacity-50"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`px-3 py-1 rounded ${currentPage === index + 1
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
              className="px-3 py-1 bg-transparent border  border-gray-400 text-xs rounded disabled:opacity-50"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>

      </div>

      <Modal open={showModal} onClose={handleCloseModal}>
        <ModalHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-normal text-black">Add Product</h3>
            <div className='bg-[#06B1CF] rounded-[100px] p-1'>
              <XIcon
                className="text-white hover:text-gray-300 cursor-pointer"
                size={18}
                strokeWidth={1}
                onClick={handleCloseModal}
              />
            </div>

          </div>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSave} className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-normal mb-1 text-xs">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter product name"
                className="w-full border border-gray-300 text-xs font-thin px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15c2cf]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-normal mb-1 text-xs">
                Product Category
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter product category"
                className="w-full border border-gray-300 text-xs font-thin px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15c2cf]"
              />
            </div> <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-normal mb-1 text-xs">
                Brand
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter product brand"
                className="w-full border border-gray-300 text-xs font-thin px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15c2cf]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-normal mb-1 text-xs">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="Enter product price"
                className="w-full border border-gray-300 text-xs font-thin px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15c2cf] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className='flex items-center justify-between mt-8'>
              <div className='flex items-center'>
                <div className='bg-gray-200 rounded-[100px] p-2 mr-2'>
                  <img src="/upload.svg" alt={""} className='text-white w-5' />

                </div>
                <div className='items-center'>
                  <p className='font-normal text-xs text-black mb-1'>Upload your document</p>
                  <p className='font-thin text-[8px] text-gray-400'>PNG,JPG,JPEG Format . Max 5MB</p>
                </div>
              </div>
              <button
                className="bg-[#06B1CF] text-white hover:bg-[#13aeb9] font-thin px-8 py-1 rounded-[5px]"
              >
                Upload
              </button>

            </div>

          </form>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-center space-x-6">
            <button
              variant="secondary"
              className="bg-white border border-[#15c2cf] text-[#15c2cf] hover:bg-gray-100 font-thin px-6 py-1 rounded-[5px]"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              onClick={handleCloseModal}
              className="bg-[#06B1CF] text-white hover:bg-[#13aeb9] font-thin px-8 py-1 rounded-[5px]"
            >
              Save
            </button>
          </div>
        </ModalFooter>
      </Modal>


      <Modal open={showUpdateModal} onClose={handleCloseUpdateModal}>
        <ModalHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-normal text-black">Update Product</h3>
            <div className='bg-[#06B1CF] rounded-[100px] p-1'>
              <XIcon
                className="text-white hover:text-gray-300 cursor-pointer"
                size={18}
                strokeWidth={1}
                onClick={handleCloseUpdateModal}
              />
            </div>

          </div>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleUpdate} className="w-full">
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-normal mb-1 text-xs">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"

                placeholder={selectedProduct.name}
                className="w-full border border-gray-300 text-xs font-thin px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15c2cf]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-normal mb-1 text-xs">
                Product Category
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={selectedProduct.category}
                className="w-full border border-gray-300 text-xs font-thin px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15c2cf]"
              />
            </div> <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-normal mb-1 text-xs">
                Brand
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={selectedProduct.brand}
                className="w-full border border-gray-300 text-xs font-thin px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15c2cf]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-normal mb-1 text-xs">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder={selectedProduct.price}
                className="w-full border border-gray-300 text-xs font-thin px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15c2cf] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            <div className='flex items-center justify-between mt-8'>
              <img src={selectedProduct.img} alt={""} className='rounded-lg w-24 h-24' />
              <div className='flex items-center'>
                <div className='bg-gray-200 rounded-[100px] p-1.5 mr-2'>
                  <img src="/upload.svg" alt={""} className='text-white w-4' />

                </div>
                <div className='items-center'>
                  <p className='font-normal text-[10px] text-black'>Upload your document</p>
                  <p className='font-thin text-[8px] text-gray-400'>PNG,JPG,JPEG Format . Max 5MB</p>
                </div>
              </div>
              <button
                className="bg-[#06B1CF] text-xs text-white hover:bg-[#13aeb9] font-thin px-4 py-1 rounded-[5px]"
              >
                Upload
              </button>

            </div>

          </form>
        </ModalBody>
        <ModalFooter>
          <div className="flex justify-center space-x-6">
            <button
              variant="secondary"
              className="bg-white border border-[#15c2cf] text-[#15c2cf] hover:bg-gray-100 font-thin px-6 py-1 rounded-[5px]"
              onClick={handleCloseUpdateModal}
            >
              Cancel
            </button>
            <button
              onClick={handleCloseUpdateModal}
              className="bg-[#06B1CF] text-white hover:bg-[#13aeb9] font-thin px-8 py-1 rounded-[5px]"
            >
              Update
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </div>
  );
};