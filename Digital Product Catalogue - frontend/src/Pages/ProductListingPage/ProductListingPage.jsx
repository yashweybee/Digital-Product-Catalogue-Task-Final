import React, { useState } from "react";
import ProductList from "../../Components/ProductList/ProductList";
import Header from "../../Components/Header/Header";
import Filter from "../../Components/Filter/Filter";

const ProductListingPage = () => {
  const [showModel, setShowModel] = useState(false);
  return (
    <div className="">
      <Header />
      <Filter />
      <ProductList />
    </div>
  );
};

export default ProductListingPage;
