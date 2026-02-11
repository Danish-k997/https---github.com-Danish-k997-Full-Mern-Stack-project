
import OrderModel from "../models/OrderModal.js";
import userModel from "../models/userModal.js";
import Stripe from "stripe";


const currency = "inr";
const deliveryCharge = 10;

    
const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;
    
    
    const {  items, amount, address } = req.body;  
    
    if (!userId) {
      return res.json({ success: false, message: "Invalid user" });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now()
    } 

    const order = new OrderModel(orderData);
   await order.save();
   await userModel.findByIdAndUpdate(userId,{cartData:{}});
    res.json({ success: true, message: "Order Placed Successfully" });

  } catch (error) {
   console.log(error);
   res.json({ success: false, message: error.message }); 
  }
} 


const placeOrderStripe = async(req, res) => {
 try {
   if (!process.env.STRIPE_SECRET_KEY) {
    return res.json({ success: false, message: "Stripe key not found" });
  }
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY);

   const userId = req.userId;  
    const {  items, amount, address } = req.body;  
    const {origin} = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "stripe",
      payment: false,
      date: Date.now()
    }   
    
    const order = new OrderModel(orderData);
   await order.save(); 
  
    const line_items = items.map((item)=> ({
     price_data:{
      currency:currency,
      product_data:{
        name:item.name,
      }, 
      unit_amount: item.price * 100,
     },
     quantity: item.quantity,    
    }))
 
     line_items.push({
       price_data:{
      currency:currency,
      product_data:{
        name:'Delivery Charge',
      }, 
      unit_amount: deliveryCharge * 100,
     },
     quantity: 1,    
     })
     
     const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${order._id}`,
       cancel_url: `${origin}/verify?success=false&orderId=${order._id}`,
       line_items,
       mode: 'payment',
     })
     
      res.json({success:true,session_url:session.url})

 } catch (error) {
  console.log(error);
  res.json({ success: false, message: error.message });
 }
} 

const placeOrderRazorpay = (req, res) => {
  res.send("Order Placed razorpay");
} 

const allOrders = async (req, res) => {
   try {
    const orders = await OrderModel.find({})
    res.json({ success: true, orders });
   } catch (error) {
     console.log(error);
   res.json({ success: false, message: error.message });
   }
} 

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await OrderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order Status Updated" }); 
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}   

const userOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await OrderModel.find({userId}) 
    res.json({ success: true, orders }); 
    
  } catch (error) {
    console.log(error);
   res.json({ success: false, message: error.message });
  }
}  

const verifyStripe = async (req, res) => {
  const {orderId,success} = req.body; 
  const {userId} = req.userId 
  try {
    if (success === "true") {
    await OrderModel.findByIdAndUpdate(orderId,{payment:true})
    await userModel.findByIdAndUpdate(userId,{cartData:{}})
    res.json({success:true})
  }else{
    await OrderModel.findByIdAndDelete(orderId)
    res.json({success:false})
  }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


export { placeOrder,verifyStripe, placeOrderStripe, placeOrderRazorpay, allOrders, updateStatus, userOrders };