import React from "react";
import { useNavigate } from "react-router-dom";
import OrderIllustration from "../assets/illustrations/order_illustration.jpeg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col justify-center items-center h-screen w-screen">
      <img src={OrderIllustration} width={400} height={400} />
      <div className="text-center lg:mx-0 md:mx-10 mx-20">
        <h1 className="text-4xl font-bold mb-4 text-orange-500">
          Welcome to Our Demo Site
        </h1>
        <p className="text-blue-900">
          This site is provided for demonstration purposes, showcasing order
          creation, checking order lists, and payment via a payment gateway.
        </p>
        <p className="text-blue-900">
          Explore the convenience and functionality we offer in the online
          ordering and payment process.
        </p>
        <button
          onClick={() => navigate("products/list_products")}
          className="mt-8 bg-blue-900 hover:bg-blue-700 focus:outline-none font-semibold text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Get Started
        </button>
      </div>
    </section>
  );
};

export default LandingPage;
