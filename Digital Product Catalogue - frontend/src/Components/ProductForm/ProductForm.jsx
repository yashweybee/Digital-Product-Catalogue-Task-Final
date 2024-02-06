import React, { useState } from "react";
import { useAddProductMutation } from "../../utils/apiSlice";

const ProductForm = () => {
  // const mockTags = [ ];
  const [addProduct] = useAddProductMutation();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState([]);
  const [tagText, setTagText] = useState("");
  const [base64ImageFiles, setBase64ImageFiles] = useState([]);
  const [base64FeaturedImageFile, setBase64FeaturedImageFile] = useState([]);

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
    const base64Files = await Promise.all(
      allFiles.map((f) => convertToBase64(f))
    );
    setBase64ImageFiles(base64Files);
  };

  const handleFeaturedImage = async (e) => {
    // const allFiles = Array.from(e.target.files);
    // const base64File = await Promise.all(
    //   allFiles.map((f) => convertToBase64(f))
    // );
    // setBase64FeaturedImageFile(base64File);

    const file = e.target.files[0];
    // console.log(URL.createObjectURL(file));
    setBase64FeaturedImageFile(URL.createObjectURL(file));
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
      ProductImages: base64ImageFiles,
      FeatureImage: base64FeaturedImageFile,
      Tags: tags,
    };
    // addProduct(formData);
    console.log(formData);
  };

  // console.log(base64ImageFiles);
  // console.log(base64FeaturedImageFile);

  return (
    <div className="product-form-component ">
      <div className="Heading text-center">
        <h1 className="font-">Add new product</h1>
      </div>
      <form className="product-form flex flex-col">
        <label htmlFor="name">
          Name
          <input
            required
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-black"
          />
        </label>

        <label htmlFor="price">
          price
          <input
            type="number"
            name="product-price"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>

        <div>
          <label htmlFor="tags">
            <ul>
              {tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <input
              type="text"
              name="tags"
              id="tags"
              value={tagText}
              onChange={(e) => setTagText(e.target.value)}
              onKeyDown={handleTags}
              placeholder="tag name"
              className=" px-3 border border-black rounded"
            />
          </label>
        </div>

        <label htmlFor="featureImage">
          Feature Image
          <input
            type="file"
            accept="image/*"
            id="featureImage"
            onChange={handleFeaturedImage}
          />
        </label>
        {/* <img src={base64FeaturedImageFile} alt="" /> */}

        <label>
          Image
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
          />
        </label>

        <label htmlFor="description">
          description
          <textarea
            name="description"
            id="description"
            cols="20"
            rows="10"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </label>

        <button type="button" onClick={handleSubmitBtn}>
          Submit
        </button>
        <button type="reset">Reset</button>
      </form>
    </div>
  );
};

export default ProductForm;
