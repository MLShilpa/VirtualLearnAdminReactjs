import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseState: false,
  testState: false,
  lessonState: false,
  chapterState: false,
  editState: "save",
  accState: 0,
  courseId: "",
  courseChapterData: "",
  overViewData: "",
  selectedChapterId: "",
};

export const addCourseState = createSlice({
  name: "addCourseState",
  initialState,
  reducers: {
    setCourseChapterData: (state, action) => {
      state.courseChapterData = action.payload;
      console.log("courseChapterData", state.courseChapterData);
    },
    setOverViewDataADC: (state, action) => {
      state.overViewData = action.payload;
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
    setCourseId: (state, action) => {
      state.courseId = action.payload;
    },
    setAccState: (state, action) => {
      state.accState = action.payload;
    },
    setAddCourseState: (state) => {
      state.chapterState = false;
      state.courseState = false;
      state.testState = false;
      state.lessonState = false;
      state.accState = 0;
    },
    setCourseChaptersAndOverviewDataNull: (state) => {
      state.overViewData = "";
      state.courseChapterData = "";
    },
    setEditState: (state, action) => {
      state.editState = action.payload;
      // console.log("editState", state.editState)
    },
    setSelectedChapterId: (state, action) => {
      state.selectedChapterId = action.payload;
      // console.log("editState", state.editState)
    },



  },
});

export const { setCourseChapterData, setOverViewDataADC, setCourseState, setCourseId, setLessonState, setTestState, setChapterState, setAccState, setAddCourseState, setCourseChaptersAndOverviewDataNull, setEditState, setSelectedChapterId } = addCourseState.actions;

export default addCourseState;
