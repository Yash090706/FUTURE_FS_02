import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col, Card, ListGroup, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CheckoutScreen() {
  const navigate = useNavigate();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [placedOrder, setPlacedOrder] = useState(null);

  // Get cart items from Redux
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // Get user info from Redux
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Calculate total price
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  // Place order handler
  const placeOrderHandler = async () => {
    if (!userInfo) {
      navigate("/login?redirect=/checkout");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // Send order to backend
      const { data: createdOrder } = await axios.post(
        "http://127.0.0.1:8000/api/orders/add/",
        {
          items: cartItems.map((item) => ({
            _id: item._id || item.product, // backend expects _id for products
             qty: Number(item.qty),
  price: Number(item.price),
          })),
          payment_method: paymentMethod,
        },
        config
      );

      // Save order in state and localStorage
      setPlacedOrder(createdOrder);
      localStorage.setItem("latestOrder", JSON.stringify(createdOrder));

      // Clear cart
      localStorage.removeItem("cartItems");

      setOrderPlaced(true);
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      alert("Error placing order. Check console or Django logs.");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to OrderDetailsScreen
  const viewDeliveryHandler = () => {
    if (placedOrder) {
      navigate(`/order/${placedOrder._id}`, { state: { order: placedOrder } });
    }
  };

  // Success screen after order placement
  if (orderPlaced) {
    return (
      <div className="text-center mt-5">
        <h2>✅ Order Placed Successfully!</h2>
        <p>Thank you for shopping with us. Your order is being processed.</p>
        <Button className="mt-3" onClick={viewDeliveryHandler}>
          View Delivery Details
        </Button>
      </div>
    );
  }

  // Checkout summary UI
  return (
    <>
      <h3 className="text-center mt-3">Checkout Summary</h3>

      <Row className="mt-4">
        <Col md={8}>
          <ListGroup variant="flush">
            {cartItems.length === 0 ? (
              <ListGroup.Item>Your cart is empty.</ListGroup.Item>
            ) : (
              cartItems.map((item) => (
                <ListGroup.Item key={item._id || item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={4}>
                      <h5>{item.name}</h5>
                      <p>Qty: {item.qty}</p>
                    </Col>
                    <Col md={3}>Rs.{item.price}</Col>
                    <Col md={3}>Rs.{(Number(item.price) * Number(item.qty)).toFixed(2)}
</Col>
                  </Row>
                </ListGroup.Item>
              ))
            )}
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
