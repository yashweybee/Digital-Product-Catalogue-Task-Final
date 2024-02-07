import React, { useState } from "react";
import ProductModel from "../ProductModel/ProductModel";

const Product = ({ showModel, setShowModel }) => {
  return (
    <>
      <div className="p-4 w-80 mx-5 shadow-xl rounded cursor-pointer transition-all">
        <img
          src="../../../to-do-list-6587736_1280.png"
          alt=""
          className=" object-cover rounded"
        />
        <div className="mt-2">
          <div className="flex justify-between">
            <h1>668.425$</h1>
            <span>heart svg</span>
          </div>
          <h1>Product Name</h1>

          <button className="m-2 bg-gray-800 p-3 text-white hover:bg-gray-700 rounded">
            Edit
          </button>
          <button className="m-2 bg-red-800 p-3 text-white hover:bg-red-700 rounded">
            Delete
          </button>
        </div>
      </div>

      <div className="">
        {showModel && (
          <ProductModel showModel={showModel} setShowModel={setShowModel} />
        )}
      </div>
    </>
  );
};

export default Product;
