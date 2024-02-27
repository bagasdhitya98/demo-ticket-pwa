import React from "react";
import { useNavigate } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";

import HistoryWhite from "../assets/icons/history_white.png";
import CheckoutBlue from "../assets/icons/checkout_blue.png";

const data = {
  labels: ["Product A", "Product B", "Product C"],
  datasets: [
    {
      label: "Sales",
      data: [3000, 2000, 1000],
      backgroundColor: ["#3182CE", "#2C5282", "#2B6CB0"],
      borderWidth: 0,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
};

const DonutChart = () => {
  return (
    <div style={{ width: "200px", height: "200px" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="w-screen h-screen bg-blue-100 flex flex-col items-center relative">
      <div className="h-1/3 w-screen bg-blue-900 rounded-b-lg">
        <div className="mx-5 bg-slate-100 rounded-2xl h-max flex p-5 space-x-2 my-5">
          <div className="grid gap-y-5">
            <h2 className="font-semibold">Total Sales Today</h2>
            <p>$5,000</p>
          </div>
          <div className="border border-blue-900" />
          <div className="grid gap-y-5">
            <h2 className="font-semibold">Total Sales This Month</h2>
            <p>$120,000</p>
          </div>
          <div className="border border-blue-900" />
          <div className="grid gap-y-5">
            <h2 className="font-semibold">Average Transactions</h2>
            <p>$500</p>
          </div>
        </div>
        <div className="mx-5 bg-slate-100 rounded-lg h-max flex p-5 space-y-2 my-26">
          <div className="flex flex-col space-y-20">
            <h2 className="font-semibold">
              Total Sales as on 27 February 2024
            </h2>
            <h2 className="text-4xl text-blue-900">$5,000</h2>
          </div>
          <DonutChart />
        </div>
        <div className="mx-5 my-5 flex justify-center">
          <div
            className="w-full h-40 bg-blue-800 rounded-lg flex justify-start relative"
            style={{
              backgroundImage: `url('/sales_illustration.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="p-4 font-semibold text-blue-900 relative z-10">
              Check Our Services!
            </h2>
            <div
              className="absolute inset-0 bg-black opacity-50 rounded-lg"
              style={{ zIndex: -1 }}
            ></div>
          </div>
        </div>
        <div className="mx-5 flex justify-center space-x-5">
          <button className="border shadow-md bg-blue-900 w-44 h-60 flex flex-col items-center justify-center gap gap-y-5">
            <img src={HistoryWhite} width={60} height={60} />
            <p className="text-white font-bold">History Order</p>
          </button>
          <button
            onClick={() => navigate("/products/list_products")}
            className="border shadow-md bg-white w-44 h-60 flex flex-col items-center justify-center gap gap-y-5"
          >
            <img src={CheckoutBlue} width={60} height={60} />
            <p className="text-blue-900 font-bold">Create Order</p>
          </button>
        </div>
      </div>
      <div className="h-1/2 w-screen"></div>
    </section>
  );
};

export default LandingPage;
