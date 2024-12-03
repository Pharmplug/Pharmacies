import React  from 'react';


export const Modal = ({ open, children }) => {
    if (!open) return null;
    return (
      <div className=" fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[90vh] overflow-hidden">
          {children}
        </div>
      </div>
    );
  };
  
 export  const ModalHeader = ({ children }) => (
    <div className="p-6">
      {children}
    </div>
  );
  
  export const ModalBody = ({ children }) => (
    <div className="p-6 overflow-y-auto max-h-[70vh]">
      {children}
    </div>
  );
  
  export const ModalFooter = ({ children }) => (
    <div className="p-6 ">
      {children}
    </div>
  );
  