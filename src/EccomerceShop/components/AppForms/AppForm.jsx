import React from "react";

const AppForm = ({ children, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:grid place-items-center bg-gray-200 gap-3 px-4 sm:px-4 py-8"
    >
      {children}
    </form>
  );
};

export default AppForm;
