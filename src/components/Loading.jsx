import React from "react";
import { motion } from "framer-motion";

const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center h-20 w-60 rounded-md bg-white">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-8 h-8 animate-spin text-gray-500"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </motion.div>
      <p className="ml-2">{text}</p>
    </div>
  );
};

export default Loading;
