import React from "react";

const Layout = ({ children }) => {
  return (
    <section className="w-full h-max flex flex-col justify-center items-center">
      {children}
    </section>
  );
};

export default Layout;
