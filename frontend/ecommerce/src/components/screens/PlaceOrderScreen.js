// src/components/screens/PlaceOrderScreen.js
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Card, Button, Image } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Message from "../message";
import { removeFromCart } from "../../actions/cartactions";

function PlaceOrderScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems=[] } = cart;

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");

  // Calculate total items and price
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  // Check if user is logged in
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/placeorder");
    }
  }, [userInfo, navigate]);

  // Place order handler
  const placeOrderHandler = async (paymentMethod) => {
    try {
      // Update stockcount in backend for each product
      await Promise.all(
        cartItems.map((item) =>
          axios.put(`/api/product/${item.product}/update-stock/`, {
            qty: item.qty,
          })
        )
      );

      // Clear cart in frontend
      cartItems.forEach((item) => dispatch(removeFromCart(item.product)));

      setOrderPlaced(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while placing order.");
    }
  };

  return (
    <div>
      <h2 className="my-3">Place Order</h2>
      {error && <Message variant="danger">{error}</Message>}
      {orderPlaced && (
        <Message variant="success">
          Your order has been placed successfully!
        </Message>
      )}
      {cartItems.length === 0 ? (
        <Message variant="info">Your cart is empty</Message>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <strong>{item.name}</strong>
                      <p>Brand: {item.brand}</p>
                    </Col>
                    <Col md={2}>Qty: {item.qty}</Col>
                    <Col md={2}>Rs. {item.price}</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>Order Summary</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  Total Items: {totalItems}
                  <br />
                  Total Price: Rs. {totalPrice}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block btn-success mb-2"
                    type="button"
                    onClick={() => placeOrderHandler("COD")}
                  >
                    Cash on Delivery
                  </Button>
                  <Button
                    className="btn-block btn-primary"
                    type="button"
                    onClick={() => placeOrderHandler("Online")}
                  >
                    Pay Online
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default PlaceOrderScreen;
