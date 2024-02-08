import React, { useEffect, useState } from "react";
import ProductModel from "../ProductModel/ProductModel";

const Product = ({ showModel, setShowModel, data }) => {
  if (!data) return;

  const [imgFileName, setImgFileName] = useState("");
  const allImages = data.images;
  const featuredImg = allImages.filter((img) => img.isFeatured == true);
  // console.log(featuredImg[0]);
  // console.log(allImages);

  const getImgFileName = (imgFilePath) => {
    const filePath = imgFilePath;
    const parts = filePath.split("\\");
    const fileName = parts[parts.length - 1];
    return fileName;
  };

  useEffect(() => {
    if (featuredImg[0]) {
      const fileName = getImgFileName(featuredImg[0].path);
      // console.log(fileName);
      setImgFileName(fileName);
    }
  }, []);

  // console.log(fileName);
  if (imgFileName.length === 0) return;

  return (
    <>
      <div className="p-4 w-80 h-max mx-5 shadow-xl rounded cursor-pointer transition-all hover:scale-[98%]">
        <div className="h-64 w-64 m-auto">
          <img
            src={"../../../Uploads/" + imgFileName}
            alt=""
            className="h-full m-auto object-cover rounded"
          />
        </div>
        <div className="mt-2 ">
          <div className="flex justify-between">
            <h1>{data.price}$</h1>
            <span>heart svg</span>
          </div>
          <h1>{data.name}</h1>

          <button className="m-2 bg-gray-800 p-3 text-white hover:bg-gray-700 rounded">
            Edit
          </button>
          <button className="m-2 bg-red-800 p-3 text-white hover:bg-red-700 rounded">
            Delete
          </button>
        </div>
      </div>

      {/* <div className="">
        {showModel && (
          <ProductModel showModel={showModel} setShowModel={setShowModel} />
        )}
      </div> */}
    </>
  );
};

export default Product;
