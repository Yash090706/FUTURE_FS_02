import React from "react";
import Header from "./components/Header.js";
import { Container } from "react-bootstrap";
import Footer from "./components/footer";
import { HashRouter as Router,Routes,Route } from "react-router-dom";
import HomeScreen from "./components/screens/HomeScreen.js"; 
import SignUpScreen from "./components/screens/SignUpScreen.js";
import LoginScreen from "./components/screens/LoginScreen.js";
import CartScreen from "./components/screens/CartScreen.js";
// import Products from "./components/products.js";
import ProductScreen from "./components/screens/productscreen.js";
// import SearchScreen from "./components/screens/Searchscreen.js";
import CategoryScreen from "./components/screens/CategoryScreen";
import PlaceOrderScreen from "./components/screens/PlaceOrderScreen.js";

const App = () => {
  return (
    
      <div>
        <Router>
          <Header/>
          <Routes>
            <Route exact path="/" element={<HomeScreen/>}/>
            <Route exact path="/product/:id" element={<ProductScreen/>}/>
            <Route exact path="/login" element={<LoginScreen/>}/>
            <Route exact path="/signup" element={<SignUpScreen/>}/>
            <Route exact path="/cart/:id?" element={<CartScreen/>}/> 
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
          </Routes>
        </Router>


      </div>
    
  );
}; 

export default App;
