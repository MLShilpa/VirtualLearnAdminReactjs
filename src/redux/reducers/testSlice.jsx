import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Questions: [],
  testId:"",
  testDuration:"30",
  passingGrade:"75",
  
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    storeTest: (state, action) => {
      state.Questions = [...state.Questions, action.payload];
      // console.log("state.Questions", state.Questions);
    },
    setQuestionsList: (state, action) => {
      state.Questions = action.payload;
      // console.log("state.Questions", state.Questions);
    },
    setTestId: (state, action) => {
      state.testId =action.payload;
    },
    setTestDuration: (state, action) => {
      state.testDuration =action.payload;
    },
    setPassingGrade: (state, action) => {
      state.passingGrade =action.payload;
    },
    testQuestion: (state, action) => {
      state.Questions[action.payload.index].question =
        action.payload.question;
    },
    optionOne: (state, action) => {
        state.Questions[action.payload.index].options[0].option =
        action.payload.option_1;
    },
    optionTwo: (state, action) => {
        state.Questions[action.payload.index].options[1].option =
        action.payload.option_2;
    },
    optionThree: (state, action) => {
        state.Questions[action.payload.index].options[2].option =
        action.payload.option_3;
    },
    optionFour: (state, action) => {
        state.Questions[action.payload.index].options[3].option =
        action.payload.option_4;

    },
    correctAns: (state, action) => {
        state.Questions[action.payload.index].answer =
        state.Questions[action.payload.index].options[action.payload.optionIndex].option;
    },
    deleteStatus: (state, action) => {
      state.Questions[action.payload.index].deleteStatus =
        action.payload.deleteStatus;
    },
    setOption1State: (state, action) => {
      state.Questions[action.payload.index].options[0].isAnswer = action.payload.optionState;
      state.Questions[action.payload.index].options[1].isAnswer = false;
      state.Questions[action.payload.index].options[2].isAnswer = false;
      state.Questions[action.payload.index].options[3].isAnswer = false;
    },
    setOption2State: (state, action) => {
      state.Questions[action.payload.index].options[0].isAnswer = false;
      state.Questions[action.payload.index].options[1].isAnswer = action.payload.optionState;
      state.Questions[action.payload.index].options[2].isAnswer = false;
      state.Questions[action.payload.index].options[3].isAnswer = false;
    },
    setOption3State: (state, action) => {        
      state.Questions[action.payload.index].options[0].isAnswer = false;
      state.Questions[action.payload.index].options[1].isAnswer = false;
      state.Questions[action.payload.index].options[2].isAnswer = action.payload.optionState;
      state.Questions[action.payload.index].options[3].isAnswer = false;
    },
    setOption4State: (state, action) => {
      state.Questions[action.payload.index].options[0].isAnswer = false;
      state.Questions[action.payload.index].options[1].isAnswer = false;
      state.Questions[action.payload.index].options[2].isAnswer = false;
      state.Questions[action.payload.index].options[3].isAnswer = action.payload.optionState;
    },
    setToggleAndCorrAnsNull:(state, action) => {
      state.Questions[action.payload.index].options[0].isAnswer = false;
      state.Questions[action.payload.index].options[1].isAnswer = false;
      state.Questions[action.payload.index].options[2].isAnswer = false;
      state.Questions[action.payload.index].options[3].isAnswer = false;
      state.Questions[action.payload.index].answer = "";
    },
    resetTestData: () => initialState,
  },
});

export const {
  storeTest,
  setQuestionsList,
  setPassingGrade,
  setTestDuration,
  setTestId,
  testQuestion,
  optionOne,
  optionTwo,
  optionThree,
  optionFour,
  correctAns,
  deleteStatus,
  setOption1State,
  setOption2State,
  setOption3State,
  setOption4State,
  setToggleAndCorrAnsNull,
  resetTestData
} = testSlice.actions;

export default testSlice;
