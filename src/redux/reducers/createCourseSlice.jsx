import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: '',
  lessonType: '',
  selectedFile: '',
};

export const createCourseSlice = createSlice({
  name: 'createCourse',
  initialState,
  reducers: {
    CategoryId: (state, action) => {
      state.categoryId = action.payload;
      console.log("sfaf", state.categoryId)
    },
    LessonType: (state, action) => {
      state.lessonType = action.payload;
      // console.log("sfaf", state.lessonType)
    },
    SelectedFile: (state, action) => {
      state.selectedFile = action.payload;
      console.log("sfaf", state.selectedFile)
    },
  },
});

export const { CategoryId, LessonType, SelectedFile } = createCourseSlice.actions;

export default createCourseSlice;
