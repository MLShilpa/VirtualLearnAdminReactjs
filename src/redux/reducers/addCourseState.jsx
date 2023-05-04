import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseState:false,
  testState: false,
  lessonState: false,
  chapterState: false,
  accState:0,
  courseId:"",
  courseChapterData:"",
};

export const addCourseState = createSlice({
  name: "addCourseState",
  initialState,
  reducers: {
    setCourseChapterData: (state, action) => {
      state.courseChapterData = action.payload;
    },
    setCourseState: (state, action) => {
        state.courseState = action.payload;
      },
    setTestState: (state, action) => {
      state.testState = action.payload;
    },
    setLessonState: (state, action) => {
      state.lessonState = action.payload;
    },
    setChapterState: (state, action) => {
      state.chapterState = action.payload;
    },
    setCourseId: (state, action) =>{
        state.courseId = action.payload;
    },
    setAccState: (state, action) =>{
        state.accState = action.payload;
    },
    setAddCourseState:(state) =>{
        state.chapterState = false;
        state.courseState = false;
        state.testState = false;
        state.lessonState = false;
        state.accState = 0;
    },
  },
});

export const {setCourseChapterData,setCourseState, setCourseId,setLessonState,setTestState,setChapterState , setAccState, setAddCourseState} = addCourseState.actions;

export default addCourseState;
