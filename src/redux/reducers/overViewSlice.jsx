import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  overViewData: "",
  chapterData: "",
  lessonData: "",
  categoryId: '',
  subCategoryName: '',
  courseTagLine: '',
  courseName: '',
  description: '',
  learningOutCome: '',
  requirements: '',
  coursePhoto: '',
  previewVideo: '',
  difficultyLevel: ' ',
  courseKeyword: '',
}

export const overViewDataSlice = createSlice({
  name: 'overViewData',
  initialState,
  reducers: {
    setOverViewData: (state, action) => {
      state.overViewData = action.payload;
      console.log("overViewData", state.overViewData)
    },
    setChapterData: (state, action) => {
      state.chapterData = action.payload;
      console.log("chapterData", state.chapterData)
    },
    setLessonData: (state, action) => {
      state.lessonData = action.payload;
      console.log("LessonData", state.lessonData)
    },
    storeoverViewData: (state, action) => {
      console.log('overViewDataSlice', action.payload)
      state.categoryName = action.payload.videoCategory
      state.subCategoryName = action.payload.videoSubCategory
      state.courseTagLine = action.payload.tagline
      state.courseName = action.payload.videoTitle
      state.description = action.payload.description
      state.learningOutCome = action.payload.courseOutcome
      state.requirements = action.payload.requirements
      state.difficultyLevel = action.payload.difficultyLevel
      state.courseKeyword = action.payload.courseKeyWord
    },
    storeoverViewVideo: (state, action) => {
      state.previewVideo = action.payload.videoUpload
    },
    storeoverViewPhoto: (state, action) => {
      state.coursePhoto = action.payload.imageUpload
    },
    storeCategory: (state, action) => {
      state.categoryId = action.payload
    },
    storeSubCategory: (state, action) => {
      state.subCategoryName = action.payload
    },
    storeTagline: (state, action) => {
      state.courseTagLine = action.payload
    },
    storeName: (state, action) => {
      state.courseName = action.payload
    },
    storeDescriptionagain: (state, action) => {
      state.description = action.payload
    },
    storelearningOutCome: (state, action) => {
      state.learningOutCome = action.payload
    },
    storerequirements: (state, action) => {
      state.requirements = action.payload
    },
    storedifficultyLevel: (state, action) => {
      state.difficultyLevel = action.payload
    },
    storecourseKeyword: (state, action) => {
      state.courseKeyword = action.payload
    },

    reset: () => initialState,
  },
})

export const {
  setOverViewData,
  setChapterData,
  setLessonData,
  storeoverViewData,
  storeoverViewVideo,
  storeoverViewPhoto,
  storeName,
  storeCategory,
  storeSubCategory,
  storeTagline,
  storelearningOutCome,
  storerequirements,
  storedifficultyLevel,
  storecourseKeyword,
  storeDescriptionagain,
  reset,
} = overViewDataSlice.actions

export default overViewDataSlice
