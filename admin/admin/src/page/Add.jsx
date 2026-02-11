import React from "react";
import { assets } from "../assets/assets";
import { useState } from "react";
import axios from "axios";
import { backendurl } from "../backend";
import { toast } from "react-toastify";
const Add = ({ token }) => {
  
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
 const submitHandler = async (e) => {
  try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendurl + "/api/product/add", formData,{headers: {token}});
      
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      }else {
        toast.error(response.data.message);
      }
       
  } catch (error) {
    console.log(error); 
    toast.error(error.message) 
  }
  
 }
  return (
    <form onSubmit={submitHandler} className="flex flex-col w-full items-start">
      <div>
        <p className="text-2xl">Upload Product</p>
        <div className="flex gap-2 flex-wrap mt-4">
          <label>
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload area"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              className="hidden"
            />
          </label>
          <label>
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload area"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              className="hidden"
            />
          </label>
          <label>
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload area"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              className="hidden"
            />
          </label>
          <label>
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload area"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="w-full max-w-125">
        <p className="mt-2">Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-2 py-2 "
          type="text"
          placeholder="type here..."
          required
        />
      </div>

      <div className="w-full max-w-125">
        <p className="mt-2">Product description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-2 py-2 "
          type="text"
          placeholder="type here..."
          required
        />
      </div>

      <div className="flex items-center gap-2 mt-4">
        <div>
          <p className=" ml-2">product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="py-2 px-3"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className=" ml-2"> SubCategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="py-2 px-3"
          >
            <option value="TopWere">TopWere</option>
            <option value="BottomWere">BottomWere</option>
            <option value="WinterWere">WinterWere</option>
          </select>
        </div>

        <div>
          <p className=" ml-2">product price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="py-2 px-3 ml-2 w-1/2"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      <div>
        <p className="text-lg mt-2">product size</p>
        <div className="flex gap-3 text-lg">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((size) => size !== "S")
                  : [...prev, "S"],
              )
            }
           className={sizes.includes("S") ? "bg-black text-white" : ""}
          >
            <p className="py-2 px-3 border">
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((size) => size !== "M")
                  : [...prev, "M"],
              )
            }
           className={sizes.includes("M") ? "bg-black text-white" : ""}
          >
            <p className="py-2 px-3 border" >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((size) => size !== "L")
                  : [...prev, "L"],
              )
            }
           className={sizes.includes("L") ? "bg-black text-white" : ""}
          >
            <p className="py-2 px-3 border">
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((size) => size !== "XL")
                  : [...prev, "XL"],
              )
            }
            className={sizes.includes("XL") ? "bg-black text-white" : ""}
          >
            <p className="py-2 px-3 border">
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((size) => size !== "XXL")
                  : [...prev, "XXL"],
              )
            }
            className={sizes.includes("XXL") ? "bg-black text-white" : ""}
          >
            <p className="py-2 px-3 border">
              XXL
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 text-[20px]">
        <input
          onChange={() => setBestSeller(prev => !prev)}
          checked={bestseller}
          className="mr-2"
          type="checkbox"
          id="bestseller"
        />
        <label htmlFor="bestseller">Add to bestseller</label>
      </div>
      <button className="bg-black text-white py-3 px-6 mt-4" type="submit">
        Add
      </button>
    </form>
  );
};

export default Add;
