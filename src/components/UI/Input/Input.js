import React from "react";

export const Input = ({
  onChange,
  min,
  max,
  className,
  type,
  value,
  placeholder,
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
