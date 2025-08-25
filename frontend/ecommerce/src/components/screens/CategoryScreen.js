import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CategoryScreen() {
  const { category } = useParams(); // fetch from URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`/api/products/category/${category}/`);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div>
      <h2>{category} Products</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-md-3">
            <div className="card p-3 m-2">
              <img src={product.image} alt={product.productname} className="card-img-top" />
              <div className="card-body">
                <h5>{product.productname}</h5>
                <p>Brand: {product.productbrand}</p>
                <p>₹{product.price}</p>
                <button className="btn btn-success" disabled={product.stockcount === 0}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryScreen;
