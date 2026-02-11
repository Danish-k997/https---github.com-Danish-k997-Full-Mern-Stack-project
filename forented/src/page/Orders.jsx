import React, {  useContext,useState,useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";


const Orders = () => {
  const { currency,backendurl,token } = useContext(ShopContext); 
  const [orderData,setOrderData] = useState([]);

  const loaderderData = async () => {
    try {
      
      if (!token) {
        return null;
      }
        
       const response = await axios.post(backendurl + '/api/order/userorders',{} , { headers: { token } });    
      
      if (response.data.success) {
       let allordersItem = [];
       response.data.orders.map((order) => {
        order.items.map((item) => {
           item["status"] = order.status;
           item["payment"] = order.payment;
           item["paymentMethod"] = order.paymentMethod;
           item["date"] = order.date;
           allordersItem.push(item);
         });
       }) 
      setOrderData(allordersItem.reverse());
            
      } else {
        toast.error(response.data.message);
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  } 

  useEffect(() => {
    if (token) {
      loaderderData();
    }
   }, [token])


  return (
    <div className="border-t pt-10">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.map((item, index) => (
          <div key={index} className="py-6 border-t text-gray-700">
            <div className="flex items-start md:items-center gap-4 md:gap-6">
              <div className="w-20 shrink-0">
                <img className="w-full h-auto object-cover rounded-sm" src={item.image && item.image[0]} alt={item.name} />
              </div>
           
              <div className="flex-1 text-sm">
                <p className="sm:text-base font-medium text-gray-800">{item.name}</p>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-base">
                  <p className="text-lg font-semibold">{currency}{item.price}</p>
                  <p className="text-sm text-gray-600">Qty: <span className="text-gray-800">{item.quantity}</span></p>
                  <p className="text-sm text-gray-600">Size: <span className="text-gray-800">{Array.isArray(item.sizes) ? item.sizes.join(', ') : (item.sizes || item.size || 'N/A')}</span></p>
                </div>

                <p className="text-gray-600 mt-2">Date: <span className="text-gray-800">{new Date(item.date).toDateString()}</span></p>
                <p className="text-gray-600">Payment: <span className="text-gray-800">{item.payment || item.paymentMethod || 'N/A'}</span></p>
              </div>

              <div className="w-40 flex flex-col items-end justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.status && item.status.toLowerCase().includes('placed') ? 'bg-green-500' : 'bg-yellow-400'}`}></span>
                  <p className="text-sm md:text-base text-gray-800">{item.status}</p>
                </div>

                <button onClick={loaderderData} className="border rounded-md px-4 py-3 text-sm font-medium hover:shadow">Track Order</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
