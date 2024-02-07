import React from "react";
import { useGetProductsQuery } from "../../utils/apiSlice";

const ProductList = () => {
  const { data: products } = useGetProductsQuery();
  if (!products) return;
  console.log(products);

  return <div>{<img src={products[4].images[0].path} alt="Image" />}</div>;
};

export default ProductList;
