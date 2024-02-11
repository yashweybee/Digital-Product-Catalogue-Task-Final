import React, { useEffect } from "react";
import ProductForm from "../../Components/ProductForm/ProductForm";
import { useNavigate } from "react-router";
import Header from "../../Components/Header/Header";

const ProductAddPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userName") !== "Admin") {
      navigate("/products");
    }
  }, []);

  return (
    <>
      <Header />
      <div className="mt-10">
        <div className="Heading ml-10">
          <h1 className="text-2xl font-bold">Add product</h1>
        </div>
        <ProductForm />
      </div>
      <footer />
    </>
  );
};

export default ProductAddPage;
