import React, { useReducer } from "react";
import { useEffect } from "react";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product.jsx";
import { Helmet } from 'react-helmet-async';



const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const HomePage = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }

    };
    fetchData();
  }, []);

  return (
    <div>
      <article className="py-4 mb-4">
        <Helmet>
     <title> Cool Commerce</title>
        </Helmet>
        <h1 className="text-center pt-4 mb-4 fw-bold">Featured Products</h1>
        <p className="py-2 mb-2">
          Introducing our latest line of air conditioning units, meticulously engineered to provide unparalleled cooling perfomance, energy efficiency.
        </p>
        <p>
          Designed for your comfort.
        </p>
        <p>
        Maximize the comfort of your dwelling, office, condominium, or villa with our advanced air systems.
        </p>
      </article>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} xs={12} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
};

export default HomePage;
