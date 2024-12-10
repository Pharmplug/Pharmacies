// Secure token storage
export const storeAuthToken = (token) => {
    // Use more secure storage methods
    sessionStorage.setItem('authToken', token);
    // Implement additional security measures like encryption
  };
  
  export const storeData = (p) => {
    // Use more secure storage methods
    sessionStorage.setItem('pharmacy-data', p);
    console.log(p)
    // Implement additional security measures like encryption
  };
  

  export const retrieveData =() => {
    // Use more secure storage methods
 const  userData=  sessionStorage.getItem('pharmacy-data');
   return JSON.parse(userData)
    // Implement additional security measures like encryption
  };
  