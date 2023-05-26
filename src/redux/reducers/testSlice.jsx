// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   Questions: [],
//   testId:"",
//   testDuration:"30",
//   passingGrade:"75",
  
// };

// export const testSlice = createSlice({
//   name: "test",
//   initialState,
//   reducers: {
//     storeTest: (state, action) => {
//       state.Questions = [...state.Questions, action.payload];
//       // console.log("state.Questions", state.Questions);
//     },
//     setQuestionsList: (state, action) => {
//       state.Questions = action.payload;
//       // console.log("state.Questions", state.Questions);
//     },
//     setTestId: (state, action) => {
//       state.testId =action.payload;
//     },
//     setTestDuration: (state, action) => {
//       state.testDuration =action.payload;
//     },
//     setPassingGrade: (state, action) => {
//       state.passingGrade =action.payload;
//     },
//     testQuestion: (state, action) => {
//       state.Questions[action.payload.index].question =
//         action.payload.question;
//     },
//     optionOne: (state, action) => {
//         state.Questions[action.payload.index].options[0].option =
//         action.payload.option_1;
//     },
//     optionTwo: (state, action) => {
//         state.Questions[action.payload.index].options[1].option =
//         action.payload.option_2;
//     },
//     optionThree: (state, action) => {
//         state.Questions[action.payload.index].options[2].option =
//         action.payload.option_3;
//     },
//     optionFour: (state, action) => {
//         state.Questions[action.payload.index].options[3].option =
//         action.payload.option_4;

//     },
//     correctAns: (state, action) => {
//         state.Questions[action.payload.index].answer =
//         state.Questions[action.payload.index].options[action.payload.optionIndex].option;
//     },
//     deleteStatus: (state, action) => {
//       state.Questions[action.payload.index].deleteStatus =
//         action.payload.deleteStatus;
//     },
//     setOption1State: (state, action) => {
//       state.Questions[action.payload.index].options[0].isAnswer = action.payload.optionState;
//       state.Questions[action.payload.index].options[1].isAnswer = false;
//       state.Questions[action.payload.index].options[2].isAnswer = false;
//       state.Questions[action.payload.index].options[3].isAnswer = false;
//     },
//     setOption2State: (state, action) => {
//       state.Questions[action.payload.index].options[0].isAnswer = false;
//       state.Questions[action.payload.index].options[1].isAnswer = action.payload.optionState;
//       state.Questions[action.payload.index].options[2].isAnswer = false;
//       state.Questions[action.payload.index].options[3].isAnswer = false;
//     },
//     setOption3State: (state, action) => {        
//       state.Questions[action.payload.index].options[0].isAnswer = false;
//       state.Questions[action.payload.index].options[1].isAnswer = false;
//       state.Questions[action.payload.index].options[2].isAnswer = action.payload.optionState;
//       state.Questions[action.payload.index].options[3].isAnswer = false;
//     },
//     setOption4State: (state, action) => {
//       state.Questions[action.payload.index].options[0].isAnswer = false;
//       state.Questions[action.payload.index].options[1].isAnswer = false;
//       state.Questions[action.payload.index].options[2].isAnswer = false;
//       state.Questions[action.payload.index].options[3].isAnswer = action.payload.optionState;
//     },
//     setToggleAndCorrAnsNull:(state, action) => {
//       state.Questions[action.payload.index].options[0].isAnswer = false;
//       state.Questions[action.payload.index].options[1].isAnswer = false;
//       state.Questions[action.payload.index].options[2].isAnswer = false;
//       state.Questions[action.payload.index].options[3].isAnswer = false;
//       state.Questions[action.payload.index].answer = "";
//     },
//     resetTestData: () => initialState,
//   },
// });

// export const {
//   storeTest,
//   setQuestionsList,
//   setPassingGrade,
//   setTestDuration,
//   setTestId,
//   testQuestion,
//   optionOne,
//   optionTwo,
//   optionThree,
//   optionFour,
//   correctAns,
//   deleteStatus,
//   setOption1State,
//   setOption2State,
//   setOption3State,
//   setOption4State,
//   setToggleAndCorrAnsNull,
//   resetTestData
// } = testSlice.actions;

// export default testSlice;

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
      console.log("state.Questions", state.Questions);
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
      state.Questions[action.payload.index].questionName =
        action.payload.question;
    },
    optionOne: (state, action) => {
      state.Questions[action.payload.index].option_1 =
        action.payload.option_1;
    },
    optionTwo: (state, action) => {
      state.Questions[action.payload.index].option_2 =
        action.payload.option_2;
    },
    optionThree: (state, action) => {
      state.Questions[action.payload.index].option_3 =
        action.payload.option_3;
    },
    optionFour: (state, action) => {
      state.Questions[action.payload.index].option_4 =
        action.payload.option_4;
    },
    correctAns: (state, action) => {
      state.Questions[action.payload.index].correctAnswer =
        state.Questions[action.payload.index][action.payload.label];
    },
    deleteStatus: (state, action) => {
      state.Questions[action.payload.index].deleteStatus =
        action.payload.deleteStatus;
    },
    setOption1State: (state, action) => {
      state.Questions[action.payload.index].option1_State = action.payload.optionState;
      state.Questions[action.payload.index].option2_State = false;
      state.Questions[action.payload.index].option3_State = false;
      state.Questions[action.payload.index].option4_State = false;
    },
    setOption2State: (state, action) => {
      state.Questions[action.payload.index].option1_State = false;
      state.Questions[action.payload.index].option2_State = action.payload.optionState;
      state.Questions[action.payload.index].option3_State = false;
      state.Questions[action.payload.index].option4_State = false;
    },
    setOption3State: (state, action) => {
      state.Questions[action.payload.index].option1_State = false;
      state.Questions[action.payload.index].option2_State = false;
      state.Questions[action.payload.index].option3_State = action.payload.optionState;
      state.Questions[action.payload.index].option4_State = false;
    },
    setOption4State: (state, action) => {
      state.Questions[action.payload.index].option1_State = false;
      state.Questions[action.payload.index].option2_State = false;
      state.Questions[action.payload.index].option3_State = false;
      state.Questions[action.payload.index].option4_State = action.payload.optionState;
    },
    setToggleAndCorrAnsNull:(state, action) => {
      state.Questions[action.payload.index].option1_State = false;
      state.Questions[action.payload.index].option2_State = false;
      state.Questions[action.payload.index].option3_State = false;
      state.Questions[action.payload.index].option4_State = false;
      state.Questions[action.payload.index].correctAnswer = "";
      // console.log("done")
    },
    resetTestData: () => initialState,
  },
});

export const {
  storeTest,
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