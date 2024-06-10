import React, { useState } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { Link, useHistory, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTeacher } from "../../redux/TeacherSlice.js";

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    contact: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTeacher(formData));
    navigate("/teachers");
  };

  return (
    <Container>
    <Card className="mt-5">
      <Card.Header>Add New Teacher</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="teacherName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="teacherSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="teacherContact">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit" className="mr-2">
            Add
          </Button>
          {' '}
          <Link to="/teachers" className="btn btn-danger">
            Cancel
          </Link>
        </Form>
      </Card.Body>
    </Card>
    </Container>
  );
};

export default AddTeacher;
