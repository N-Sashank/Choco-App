import React from "react";
import Header from "../../client-components/header";
import Single_productComponent from "./SingleProductComponent";
import Footer from "../../client-components/footer";

const SingleProductpage = () => {
  return (
    <div className="flex flex-col gap-14">
      <Header />
      <Single_productComponent />
      <Footer />
    </div>
  );
};

export default SingleProductpage;
