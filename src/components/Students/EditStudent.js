import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button, Container } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { updateStudent } from "../../redux/StudentSlice.js";

const EditStudent = () => {
  const { studentID } = useParams();
  const students = useSelector((state) => state.students.data);
  const student = students?.find((student) => (student._id === studentID));
  const [formData, setFormData] = useState(student);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStudent({ studentId: studentID, data: formData }));
    const { name } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: "" }));
    navigate("/students");
  };

  return (
    <Container>
    <Card className="mt-5 shadow">
      <Card.Header className="text-primary">Edit Student</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="studentName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="studentGrade">
            <Form.Label>Grade</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="12"
              name="grade"
              value={formData?.grade}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="studentGender">
            <Form.Label>Gender</Form.Label>
            <Form.Control
              as="select"
              name="gender"
              value={formData?.gender}
              onChange={handleChange}
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Not mention">Not mention</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="studentAge">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              name="age"
              value={formData?.age}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="studentAttendance">
            <Form.Label>Attendance</Form.Label>
            <Form.Control
              type="number"
              name="attendance"
              value={formData?.attendance}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="studentMarks">
            <Form.Label>Marks (out of 500)</Form.Label>
            <Form.Control
              type="number"
              min="0"
              max="500"
              name="marks"
              value={formData?.marks}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit" className="mr-2">
            Update
          </Button>
          {' '}
          <Link to="/students" className="btn btn-danger">
            Cancel
          </Link>
        </Form>
      </Card.Body>
    </Card>
    </Container>
  );
};

export { EditStudent };
