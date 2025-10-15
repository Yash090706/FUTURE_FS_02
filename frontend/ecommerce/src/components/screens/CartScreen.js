import React,{useEffect} from 'react'
import { Row, Col, Card, Image, ListGroup, Button,Container, ListGroupItem,Form} from "react-bootstrap";
import { Link,useParams,useNavigate,useLocation} from "react-router-dom";
import axios from "axios";
import { useDispatch,useSelector } from 'react-redux'
import Loader from "../loader";
import Message from "../message";
import { addToCart,removeFromCart } from '../../actions/cartactions';



function CartScreen({params}) {
  const{id}=useParams()
  const navigate=useNavigate();
  const location=useLocation();
  const productId=id;
  const qty=location.search ? Number(location.search.split('=')[1]):1
  console.log(productId,qty)
  const dispatch=useDispatch();

  const cart=useSelector(state=>state.cart)
  const{cartItems}=cart
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(()=>{
    if(productId){
      dispatch(addToCart(productId,qty))
    }

  },[dispatch,productId,qty])

  const removefromCartHandler=(id)=>{
    dispatch(removeFromCart(id))
  }
  const checkoutHandler=()=>{
     if (userInfo) {
      navigate("/checkout"); // ✅ user logged in → go to checkout
    } else {
      navigate("/login?redirect=/checkout"); // ❌ not logged in → go to login first
    }
  }
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  return (
    <>
      
      {cartItems.length === 0 ? (
        <Message variant='info'>
          Your cart is empty <Link to='/'>Go Back</Link>
        </Message>
      ) : (
        <ListGroup variant='flush'>
          {cartItems.map(item => (
            <ListGroup.Item key={item.product}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>

                <Col md={3}>
                  <Link to={`/product/${item.product}`} style={{ textDecoration: "none", color: "black" }}><h4>{item.name}</h4></Link>
                  <h6>{item.brand}</h6>
                  
                </Col>

                <Col md={2}>Rs.{item.price}</Col>

                <Col md={1}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.stockcount).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>

                <Col md={1}>
                  <Button
                    type='button'
                    variant='light'
                    onClick={() => removefromCartHandler(item.product)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>

      )}
      <Row className="mt-4">
  <Col className="d-flex justify-content-center">
    <Card style={{ width: "300px" }}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h5 className="text-center">
            Subtotal ({totalItems} items) :  Rs.{totalPrice}
          </h5>
        </ListGroup.Item>
        <ListGroup.Item>
          <center>
          <Button
            type="button"
            className="btn-block btn-success"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
            

          >
            Proceed to Checkout
          </Button></center>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  </Col>
</Row>
    </>









  )
}

export default CartScreen
