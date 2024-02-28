import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import Layout from "../components/Layout";
import Loading from "../components/Loading";

const InformationPage = () => {
  const navigate = useNavigate();
  const [detail, setDetails] = useState();
  const [loading, setLoading] = useState(true);

  const order_detail = localStorage.getItem("orderDetail");
  const order_items = JSON.parse(localStorage.getItem("orderItems") || "[]");
  const order_id = JSON.parse(order_detail);

  const getDetailPayment = async () => {
    try {
      const response = await axios.get(`api/deals/${order_id?.id}`);
      setLoading(true);
      setDetails(response?.data?.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        text: "Something went wrong",
        title: "Something went wrong, please refresh your page",
        confirmButtonText: "OK",
      });
    }
  };

  const handleCopyText = () => {
    if (detail?.properties?.va_numbers) {
      navigator.clipboard.writeText(detail?.properties?.va_numbers);
      Swal.fire({
        icon: "success",
        title: "Copied!",
        text: "Virtual Account Number copied to clipboard.",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    getDetailPayment();
  }, []);

  useEffect(() => {
    const vaNumber = detail?.properties?.va_numbers;
    if (vaNumber !== null) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [detail?.properties?.va_numbers]);

  console.log(detail?.properties);

  return (
    <section>
      {loading === false ? (
        <Loading text="Fetching virtual account number..." />
      ) : (
        <div className="w-full h-full border bg-white rounded-md shadow-sm p-5">
          <h1 className="text-2xl">Payment Information</h1>
          <p className="my-3 font-semibold">Summary Orders</p>
          <div className="gap-5">
            {order_items?.inputs &&
              order_items?.inputs?.map((item) => (
                <div className="flex justify-between">
                  <p>{item?.properties?.quantity}</p>
                  <p className="absolute ml-10">{item?.properties?.name}</p>
                  <p>${item?.properties?.price}</p>
                </div>
              ))}
          </div>
          <hr className="my-5" />
          <p className="my-3 font-semibold">Virtual Account Number</p>
          <p className="text-sm text-gray-500">
            Please copy the Virtual Account Number below to proceed with your
            payment at your selected bank:
          </p>
          <div className="flex items-center mt-2">
            <p className="text-red-500 text-xl font-semibold mr-3">
              {detail?.properties?.va_numbers}
            </p>
            <a
              onClick={handleCopyText}
              className="text-blue-900 underline cursor-pointer"
            >
              Copy Text
            </a>
          </div>
          <div className="mt-10">
            <button
              className="w-full bg-blue-900 text-white font-semibold"
              onClick={() => navigate("/products/list_products")}
            >
              Back to Products
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default InformationPage;
