import React, { useState } from "react";
import { useAddProductMutation } from "../../utils/apiSlice";

const ProductForm = () => {
  const mockTags = ["tag1", "tag2", "black", "new Tag"];
  const [addProduct] = useAddProductMutation();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState(mockTags);
  const [tagText, setTagText] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [featuredImageFile, setFeaturedImageFile] = useState([]);

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

      const tagsArr = [];

      const tagTextTruncate = e.target.value.trim();
      const newTags = [...tags, tagTextTruncate];
      const newSet = Array.from(new Set(newTags));

      console.log(newSet);

      setTags(newSet);
      setTagText("");
    }
  };

  const handleImages = async (e) => {
    const allFiles = Array.from(e.target.files);
    // const base64Files = await Promise.all(
    //   allFiles.map((f) => convertToBase64(f))
    // );
    // setBase64ImageFiles(base64Files);

    const tempFiles = allFiles.map((f) => URL.createObjectURL(f));
    console.log(tempFiles);
    setImageFiles(tempFiles);
  };

  const handleFeaturedImage = async (e) => {
    const myFile = e.target.files[0];

    // let image = e.currentTarget.files[0];
    // console.log(image);
    // const buffer = await image.arrayBuffer();
    // let byteArray = new Int8Array(buffer);

    // var reader = new FileReader();
    // var fileByteArray = [];
    // reader.readAsArrayBuffer(myFile);
    // reader.onloadend = function (evt) {
    //   if (evt.target.readyState == FileReader.DONE) {
    //     var arrayBuffer = evt.target.result,
    //       array = new Uint8Array(arrayBuffer);
    //     for (var i = 0; i < array.length; i++) {
    //       fileByteArray.push(array[i]);
    //     }
    //   }
    // };

    const tempFile = URL.createObjectURL(myFile);

    // const byteImage = await convertImageToByteArray(myFile);

    // console.log(byteImage);

    // setFeaturedImageFile(byteImage);

    setFeaturedImageFile(tempFile);
  };

  const convertImageToByteArray = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        // Get the array buffer from the result
        const arrayBuffer = reader.result;
        // Convert the array buffer to byte array
        const byteArray = new Uint8Array(arrayBuffer);
        resolve(byteArray);
      };
      reader.onerror = (error) => {
        reject(error);
      };

      // Read the image file as array buffer
      reader.readAsArrayBuffer(imageFile);
    });
  };

  const convertToBase64 = (myFile) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.readAsDataURL(myFile);

      reader.onload = () => {
        resolve(reader.result);
      };
    });
  };

  const handleSubmitBtn = (e) => {
    e.preventDefault();

    const formData = {
      Name: name,
      Description: desc,
      Price: price,
      // ProductImages: base64ImageFiles,
      FeatureImage: featuredImageFile,
      Tags: tags,
    };
    console.log(formData);
    addProduct(formData);
  };

  // console.log(base64ImageFiles);
  // console.log(base64FeaturedImageFile);

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
            className="mt-2 p-1 pl-2 w-full border border-gray-400  rounded"
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
              <img
                src={featuredImageFile}
                // alt="featured product image"
                className="w-full h-full object-cover rounded"
              />
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
          <div className="w-full h-[10em] mt-2 flex  border border-gray-300  rounded">
            {imageFiles.map((file) => (
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
