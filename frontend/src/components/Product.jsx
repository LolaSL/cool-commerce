import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Rating from "./Rating.jsx";

const Product = (props) => {
  const { product } = props;
  return (
    <Card className="product h-100">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
              </Link>
              <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text className="mt-auto">${product.price}</Card.Text>
        <Button variant="primary" className="btn">Add to cart</Button>
      </Card.Body>
    </Card>
  );
};

export default Product;
