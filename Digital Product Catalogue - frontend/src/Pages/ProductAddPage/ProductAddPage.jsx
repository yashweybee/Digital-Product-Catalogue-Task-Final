import React from "react";
import ProductForm from "../../Components/ProductForm/ProductForm";

const ProductAddPage = () => {
  return (
    <div className="mt-10">
      <div className="Heading ">
        <h1 className="text-2xl">Add product</h1>
      </div>
      <ProductForm />
    </div>
  );
};

export default ProductAddPage;
