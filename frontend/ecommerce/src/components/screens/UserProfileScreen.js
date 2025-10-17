import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../actions/useractions';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';

const UserProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      // User not logged in → redirect to login page
      navigate('/login');
    } else {
      dispatch(getUserDetails());
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <Row className="justify-content-center mt-4">
      <Col md={6}>
        <Card>
          <Card.Header>User Details</Card.Header>
          <ListGroup variant="flush">
            {loading && <ListGroup.Item>Loading...</ListGroup.Item>}
            {error && <ListGroup.Item>{error}</ListGroup.Item>}
            {!loading && user && (
              <>
                <ListGroup.Item>
                  <strong>Username:</strong> {user.username}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Name:</strong> {user.name}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {user.email}
                </ListGroup.Item>
                
              </>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default UserProfileScreen;
