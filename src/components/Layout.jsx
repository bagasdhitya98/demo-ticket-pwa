import React from "react";

const Layout = ({ children }) => {
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center bg-white">
      {children}
    </section>
  );
};

export default Layout;
