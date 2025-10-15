import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { searchProducts } from "../actions/searchActions";
import Loader from '../loader.js'
import Message from '../message.js'
import Products from "../components/products.js";

function SearchResultsScreen() {
  const { keyword } = useParams();
  const dispatch = useDispatch();

  const productSearch = useSelector((state) => state.productSearch);
  const { loading, error, products } = productSearch;

  useEffect(() => {
    dispatch(searchProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <Container>
      <h2>Search Results for "{keyword}"</h2>
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

export default SearchResultsScreen;
