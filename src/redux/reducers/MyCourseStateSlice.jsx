import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  draftCoursesPageNum:1,
  courseDetailDraftState:false,
  publishedCoursesPageNum:1,
  courseDetailPublishedState:false,
}

export const MyCourseStateSlice = createSlice({
  name: 'myCourseStateSlice',
  initialState,
  reducers: {
    setDraftCoursesPageNum: (state, action) => {
      state.draftCoursesPageNum = action.payload
    },
    setCourseDetailDraft: (state, action) => {
      state.courseDetailDraftState = action.payload
    },
    setPublishedCoursesPageNum: (state, action) => {
      state.publishedCoursesPageNum = action.payload
    },
    setCourseDetailPublishedState: (state, action) => {
      state.courseDetailPublishedState = action.payload
    },
  },
})

export const { setDraftCoursesPageNum,setPublishedCoursesPageNum,setCourseDetailDraft,setCourseDetailPublishedState} = MyCourseStateSlice.actions

export default MyCourseStateSlice