import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Container,Badge } from "react-bootstrap";
import { searchProducts } from "../../actions/searchActions.js";
// import { listProducts } from '../../actions/productactions.js'\
import Loader from '../loader.js'
import Message from '../message.js'
import Products from "../products.js";

function SearchScreen() {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const productSearch = useSelector((state) => state.productSearch);
  const { loading, error, products } = productSearch;

  useEffect(() => {
    dispatch(searchProducts(keyword));
  }, [dispatch, keyword]);

  return (
    
    <Container className="my-4">
      <div className="d-flex align-items-center mb-3">
        <h3 className="me-2" style={{ color: "#000", fontWeight: "600" }}>Search Results for {" "}
            <strong style={{ color: "#007bff" }}>{keyword}</strong>
        </h3>
        
      </div>
      <br />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : products.length === 0 ? (
        <Message>No products found.</Message>
      ) : (
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Products product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default SearchScreen;
