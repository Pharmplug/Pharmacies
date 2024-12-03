import React from 'react';

export const Button = ({ children, onClick, className, variant }) => {
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