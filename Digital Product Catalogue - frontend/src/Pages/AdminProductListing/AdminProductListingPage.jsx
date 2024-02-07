import React from "react";
import Product from "../../Components/Product/Product";
import Filter from "../../Components/Filter/Filter";

const AdminProductListingPage = () => {
  return (
    <div className="mt-10">
      <div className="Heading ">
        <h1 className="text-2xl">All products</h1>
        <Filter />
      </div>
      <div className="bg-white flex flex-wrap">
        <Product />
      </div>
    </div>
  );
};

export default AdminProductListingPage;
