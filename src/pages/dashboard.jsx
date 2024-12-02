import React, { useState } from 'react';
import { XCircle, MapPin, Plus, XIcon } from 'lucide-react';

// Local component implementations to replace @components
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-96">
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ children }) => (
  <div className="p-6 border-b border-gray-200">
    {children}
  </div>
);

const ModalBody = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

const ModalFooter = ({ children }) => (
  <div className="p-6 border-t border-gray-200">
    {children}
  </div>
);

const Table = ({ children }) => (
  <div className="bg-white shadow-md rounded-lg overflow-hidden">
    {children}
  </div>
);

const TableHeader = ({ children }) => (
  <div className="bg-gray-100">
    <div className="flex">
      {children}
    </div>
  </div>
);

const TableBody = ({ children }) => (
  <div>
    {children}
  </div>
);

const TableRow = ({ children, key }) => (
  <div key={key} className="flex border-b last:border-b-0 hover:bg-gray-50">
    {children}
  </div>
);

const TableCell = ({ children }) => (
  <div className="flex-1 p-4 text-sm text-gray-600">
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
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'Triple Action Toothpaste', category: 'Tooth Care', price: 6700, dateCreated: '2024-05-02', dateUpdated: '2024-05-02', brand: 'Sensodyne' },
    { id: 2, name: 'Triple Action Toothpaste', category: 'Tooth Care', price: 6700, dateCreated: '2024-05-02', dateUpdated: '2024-05-02', brand: 'Sensodyne' },
    { id: 3, name: 'Triple Action Toothpaste', category: 'Tooth Care', price: 6700, dateCreated: '2024-05-02', dateUpdated: '2024-05-02', brand: 'Sensodyne' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddProduct = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleSave = (e) => {
    // e.preventDefault();
    setShowModal(false);
  };
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      <div className="bg-[#06B1CF] w-64 flex flex-col justify-between items-center py-8 px-2">
        <div className='items-center w-full'>
          <div className="bg-white  rounded-[3px] w-full">
            <img src="/logo.svg" alt="PharmPlug Logo" className="w-32 h-12 my-2" />
          </div>

          <div className="bg-[#8CD50A] rounded-[3px] px-6 py-4 w-full flex">
            <img src="/package.png" alt="PharmPlug Logo" className="w-6 mr-4" />
            <h3 className="text-white font-normal">Products</h3>

          </div>
          <div className='bg-[#80BBFF] w-full h-[1px] mt-4'></div>
        </div>

        <div>
        <div className='flex items-center'>
          <div className='border border-white bg-[#8CD50A] rounded-[100px] mr-1'>
            <img src="/package.png" alt="PharmPlug Logo" className="w-6 text-black m-1" />
          </div>

          <div>
            <h1 className="text-xs font-normal text-white mb-1">HealthRite</h1>
            <div className='flex items-center'>
              <MapPin className="text-white mr-1" size={12} />
              <p className='text-[10px] font-normal text-white'>Ikoyi,Lagos</p>
            </div>
          </div>
        </div>

        
        </div>


      </div>
      <div className="flex-1 bg-white relative">
        <div className=" bg-[#CDEFF5] px-8 py-4 flex items-center justify-between mb-4">
          <p></p>
          <div className='flex items-center'>
            <div className='border border-white bg-[#8CD50A] rounded-[100px] mr-1'>
              <img src="/package.png" alt="PharmPlug Logo" className="w-6 text-black m-1" />
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

        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date Created</TableCell>
              <TableCell>Date Updated</TableCell>
              <TableCell>Brand</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>₦{product.price.toLocaleString()}</TableCell>
                <TableCell>{product.dateCreated}</TableCell>
                <TableCell>{product.dateUpdated}</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

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
                  <img src="/upload.svg" alt="" className='text-white w-5' />

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
    </div>
  );
};