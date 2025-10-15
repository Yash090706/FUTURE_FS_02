import React from "react";
import { Row, Col, Card, Image, ListGroup, Button,Container, ListGroupItem,Form} from "react-bootstrap";
import { Link,useParams,useNavigate,useLocation} from "react-router-dom";
import Rating from "../Rating";
import axios from "axios";
import { useState,useEffect } from "react";
import { useDispatch,useSelector } from 'react-redux'
import { listProductsDetails } from "../../actions/productactions";
import Loader from "../loader";
import Message from "../message";

function Productscreen({params}) {
  const navigate=useNavigate();
  const location=useLocation();
  const {id}=useParams()
  const dispatch=useDispatch()
  const productdetails=useSelector((state)=>state.productdetails);
  const{error,loading,product}=productdetails
  const[qty,setQty]=useState(1);
  const addtocartHandler=()=>{
    navigate(`/Cart/${id}?qty=${qty}`)
  }
  useEffect(() => {
    dispatch(listProductsDetails(id))


  }, [dispatch,params]);
  return(
    <Container>
      <div>
        <Link to="/" className="btn btn-dark my-3">
        Go back
        </Link>
        {loading?(
          <Loader/>
        ):error?(
          <Message variant='danger'>{error}</Message>
        ):
            <Row>
      <Col md={6}>
      <Image src={product.image} alt={product.productname} className="img-fluid" style={{ height: '500px', objectFit: 'cover' }}  ></Image>
      </Col>
      <Col md={3}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h3>{product.productname}</h3>
        </ListGroup.Item>
        <ListGroup.Item>
          <Rating
            value={product.rating}
            text={`${product.numberreviews} reviews`}
            color={"#f8e825"}
          />
        </ListGroup.Item>
        <ListGroup.Item>Brand: {product.productbrand} </ListGroup.Item>
        <ListGroup.Item>Description: {product.productinfo}</ListGroup.Item>
        {/* <ListGroup.Item>About Item:: {product.productdetail}</ListGroup.Item> */}
      </ListGroup>
</Col>
<Col md={3}>
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>Price:</Col>
              <Col>
                <strong>{product.price} Rs</strong>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Status:</Col>
              <Col>
                {product.stockcount > 0 ? "In Stock" : "Out of Stock"}
              </Col>
            </Row>
          </ListGroup.Item>
           {product.stockcount > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.stockcount).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
        <ListGroup.Item>
            <Button className='btn-block btn-success' disabled={product.stockcount==0} type='button' onClick={addtocartHandler}>Add to Cart</Button>
        </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
    </Row>}



      </div>
    </Container>
  )
}

export default Productscreen;