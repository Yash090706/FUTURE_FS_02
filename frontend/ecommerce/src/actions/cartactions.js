import axios, { Axios } from "axios";
import { CART_REMOVE_ITEM,CART_ADD_ITEM} from "../constants/cartconstants";

export const addToCart=(id,qty)=> async(dispatch,getState)=>{
    const {data} = await axios.get(`/api/product/${id}`)
    dispatch({
        type:CART_ADD_ITEM,
        payload:{
            product:data._id,
            brand:data.productbrand,
            name:data.productname,
            image:data.image,
            price:data.price,
            stockcount:data.stockcount,
            qty
        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
export const removeFromCart=(id)=>(dispatch,getState)=>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id,
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}