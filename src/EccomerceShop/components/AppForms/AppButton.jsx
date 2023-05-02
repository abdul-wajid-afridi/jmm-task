import React from "react";

const AppButton = ({ onClick, type, children }) => {
  return (
    <button
      onClick={onClick}
      className="text-white bg-purple-500 hover:bg-purple-700 hover:shadow-lg outline-none mt-3 hover:shadow-purple-600/50 w-[180px] sm:w-[180px] h-[30px] rounded-lg "
      type={type}
    >
      {children}
    </button>
  );
};

export default AppButton;
