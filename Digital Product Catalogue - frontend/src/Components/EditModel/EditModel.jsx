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

const EditModel = ({ data, handleEditPopup }) => {
  const [addProduct] = useAddProductMutation();
  const { data: productTags } = useGetProductTagsQuery();

  const editProductData = useSelector((store) => store?.state?.productEditData);
  const navigate = useNavigate();
  // console.log(productTags);
  // if (!productTags) return;

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(data.price);
  const [tags, setTags] = useState([]);
  const [tagText, setTagText] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [featuredImageFile, setFeaturedImageFile] = useState([]);
  const [tempFeaturedFile, setTempFeaturedFile] = useState(
    "https://placehold.co/600x400?text=Featured+Image"
  );
  const [tempImagesFiles, setTempImagesFile] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  const setEditData = () => {
    setName(data.name);
    setDesc(data.description);
    setPrice(data.price);
    const tagsTemp = data.tags.map((tag) => tag.tagName);
    setTags(tagsTemp);
    const imgObj = useImageFileNameGet(data.images);

    setTempFeaturedFile(`../../../Public/Uploads/${imgObj.featuredImgName}`);
    const otherImgsTemp = imgObj.otherImageName.map((img) => {
      return `../../../Public/Uploads/${img}`;
    });
    setTempImagesFile(otherImgsTemp);

    // const featuredImg = createFile(
    //   `../../../Public/Uploads/${imgObj.featuredImgName}`
    // );

    // setFeaturedImageFile(
    //   new File(
    //     [`../../../Public/Uploads/${imgObj.featuredImgName}`],
    //     imgObj.featuredImgName
    //   )
    // );
    setFeaturedImageFile(imgObj.featuredImgName);

    // const fOtherImages = imgObj.otherImageName.map((img) => {
    //   return new File([`../../../Public/Uploads/${img}`], img);
    // });

    // setImageFiles(fOtherImages);
    setImageFiles(imgObj.otherImageName);
  };

  async function createFile(filePath) {
    let response = await fetch(filePath);
    let data = await response.blob();
    let metadata = {
      type: "image/jpeg",
    };
    let file = new File([data], "test.jpg", metadata);
    return file;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setEditData();
  }, []);

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
    const temptags = tags;

    const index = temptags.indexOf(tagName);
    if (index > -1) {
      // only splice array when item is found
      temptags.splice(index, 1);
    }
    // console.log(temptags.length);
    setTags(temptags);
  };

  const handleSubmitBtn = async (e) => {
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

    formData.append("FeaturedImage", featuredImageFile);
    formData.append("ProductTags", [...tags]);

    console.log(formData.get("FeaturedImage"));

    // await addProduct(formData);
  };

  const handleCloseToast = () => {
    setIsToastOpen(false);
  };

  return (
    <div
      // id="deleteModal"
      // tabIndex="-1"
      // aria-hidden="true"
      className="absolute top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className=" p-4 md:h-auto z-50 ">
        <div className="absolute top-0 right-0 left-0 z-50 w-[80%] bg-white m-auto mt-20 rounded">
          <form className="product-form m-auto flex flex-col px-10 py-5">
            <div className="">
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
            </div>

            <div className="my-5">
              <label htmlFor="tags">
                Add product tags
                <Autocomplete
                  suggestions={productTags}
                  handleTags={handleTags}
                />
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

            <div className="flex items-center gap-10">
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
                  <div className="w-[10em] h-[10em] border border-gray-300  rounded">
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
                      src={file}
                      alt="featured product image"
                      className="w-[5em] m-2 object-cover rounded"
                    />
                  ))}
                </div>
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
                onClick={handleEditPopup}
                className="m-2 bg-red-800 p-3 text-white hover:bg-red-700 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModel;
