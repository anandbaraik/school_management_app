import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/*
* fetch all teachers
*/
export const fetchAllTeachers = createAsyncThunk(
  "teachers/fetchAll",
  async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/teachers`);
    const data = await response.json();
    return data.data;
  }
);

/*
* add teacher
*/
export const createTeacher = createAsyncThunk(
  "teachers/add",
  async (teacher) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/teachers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teacher)
    });
    const data = await response.json();
    return data.data;
  }
);

/*
* update teacher
*/
export const updateTeacher = createAsyncThunk(
  "teachers/update",
  async ({ teacherID, data }) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/teachers/${teacherID}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return result.data;
  }
);

/*
* delete teacher
*/
export const deleteTeacher = createAsyncThunk(
  "teachers/delete",
  async (teacherId) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/teachers/${teacherId}`, {
      method: "DELETE"
    });
    const data = await response.json();
    return data.data;
  }
);

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    data: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTeachers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTeacher.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllTeachers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = [...state.data, action.payload];
      })

      .addCase(updateTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAllTeachers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export default teachersSlice.reducer;
