import React, { useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudents } from "../../redux/StudentSlice";
import { fetchAllTeachers } from "../../redux/TeacherSlice";
import { ThreeCircles } from 'react-loader-spinner';
import "./home.css";
const Statistics = () => {

  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.data);
  const teachers = useSelector((state) => state.teachers.data);
  const studentStatus = useSelector((state) => state.students.status);
  const teacherStatus = useSelector((state) => state.teachers.status);

  useEffect(() => {
    dispatch(fetchAllStudents());
    dispatch(fetchAllTeachers());
    const intervalId = setInterval(() => {
      dispatch(fetchAllStudents());
      dispatch(fetchAllTeachers());
    }, 300000); //5min
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

  const isLoading = studentStatus === "loading" || teacherStatus === "loading";

  const averageAttendance = students.reduce((acc, student) => acc + student.attendance, 0) / students.length;
  const averageMarks = students.reduce((acc, student) => acc + student.marks, 0) / students.length;
  const topStudent = students.reduce((prev, current) => (prev.marks > current.marks ? prev : current),{});

  return (
    <Container fluid className="mt-4">
      {isLoading ? (
        <ThreeCircles
          visible={true}
          height="100"
          width="100"
          color="#2563eb"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass="justify-content-center"
          />
      ) : (
        <Row className="statisticsRow">
          <Col md={3}>
            <Card className="mb-4 text-center statisticsCard ">
              <Card.Header>Total Students</Card.Header>
              <Card.Body>
                <h1>{students.length}</h1>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4 text-center statisticsCard ">
              <Card.Header>Average Attendance</Card.Header>
              <Card.Body>
                <h1>{averageAttendance.toFixed(2)}%</h1>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4 text-center statisticsCard ">
              <Card.Header>Average Marks</Card.Header>
              <Card.Body>
                <h1>{averageMarks.toFixed(2)}</h1>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4 text-center statisticsCard ">
              <Card.Header>Top Performing Student</Card.Header>
              <Card.Body>
                <h1>{topStudent.name}</h1>
                <p>{topStudent.marks}/500</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="mb-4 text-center statisticsCard ">
              <Card.Header>Total Teachers</Card.Header>
              <Card.Body>
                <h1>{teachers.length}</h1>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Statistics;
