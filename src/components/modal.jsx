import React from 'react';

export const Modal = ({ 
  open, 
  children, 
  width = '600px', 
  maxHeight = '90vh',
  backgroundOpacity = 50
}) => {
    if (!open) return null;
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-${backgroundOpacity}`}>
        <div 
          className="bg-white rounded-lg shadow-xl overflow-hidden"
          style={{ 
            width: width, 
            maxHeight: maxHeight 
          }}
        >
          {children}
        </div>
      </div>
    );
  };
  
export const ModalHeader = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);

export const ModalBody = ({ 
  children, 
  maxHeight = '70vh'
}) => (
  <div 
    className="p-6 overflow-y-auto"
    style={{ maxHeight: maxHeight }}
  >
    {children}
  </div>
);

export const ModalFooter = ({ children }) => (
  <div className="p-6">
    {children}
  </div>
);