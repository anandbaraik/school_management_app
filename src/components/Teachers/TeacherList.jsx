import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteTeacher, fetchAllTeachers } from "../../redux/TeacherSlice.js";

const TeacherList = () => {
  const teachers = useSelector((state) => state.teachers?.data);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    if(window.confirm('Are you sure?')) {
      dispatch(deleteTeacher(id));
    }
  };
  useEffect(() => {
    dispatch(fetchAllTeachers());
  }, [dispatch]);
  return (
    <Container fluid className="mt-4">
       <Link
        to="/teacher/add"
        className="btn btn-primary btn-circle btn-lg mb-4"
      >
        <i className="fas fa-plus"></i>
        Add Teacher
      </Link>
      <Row>
        {teachers?.map((teacher) => (
          <Col md={4} sm={6} xs={12} key={teacher._id}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{teacher.name}</Card.Title>
                <Card.Text>Subject: {teacher.subject}</Card.Text>
                <Card.Text>Contact: {teacher.contact}</Card.Text>
                <Link to={`/teacher/edit/${teacher._id}`}
                  className="btn btn-sm btn-info"
                  size="sm">
                  <i className="fas fa-pencil-alt mr-3"></i>
                  {
                     ' '
                  } Edit
                </Link>{' '}
                <Button
                    size="sm" variant="danger"
                    onClick={() => handleDelete(teacher._id)}
                  >
                  <i className="fas fa-trash-alt"></i>  {' '}
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TeacherList;
