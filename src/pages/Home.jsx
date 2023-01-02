import React from "react";
import { Chart } from "react-google-charts";
import ItemsCard from "../componets/ItemsCard";
import Navbar from "../componets/Navbar";
import OrderCard from "../componets/OrderCard";
import RecentOrdersCard from "../componets/RecentOrderCard";
import { ItemsData, OrderData, RecentOrders } from "../config/Data";

export const data = [
  ["Year", "Pending", "Process", "Delivered", "Resumed"],
  ["2014", 5, 4, 2, 4],
  ["2015", 4, 6, 5, 3],
  ["2016", 6, 2, 3, 5],
  ["2017", 3, 4, 5, 1],
];

export const options = {
  chart: {
    title: "comparison Graph",
  },
};

export const data2 = [
  ["year", "", ""],
  ["jan", 0, 5],
  ["Feb", 2, 0],
  ["march", 0, 2],
  ["april", 0, 2],
  ["may", 0, 2],
  ["june", 0, 3],
  ["july", 0, 1],
  ["august", 0, 1],
  ["sep", 0, 7],
  ["oct", 0, 8],
  ["nov", 0, 4],
  ["Dec", 0, 1],
];

export const options2 = {
  chart: {
    title: "comparison Graph",
  },
};

export default function App() {
  return (
    <section>
      <Navbar />
      <div className="flex flex-wrap h-auto  mx-10 my-10 gap-3 ">
        {OrderData.map((it) => {
          return (
            <OrderCard
              key={it.id}
              orderCount={it.count}
              title={it.title}
              bgColor={it.bgColor}
              percentage={it.percent}
            />
          );
        })}
      </div>
      <div className="flex gap-4 ">
        <div className="w-full">
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={data}
            options={options}
          />
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={data2}
            options={options2}
          />
        </div>
        <div className="flex flex-col gap-4">
          {ItemsData.map((it) => {
            return (
              <ItemsCard
                key={it.id}
                title={it.title}
                subtitle={it.subtitle}
                count={it.count}
                percent={it.percent}
                icon={it.icon}
                iconColor={it.iconColor}
              />
            );
          })}
        </div>
      </div>
      <div className="mt-10">
        <p>Recent Orders</p>
        {RecentOrders.map((it) => {
          return (
            <RecentOrdersCard
              key={it.id}
              id={it.id}
              title={it.title}
              subTitle={it.subTitle}
              btn={it.btn}
              date={it.date}
              number={it.number}
              quantity={it.quantity}
            />
          );
        })}
      </div>
    </section>
  );
}
