import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const GetQuote = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [requirements, setRequirements] = useState("");
  const [areaCoverage, setAreaCoverage] = useState("");
  const [features, setFeatures] = useState([]);
  const [price, setPrice] = useState("");
  const [btu, setBtu] = useState("");
  const [energyEfficiency, setEnergyEfficiency] = useState("");
  const [results, setResults] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/quote", {
        name,
        email,
        phone,
        address,
        requirements,
        areaCoverage,
        features,
        price,
        btu,
        energyEfficiency,
      });

      console.log("Received Products Data:", data);
      setResults(data);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const handleFeatureChange = (feature) => {
    setFeatures((prevFeatures) =>
      prevFeatures.includes(feature)
        ? prevFeatures.filter((f) => f !== feature)
        : [...prevFeatures, feature]
    );
  };

  return (
    <div>
      <h1 className="text-center pt-4 mb-4 fw-bold">
        Get Air Conditioner Quote
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="requirements">
          <Form.Label>Requirements</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="areaCoverage">
          <Form.Label>Area Coverage (sq ft)</Form.Label>
          <Form.Control
            type="number"
            value={areaCoverage}
            onChange={(e) => setAreaCoverage(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="features">
          <Form.Label>Features</Form.Label>
          <Form.Check
            type="checkbox"
            label="Heating"
            onChange={() => handleFeatureChange("Heating")}
          />
          <Form.Check
            type="checkbox"
            label="Cooling"
            onChange={() => handleFeatureChange("Cooling")}
          />
          <Form.Check
            type="checkbox"
            label="Wi-Fi"
            onChange={() => handleFeatureChange("Wi-Fi")}
          />
          <Form.Check
            type="checkbox"
            label="Energy Saving"
            onChange={() => handleFeatureChange("Energy Saving")}
          />
          <Form.Check
            type="checkbox"
            label="Remote Control"
            onChange={() => handleFeatureChange("Remote Control")}
          />
          <Form.Check
            type="checkbox"
            label="Led"
            onChange={() => handleFeatureChange("Led")}
          />
        </Form.Group>

        <Form.Group controlId="btu">
          <Form.Label>BTU</Form.Label>
          <Form.Control
            type="number"
            value={btu}
            onChange={(e) => setBtu(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="energyEfficiency">
          <Form.Label>Energy Efficiency</Form.Label>
          <Form.Control
            type="number"
            value={energyEfficiency}
            onChange={(e) => setEnergyEfficiency(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price ($)</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-4 mb-4">
          Get Quote
        </Button>
      </Form>
      {results.length > 0 && (
        <div>
          <h2>Recommended Air Conditioners</h2>
          <ul>
            {results.map((product) => (
              <li key={product._id} className="text-success fw-bold">
                {product.brand} {product.category} - ${product.price} -{" "}
                {product.btu} BTU
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetQuote;
