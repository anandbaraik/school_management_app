import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*
* fetch all students
*/
export const fetchAllStudents = createAsyncThunk("students/fetchAll",
  async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/students`);
    const data = await response.json();
    return data.data;
  }
);

/*
* add a student
*/
export const createStudent = createAsyncThunk(
  "students/add",
  async (student) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/students`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    const data = await response.json();
    return data.data;
  }
);

/*
* update a student
*/
export const updateStudent = createAsyncThunk(
  "students/update",
  async ({ studentId, data }) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/students/${studentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.data;
  }
);

/*
* delete a student
*/
export const deleteStudent = createAsyncThunk(
  "students/delete",
  async (studentId) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/students/${studentId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return data.data;
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    data: [],
    status: "idle", // can be 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*
      * set status to 'loading' When any async action starts
      */
      .addCase(fetchAllStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteStudent.pending, (state) => {
        state.status = "loading";
      })
      /*
      * set status to 'succeeded' on successful completion of async actions
      */
      .addCase(fetchAllStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data, action.payload];
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...action.payload];
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...action.payload];
      })
      /*
      * set status to 'failed' on failure of async actions
      */
      .addCase(fetchAllStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default studentsSlice.reducer;
