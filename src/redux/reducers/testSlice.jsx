import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Questions: [],
  testId: "",
  testDuration: "30",
  passingGrade: "75",
  chapter: "",
  questionText: "",
  options: [],
  isTest: false,
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    storeTests: (state, action) => {
      // state.Questions = [...state.Questions, action.payload];
      state.Questions = action.payload;
      // console.log("state.Questions", state.Questions);
    },

    setQuestionsList: (state, action) => {
      state.Questions = action.payload;
      // console.log("state.Questions", state.Questions);
    },

    setTestId: (state, action) => {
      state.testId = action.payload;
    },

    setChapter: (state, action) => {
      state.chapter = action.payload;
      // console.log(state.course);
    },

    setQuestion: (state, action) => {
      state.questionText = action.payload;
      console.log(state.questionText);
    },

    setOption: (state, action) => {
      state.options = action.payload;
      console.log(state.course);
    },

    setTestDuration: (state, action) => {
      state.testDuration = action.payload;
    },

    setPassingGrade: (state, action) => {
      state.passingGrade = action.payload;
    },

    testQuestion: (state, action) => {
      state.Questions[action.payload.index].question = action.payload.question;
    },

    deleteStatus: (state, action) => {
      state.Questions[action.payload.index].deleteStatus =
        action.payload.deleteStatus;
    },

    testStatus: (state, action) => {
      state.isTest = action.payload;
      // console.log(state.isTest);
    },

    resetTestData: () => initialState,
  },
});

export const {
  storeTests,
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
  resetTestData,
  setChapter,
  setOption,
  setQuestion,
  testStatus,
} = testSlice.actions;
export default testSlice;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   Questions: "",
//   testId: "",
//   testDuration: "30",
//   passingGrade: "75",
//   option1_State: false,
//   option2_State: false,
//   option3_State: false,
//   option4_State: false,
// };
// export const testSlice = createSlice({
//   name: "test",
//   initialState,
//   reducers: {
//     storeTests: (state, action) => {
//       // state.Questions = [...state.Questions, action.payload];
//       state.Questions = action.payload;
//       // console.log("state.Questions", state.Questions);
//     },
//     setTestId: (state, action) => {
//       state.testId = action.payload;
//     },
//     setTestDuration: (state, action) => {
//       state.testDuration = action.payload;
//     },
//     setPassingGrade: (state, action) => {
//       state.passingGrade = action.payload;
//     },
//     testQuestion: (state, action) => {
//       state.Questions[action.payload.index].questionName =
//         action.payload.question;
//     },
//     optionOne: (state, action) => {
//       state.Questions[action.payload.index].option_1 = action.payload.option_1;
//     },
//     optionTwo: (state, action) => {
//       state.Questions[action.payload.index].option_2 = action.payload.option_2;
//     },
//     optionThree: (state, action) => {
//       state.Questions[action.payload.index].option_3 = action.payload.option_3;
//     },
//     optionFour: (state, action) => {
//       state.Questions[action.payload.index].option_4 = action.payload.option_4;
//     },
//     correctAns: (state, action) => {
//       state.Questions[action.payload.index].correctAnswer =
//         state.Questions[action.payload.index][action.payload.label];
//     },
//     deleteStatus: (state, action) => {
//       state.Questions[action.payload.index].deleteStatus =
//         action.payload.deleteStatus;
//     },
//     setOption1State: (state, action) => {
//       state.Questions[action.payload.index].option1_State =
//         action.payload.optionState;
//       state.Questions[action.payload.index].option2_State = false;
//       state.Questions[action.payload.index].option3_State = false;
//       state.Questions[action.payload.index].option4_State = false;
//     },
//     setOption2State: (state, action) => {
//       state.Questions[action.payload.index].option1_State = false;
//       state.Questions[action.payload.index].option2_State =
//         action.payload.optionState;
//       state.Questions[action.payload.index].option3_State = false;
//       state.Questions[action.payload.index].option4_State = false;
//     },
//     setOption3State: (state, action) => {
//       state.Questions[action.payload.index].option1_State = false;
//       state.Questions[action.payload.index].option2_State = false;
//       state.Questions[action.payload.index].option3_State =
//         action.payload.optionState;
//       state.Questions[action.payload.index].option4_State = false;
//     },
//     setOption4State: (state, action) => {
//       state.Questions[action.payload.index].option1_State = false;
//       state.Questions[action.payload.index].option2_State = false;
//       state.Questions[action.payload.index].option3_State = false;
//       state.Questions[action.payload.index].option4_State =
//         action.payload.optionState;
//     },
//     setToggleAndCorrAnsNull: (state, action) => {
//       state.Questions[action.payload.index].option1_State = false;
//       state.Questions[action.payload.index].option2_State = false;
//       state.Questions[action.payload.index].option3_State = false;
//       state.Questions[action.payload.index].option4_State = false;
//       state.Questions[action.payload.index].correctAnswer = "";
//       // console.log("done")
//     },
//     resetTestData: () => initialState,
//   },
// });

// export const {
//   storeTests,
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
//   resetTestData,
// } = testSlice.actions;

// export default testSlice;

{
  /* <div className="TestDetail-options">
                              <input
                                type="text"
                                className="TestDetail-question-options"
                                placeholder="Option 1"
                                required
                                value={item?.options[0]?.option}
                                autoComplete="off"
                                onChange={(e) => {
                                  dispatch();
                                  optionOne({
                                    index: { index },
                                    option_1: e.target.value,
                                  });
                                  dispatch();
                                  setToggleAndCorrAnsNull({ index: { index } });
                                }}
                              />

                              <label
                                className={`toggle-switch ${
                                  isChecked === "option1" ? "active" : ""
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    item?.options[0]?.isAnswer === "true"
                                      ? isChecked === "option1"
                                      : ""
                                  }
                                  onChange={() => handleToggle("option1")}
                                />
                                <span className="switch" />
                              </label>
                            </div>
                            <div className="TestDetail-options">
                              <input
                                type="text"
                                className="TestDetail-question-options"
                                placeholder="Option 2"
                                required
                                value={item?.options[1]?.option}
                                autoComplete="off"
                                onChange={(e) => {
                                  dispatch();
                                  optionTwo({
                                    index: { index },
                                    option_2: e.target.value,
                                  });
                                  dispatch();
                                  setToggleAndCorrAnsNull({ index: { index } });
                                }}
                              />

                              <label
                                className={`toggle-switch ${
                                  isChecked === "option2" ? "active" : ""
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked === "option2"}
                                  onChange={() => handleToggle("option2")}
                                />
                                <span className="switch" />
                              </label>
                            </div>
                            <div className="TestDetail-options">
                              <input
                                type="text"
                                className="TestDetail-question-options"
                                placeholder="Option 3"
                                required
                                value={item?.options[2]?.option}
                                autoComplete="off"
                                onChange={(e) => {
                                  dispatch();
                                  optionThree({
                                    index: { index },
                                    option_3: e.target.value,
                                  });
                                  dispatch();
                                  setToggleAndCorrAnsNull({ index: { index } });
                                }}
                              />

                              <label
                                className={`toggle-switch ${
                                  isChecked === "option3" ? "active" : ""
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked === "option3"}
                                  onChange={() => handleToggle("option3")}
                                />
                                <span className="switch" />
                              </label>
                            </div>
                            <div className="TestDetail-options">
                              <input
                                id="Option_4"
                                type="text"
                                className="TestDetail-question-options"
                                placeholder="Option 4"
                                required
                                value={item?.options[3]?.option}
                                autoComplete="off"
                                onChange={(e) => {
                                  dispatch();
                                  optionFour({
                                    index: { index },
                                    option_4: e.target.value,
                                  });
                                  dispatch();
                                  setToggleAndCorrAnsNull({ index: { index } });
                                }}
                              />

                              <label
                                className={`toggle-switch ${
                                  isChecked === "option4" ? "active" : ""
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked === "option4"}
                                  onChange={() => handleToggle("option4")}
                                />
                                <span className="switch" />
                              </label>
                            </div> */
}
{
  /* <div>
                              {options?.map((option, index) => (
                                <div className="TestDetail-options" key={index}>
                                  <input
                                    type="text"
                                    className="TestDetail-question-options"
                                    placeholder="Option 3"
                                    required
                                    value={option.option}
                                    autoComplete="off"
                                    onChange={(e) =>
                                      handleEdit(index, e.target.value)
                                    }
                                  />

                                  <label
                                    className={`toggle-switch ${
                                      option.isAnswer ? "active" : ""
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={option.isAnswer}
                                      onChange={() => handleToggle(index)}
                                    />
                                    <span className="switch" />
                                  </label>
                                </div>
                              ))}
                            </div> */
}
