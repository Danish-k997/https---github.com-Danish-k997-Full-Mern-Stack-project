import userModel from "../models/userModal.js";


const getUserCart = async (req, res) => {
  try {
    const  userId  = req.userId;
    const UserData = await userModel.findById(userId);
    const cartData = await UserData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const  userId  = req.userId;
    const UserData = await userModel.findById(userId);
    const cartData = await UserData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const  userId  = req.userId;
    const UserData = await userModel.findById(userId);
    const cartData = await UserData.cartData;

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item updated to cart successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { getUserCart, addToCart, updateCart };
