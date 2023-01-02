import React from "react";

const OrderCard = ({ title, orderCount, percentage, bgColor }) => {
  return (
    <div className="flex flex-col justify-between px-4 pt-3 w-[335px] h-[131px] bg-white shadow-md rounded-md ">
      <p className="text-xl tracking-wide capitalize   text-gray-800">
        {title}
      </p>
      <div className="flex flex-col gap-1">
        <p>{orderCount}</p>
        <div className=" bg-gray-300 h-[8px] w-[90%] rounded-full">
          <p className={`h-full w-[60%] rounded-full z-2 ${bgColor}`}></p>
        </div>
        <p className="text-[10px]">{percentage}</p>
      </div>
    </div>
  );
};

export default OrderCard;
