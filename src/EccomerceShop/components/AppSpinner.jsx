import React from "react";

const AppSpinner = () => {
  return (
    <div className="flex justify-center h-[60vh] items-center">
      <div className="h-[20px] w-[20px]  animate-spin  border-8 border-t-orange-500 border-b-purple-500"></div>
    </div>
  );
};

export default AppSpinner;
