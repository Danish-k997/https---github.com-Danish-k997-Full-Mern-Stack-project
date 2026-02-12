import { createContext } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendurl = https://https-github-com-danish-k997-full-mern.onrender.com;
  const [search, setSearch] = useState("");
  const [showSearch, setshowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('');

  const navigate = useNavigate()
  
  const AddtoCard = async (itemId, size) => {
    let Cartdata = structuredClone(cartItems);
    if (!size) {
      toast.error("Select Product Size");
      return;
    }


    if (Cartdata[itemId]) {
      if (Cartdata[itemId][size]) {
        Cartdata[itemId][size] += 1;
      } else {
        Cartdata[itemId][size] = 1;
      }
    } else {
      Cartdata[itemId] = {};
      Cartdata[itemId][size] = 1;
    }
    setCartItems(Cartdata); 

    if (token) {
      try {
        await  axios.post(backendurl + "/api/cart/add", { itemId, size }, { headers: { token } })
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
       
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
         try {
          if (cartItems[items][item] > 0) {
             totalCount += cartItems[items][item];
          }
         } catch (error) {
           console.log(error);
           
         }
      }
    }
    return totalCount
  }  
          
  const UpdateQuantity = async (itemId,size,quantity) => {
    let Cartdata = structuredClone(cartItems); 
    
    Cartdata[itemId][size] = quantity;

    setCartItems(Cartdata); 
    if (token) {
      try { 
        await axios.put(backendurl + "/api/cart/update", { itemId, size, quantity }, { headers: { token } }) 

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  }   

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems){
      let productinfo = products.find((product) => product._id === items);
      if (!productinfo) continue;
      for(const item in cartItems[items]){
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += productinfo.price * cartItems[items][item]
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  } 

  const getproductsData = async () => {
    try {
      const response = await axios.post(backendurl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products)
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }  

  const getUserCart = async (token) => {
    try {
      
      const response = await axios.post(backendurl + "/api/cart/get",{},{ headers: { token } });
        
      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
       console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    getproductsData()
  },[])

  useEffect(()=>{
   if (!token && localStorage.getItem('token')) {
     setToken(localStorage.getItem('token'))
     getUserCart(localStorage.getItem('token'))
   }
  },[token])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setshowSearch,
    cartItems,
    AddtoCard,
    getCartCount,
    UpdateQuantity,
    getCartAmount,
    navigate,
    backendurl,
    token,
    setToken,
    setCartItems
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
