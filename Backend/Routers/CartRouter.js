import express from "express";
import { addToCart,updateCart , getUserCart } from "../Controller/CartController.js";
import authuser from "../middleware/Auth.js";
const CartRouter = express.Router();  

CartRouter.post("/add",authuser, addToCart);
CartRouter.put("/update",authuser, updateCart);
CartRouter.post("/get",authuser, getUserCart);

export default CartRouter;  
