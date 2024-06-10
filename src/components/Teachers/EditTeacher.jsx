import React, { useState, useEffect } from "react";
import { Card, Form, Button, Container } from "react-bootstrap";
import { Link, useParams, useHistory, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateTeacher, fetchAllTeachers } from "../../redux/TeacherSlice.js";

const EditTeacher = () => {
  const { teacherID } = useParams();
  const dispatch = useDispatch();
  const teachers = useSelector((state) => state.teachers.data);
  const teacher = teachers.find((t) => t._id === teacherID);
  const [formData, setFormData] = useState(teacher);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllTeachers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTeacher({ teacherID, data: formData }));
    navigate("/teachers");
  };

  return (
    <Container>
    <Card className="mt-5">
      <Card.Header>Edit Teacher</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="teacherName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="teacherSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              value={formData?.subject}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="teacherContact">
            <Form.Label>Contact</Form.Label>
            <Form.Control
              type="text"
              name="contact"
              value={formData?.contact}
              onChange={handleChange}
            />
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit" className="mr-2">
            Update
          </Button> {' '}
          <Link to="/teachers" className="btn btn-danger">
            Cancel
          </Link>
        </Form>
      </Card.Body>
    </Card>
    </Container>
  );
};

export default EditTeacher;
