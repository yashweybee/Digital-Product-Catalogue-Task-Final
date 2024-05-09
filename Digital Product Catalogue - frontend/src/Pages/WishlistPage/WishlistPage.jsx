import React, { useEffect, useState } from "react";
import ProductList from "../../Components/ProductList/ProductList";
import WishList from "../../Components/WishList/WishList";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useGeneratePDFMutation } from "../../utils/apiSlice";

const WishlistPage = () => {
  const [generatePDF] = useGeneratePDFMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userName")) {
      navigate("/login");
    }
  }, []);

  const handleDownloadPDF = async () => {
    try {
      const { data } = await generatePDF();

      console.log(data);
      // Create a Blob from the PDF data and initiate the download
      // const blob = new Blob([data], { type: "application/pdf" });
      // const link = document.createElement("a");
      // link.href = window.URL.createObjectURL(blob);
      // link.download = "Invoice.pdf";
      // link.click();
    } catch (error) {
      console.error("Error generating or downloading PDF", error);
    }
  };
  return (
    <>
      <Header />
      <div className="ms-auto mt-10">
        <div className="flex justify-between">
          {/* <h1 className="ml-20 text-3xl font-bold">
            {localStorage.getItem("userName")}, your wishlist
          </h1> */}

          <button
            onClick={handleDownloadPDF}
            type="button"
            className="p-3 rounded border bg-gray-800 text-white hover:bg-gray-700 ml-20"
          >
            Print PDF
          </button>
        </div>
        <div className="ml-20">
          <WishList />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishlistPage;
