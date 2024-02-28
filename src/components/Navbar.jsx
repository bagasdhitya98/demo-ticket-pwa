import React, { useState, useEffect } from "react";
import Seambiosys from "../assets/icons/seambiosys.png";
import Cart from "../assets/icons/cart.png";

const Navbar = ({ item }) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-white w-full h-16 flex justify-center shadow-md top-0 ${
        isSticky ? "sticky top-0" : ""
      }`}
    >
      <div className="container mx-auto py-2 px-2 flex justify-between items-center">
        <div className="flex items-center">
          <img src={Seambiosys} className="h-10 w-40" />
        </div>
        <div className="flex items-center">
          <span className="text-gray-600 font-semibold mr-4">
            {item ? `Total items : ${item}` : "No items are selected"}
          </span>
          <img src={Cart} className="h-10 w-10" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
