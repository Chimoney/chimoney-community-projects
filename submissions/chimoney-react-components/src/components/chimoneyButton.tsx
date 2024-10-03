import React from "react";

export const ChimoneyButton = ({ className, onClick, buttonName, type }) => {
  return (
    <button onClick={() => onClick} className={className || ""} type={type}>
      {buttonName}
    </button>
  );
};
