import React from "react";
import { useNavigate } from "react-router-dom";
import OrderIllustration from "../assets/illustrations/order_illustration.jpeg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col lg:flex-row justify-center items-center h-screen w-screen mx-4 lg:mx-0">
      <img
        src={OrderIllustration}
        className="lg:w-1/2"
        alt="Order Illustration"
      />
      <div className="text-center lg:text-left lg:w-1/2 mx-4 lg:mx-10 md:mx-10">
        <p className="text-blue-900">
          With just one click of the button below, you can experience the
          convenience and functionality we offer in the online ordering and
          payment process. Explore the ease of order creation, checking order
          lists, and payment via a payment gateway.
        </p>
        <button
          onClick={() => navigate("/products/list_products")}
          className="mt-8 bg-blue-900 hover:bg-blue-700 focus:outline-none font-semibold text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Check Products
        </button>
      </div>
    </section>
  );
};

export default LandingPage;
