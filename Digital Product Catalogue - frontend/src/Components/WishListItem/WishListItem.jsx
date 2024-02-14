import React, { useEffect, useState } from "react";
import useImageFileNameGet from "../../utils/Hooks/useImageFileNameGet";
import { useDeleteWishlistItemMutation } from "../../utils/apiSlice";

const WishListItem = ({ data, handleOpenModel, handleDeleteWIshlistItem }) => {
  if (!data) return;

  const { product, productImages, productTags } = data;
  const [deleteWishlistItem] = useDeleteWishlistItemMutation();
  const [productData, setProductData] = useState([]);
  // const [showPopup, setShowPopup] = useState(false);

  const imgObj = useImageFileNameGet(productImages);

  useEffect(() => {
    setProductData(data);
  }, [data]);

  return (
    <>
      <div className="relative m-2 mx-1 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white  cursor-pointer transition-all">
        <div
          className="relative mx-3 mt-3 h-60 overflow-hidden rounded bg-gray-200 "
          href="#"
        >
          <img
            onClick={() => handleOpenModel(product.id)}
            className="object-cover h-full w-full hover:scale-105 transition-all"
            src={"../../../Public/Uploads/" + imgObj.featuredImgName}
            alt="product image"
          />
        </div>
        <div className="mt-4 px-5 pb-5">
          <div>
            <h5
              onClick={() => handleOpenModel(product.id)}
              className="text-xl tracking-tight text-slate-900"
            >
              {product.name}
            </h5>
          </div>
          <div className="mt-2 mb-5 flex flex-col  justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900">
                ${product.price}
              </span>
              <span className="text-sm text-slate-900 line-through">$699</span>
            </p>
          </div>
          <div className=" flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
            Add to Cart
          </div>

          <button
            onClick={() => handleDeleteWIshlistItem(product.id)}
            className="text-red-700 mt-3"
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default WishListItem;
