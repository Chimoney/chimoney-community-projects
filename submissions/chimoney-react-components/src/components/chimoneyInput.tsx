import React from "react";

export const ChimoneyInput = ({
  className,
  type,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type={type}
      className={` w-full ${className || ""}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  );
};
