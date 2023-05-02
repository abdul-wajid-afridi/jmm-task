import React from "react";

const AppInput = ({ onChange, placeholder, type }) => {
  return (
    <input
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      className="h-[25px] sm:h-[34px] w-full  mx-0 sm:mx-3 border outline-none border-purple-500 pl-1  rounded-md"
    />
  );
};

export default AppInput;
