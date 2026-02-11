import React, { useContext } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/frontend_assets/assets";
import { useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
   const {backendurl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products, navigate } = useContext(ShopContext);  
   
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    state: "",
    city: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };
 
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
     let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find((product) => product._id === items));
            if (itemInfo) {
              itemInfo.size = items;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
       const orderdata = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
       }  

       switch (method) {
  case 'cod': {
   try {
     const codresponse = await axios.post(
      backendurl + '/api/order/place',
      orderdata,
      { headers: { token } }
    );

    if (codresponse.data.success) {
      setCartItems({});
      navigate('/orders');
    } else {
      toast.error(codresponse.data.message);
    }
   } catch (error) {
    console.log(error);
    toast.error(error.message);
    
   }
  }
  break;
  
  case 'stripe': {
     const response = await axios.post(backendurl + '/api/order/stripe', orderdata, { headers: { token } }); 
     if (response.data.success) {
       const {session_url} = response.data; 
       window.location.replace(session_url); 
     } else {
      toast.error(response.data.message)
     }
  }
  break;

  default:
    break;
}

       
       
   } catch (error) {
     console.log(error);
      toast.error(error.message);
   }
  } 

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t ">
      <div className="flex flex-col gap-4 w-full sm:max-w-120">
        <div className="text-xl sm:text-2xl my-3 ">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-1/3"
            type="text"
            placeholder="First Name"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-1/3"
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-2/3"
          type="email"
          placeholder="Enter your Email"
          required
        />
        <input
          onChange={onChangeHandler}
          name="address"
          value={formData.address}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-2/3"
          type="text"
          placeholder="Enter your address"
          required
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-1/3"
            type="text"
            placeholder="state"
            required
          />
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-1/3"
            type="text"
            placeholder="city"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-1/3"
            type="number"
            placeholder="pin code"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-1/3"
            type="text"
            placeholder="country"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          className="border border-gray-300 rounded py-1.5 px-3.5 w-2/3"
          type="number"
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="strip" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="strip"
              />
            </div>
          </div>
          <div
            onClick={() => setMethod("cod")}
            className="flex items-center mt-1.5 gap-3 border p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "cod" ? "bg-green-400" : ""
              }`}
            ></p>
            <p className="text-gray-500 text-sm font-medium mx-4">
              CASH ON DELIVERY
            </p>
          </div>
          <div className="w-full text-end mt-4">
            <button
             type="submit"
              className="bg-black text-white text-sm px-16 py-3 "
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
