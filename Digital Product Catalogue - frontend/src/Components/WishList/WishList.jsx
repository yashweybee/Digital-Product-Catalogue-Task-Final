import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowWishlistModel } from "../../utils/stateSlice";
import Product from "../Product/Product";
import {
  useDeleteWishlistItemMutation,
  useGetWishlistProductsQuery,
} from "../../utils/apiSlice";
import WishListItem from "../WishListItem/WishListItem";

const WishList = () => {
  const { data: products } = useGetWishlistProductsQuery();
  const [deleteWishlistItem] = useDeleteWishlistItemMutation();

  const [productsData, setProductsData] = useState([]);

  const setdataOnStateChange = () => {
    console.log(products);
    setProductsData(products);
  };

  useEffect(() => {
    if (!products) return;
    setdataOnStateChange();
  }, [products]);

  const handleDeleteWIshlistItem = async (productId) => {
    console.log(productId);
    try {
      await deleteWishlistItem(productId);
      // Update state after successful deletion
      const tempData = productsData.filter((p) => p.product.id !== productId);
      // console.log(tempData);
      setProductsData(tempData);
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  };

  if (!productsData) return;

  return (
    <>
      <div className="flex flex-wrap justify-start mt-5">
        {productsData.map((product) => (
          <WishListItem
            handleDeleteWIshlistItem={handleDeleteWIshlistItem}
            data={product}
            key={product.product.id}
          />
        ))}
      </div>
    </>
  );
};

export default WishList;
