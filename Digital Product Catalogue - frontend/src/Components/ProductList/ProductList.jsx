import React, { useState } from "react";
import { useGetProductsQuery } from "../../utils/apiSlice";
import Product from "../Product/Product";

const ProductList = () => {
  const [showModel, setShowModel] = useState(false);
  const { data: products } = useGetProductsQuery();
  if (!products) return;
  console.log(products);
  const handleModel = () => {
    setShowModel(!showModel);
  };

  return (
    <div className="flex flex-wrap justify-center bg-white">
      <div onClick={handleModel}>
        <Product showModel={showModel} setShowModel={setShowModel} />
      </div>
      <div onClick={handleModel}>
        <Product showModel={showModel} setShowModel={setShowModel} />
      </div>
    </div>
  );
};

export default ProductList;
