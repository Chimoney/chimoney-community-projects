import React from "react";

export const ChimoneyInput = ({ className, type, value, onChange }) => {
  return (
    <input
      type={type}
      className={` w-full ${className || ""}`}
      value={value}
      onChange={onChange}
      required
    />
  );
};
