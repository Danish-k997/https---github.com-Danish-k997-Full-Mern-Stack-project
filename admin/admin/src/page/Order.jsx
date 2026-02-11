import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendurl } from "../backend";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const Order = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.get(backendurl + "/api/order/list", {
        headers: { token },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };  

  const StatusHandler = async (orderId, status) => {
    try {
      const response = await axios.post(backendurl + "/api/order/status", { orderId, status }, {
        headers: { token },
      });
      if (response.data.success) {
        fetchAllOrders();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_5fr_2fr_1fr_1fr_1fr] items-start gap-3 text-sm text-gray-700 mt-3 border border-gray-200 p-3 md:p-4 rounded" key={index}>
            <img src={assets.parcel_icon} alt="parsel" />
            <div>
            <div>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return (
                    <p key={index}>
                      {" "}
                      {item.name} x {item.quantity}{" "}
                      <span> {item.sizes} </span>{" "}
                    </p>
                  );
                } else {
                  return (
                    <p key={index}>
                      {" "}
                      {item.name} x {item.quantity}{" "}
                      <span> {item.sizes} </span>{" "}
                    </p>
                  );
                }
              })}
            </div>
            <p>{order.address.firstName + " " + order.address.lastName}</p>
            <div>
              <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode  }</p>
            </div>
            <p>{order.address.phone}</p>
          </div> 
          <div>
            <p>Item:{order.items.length}</p>
            <p>Method:{order.paymentMethod}</p>
            <p>payment:{order.payment ? 'Done' : 'Pending'}</p>
            <p>Date: {new Date(order.date).toLocaleDateString()}</p>
          </div>  
          <p>${order.amount}</p> 
          <select onChange={(event)=>StatusHandler(order._id,event.target.value) } value={order.status} className="border border-gray-300 rounded py-1.5 px-3.5">
            <option value="Order Placed">Order Placed</option>
            <option value="pending">pending</option>
            <option value="shipped">Shipped</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="delivered">Delivered</option> 
          </select>
          </div> 
        ))}
      </div>
    </div>
  );
};

export default Order;
