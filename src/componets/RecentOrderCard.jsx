import React from "react";
import { FaArrowCircleDown } from "react-icons/fa";

const RecentOrdersCard = ({
  id,
  title,
  subTitle,
  number,
  quantity,
  btn,
  date,
}) => {
  return (
    <div className="flex justify-between items-center h-[46px] text-[14px] text-gray-700 bg-white border py-5 ">
      <p>{id}</p>
      <p>{title}</p>
      <p>{number}</p>
      <p>{subTitle}</p>
      <p>{quantity}</p>
      <p>{date}</p>
      <button className="flex  items-center bg-gray-300 px-2 gap-1 rounded-md h-[35px] ">
        {btn} <span>{<FaArrowCircleDown />}</span>
      </button>
    </div>
  );
};

export default RecentOrdersCard;
