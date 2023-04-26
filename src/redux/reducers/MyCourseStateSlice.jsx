import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  navBarState : 1,
  myCourseScreenState:1,
}

export const MyCourseStateSlice = createSlice({
  name: 'myCourseStateSlice',
  initialState,
  reducers: {
    setNavBarState: (state, action) => {
      state.navBarState = action.payload
    },
    setMyCourseScreenState: (state, action) => {
      state.myCourseScreenState = action.payload
    },
  },
})

export const { setNavBarState,setMyCourseScreenState } = MyCourseStateSlice.actions

export default MyCourseStateSlice