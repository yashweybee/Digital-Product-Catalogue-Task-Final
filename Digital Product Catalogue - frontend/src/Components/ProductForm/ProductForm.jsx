import React, { useState } from "react";
import { useAddProductMutation } from "../../utils/apiSlice";
const ProductForm = () => {
  const mockTags = ["tag1", "tag2", "black", "new Tag"];
  const [addProduct] = useAddProductMutation();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);
  const [tagText, setTagText] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [featuredImageFile, setFeaturedImageFile] = useState([]);
  const [tempFeaturedFile, setTempFeaturedFile] = useState("");
  const [tempImagesFiles, setTempImagesFile] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleResetBtn = () => {
    setName("");
    setDesc("");
    setPrice("");
    setTags([]);
    setTagText("");
    setImageFiles([]);
    setFeaturedImageFile([]);
  };

  // console.log(tags);
  const handleTags = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const tagTextTruncate = e.target.value.trim();
      const newTags = [...tags, tagTextTruncate];
      const finialArr = newTags.filter(
        (item, index) => newTags.indexOf(item) === index
      );

      console.log(finialArr);

      setTags(finialArr);
      setTagText("");
    }
  };

  const handleImages = async (e) => {
    const allFiles = Array.from(e.target.files);
    const tempFiles = allFiles.map((f) => URL.createObjectURL(f));
    console.log(allFiles);
    setTempImagesFile(tempFiles);
    setImageFiles(e.target.files);
  };

  const handleFeaturedImage = async (e) => {
    const myFile = e.target.files[0];
    const tempFile = URL.createObjectURL(myFile);
    setTempFeaturedFile(tempFile);

    console.log(myFile);
    setFeaturedImageFile(myFile);
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      setErrorMsg("Enter valid product name");
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

    // console.log(formData.get("ProductImages"));
    addProduct(formData);
  };

  return (
    <div className="product-form-component bg-white mt-5  rounded">
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
            <input
              type="text"
              name="tags"
              id="tags"
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
              onKeyDown={handleTags}
              placeholder="Tag name"
              className="mt-2 p-1 pl-2 w-full border border-gray-400  rounded"
            />
            <ul className="flex flex-wrap mt-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="p-2 m-2 w-max  bg-gray-700 text-white rounded-xl"
                >
                  {tag}
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
              accept="image/*"
              onChange={handleImages}
              className="mt-2 p-1 pl-2 w-full border border-gray-400 rounded"
            />
          </label>
          <div className="w-full mt-2 flex flex-wrap  border border-gray-300  rounded">
            {tempImagesFiles.map((file) => (
              <img
                key={file}
                src={file}
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
