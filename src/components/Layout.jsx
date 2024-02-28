import React from "react";

const Layout = ({ children }) => {
  return (
    <section className="w-screen h-full flex flex-col justify-center items-center bg-white">
      {children}
    </section>
  );
};

export default Layout;
