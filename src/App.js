import AddStudent from "./components/Students/AddStudent";
import { EditStudent } from "./components/Students/EditStudent";
import StudentList from "./components/Students/StudentList";
import AddTeacher from "./components/Teachers/AddTeacher";
import EditTeacher from "./components/Teachers/EditTeacher";
import TeacherList from "./components/Teachers/TeacherList";
import Statistics from "./components/shared/Homepage";
import NavBarComponent from "./components/shared/NavBar";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div className="App">
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<Statistics />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/student/edit/:studentID" element={<EditStudent />} />
        <Route path="/student/add" element={<AddStudent />} />
        <Route path="/teachers" element={<TeacherList />} />
        <Route path="/teacher/edit/:teacherID" element={<EditTeacher />} />
        <Route path="/teacher/add" element={<AddTeacher />} />
      </Routes>
    </div>
  );
}
