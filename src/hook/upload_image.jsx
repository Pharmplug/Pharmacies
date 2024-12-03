import { useState } from "react";

// Convert image file to Base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1]; // Remove the "data:image/png;base64," part
      resolve(base64String); // Return only the base64 encoded part
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

function useImagePicker() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");

  // Handle image selection
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      try {
        const base64 = await convertToBase64(file); // Wait for the base64 conversion
        setBase64Image(base64); // Update state with base64 value

        console.log(base64); // Log the base64 string without the prefix
      } catch (error) {
        console.error(error);
      }
    }
  };

  return {setSelectedImage,setBase64Image, selectedImage, base64Image, handleImageChange, convertToBase64 };
}

export default useImagePicker;
