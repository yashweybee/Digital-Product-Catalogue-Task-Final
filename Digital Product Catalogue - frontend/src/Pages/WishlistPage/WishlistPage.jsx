import React, { useState } from "react";
import ProductList from "../../Components/ProductList/ProductList";
import { useGetWishlistProductsQuery } from "../../utils/apiSlice";
import WishList from "../../Components/WishList/WishList";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  return (
    <>
      <Header />
      <div className="ms-auto mt-10">
        <h1 className="ml-20 text-3xl font-bold">
          {localStorage.getItem("userName")}, you'r wishlist
        </h1>

        <div className="ml-20">
          <WishList />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;
