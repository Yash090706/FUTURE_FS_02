
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
      <br>
      </br>
      <Row>
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
