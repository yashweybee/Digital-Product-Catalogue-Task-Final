import React, { useEffect, useInsertionEffect, useState } from "react";
import ProductModel from "../ProductModel/ProductModel";
import { HeartSvg, HeartSvgFilled } from "../../utils/svgs";
import {
  useDeleteProductMutation,
  useDeleteWishlistItemMutation,
  useGetWishlistProductsQuery,
} from "../../utils/apiSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import EditModel from "../EditModel/EditModel";

const Product = ({
  handleAddtoWishlist,
  handelDeleteItem,
  handleOpenModel,
  data,
}) => {
  if (!data) return;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: wishlistData } = useGetWishlistProductsQuery();
  const [deleteWishlistItem] = useDeleteWishlistItemMutation();
  const [imgFileName, setImgFileName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowWditPopup] = useState(false);
  const [showGoToLoginPopup, setShowGoToLoginPopup] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const allImages = data.images;
  const featuredImg = allImages.filter((img) => img.isFeatured == true);

  const getImgFileName = (imgFilePath) => {
    const filePath = imgFilePath;
    const parts = filePath.split("\\");
    const fileName = parts[parts.length - 1];
    return fileName;
  };

  useEffect(() => {
    if (featuredImg[0]) {
      const fileName = getImgFileName(featuredImg[0].path);
      setImgFileName(fileName);
    }

    if (localStorage.getItem("userName") === "Admin") {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    const wishlistProductsIds = wishlistData.map((pro) => pro.product.id);
    // console.log(wishlistProductsIds.includes(data.id));

    if (wishlistProductsIds.includes(data.id)) {
      setIsInWishlist(true);
    }
  }, []);

  const handleWishlistBtn = async () => {
    if (!localStorage.getItem("token")) {
      console.log("userNot Exist");
      setShowGoToLoginPopup(!showGoToLoginPopup);
      return;
    }

    const wishlistProductsIds = wishlistData.map((pro) => pro.product.id);
    if (wishlistProductsIds.includes(data.id)) {
      // console.log(data.id);
      await deleteWishlistItem(data.id);
    } else {
      handleAddtoWishlist(data.id);
    }
    setIsInWishlist(!isInWishlist);
  };
  const productEditBtn = () => {
    setShowWditPopup(!showEditPopup);
  };

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
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
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
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p className="mb-4 text-black dark:text-black">
                Are you sure you want to Delete <b>{data.name}</b> ?
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
                    handelDeleteItem(data.id);
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
      {showGoToLoginPopup && (
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
                onClick={() => setShowGoToLoginPopup(!showGoToLoginPopup)}
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
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>

              <p className="mb-4 text-black dark:text-black">
                Please login to add products to wishlist..
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  data-modal-toggle="deleteModal"
                  type="button"
                  className="py-2 px-3 text-sm font-medium text-white bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-black focus:z-10 dark:bg-gray-700 dark:text-white dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Go to login Page
                </button>
                {/* <button
                  onClick={() => {
                    handelDeleteItem(data.id);
                    setShowPopup(!showPopup);
                  }}
                  type="submit"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Yes, I'm sure
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditPopup && (
        <EditModel data={data} handleEditPopup={productEditBtn} />
      )}

      <div className="relative m-2 mx-1 flex w-full h-[25rem] max-w-xs flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.1)] cursor-pointer transition-all  ">
        <div
          onClick={() => handleOpenModel(data.id)}
          className="relative mx-3 mt-3 h-60 overflow-hidden rounded-lg bg-gray-200"
          href="#"
        >
          <img
            // className="object-cover h-full w-full hover:scale-110 transition-all"
            className="object-cover h-full w-full hover:scale-110 transition-all"
            src={"../../../Public/Uploads/" + imgFileName}
            alt="product image"
          />
          {/* <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            39% OFF
          </span> */}
        </div>
        <div className="mt-4 px-5 pb-5">
          <div onClick={() => handleOpenModel(data.id)}>
            <h5 className="text-xl tracking-tight text-slate-900">
              {data.name}
            </h5>
          </div>
          <div className="mt-5 flex  justify-between">
            <p>
              <span className="text-3xl font-bold text-slate-900">
                ${data.price}
              </span>
              <span className="text-sm ml-2 text-slate-900 line-through">
                ${Math.floor(data.price - (data.price * 40) / 100)}
              </span>
            </p>
            {/* <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                5.0
              </span>
            </div> */}

            {!isAdmin && (
              <div
                onClick={handleWishlistBtn}
                className=" flex items-center justify-center rounded-md  text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              >
                {isInWishlist ? <HeartSvgFilled /> : <HeartSvg />}
              </div>
            )}
          </div>
          {isAdmin && (
            <div className="flex justify-between mt-5">
              <button
                onClick={() => setShowPopup(true)}
                className="bg-red-500 text-white p-3 rounded"
              >
                Delete
              </button>
              <button
                onClick={productEditBtn}
                className="bg-gray-800 text-white p-3 rounded"
              >
                Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
