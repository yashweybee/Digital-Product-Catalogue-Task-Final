import React, { useEffect, useState } from "react";
import useImageFileNameGet from "../../utils/Hooks/useImageFileNameGet";

const WishListItem = ({ data, handleDeleteWIshlistItem }) => {
  if (!data) return;

  const { product, productImages, productTags } = data;
  const [productData, setProductData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const imgObj = useImageFileNameGet(productImages);
  // console.log(imgObj);

  useEffect(() => {
    setProductData(data);
  }, [product]);

  return (
    <>
      {showPopup && (
        <div
          id="deleteModal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"
        >
          <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
          <div className="absolute left-[50%] -translate-x-[50%] p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center bg-white rounded-lg shadow  sm:p-5">
              <button
                onClick={() => setShowPopup(!showPopup)}
                type="button"
                className="text-black absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-white dark:hover:text-black"
                data-modal-toggle="deleteModal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <svg
                className="text-black dark:text-black w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p className="mb-4 text-black dark:text-black">
                Are you sure you want to Delete <b>{data.product.name}</b> ?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => setShowPopup(!showPopup)}
                  data-modal-toggle="deleteModal"
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-white bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-black focus:z-10 dark:bg-gray-700 dark:text-white dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  onClick={() => {
                    handleDeleteWIshlistItem(data.product.id);
                    setShowPopup(!showPopup);
                  }}
                  type="submit"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="relative m-2 mx-1 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white  cursor-pointer transition-all">
        <div
          className="relative mx-3 mt-3 h-60 overflow-hidden rounded bg-gray-200"
          href="#"
        >
          <img
            className="object-cover h-full w-full"
            src={"../../../Public/Uploads/" + imgObj.featuredImgName}
            alt="product image"
          />
        </div>
        <div className="mt-4 px-5 pb-5">
          <div>
            <h5 className="text-xl tracking-tight text-slate-900">
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
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
                  stroke="#ffffff"
                  strokeWidth="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
            Add to Cart
          </div>

          <button
            onClick={() => setShowPopup(!showPopup)}
            className="text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};

export default WishListItem;
