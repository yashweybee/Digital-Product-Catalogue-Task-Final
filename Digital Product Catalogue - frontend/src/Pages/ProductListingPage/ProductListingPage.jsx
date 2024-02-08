import React, { useState } from "react";
import ProductList from "../../Components/ProductList/ProductList";
import Header from "../../Components/Header/Header";
import Filter from "../../Components/Filter/Filter";

const ProductListingPage = () => {
  const [showModel, setShowModel] = useState(false);
  return (
    <div className="">
      <Header />
      <div className="flex">
        {/* <Filter /> */}
        <ProductList />
      </div>
    </div>
  );
};

export default ProductListingPage;
