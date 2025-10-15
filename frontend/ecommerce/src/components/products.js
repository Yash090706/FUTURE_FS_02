import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Products({ product }) {
  return (
    <Card className="my-10 py-3 rounded h-100 d-flex flex-column">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
          <Card.Title as="div">
            <strong><h5>{product.productname}</h5></strong>
          </Card.Title>
        </Link>
        <Card.Text as="h6">
          <div className="my-3">Brand: {product.productbrand}</div>
        </Card.Text>

        <Card.Text as="h6">
          <div className="my-3">Category: {product.productcategory}</div>
        </Card.Text>
        {/* <Card.Text as="div"> */}
        {/* <div className="my-3">Rating : {product.rating}</div> */}
        {/* </Card.Text> */}
        <Card.Text as="h5">Price: {product.price} Rs.</Card.Text>
        <Rating
          value={product.rating}
          text={ `${product.numberreviews} reviews`}
          color={"#f8e825"}
        />
      </Card.Body>
    </Card>
  );
}

export default Products;
