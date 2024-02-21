import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";

const ListProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [cartIsEmpty, setCartIsEmpty] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const listCart = Object.entries(cart);

  const getAllProducts = async (
    url = "/api/products?limit=20&archived=false"
  ) => {
    try {
      const response = await axios.get(url);
      setProducts(response.data.results);
      setLoading(false);
    } catch (error) {
      showErrorAlert(
        "Failed fetching product",
        "Something went wrong, please refresh your page"
      );
    }
  };

  useEffect(() => {
    getAllProducts();
    checkIfCartIsEmpty();
  }, [cart]);

  const showErrorAlert = (title, text) => {
    Swal.fire({
      icon: "error",
      title,
      text,
    });
  };

  const checkIfCartIsEmpty = () => {
    setCartIsEmpty(Object.keys(cart).length === 0);
  };

  const addToCart = (productId, quantity) => {
    setCart({
      ...cart,
      [productId]: (cart[productId] || 0) + quantity,
    });
    Swal.fire({
      icon: "success",
      title: "Success added to cart",
      timer: 2000,
    });
  };

  const transformCartToOrderData = () => {
    const orderItems = Object.entries(cart).map(([productId, quantity]) => {
      const product = products.find((p) => p.id === productId);

      return {
        properties: {
          name: product?.properties.name,
          price: product?.properties.price,
          quantity: quantity.toString(),
          hs_product_id: product?.properties.hs_product_id,
          recurringbillingfrequency: "monthly",
          hs_recurring_billing_period: "P24M",
        },
        associations: [
          {
            types: [
              {
                associationCategory: "HUBSPOT_DEFINED",
                associationTypeId: 20,
              },
            ],
            to: {
              id: "string",
            },
          },
        ],
      };
    });

    return { inputs: orderItems };
  };

  const generateRandomDealName = () => {
    const randomDealNumber = Math.floor(Math.random() * 9000) + 1000;
    return `Software License Agreement - Deal ${randomDealNumber}`;
  };

  const proceedItems = () => {
    setIsModalOpen(true);
  };

  const proceedOrder = async () => {
    const orderItems = transformCartToOrderData();
    const dealName = generateRandomDealName();

    if (!orderItems.inputs || orderItems.inputs.length === 0) {
      return;
    }

    const totalAmount = orderItems.inputs.reduce(
      (acc, item) => acc + parseFloat(item?.properties?.price),
      0
    );

    try {
      const response = await axios.post("api/deals", {
        associations: [],
        properties: {
          amount: totalAmount,
          dealname: dealName,
          dealstage: "contractsent",
          pipeline: "default",
        },
      });

      const order_detail = response?.data?.data;
      const hs_object_id = response?.data?.data?.id;

      const orderLine = Object.entries(cart).map(([productId, quantity]) => {
        const product = products.find((p) => p.id === productId);

        return {
          properties: {
            name: product?.properties.name,
            price: product?.properties.price,
            quantity: quantity.toString(),
            recurringbillingfrequency: "monthly",
            hs_recurring_billing_period: "P24M",
          },
          associations: [
            {
              types: [
                {
                  associationCategory: "HUBSPOT_DEFINED",
                  associationTypeId: 20,
                },
              ],
              to: {
                id: hs_object_id,
              },
            },
          ],
        };
      });

      const lineItemsResponse = await axios.post("api/lineItems_batch", {
        inputs: orderLine,
      });

      if (lineItemsResponse.status === 200) {
        localStorage.setItem("orderItems", JSON.stringify(orderItems));
        showSuccessAlert("Success", "Payment successfully");
        setCart({});
        checkIfCartIsEmpty();
        localStorage.setItem("orderDetail", JSON.stringify(order_detail));
        navigate("payment/order");
      }
    } catch (error) {
      showErrorAlert("Failed proceed order", "Error : " + error);
    }
  };

  const showSuccessAlert = (title, text) => {
    Swal.fire({
      icon: "success",
      title,
      text,
    });
  };

  return (
    <Layout>
      {loading ? <></> : <Navbar item={listCart.length} />}
      <div className="my-10 shadow-md p-10 mx-auto w-max">
        {loading ? (
          <></>
        ) : (
          <label className="font-bold text-2xl">List Products</label>
        )}
        {loading ? (
          <Loading text="Fetching products..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-3 mt-5">
            {products.map((product, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md shadow-md w-96"
              >
                <h3 className="text-xl font-semibold">
                  {product.properties.name}
                </h3>
                <p className="text-gray-600">
                  Price: ${product.properties.price}
                </p>
                <div className="mt-4">
                  <button
                    onClick={() => addToCart(product.id, 1)}
                    className="bg-blue-900 font-semibold text-white px-4 py-2 rounded-md"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="bg-white w-96 h-max p-10 rounded-md z-20">
          <ul className="divide-y divide-gray-200">
            {Object.entries(cart).map(([productId, quantity]) => {
              const product = products.find((p) => p.id === productId);
              return (
                <li key={productId} className="flex items-center py-2">
                  <div className="ml-3">
                    <p className="text-gray-800">
                      {product?.properties.name} - ${product?.properties.price}
                    </p>
                    <p className="text-gray-500">Quantity: {quantity}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-6">
            <button
              onClick={() => proceedOrder()}
              className="bg-green-500 font-semibold text-white w-full px-4 py-2 rounded-md"
            >
              Proceed Order
            </button>
          </div>
        </div>
      </Modal>
      {listCart.length !== 0 ? (
        <div className="relative sticky bottom-0 w-screen h-20 bg-white p-5 flex justify-end">
          <button
            className="bg-orange-400 font-semibold text-white border-none focus:outline-none"
            onClick={() => proceedItems()}
          >
            Checkout Items
          </button>
        </div>
      ) : (
        <></>
      )}
    </Layout>
  );
};

export default ListProducts;
