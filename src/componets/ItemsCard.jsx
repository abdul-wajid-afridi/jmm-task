import React from "react";

const ItemsCard = ({ count, percent, title, subtitle, icon, iconColor }) => {
  return (
    <section className="flex justify-around items-center h-[101px] w-[335px] bg-white rounded-md shadow-md ">
      <div className="flex items-center gap-3">
        <div className={iconColor}>{icon}</div>
        <div className="flex flex-col ">
          <p>{count}</p>
          <p className="text-gray-600 text-sm">{title}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-gray-600 text-[12px]">{percent}</p>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
    </section>
  );
};

export default ItemsCard;
