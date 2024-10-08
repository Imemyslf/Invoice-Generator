import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

export const AddMaterial = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const material = location.state;

  const [materialName, setMaterialName] = useState("");
  const [materialRate, setMaterialRate] = useState("");
  const [materialKg, setMaterialKgs] = useState("");
  const [updateMaterial, setUpdatedMaterial] = useState(false);
  // const [validated, setValidated] = useState(false);

  // const handleSubmitt = (event) => {
  //   const form = event.currentTarget;
  //   console.log(form);
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }
  //   setValidated(true);
  // };

  useEffect(() => {
    if (material) {
      setMaterialName(material.name);
      setMaterialRate(material.rate);
      setMaterialKgs(material.kg);
      setUpdatedMaterial(true);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const inputs = {
        name: materialName,
        rate: materialRate,
        kg: materialKg,
      };

      const result = await axios.post(`/api/materials/insert`, inputs);

      if (result.status === 201) {
        alert(`Materials added successfully`);
      } else {
        console.log(result.status);
      }
    } catch (err) {
      console.error("Error submitting data:", err);
    }
  };

  const handleUpdate = async () => {
    console.log(material._id);

    try {
      const inputs = {
        _id: material._id,
        name: materialName,
        rate: materialRate,
        kg: materialKg,
      };

      const updatedList = await axios.put(`/api/materials/update`, inputs);

      if (updatedList.status === 200) {
        alert("Material Updated Successfully");
        navigate(`/materials`);
      } else {
        alert("Error while updating materials");
      }
    } catch (err) {
      console.log("Error is server:- ", err);
    }
  };

  return (
    <>
      <Form className="form-container">
        <h3 className="form-header">ADD NEW MATERIALS</h3>
        <Row className="mb-4">
          <Form.Group as={Col} controlId="formGridCompanyName">
            <Form.Label>Material name</Form.Label>
            <Form.Control
              type="text"
              value={materialName}
              placeholder="PVC Plastic"
              onChange={(e) => setMaterialName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCompanyGSTNo">
            <Form.Label>Material rate</Form.Label>
            <Form.Control
              type="number"
              value={materialRate}
              placeholder="250"
              onChange={(e) => setMaterialRate(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-4">
          <Form.Group as={Col} md="6" controlId="formGridCompanyEmail">
            <Form.Label>Material quantity (Kgs)</Form.Label>
            <Form.Control
              type="number"
              value={materialKg}
              placeholder="5"
              onChange={(e) => setMaterialKgs(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        {updateMaterial ? (
          <Button variant="primary" onClick={handleUpdate}>
            UPDATE
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSubmit}>
            SUBMIT
          </Button>
        )}
      </Form>
    </>
  );
};
