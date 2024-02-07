import React, { useState } from "react";
import { CrossSvg, HeartSvg } from "../../utils/svgs";

const ProductModel = ({ showModel, setShowModel }) => {
  const handleShowModel = () => {
    setShowModel(!showModel);
    console.log("shdfks");
  };
  return (
    <div className="modal opacity-1 fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="w-[80%] p-10 bg-white rounded-xl flex z-50  ">
        {/* images section */}
        <div className="Images-section w-[80%] ">
          <div className="w-[80%] m-auto">
            <img
              src="../../to-do-list-6587736_1280.png"
              alt="featured image"
              className="object-cover m-1 rounded-xl"
            />
          </div>
          <div className="flex w-[20%] ">
            <img
              src="../../to-do-list-6587736_1280.png"
              alt="featured image"
              className="object-cover ml-1 rounded-xl"
            />
            <img
              src="../../to-do-list-6587736_1280.png"
              alt="featured image"
              className="object-cover ml-1 rounded-xl"
            />
            <img
              src="../../to-do-list-6587736_1280.png"
              alt="featured image"
              className="object-cover ml-1 rounded-xl"
            />
          </div>
        </div>
        {/* Product information */}
        <div className="ml-10 w-10/12 ">
          <h1 className="text-5xl mt-3">Product Name</h1>
          <h2 className="text-xl mt-2">786.55$</h2>
          <p className="w-[80%] mt-2 text-gray-500">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis
            veritatis, animi earum atque eum reprehenderit molestias deleniti
            incidunt iusto illo mollitia expedita natus quia doloribus nihil
            quos quis sequi sapiente consequatur? Quas, sequi non ab beatae
            consequuntur pariatur magnam, soluta libero quae adipisci, ad
            corrupti tempore debitis quidem quaerat omnis.
          </p>

          <div className="flex items-center mt-10">
            <button className="m-2 p-4 w-2/6 bg-gray-800 text-white  hover:bg-gray-900 cursor-pointer rounded">
              But Now
            </button>
            <button className="m-2 p-4 w-2/6 bg-white text-black border border-gray-300 hover:bg-gray-900 hover:text-white rounded transition-all">
              Add to cart
            </button>
            <span className="m-2 cursor-pointer">
              <HeartSvg />
            </span>
          </div>
        </div>
        <div
          onClick={handleShowModel}
          className="relative -top-8 -right-8 w-16 cursor-pointer"
        >
          <CrossSvg />
        </div>
      </div>
    </div>
  );
};

export default ProductModel;
