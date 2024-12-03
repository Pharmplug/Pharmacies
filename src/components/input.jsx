import React from 'react';

export const Input = ({ type, placeholder, value, onChange, className }) => (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border ${className}`}
    />
  );