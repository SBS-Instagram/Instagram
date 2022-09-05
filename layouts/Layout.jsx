import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="m-auto max-w-4xl">
      <Header />
      <main className="mt-16">{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
