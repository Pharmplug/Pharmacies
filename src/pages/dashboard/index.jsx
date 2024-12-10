import React, { useState } from 'react';
import { MapPin, Plus, XIcon } from 'lucide-react';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Modal, ModalBody, ModalHeader } from '../../components/modal';
import { convertToFormattedDate } from '../../utils/time-converter';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useImagePicker from '../../hook/upload_image';

import { Sidebar } from '../../components/sidebar';
import { usePharmacy } from '../../context/pharmacy-context';
import { useProducts } from '../../context/products-context';

export const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { pharmacyData } = usePharmacy();
  const {
    products,
    filteredProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    isLoading,
    deleteItem,
    setDeleteItem,
    productAdded,
    productUpdated,
    setProductAdded,
    setProductUpdated
  } = useProducts();
  const { selectedImage, setBase64Image, setSelectedImage, base64Image, handleImageChange } = useImagePicker();

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredProductsList = filteredProducts(searchTerm);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProductsList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProductsList.length / itemsPerPage);

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

  const handleDeleteProduct = (product) => {
    setShowDeleteModal(true);
    setSelectedProduct(product);
  };
  const handleUpdateProduct = (product) => {
    setShowUpdateModal(true);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImage(null);
    setBase64Image(null);
    setProductAdded(false)
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedImage(null);
    setBase64Image(null);
    setProductUpdated(false)
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteItem(false)
  };

  const ProductSchema = Yup.object().shape({
    category: Yup.string().required('Category is required'),
    price: Yup.number()
      .positive('Price must be positive')
      .required('Price is required'),
    productName: Yup.string()
      .min(2, 'Product name too short')
      .required('Product name is required'),
    packSize: Yup.string().required('Pack size is required'),
    dosageForm: Yup.string().required('Dosage form is required'),
    companyName: Yup.string().required('Company name is required'),
    productCode: Yup.string()
  });
  const ProductUpdateSchema = Yup.object().shape({
    category: Yup.string().required('Category is required'),
    price: Yup.number()
      .positive('Price must be positive')
      .required('Price is required'),
    productName: Yup.string()
      .min(2, 'Product name too short')
      .required('Product name is required'),
    packSize: Yup.string().required('Pack size is required'),
    dosageForm: Yup.string().required('Dosage form is required'),
    companyName: Yup.string().required('Company name is required'),
    productCode: Yup.string().required('Product code is required')
  });
  const handleSubmitProduct = async (values) => {
    const productData = {
      ...values,
      image: base64Image || "https://i.ibb.co/C55nTnk/eb0692a88bf3.png"
    };

    addProduct(productData);

  };


  const handleSubmitUpdateProduct = async (values) => {
    const productData = {
      ...values,
      image: base64Image || "https://i.ibb.co/C55nTnk/eb0692a88bf3.png"
    };

    updateProduct(productData);

  };



  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-white relative">
        <div className=" bg-[#CDEFF5] px-8 py-4 flex items-center justify-between mb-4">
          <p></p>
          <div className='flex items-center'>
            <div className='border border-white bg-[#8CD50A] rounded-[100px] mr-1'>
              <img src={pharmacyData?.logo || '/p.svg'} alt={""} className="w-6 text-black m-1" />
            </div>

            <div>
              <h1 className="text-xs font-normal text-black mb-1">  {pharmacyData?.name || 'Pharmacy Name'}</h1>
              <div className='flex items-center'>
                <MapPin className="text-[#8CD50A] mr-1" size={12} />
                <p className='text-[10px] font-normal text-[#8CD50A]'>  {pharmacyData?.city || 'Pharmacy City'},  {pharmacyData?.state || 'Pharmacy State'}</p>
              </div>
            </div>
          </div>




        </div>
        <div className='flex justify-between items-center px-4 mb-8'>
          <div className='bg-[#8CD50A] rounded-[4px] py-2 px-4'>
            <p className='text-white text-xs'>{products.length} Total Products</p>
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
              onClick={handleAddProduct}
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

                    >
                      <td className="p-2">
                        <input type="checkbox" />
                      </td>
                      <td className="p-2  flex items-center space-x-2">
                        <div className=" flex items-center ">
                          <img src={filteredProduct.image_url} alt="Package" className=" mr-4 w-8 h-8  rounded" />
                        </div>
                        <span className='text-xs text-black'>{filteredProduct.product_name}</span>
                      </td>
                      <td className="p-2 ">
                        <span className="px-2 py-1 text-xs text-main bg-[#CDEFF5] rounded-full">
                          • {filteredProduct.category}
                        </span>
                      </td>
                      <td className="p-2  text-sm font-normal text-[#667185]">₦{filteredProduct.price.toLocaleString()}</td>
                      <td className="p-2  text-sm font-normal text-[#667185]">{convertToFormattedDate(filteredProduct.created_at)}</td>
                      <td className="p-2  text-sm font-normal text-[#667185]"> {convertToFormattedDate(filteredProduct.updated_at)}</td>
                      <td className="p-2 text-sm font-normal text-[#667185]">{filteredProduct.company_name}</td>
                      <td className="p-2 flex space-x-2">
                        <button className="text-blue-500 hover:underline" onClick={() => {
                          handleUpdateProduct(filteredProduct)
                          //alert(`Clicked on product ID: ${filteredProducts.id}`)
                        }}>
                          <img src="/info.svg" alt={""} className="w-4 text-black m-1" />
                        </button>
                        <button className="text-red-500 hover:underline" onClick={() => handleDeleteProduct(filteredProduct.product_code)}>
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


          </>
        )}
      </div>


      {/**Add Product modal */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <ModalHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-normal text-black">{productAdded ? "Add Product" : ""}</h3>
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
          {!productAdded ?
            <Formik
              initialValues={{
                category: '',
                price: '',
                productName: '',
                packSize: '',
                dosageForm: '',
                companyName: '',
              
              }}
              validationSchema={ProductSchema}
              onSubmit={handleSubmitProduct}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4 w-full">
                  {[
                    { name: 'category', label: 'Category', type: 'text' },
                    { name: 'price', label: 'Price', type: 'number' },
                    { name: 'productName', label: 'Product Name', type: 'text' },
                    { name: 'packSize', label: 'Pack Size', type: 'text' },
                    { name: 'dosageForm', label: 'Dosage Form', type: 'text' },
                    { name: 'companyName', label: 'Company Name', type: 'text' }
                    

                  ].map(({ name, label, type }) => (
                    <div key={name} className="flex flex-col space-y-2">
                      <div className="items-center ">
                        <label htmlFor={label} className="block text-gray-600 font-normal mb-1 text-xs">
                          {label}
                        </label>
                        <Field
                          name={name}
                          type={type}
                          placeholder={`Enter ${label.toLowerCase()}`}
                          className={`w-full bg-white text-xs  border border-gray-300 rounded-lg pl-2 pr-4 py-3 font-thin focus:bg-white focus:outline-none 
                    ${errors[name] && touched[name] ? 'border-red-500' : 'border-gray-300'}`}
                        />
                      </div>
                      <ErrorMessage
                        name={name}
                        component="div"
                        className="text-red-500 text-[10px] font-normal"
                      />
                    </div>
                  ))}

                  <div className='flex items-center justify-between py-4'>
                    <div className='flex items-center'>
                      <div className='bg-gray-200 rounded-[100px] p-2 mr-2'>
                        {/* Invisible input */}
                        <input
                          type="file"
                          onChange={handleImageChange}
                          className="hidden" // Hides the input but keeps it functional
                          accept="image/*"  // Restrict file types (optional)
                        />
                        {/* Clickable div that triggers file input */}
                        <div
                          className="cursor-pointer"
                          onClick={() => document.querySelector('input[type="file"]').click()} // Trigger file input click
                        >
                          <img
                            src={selectedImage || "/upload.svg"}
                            alt="Upload"
                            className='text-white w-5'
                          />
                        </div>
                      </div>
                      <div className='items-center'>
                        <p className='font-normal text-xs text-black mb-1'>Upload your document</p>
                        <p className='font-thin text-[8px] text-gray-400'>PNG, JPG, JPEG Format. Max 5MB</p>
                      </div>
                    </div>
                    <button
                      className={`${base64Image ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#06B1CF] hover:bg-[#13aeb9]'} text-white font-thin px-8 py-1 rounded-[5px]`}
                      disabled={!!base64Image} // Disable button if base64Image is set
                    >
                      {base64Image ? "Uploaded" : "Upload"}
                    </button>


                  </div>
                  <div className="flex justify-center space-x-6 mt-8">
                    <button
                      variant="secondary"
                      className="bg-white border border-[#15c2cf] text-[#15c2cf] hover:bg-gray-100 font-thin px-6 py-2 rounded-[5px]"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button

                      type="submit"
                      //disabled={isLoading}
                      className="bg-[#06B1CF]  text-white hover:bg-[#13aeb9] font-thin px-8 py-2 rounded-[5px] shadow-lg"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </div>
                      ) : (
                        'Save'
                      )}
                    </button>
                  </div>

                </Form>
              )}
            </Formik>
            :
            <div className="item-center space-y-8 text-center">
              <p className="font-semibold text-xl">New Product Added Successfully!</p>
              <img src='/thumb.svg' alt={""} className="w-32 align-center ml-48" />
              <button

                onClick={() => { handleCloseModal() }}
                //disabled={isLoading}
                className="bg-[#06B1CF] w-full mt-4  text-white hover:bg-[#13aeb9] font-thin px-8 py-2 rounded-[15px] shadow-lg"
              > Go back  </button>
            </div>}
        </ModalBody>

      </Modal>



      {/** Delete Product modal */}
      <Modal open={showDeleteModal} width='450px'
        maxHeight='90vh' onClose={handleCloseDeleteModal}>
        <ModalHeader>
          <div className="flex items-center justify-between items-center">
            <p></p>
            <div className='bg-[#06B1CF] rounded-[100px] p-1'>
              <XIcon
                className="text-white hover:text-gray-300 cursor-pointer"
                size={18}
                strokeWidth={1}
                onClick={handleCloseDeleteModal}
              />
            </div>

          </div>
          <h3 className="text-xl font-semibold text-black text-center align-center ml-12 mr-12">{deleteItem ? "Are you sure you want to delete this product?" : "Product deleted successfully"}</h3>
        </ModalHeader>
        <ModalBody>
          <div className="items-center">
            <img src={deleteItem ? '/trash.svg' : '/question.svg'} alt={""} className="w-32 align-center ml-32" />
            {!deleteItem ? <div className="flex justify-center space-x-6 mt-8">
              <button
                variant="secondary"
                className=" w-full bg-white border border-[#15c2cf] text-[#15c2cf] hover:bg-gray-100 font-thin px-6 py-2 rounded-[15px]"
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </button>
              <button

                onClick={() => { deleteProduct(selectedProduct) }}
                //disabled={isLoading}
                className="bg-[#06B1CF] w-full  text-white hover:bg-[#13aeb9] font-thin px-8 py-2 rounded-[15px] shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Deleting...
                  </div>
                ) : (
                  'Yes, Delete'
                )}
              </button>
            </div> :
              <button

                onClick={() => { handleCloseDeleteModal() }}
                //disabled={isLoading}
                className="bg-[#06B1CF] w-full mt-4 text-white hover:bg-[#13aeb9] font-thin px-8 py-2 rounded-[15px] shadow-lg"
              > Go back  </button>
            }

          </div>


        </ModalBody>

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


          {!productUpdated ?
            <Formik
              initialValues={{
                category: selectedProduct?.category || "",
                price: selectedProduct?.price || "",
                productName: selectedProduct?.product_name || "",
                packSize: selectedProduct?.pack_size || "",
                dosageForm: selectedProduct?.dosage_form || "",
                companyName: selectedProduct?.company_name || "",
                productCode: selectedProduct?.product_code || "",
              }}
              validationSchema={ProductUpdateSchema}
              onSubmit={handleSubmitUpdateProduct}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4 w-full">
                  {[
                    { name: "category", label: "Category", type: "text" },
                    { name: "price", label: "Price", type: "number" },
                    { name: "productName", label: "Product Name", type: "text" },
                    { name: "packSize", label: "Pack Size", type: "text" },
                    { name: "dosageForm", label: "Dosage Form", type: "text" },
                    { name: "companyName", label: "Company Name", type: "text" },
                  ].map(({ name, label, type }) => (
                    <div key={name} className="flex flex-col space-y-2">
                      <label
                        htmlFor={name}
                        className="block text-gray-600 font-normal mb-1 text-xs"
                      >
                        {label}
                      </label>
                      <Field
                        id={name}
                        name={name}
                        type={type}
                        placeholder={label.toLowerCase()}
                        className={`w-full bg-white text-xs border rounded-lg pl-2 pr-4 py-3 font-thin focus:bg-white focus:outline-none ${errors[name] && touched[name]
                            ? "border-red-500"
                            : "border-gray-300"
                          }`}
                      />
                      <ErrorMessage
                        name={name}
                        component="div"
                        className="text-red-500 text-[10px] font-normal"
                      />
                    </div>
                  ))}

                  <div className="flex items-center justify-between mt-8">
                    <img
                      src={selectedProduct?.image_url || ""}
                      alt=""
                      className="rounded-lg w-24 h-24"
                    />
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full p-1.5 mr-2">
                        <img src="/upload.svg" alt="Upload Icon" className="w-4" />
                      </div>
                      <div>
                        <p className="font-normal text-[10px] text-black">
                          Upload your document
                        </p>
                        <p className="font-thin text-[8px] text-gray-400">
                          PNG, JPG, JPEG Format. Max 5MB
                        </p>
                      </div>
                    </div>
                    <button
                      className="bg-[#06B1CF] text-xs text-white hover:bg-[#13aeb9] font-thin px-4 py-1 rounded-md"
                    >
                      Upload
                    </button>
                  </div>

                  <div className="flex justify-center space-x-6 mt-8">
                    <button
                      type="button"
                      className="bg-white border border-[#15c2cf] text-[#15c2cf] hover:bg-gray-100 font-thin px-6 py-2 rounded-md"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-[#06B1CF] text-white hover:bg-[#13aeb9] font-thin px-8 py-2 rounded-md shadow-lg"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin h-5 w-5 mr-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Updating...
                        </div>
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            :
            <div className="item-center space-y-8 text-center">
              <p className="font-semibold text-xl">Product Updated Successfully!</p>
              <img src='/thumb.svg' alt={""} className="w-32 align-center ml-48" />
              <button

                onClick={() => { handleCloseUpdateModal() }}
                //disabled={isLoading}
                className="bg-[#06B1CF] w-full mt-4  text-white hover:bg-[#13aeb9] font-thin px-8 py-2 rounded-[15px] shadow-lg"
              > Go back  </button>
            </div>}





        </ModalBody>

      </Modal>



    </div>
  );
}; 