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

  useEffect(() => {
    if (!products) return;

    setProductsData(products);
  }, [products, productsData]);

  const handleDeleteWIshlistItem = async (productId) => {
    try {
      await deleteWishlistItem(productId);
      // Update state after successful deletion
      setProductsData((prevProducts) =>
        prevProducts.filter((p) => p.product.id !== productId)
      );
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  };

  if (!products) return;

  return (
    <>
      <div className="flex flex-wrap justify-start">
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
