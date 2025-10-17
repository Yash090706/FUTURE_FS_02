import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../loader";
import Message from "../message";

function MyOrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userInfo) {
        navigate("/login");
        return;
      }
      try {
        const config = {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        };
        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/orders/myorders/",
          config
        );
        setOrders(data);
      } catch (err) {
        setError(err.response?.data?.detail || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
    console.log("Fetching order",userInfo)
  }, [userInfo, navigate]);

  if (loading) return <Loader />;
  if (error) return <Message variant="danger">{error}</Message>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <Message>No recent orders found.</Message>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.id}</td>
                
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>Rs.{Number(order.totalPrice).toFixed(2)}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() =>
                      navigate(`/order/${order._id}`, { state: { order } })
                    }
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default MyOrdersScreen;
