import React, { useState } from "react";
import ProductList from "../../Components/ProductList/ProductList";
import Header from "../../Components/Header/Header";
import Filter from "../../Components/Filter/Filter";
import Sorting from "../../Components/Sorting/Sorting";

const ProductListingPage = () => {
  return (
    <div>
      <Header />
      <section className="">
        <div className="mt-5">
          <div className="flex flex-wrap mb-24 ">
            <Filter />
            <div className="w-full px-3 lg:w-3/4 overflow-y-auto flex-1">
              <Sorting />
              <ProductList />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductListingPage;
