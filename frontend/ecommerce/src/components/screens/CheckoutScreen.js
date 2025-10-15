import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card, ListGroup, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CheckoutScreen() {
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery"); // default

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin; // contains token if logged in

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  const placeOrderHandler = async () => {
    if (!userInfo) {
      navigate("/login?redirect=/checkout");
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`, // send token to backend
        },
      };

      await axios.post(
        "http://127.0.0.1:8000/api/update-stock/",
        {
          items: cartItems.map((item) => ({
            id: item._id || item.product,
            qty: item.qty,
          })),
          payment_method: paymentMethod, // send selected payment method
        },
        config
      );

      setOrderPlaced(true);
      localStorage.removeItem("cartItems"); // clear cart
      // setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      console.error(error.response?.data || error.message);
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="text-center mt-5">
        <h2>✅ Order Placed Successfully!</h2>
        <p>Thank you for shopping with us. Your items will be delivered soon!</p>
      </div>
    );
  }

  return (
    <>
      <h3 className="text-center mt-3">Checkout Summary</h3>

      <Row className="mt-4">
        <Col md={8}>
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={4}>
                    <h5>{item.name}</h5>
                    <p>Qty: {item.qty}</p>
                  </Col>
                  <Col md={3}>Rs.{item.price}</Col>
                  <Col md={3}>Total: Rs.{item.price * item.qty}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5>Order Summary</h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Total Price: Rs.{totalPrice}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                <h6>Payment Method:</h6>
                <select
                  className="form-select"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="Cash on Delivery">💵 Cash on Delivery</option>
                  <option value="Online Payment">💳 Online Payment</option>
                </select>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-success w-100"
                  disabled={loading}
                  onClick={placeOrderHandler}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CheckoutScreen;
