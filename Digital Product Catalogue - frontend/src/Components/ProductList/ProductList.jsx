import React, { useState } from "react";
import { useGetProductsQuery } from "../../utils/apiSlice";
import Product from "../Product/Product";
import ProductModel from "../ProductModel/ProductModel";

const ProductList = () => {
  const [clickedProduct, setClickedProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data: products } = useGetProductsQuery();
  if (!products) return;

  const handleCloseModel = () => {
    setIsOpen(false);
    setClickedProduct(null);
  };

  const handleOpenModel = (modelId) => {
    const modelData = products.find((p) => p.id === modelId);
    setIsOpen(true);
    setClickedProduct(modelData);
  };

  return (
    <div className="flex flex-wrap justify-center bg-white">
      {products.map((product) => (
        <Product
          handleOpenModel={handleOpenModel}
          data={product}
          key={product.id}
        />
      ))}

      {clickedProduct && (
        <ProductModel
          data={clickedProduct}
          handleCloseModel={handleCloseModel}
        />
      )}
    </div>
  );
};

export default ProductList;
