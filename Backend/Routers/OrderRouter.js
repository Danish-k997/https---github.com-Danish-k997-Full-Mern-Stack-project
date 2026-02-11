import express from "express"; 
import {placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, updateStatus, userOrders, verifyStripe  } from "../Controller/OrderController.js";
const OrderRouter = express.Router();  
import  authuser  from "../middleware/Auth.js";
import adminAuth from "../middleware/adminAuth.js";

OrderRouter.post("/place",authuser, placeOrder);
OrderRouter.post("/stripe",authuser, placeOrderStripe);
OrderRouter.post("/razorpay",authuser, placeOrderRazorpay);

// {admin Router}  
OrderRouter.get("/list",adminAuth, allOrders);
OrderRouter.post("/status",adminAuth, updateStatus);

// {frontend Router}
OrderRouter.post("/userorders",authuser, userOrders);
OrderRouter.post("/verifyStripe",authuser, verifyStripe);

export default OrderRouter;
