import {createStore,combineReducers,applyMiddleware} from 'redux';
import {thunk}from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension';
import { Productlistreducers } from './reducers/productreducers';
import { ProductDetailsreducers } from './reducers/productreducers';
import { userLoginReducers,userSignupReducers } from './reducers/userreducers';
import { cartReducers } from './reducers/cartreducers';
import { categoryProductsReducer } from './reducers/categoryReducers';
import { productSearchReducer } from "./reducers/searchReducers";

const reducer=combineReducers(
    {
        productsList:Productlistreducers,
        productdetails:ProductDetailsreducers,
        userLogin:userLoginReducers,
        userSignup:userSignupReducers,
        cart:cartReducers,
        categoryProducts: categoryProductsReducer,
        productSearch: productSearchReducer,
    }
)
const cartItemsFromStorage=localStorage.getItem('cartItems')?
JSON.parse(localStorage.getItem('cartItems')):[]
const initialstate={
    cart:{cartItems:cartItemsFromStorage}
}
const middleware=[thunk]
const store=createStore(reducer,initialstate,composeWithDevTools(applyMiddleware(...middleware)))
export default store;
