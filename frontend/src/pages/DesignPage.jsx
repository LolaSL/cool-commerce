import React, { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Stage, Layer, Rect, Image, Group, Text } from "react-konva";

const DesignPage = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    requirements: "",
    areaCoverage: "",
    features: [],
    price: "",
    btu: "",
    energyEfficiency: "",
    typeOfProperty: "",
    floorNumber: "",
    directionOfVentilation: "",
    numberOfRooms: "",
    roomArea: "",
  });

  const [results, setResults] = useState([]);
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [imageObj, setImageObj] = useState(null);
  const [airConPositions, setAirConPositions] = useState([]);

  const stageRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name, value) => {
    setFormState
      ((prev) => ({
      ...prev,
      [name]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (
        selectedFile.type === "application/pdf" ||
        selectedFile.type.startsWith("/images/")
      ) {
        setFile(selectedFile);
        setFileUrl(URL.createObjectURL(selectedFile));

        if (selectedFile.type.startsWith("/images/")) {
          const img = new window.Image();
          img.src = URL.createObjectURL(selectedFile);
          img.onload = () => {
            setImageObj(img);
          };
        }
      } else {
        toast.error("Please upload a PDF or JPG file.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please upload an accommodation plan in PDF or JPG format.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    Object.entries(formState).forEach(([key, value]) => {
      formData.append(key, Array.isArray(value) ? value.join(",") : value);
    });

    try {
      const { data } = await axios.post("/api/quote", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResults(data);
    } catch (error) {
      toast.error(error.response ? error.response.data.message : error.message);
    }
  };

  const handleFeatureChange = (feature) => {
    setFormState((prev) => {
      const features = prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature];
      return { ...prev, features };
    });
  };

  const handleAirConPlacement = (e) => {
    const stage = stageRef.current;
    if (stage) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setAirConPositions([...airConPositions, { x, y }]);
    }
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
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formState.phone}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formState.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="requirements">
          <Form.Label>Requirements</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="requirements"
            value={formState.requirements}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="areaCoverage">
          <Form.Label>Area Coverage (sq. meter)</Form.Label>
          <Form.Control
            type="number"
            name="areaCoverage"
            value={formState.areaCoverage}
            onChange={handleInputChange}
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
            label="LED"
            onChange={() => handleFeatureChange("LED")}
          />
        </Form.Group>
        <Form.Group controlId="typeOfProperty">
          <Form.Label>Type of Property</Form.Label>
          <Form.Control
            type="text"
            name="typeOfProperty"
            value={formState.typeOfProperty}
            onChange={(e) =>
              handleArrayChange("typeOfProperty", e.target.value)
            }
            placeholder="Enter types separated by commas"
            required
          />
        </Form.Group>
        <Form.Group controlId="floorNumber">
          <Form.Label>Floor Number</Form.Label>
          <Form.Control
            type="text"
            name="floorNumber"
            value={formState.floorNumber}
            onChange={(e) => handleArrayChange("floorNumber", e.target.value)}
            placeholder="Enter floor numbers separated by commas"
            required
          />
        </Form.Group>
        <Form.Group controlId="directionOfVentilation">
          <Form.Label>Direction of Ventilation</Form.Label>
          <Form.Control
            type="text"
            name="directionOfVentilation"
            value={formState.directionOfVentilation}
            onChange={(e) =>
              handleArrayChange("directionOfVentilation", e.target.value)
            }
            placeholder="Enter directions separated by commas"
            required
          />
        </Form.Group>
        <Form.Group controlId="numberOfRooms">
          <Form.Label>Number of Rooms</Form.Label>
          <Form.Control
            type="text"
            name="numberOfRooms"
            value={formState.numberOfRooms}
            onChange={(e) => handleArrayChange("numberOfRooms", e.target.value)}
            placeholder="Enter numbers separated by commas"
            required
          />
        </Form.Group>
        <Form.Group controlId="roomArea">
          <Form.Label>Room Area (sq. meter)</Form.Label>
          <Form.Control
            type="text"
            name="roomArea"
            value={formState.roomArea}
            onChange={(e) => handleArrayChange("roomArea", e.target.value)}
            placeholder="Enter areas separated by commas"
            required
          />
          <Form.Group controlId="btu">
            <Form.Label>BTU</Form.Label>
            <Form.Control
              type="number"
              value={formState.btu}
              onChange={(e) => handleArrayChange("btu", e.target.value)}
              required
            />
            <Form.Group controlId="energyEfficiency">
              <Form.Label>Energy Efficiency</Form.Label>
              <Form.Control
                type="number"
                value={formState.energyEfficiency}
                onChange={(e) =>
                  handleArrayChange("energyEfficiency", e.target.value)
                }
                required
              />
            </Form.Group>
          </Form.Group>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price ($)</Form.Label>
          <Form.Control
            type="number"
            value={formState.price}
            onChange={(e) => handleArrayChange("price", e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="file">
          <Form.Label>Accommodation Plan (PDF or JPG)</Form.Label>
          <Form.Control
            type="file"
            accept="application/pdf,/images/*"
            onChange={handleFileChange}
            required
          />
        </Form.Group>
        <Button type="submit" className="mt-4 mb-4">
          Get Quote
        </Button>
      </Form>
      {fileUrl && (
        <div className="d-flex justify-content-center mt-4">
          {file.type === "application/pdf" ? (
            <object
              data={fileUrl}
              type="application/pdf"
              width="600"
              height="800"
            >
              <p>PDF cannot be displayed.</p>
            </object>
          ) : (
            <Stage
              width={800}
              height={600}
              ref={stageRef}
              onClick={handleAirConPlacement}
              style={{ border: "1px solid #000" }}
            >
              <Layer>
                <Image image={imageObj} />
                {airConPositions.map((pos, index) => (
                  <Group key={index} x={pos.x} y={pos.y}>
                    <Rect width={40} height={40} fill="red" />
                    <Text
                      text="AC"
                      fontSize={15}
                      fill="white"
                      align="center"
                      verticalAlign="middle"
                    />
                  </Group>
                ))}
              </Layer>
            </Stage>
          )}
        </div>
      )}
      {results.length > 0 && (
        <div>
          <h2>Recommended Air Conditioners</h2>
          <ul>
            {results.map((product) => (
              <li
                key={product._id}
                className="text-success fw-bold product-result"
              >
                <img
                  src={product.image}
                  alt={`${product.brand} ${product.category}`}
                  width="100"
                  height="100"
                />
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




export default DesignPage;

