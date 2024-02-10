import React from "react";
import useImageFileNameGet from "../../utils/Hooks/useImageFileNameGet";

const WishListItem = ({ data }) => {
  if (!data) return;

  const { product, productImages, productTags } = data;
  const imgObj = useImageFileNameGet(productImages);
  console.log(imgObj);

  console.log(product);

  const handleRemoveWishlist = () => {};
  return (
    // <div className="p-4 w-[20%] text-center bg-white rounded shadow  border border-gray-400">
    //   <div className="block mb-2" href="#">
    //     <div className="relative overflow-hidden">
    //       <div className="mb-5 overflow-hidden">
    //         <img
    //           className="object-cover w-full mx-auto transition-all rounded h-72 hover:scale-110"
    //           src={"../../../Public/Uploads/" + imgObj.featuredImgName}
    //           alt=""
    //         />
    //       </div>
    //     </div>
    //     <a href="#">
    //       <h3 className="mb-2 text-xl font-bold ">{product.name}</h3>
    //     </a>
    //     <p className="text-lg font-bold text-black ">
    //       <span>${product.price}</span>
    //     </p>

    //     <button className="flex items-center justify-center mx-auto mt-4 font-bold text-center text-blue-500  group">
    //       Add to Cart
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="16"
    //         height="16"
    //         fill="currentColor"
    //         className="ml-2 transition-all group-hover:translate-x-2"
    //         viewBox="0 0 16 16"
    //       >
    //         <path
    //           fill-rule="evenodd"
    //           d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
    //         />
    //       </svg>
    //     </button>
    //     <button onClick={handleRemoveWishlist} className="text-red-700">
    //       Remove
    //     </button>
    //   </div>
    // </div>

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
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M15.7 4C18.87 4 21 6.98 21 9.76C21 15.39 12.16 20 12 20C11.84 20 3 15.39 3 9.76C3 6.98 5.13 4 8.3 4C10.12 4 11.31 4.91 12 5.71C12.69 4.91 13.88 4 15.7 4Z"
                stroke="#ffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
          Add to Cart
        </div>

        <button onClick={handleRemoveWishlist} className="text-red-700">
          Remove
        </button>
      </div>
    </div>
  );
};

export default WishListItem;
