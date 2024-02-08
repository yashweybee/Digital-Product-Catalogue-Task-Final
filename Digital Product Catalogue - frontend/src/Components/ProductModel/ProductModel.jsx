import React, { useEffect, useState } from "react";
import { CrossSvg, HeartSvg } from "../../utils/svgs";
import useImageFileNameGet from "../../utils/Hooks/useImageFileNameGet";
import ImageMagnifier from "../ImageMagnifier/ImageMagnifier";

const ProductModel = ({ data, handleCloseModel }) => {
  if (!data) return;

  const [imgFileName, setImgFileName] = useState("");
  const allImages = data.images;
  const imgObj = useImageFileNameGet(allImages);
  console.log(imgObj);

  return (
    <div className="modal opacity-1 fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="w-[80%] p-10 bg-white rounded-xl flex z-50  ">
        {/* images section */}
        <div className="Images-section w-[80%] ">
          <div className="w-[80%] m-auto">
            <ImageMagnifier
              src={"../../../Public/Uploads/" + imgObj.featuredImgName}
            />
            {/* <img
              src={"../../../Public/Uploads/" + imgObj.featuredImgName}
              alt="featured image"
              className="object-cover m-1 rounded-xl"
            /> */}
          </div>
          <div className="flex w-[20%] ">
            {imgObj.otherImageName &&
              imgObj.otherImageName.map((img) => (
                <img
                  key={img}
                  src={"../../../Public/Uploads/" + img}
                  alt="featured image"
                  className="object-cover ml-1 rounded-xl"
                />
              ))}
          </div>
        </div>
        {/* Product information */}
        <div className="ml-10 w-10/12 ">
          <h1 className="text-5xl mt-3">{data.name}</h1>
          <h2 className="text-xl mt-2">{data.price}$</h2>
          <p className="w-[80%] mt-2 text-gray-500">{data.description}</p>

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
          onClick={handleCloseModel}
          className="relative -top-8 -right-8 w-16 cursor-pointer"
        >
          <CrossSvg />
        </div>
      </div>
    </div>
  );
};

export default ProductModel;
