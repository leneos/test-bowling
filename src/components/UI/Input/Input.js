import React from "react";

export const Input = ({
  onChange,
  min,
  max,
  className,
  type,
  placeholder,
  value,
}) => {
  return (
    <input
      value={value}
      type={type}
      className={className}
      onChange={onChange}
      min={min}
      max={max}
      placeholder={placeholder}
    />
  );
};
