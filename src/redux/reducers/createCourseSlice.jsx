import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: '',

};

export const createCourseSlice = createSlice({
  name: 'createCourse',
  initialState,
  reducers: {
    CategoryId: (state, action) => {
      state.categoryId = action.payload;
      console.log("sfaf", state.categoryId)
    },
  },
});

export const { CategoryId } = createCourseSlice.actions;

export default createCourseSlice;
