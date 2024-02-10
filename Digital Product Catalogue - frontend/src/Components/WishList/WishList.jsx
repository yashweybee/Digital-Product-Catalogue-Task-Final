import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowWishlistModel } from "../../utils/stateSlice";
import Product from "../Product/Product";
import { useGetWishlistProductsQuery } from "../../utils/apiSlice";
import WishListItem from "../WishListItem/WishListItem";

const WishList = () => {
  const userId = localStorage.getItem("userId");
  const { data: products } = useGetWishlistProductsQuery(Number(userId));
  const [isOpen, setIsOpen] = useState(false);
  const [clickedProduct, setClickedProduct] = useState(null);
  const [productsData, setProductsData] = useState([]);
  //   console.log(products);

  useEffect(() => {
    if (!products) return;
    console.log(products);
    setProductsData(products);
  }, [products]);

  const handleOpenModel = (modelId) => {
    const modelData = products.find((p) => p.id === modelId);
    setIsOpen(true);
    setClickedProduct(modelData);
  };

  const handleCloseModel = () => {
    setIsOpen(false);
    setClickedProduct(null);
  };

  return (
    <>
      <div className="flex flex-wrap justify-start  ">
        {productsData.map((product) => (
          <WishListItem
            // handleOpenModel={handleOpenModel}
            data={product}
            key={product.product.id}
          />
        ))}
      </div>
    </>
  );
};

export default WishList;
