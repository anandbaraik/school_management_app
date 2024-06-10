import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudents, deleteStudent } from "../../redux/StudentSlice.js";
import { ThreeCircles } from 'react-loader-spinner'

const StudentList = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.data);
  const status = useSelector((state) => state.students.status);
  const [deletingIds, setDeletingIds] = useState([]);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllStudents());
    }
  }, [status, dispatch]);

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure?')) {
      setDeletingIds((prev) => [...prev, id]);
      await dispatch(deleteStudent(id));
      setDeletingIds((prev) => prev.filter((studentId) => studentId !== id));
    }
  };

  return (
    <Container fluid className="mt-4">
      <Link
        to="/student/add"
        className="btn btn-primary btn-circle btn-lg mb-4"
      >
        <i className="fas fa-plus"></i>
        Add Student
      </Link>
      <Row>
        {status === "loading" ? (
          <Container className="text-center mt-5">
            <ThreeCircles
              visible={true}
              height="100"
              width="100"
              color="#2563eb"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass="justify-content-center"
              />
          </Container>
        ) : (
          students?.map((student) => (
            <Col md={4} sm={6} xs={12} key={student._id}>
              <Card className="mb-4 shadow">
                <Card.Body>
                  <Card.Title className="text-primary">
                    {student.name}
                  </Card.Title>
                  <Card.Text>
                    <strong>Grade:</strong> {student.grade}
                  </Card.Text>
                  <Card.Text>
                    <strong>Gender:</strong> {student.gender}
                  </Card.Text>
                  <Card.Text>
                    <strong>Age:</strong> {student.age}
                  </Card.Text>
                  <Card.Text>
                    <strong>Attendance:</strong> {student.attendance}
                  </Card.Text>
                  <Card.Text>
                    <strong>Marks:</strong> {student.marks}
                  </Card.Text>
                  <Link
                    to={`/student/edit/${student._id}`}
                    className="btn btn-sm btn-info"
                    size="sm"
                  >
                    <i className="fas fa-pencil-alt"></i>
                    {' '}
                    Edit
                  </Link>
                  {' '}
                  {deletingIds.includes(student._id) ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    <Button
                      size="sm" variant="danger"
                      onClick={() => handleDelete(student._id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                      {' '}
                      Delete
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default StudentList;
