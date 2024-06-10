import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from "./StudentSlice.js";
import teacherReducer from "./TeacherSlice.js";
const store = configureStore({
  reducer: {
    students: studentsReducer,
    teachers: teacherReducer
  }
});

export default store;
