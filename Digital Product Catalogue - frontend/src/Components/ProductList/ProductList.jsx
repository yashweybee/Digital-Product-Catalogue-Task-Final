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
      {products.map((product) => (
        <div className="mt-5" key={product.id} onClick={handleModel}>
          <Product
            showModel={showModel}
            setShowModel={setShowModel}
            data={product}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
