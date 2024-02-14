import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowWishlistModel } from "../../utils/stateSlice";
import Product from "../Product/Product";
import {
  useAddWishlistItemMutation,
  useDeleteWishlistItemMutation,
  useGetWishlistProductsQuery,
} from "../../utils/apiSlice";
import WishListItem from "../WishListItem/WishListItem";

const WishList = () => {
  const { data: products, isLoading } = useGetWishlistProductsQuery();
  const [deleteWishlistItem] = useDeleteWishlistItemMutation();
  const [clickedProduct, setClickedProduct] = useState(null);
  const [addToWishlist] = useAddWishlistItemMutation();
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    if (!products) return;
    setProductsData(products);
  }, [products]);

  const handleDeleteWIshlistItem = async (productId) => {
    console.log(productId);
    try {
      await deleteWishlistItem(productId);

      const tempData = productsData.filter((p) => p.product.id !== productId);
      setProductsData(tempData);
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  };

  const handleAddtoWishlist = (productId) => {
    const wishlistItem = {
      userId: localStorage.getItem("userId"),
      productId: productId,
    };
    // console.log(localStorage.getItem("userId"));
    addToWishlist(wishlistItem);
  };

  const handleCloseModel = () => {
    // setIsOpen(false);
    setClickedProduct(null);
  };

  const handleOpenModel = (modelId) => {
    const modelData = products.find((p) => p.id === modelId);
    // setIsOpen(true);
    setClickedProduct(modelData);
  };

  // if (!productsData) return;

  if (isLoading) return <>....Loading</>;

  if (productsData.length === 0)
    return (
      <div className="text-center">
        <p className="text-red-700">
          Your wishlist is empty !! 🙁 Please add some products
        </p>
      </div>
    );

  return (
    <>
      <div className="flex flex-wrap justify-start mt-5">
        {productsData.map((product) => (
          <WishListItem
            handleOpenModel={handleOpenModel}
            handleDeleteWIshlistItem={handleDeleteWIshlistItem}
            data={product}
            key={product.product.id}
          />
        ))}

        {clickedProduct && (
          <ProductModel
            handleAddtoWishlist={handleAddtoWishlist}
            data={clickedProduct}
            handleCloseModel={handleCloseModel}
          />
        )}
      </div>
    </>
  );
};

export default WishList;
