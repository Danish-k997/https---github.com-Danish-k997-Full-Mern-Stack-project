import React, { useContext, useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProducts from "../components/RelatedProducts";
const Product = () => {
  const { productId } = useParams();
  const { products, currency, AddtoCard } = useContext(ShopContext);
  const product = products.find((item) => item._id === productId);
  const [image, setImage] = useState(null);
  const [sizes, setSize] = useState("");
  useEffect(() => {
  if (product) {
    setImage(product.image[0]);
  }
}, [product]);

  return product ? (
    <div className="border-t-2 pt-10 transition-opacity duration-500 ease-in-out opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-center sm:justify-normal sm:w-[18.7%] w-full">
            {product.image.map((img, index) => (
              <img
                onClick={() => setImage(img)}
                key={index}
                src={img}
                alt={product.name}
                className="max-w-full sm:w-full sm:mb-3 shrink-0 cursor-pointer "
              />
            ))}
          </div>
          <div className=" w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="product" />
          </div>
        </div>
        <div className="w-full sm:w-[90%]">
          <h1 className="font-medium text-2xl truncate">{product.name}</h1>
          <div className="flex items-center gap-2 mt-2 ">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {product.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {product.sizes.map((size, index) => (
                <button
                  onClick={() => setSize(size)}
                  className={`border py-2 px-4 bg-slate-100 ${
                    sizes === size ? "border-orange-700" : ""
                  }`}
                  key={index}
                >
                  {size}
                </button>
              ))}
              <button onClick={()=> AddtoCard(product._id, sizes)} className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-opacity duration-300">
                Add to Cart
              </button>
            </div>
          </div>
          <hr className="mt-8 sm:w-4/5 " />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1 ">
            <p>100% Orignal products.</p>
            <p>Cash on delivery is available on this products.</p>
            <p>Return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex gap-2">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitate buying
            and selling of products or services over the internet serves as a
            virtual marketplace where businesses and individual showcase their
            products, interact with customers, and conduct transactions without
            the need for a physical presence. E-commerce websites have gained
            immense popularity due to their convenience, accessibility, and the
            global reach they offer.
          </p>
          <p>
            One of the key features of an e-commerce website is its product
            catalog, which displays a wide range of items available for
            purchase. Users can browse through different categories, view
            product details, and compare prices. E-commerce websites often
            incorporate search functionality and filters to help users find
            specific products quickly.
          </p>
        </div>
        <RelatedProducts category={product.category} subCategory={product.subCategory}/>
      </div>
    </div>
  ) : (
    <div>Product not found</div>
  );
};

export default Product;
