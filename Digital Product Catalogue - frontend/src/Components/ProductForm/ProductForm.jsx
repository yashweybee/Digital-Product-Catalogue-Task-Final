import React, { useEffect, useState } from "react";
import {
  useAddProductMutation,
  useGetProductTagsQuery,
} from "../../utils/apiSlice";
import Autocomplete from "../Autocomplete/Autocomplete";
import { CrossSearchSvg, CrossSvg, CrossSvgTags } from "../../utils/svgs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useImageFileNameGet from "../../utils/Hooks/useImageFileNameGet";
const ProductForm = () => {
  const [addProduct] = useAddProductMutation();
  const { data: productTags } = useGetProductTagsQuery();

  const editProductData = useSelector((store) => store?.state?.productEditData);
  const navigate = useNavigate();
  // console.log(productTags);
  // if (!productTags) return;

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagText, setTagText] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [featuredImageFile, setFeaturedImageFile] = useState([]);
  const [tempFeaturedFile, setTempFeaturedFile] = useState(
    "https://placehold.co/600x400?text=Featured+Image"
  );
  const [tempImagesFiles, setTempImagesFile] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);

  const handleResetBtn = () => {
    setName("");
    setDesc("");
    setPrice("");
    setTags([]);
    setTagText("");
    setImageFiles([]);
    setFeaturedImageFile([]);
    setTempFeaturedFile("https://placehold.co/600x400?text=Featured+Image");
    setTempImagesFile([]);
  };

  const handleTags = (e, tagValue) => {
    e.preventDefault();
    if (!tagValue) return;
    const tagTextTruncate = tagValue.trim();
    const newTags = [...tags, tagTextTruncate];
    const finialArr = newTags.filter(
      (item, index) => newTags.indexOf(item) === index
    );

    setTags(finialArr);
    setTagText("");
  };

  const handleImages = async (e) => {
    const allFiles = Array.from(e.target.files);
    const tempFiles = allFiles.map((f) => URL.createObjectURL(f));
    // console.log(allFiles);
    setTempImagesFile(tempFiles);
    setImageFiles(e.target.files);
  };

  const handleFeaturedImage = async (e) => {
    const myFile = e.target.files[0];
    const tempFile = URL.createObjectURL(myFile);
    setTempFeaturedFile(tempFile);

    // console.log(myFile);
    setFeaturedImageFile(myFile);
  };

  const handleDeleteTag = (e, tagName) => {
    e.preventDefault();
    const updatedTags = tags.filter((tag) => tag !== tagName);
    setTags(updatedTags);
  };

  const handleSubmitBtn = async (e) => {
    e.preventDefault();

    if (name.length === 0) {
      setErrorMsg("Enter valid product name");
      console.log("Enter Valis Name");
      return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", desc);
    formData.append("Price", price);

    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("ProductImages", imageFiles[i]);
    }
    // formData.append("ProductImages", imageFiles);
    formData.append("FeaturedImage", featuredImageFile);
    formData.append("ProductTags", [...tags]);

    await addProduct(formData);
    setIsToastOpen(true);
    handleResetBtn();
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <div className="product-form-component bg-white mt-5 rounded">
      {isToastOpen && (
        <div
          className="fixed bottom-0 right-10 border-red p-4 py-6 rounded shadow-lg flex items-center justify-between mb-6  bg-green-600 text-white"
          role="alert"
        >
          <span className="fa-stack fa-2x sm:mr-2 mb-3">
            <i className="fas fa-circle text-red-dark fa-stack-2x"></i>
            <i className="fas fa-hand-paper fa-stack-1x text-white"></i>
          </span>
          <div className="sm:text-left text-center sm:mb-0 mb-3 w-128">
            <p className="font-bold text-lg">Product Added.</p>
            {/* <p className="text-grey-dark inline-block">Product Added</p> */}
          </div>
          <div onClick={handleCloseToast} className="cursor-pointer">
            <CrossSearchSvg />
          </div>
          {/* <i className="fas fa-times mx-4 fa-2x text-black "></i> */}
        </div>
      )}

      <form className="product-form flex flex-col px-10 py-5">
        <label htmlFor="name" className="my-5">
          Name
          <input
            required
            type="text"
            placeholder="Product name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-2 p-1 pl-2 w-full border  rounded ${
              errorMsg ? "border-red-500" : " border-gray-400"
            }`}
          />
        </label>

        <label htmlFor="price" className="my-5">
          Price
          <input
            type="number"
            placeholder="Product price"
            name="product-price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-2 p-1 pl-2 w-full border border-gray-400  rounded"
          />
        </label>

        <div className="my-5">
          <label htmlFor="tags">
            Add product tags
            <Autocomplete suggestions={productTags} handleTags={handleTags} />
            {/* <input
              type="text"
              name="tags"
              id="tags"
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
              onKeyDown={handleTags}
              placeholder="Tag name"
              className="mt-2 p-1 pl-2 w-full border border-gray-400  rounded" 
            />*/}
            <ul className="flex flex-wrap mt-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="p-2 m-2 w-max  bg-gray-700 text-white rounded-xl flex items-center"
                >
                  {tag}
                  <button
                    type="button w-1"
                    onClick={(e) => handleDeleteTag(e, tag)}
                  >
                    <CrossSvgTags />
                  </button>
                </li>
              ))}
            </ul>
          </label>
        </div>

        {/* feaurted image section */}
        <div className="flex gap-10 ">
          <label htmlFor="featureImage" className="my-5">
            Featured Image
            <input
              type="file"
              accept="image/*"
              id="featureImage"
              onChange={handleFeaturedImage}
              className="mt-2 p-1 pl-2 w-full border border-gray-400  rounded hidden"
            />
            <div className="w-[20em] h-[20em] border border-gray-300  rounded">
              {tempFeaturedFile && (
                <img
                  src={tempFeaturedFile}
                  // alt="featured product image"
                  className="w-full h-full object-cover rounded"
                />
              )}
            </div>
          </label>
        </div>

        {/* Other files image section */}
        <div>
          <label>
            Other Images
            <input
              type="file"
              multiple
              accept="image/*, .webp"
              onChange={handleImages}
              className="mt-2 p-1 pl-2 w-full border border-gray-400 rounded"
            />
          </label>
          <div className="w-full mt-2 flex flex-wrap  border border-gray-300  rounded">
            {tempImagesFiles.map((file) => (
              <img
                key={file}
                src={file || `../../../Public/Uploads/` + file}
                alt="featured product image"
                className="w-[10em] m-2 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <label htmlFor="description" className="my-5">
          Description
          <textarea
            name="description"
            placeholder="Features, advantages or information about product"
            id="description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="mt-2 p-1 pl-2 w-full border border-gray-400  rounded"
          ></textarea>
        </label>
        <span className="text-red-600">{errorMsg ? errorMsg : ""}</span>
        <div className="flex ">
          <button
            type="button"
            onClick={handleSubmitBtn}
            className="m-2 bg-gray-800 p-3 text-white hover:bg-gray-700 rounded"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleResetBtn}
            className="m-2 bg-red-800 p-3 text-white hover:bg-red-700 rounded"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
