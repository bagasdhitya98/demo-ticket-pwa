import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, children }) => {
  const closeModal = () => {
    onClose && onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            className="fixed inset-0 z-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
