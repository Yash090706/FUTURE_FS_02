
import { React,useState,useEffect} from 'react'
import { Container,Card, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import {Row,Col} from 'react-bootstrap'
import Products from '../products.js'
import { listProducts } from '../../actions/productactions.js'
import { useDispatch,useSelector } from 'react-redux'
import Loader from '../loader.js'
import Message from '../message.js'



function HomeScreen() {
  const dispatch=useDispatch()
  const productsList=useSelector((state)=>state.productsList);
  const{error,loading,products}=productsList
useEffect(()=>{
  dispatch(listProducts())

},[dispatch])

  return (

    <Container>
      <div
        style={{
          background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
          color: "white",
          borderRadius: "15px",
          padding: "40px 20px",
          textAlign: "center",
          marginBottom: "30px",
          marginTop:"20px"
        }}
      >
        <h2 style={{ fontWeight: "bold" }}>Welcome to Our Store 🛍️</h2>
        <p style={{ fontSize: "18px" }}>
          Discover amazing products at the best prices
        </p>
      </div>

      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Featured Products
      </h2>
      
      
      <Row className="g-4">
        {
          loading?(
           <Loader/>
          ):error?(
            <Message variant='danger'>{error}</Message>
          ):(
                    products.map((product) => {
  return (
    
    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
      <Products product={product}/>
      

    </Col>
  );
})
          )
        }

      </Row>

    </Container>  )
}

export default HomeScreen
