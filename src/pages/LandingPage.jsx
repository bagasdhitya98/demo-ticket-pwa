import React from "react";
import { useNavigate } from "react-router-dom";
import OrderIllustration from "../assets/illustrations/order_illustration.jpeg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <section className="flex justify-center items-center h-screen w-screen">
      <img src={OrderIllustration} width={400} height={400} />
      <div className="text-left lg:mx-10 md:mx-10 mx-20">
        <p className="text-blue-900 mr-40">
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
