import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const PaymentPage = () => {
  const navigate = useNavigate();

  const [selectedBank, setSelectedBank] = useState("");

  const orderItems = JSON.parse(localStorage.getItem("orderItems"));
  const listItems = orderItems?.inputs?.map((item) => item);

  const handleBankSelection = (bank) => {
    setSelectedBank(bank);
  };

  const handlePaymentConfirmation = () => {
    navigate("information");
  };

  const calculateTotalAmount = () => {
    if (!listItems || listItems.length === 0) {
      return 0;
    }

    const totalAmount = listItems.reduce(
      (acc, item) => acc + parseFloat(item?.properties?.price),
      0
    );

    return totalAmount.toFixed(2);
  };

  const renderBankSelection = (bank, label) => (
    <div
      className={`bg-white flex items-center justify-between border shadow-sm p-4 rounded-md cursor-pointer text-center ${
        selectedBank === bank && "border-2 border-blue-900"
      }`}
      onClick={() => handleBankSelection(bank)}
    >
      <img width={60} height={60} src={getBankLogoSrc(bank)} alt={bank} />
      <h2 className="text-xl font-semibold">{label}</h2>
    </div>
  );

  const getBankLogoSrc = (bank) => {
    switch (bank) {
      case "bca":
        return "https://buatlogoonline.com/wp-content/uploads/2022/10/Logo-Bank-BCA-1.png";
      case "bni":
        return "https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png";
      case "bri":
        return "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/BANK_BRI_logo.svg/1280px-BANK_BRI_logo.svg.png";
      default:
        return "";
    }
  };

  return (
    <section className="w-full bg-blue-100 h-full flex flex-col mx-6 justify-center items-center">
      <div className="mt-10 w-full md:w-2/3 lg:w-1/2 mx-auto">
        <h2 className="text-xl font-bold mb-4">Purchase Summary:</h2>
        <div className="w-full border rounded-md p-5 bg-white">
          {listItems &&
            listItems?.map((item, key) => (
              <div key={key} className="flex justify-between mb-4">
                <div>
                  <p className="font-semibold text-gray-700">
                    {item?.properties?.name}
                  </p>
                  <p>Quantity: {item?.properties?.quantity}</p>
                </div>
                <p className="font-semibold">{item?.properties?.price}</p>
              </div>
            ))}

          <div className="w-full border-t border-slate-200 mt-4 pt-4">
            <p className="text-xl font-semibold">Total Amount:</p>
            <p className="text-2xl text-red-500 font-bold">
              {calculateTotalAmount()}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/3 lg:w-1/2 mx-auto my-20">
        <h1 className="text-xl font-bold mb-4">Select Payment Method : </h1>
        <div className="grid grid-cols-1 gap-4">
          {renderBankSelection("bca", "BCA Virtual Account")}
          {renderBankSelection("bni", "BNI Virtual Account")}
          {renderBankSelection("bri", "BRI Virtual Account")}
        </div>
        <button
          onClick={handlePaymentConfirmation}
          className="mt-8 w-full bg-green-500 hover:bg-green-600 font-semibold text-center text-white p-2 rounded-md focus:outline-none border-none"
          disabled={!selectedBank}
        >
          Proceed Payment
        </button>
      </div>
    </section>
  );
};

export default PaymentPage;
