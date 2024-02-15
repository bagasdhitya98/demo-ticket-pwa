import React from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import LandingPage from "../pages/LandingPage";
import ListProducts from "../pages/ListProducts";
import ListDeals from "../pages/ListDeals";
import PaymentPage from "../pages/PaymentPage";
import InformationPage from "../pages/InformationPage";

const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LandingPage />
            </motion.div>
          }
          path="/"
        />
        <Route
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ListDeals />
            </motion.div>
          }
          path="deals/list_deals"
        />
        <Route
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ListProducts />
            </motion.div>
          }
          path="products/list_products"
        />
        <Route
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PaymentPage />
            </motion.div>
          }
          path="products/list_products/payment/order"
        />
        <Route
          element={
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InformationPage />
            </motion.div>
          }
          path="products/list_products/payment/order/information"
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
