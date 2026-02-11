import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './Config/mongodb.js';
import connectCloudinary from './Config/cloudinery.js';
import userRouter from './Routers/userRouter.js';
import productRouter from './Routers/ProductRouter.js';
import CartRouter from './Routers/CartRouter.js';
import OrderRouter from './Routers/OrderRouter.js';

const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

app.use(cors());
app.use(express.json());  
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',CartRouter)   
app.use('/api/order',OrderRouter)   
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on port localhost//:${port}/`);
}); 
