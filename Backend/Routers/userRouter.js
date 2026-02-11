import express from 'express';
import { loginUser,registerUser,AdminLogin } from '../Controller/userController.js';

const userRouter = express.Router(); 


userRouter.post('/login', loginUser);
userRouter.post('/register', registerUser);
userRouter.post('/adminlogin', AdminLogin);

export default userRouter; 

