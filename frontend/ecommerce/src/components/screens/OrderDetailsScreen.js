import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Card, Table, Row, Col, ListGroup } from "react-bootstrap";
import Loader from "../loader";
import Message from "../message";

function OrderDetailsScreen() {
  const { id: orderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!order);
  const [error, setError] = useState(null);

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!order && userInfo) {
      const fetchOrder = async () => {
        try {
          const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          const { data } = await axios.get(
            `http://127.0.0.1:8000/api/orders/${orderId}/`,
            config
          );
          setOrder(data);
          localStorage.setItem("latestOrder", JSON.stringify(data));
        } catch (err) {
          setError(err.response?.data?.detail || "Order not found");
        } finally {
          setLoading(false);
        }
      };
      fetchOrder();
    } else if (!userInfo) {
      navigate("/login");
    }
  }, [order, orderId, userInfo, navigate]);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;
  if (!order) return <h4>No order details available.</h4>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Order Details</h2>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-3 mb-3 shadow-sm">
            <h5>Order Info</h5>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Order ID:</strong> {order._id}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Total Price:</strong> Rs.{order.totalPrice}
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Placed By:</strong> {order.user}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm">
        <Card.Header>
          <h5 className="mb-0">Ordered Items</h5>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.orderItems?.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.qty}</td>
                  <td>Rs.{Number(item.price).toFixed(2)}</td>
                  <td>Rs.{(Number(item.price) * Number(item.qty)).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default OrderDetailsScreen;
