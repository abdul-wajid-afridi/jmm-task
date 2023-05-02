import React from "react";

const ProgressSteps = ({ active1, active2, active3, active4 }) => {
  return (
    <div className="flex justify-between text-xs sm:text-sm mb-4">
      <p
        className={
          active1
            ? "border-b-[3px] w-full border-purple-500 text-purple-500"
            : "border-b-[3px] w-full border-gray-400 text-gray-600"
        }
      >
        signin
      </p>
      <p
        className={
          active2
            ? "border-b-[3px] w-full border-purple-500 text-purple-500"
            : "border-b-[3px] w-full border-gray-400 text-gray-600"
        }
      >
        shipping
      </p>
      <p
        className={
          active3
            ? "border-b-[3px] w-full border-purple-500 text-purple-500"
            : "border-b-[3px] w-full border-gray-400 text-gray-600"
        }
      >
        payments
      </p>
      <p
        className={
          active4
            ? "border-b-[3px] w-full border-purple-500 text-purple-500"
            : "border-b-[3px] w-full border-gray-400 text-gray-600"
        }
      >
        place order
      </p>
    </div>
  );
};

export default ProgressSteps;
