// import React from "react";
// import "./TestDetail.css";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionItemHeading,
//   AccordionItemButton,
//   AccordionItemPanel,
// } from "react-accessible-accordion";
// import { useState, useEffect } from "react";
// import "react-accessible-accordion/dist/fancy-example.css";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ToggleSwitch from "../../../AddCoursesFolder/toggleSwitch/ToggleSwitch";
// import { reset } from "../../../../redux/reducers/overViewSlice";
// import {
//   deleteStatus,
//   optionFour,
//   optionOne,
//   optionThree,
//   optionTwo,
//   setPassingGrade,
//   setQuestionsList,
//   setTestDuration,
//   setToggleAndCorrAnsNull,
//   storeTest,
//   testQuestion,
// } from "../../../../redux/reducers/testSlice";
// import { deleteRed } from "../../../../assets/icons/svgIcons";
// const TestDetail = () => {
//   const [accordian, setAccordian] = useState(false);
//   const [counter, setCounter] = useState(0);
//   const [answer, setAnswer] = useState("");

//   const [passing, setPassing] = useState("75");
//   const [duration, setDuration] = useState("00:07:00");

//   const dispatch = useDispatch();
//   const questionData = useSelector((state) => state.test.Questions);
//   const testId = useSelector((state) => state.test.testId);
//   const testDuration = useSelector((state) => state.test.testDuration);
//   const passingGrade = useSelector((state) => state.test.passingGrade);
//   console.log("questionData", questionData);
//   const addNewHAndler = () => {
//     setCounter(counter + 1);
//     // console.log(counter)
//   };
//   const childToParent = (childdata) => {
//     setAnswer(childdata);
//   };

//   const courseID = useSelector((state) => state.courseId.courseId);
//   const chapterId = useSelector(
//     (state) => state.addCourseState.selectedChapterId
//   );
//   // console.log("course Id new", questionData);

//   // useEffect(() => {
//   //   axios
//   //     .get(
//   //       `{{URL}}/api/v1/chapter_questions?chapterId=${chapterId}`,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//   //         },
//   //       }
//   //     )
//   //     .then((res) => {
//   //       // alert('data')
//   //       // toast.info('Data is being fetched', {
//   //       //   position: 'top-left',
//   //       //   autoClose: 10,
//   //       //   hideProgressBar: true,
//   //       //   closeOnClick: true,
//   //       //   pauseOnHover: true,
//   //       //   draggable: true,
//   //       //   progress: undefined,
//   //       //   theme: 'colored',
//   //       // })
//   //       // console.log('data', res.data.question.Questions)
//   //       // console.log('data', res.data)
//   // if(res.data && res.data.question && res.data.question.Questions && res.data.question.Questions.length>0){
//   // dispatch(setQuestionsList(res.data.question.Questions))
//   // }
//   //       setQandA(res.data);
//   //       setChapterId(res.data[0].chapterId);
//   //     });
//   // }, [chapterId]);
//   // console.log("QandA", QandA);

//   const questionHandler = (e) => {
//     // axios
//     //   .request(
//     //     `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/addTest`,
//     //     {
//     //       headers: {
//     //         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//     //       },
//     //       method: "post",
//     //       data: {
//     //         testDuration: duration,
//     //         passingGrade: passing,
//     //         _id:chapterId,
//     //         Questions: questionData.Questions,
//     //       },
//     //     }
//     //   )
//     //   .then((res) => {
//     //     console.log("overview result success", res);
//     //     // alert(res && res.data && res.data.message && res.data.message)
//     //     toast.success("Test added successfully", {
//     //       position: "top-center",
//     //       autoClose: 5000,
//     //       hideProgressBar: true,
//     //       closeOnClick: true,
//     //       pauseOnHover: true,
//     //       draggable: true,
//     //       progress: undefined,
//     //       theme: "colored",
//     //     });
//     //     dispatch(reset());
//     //   })
//     //   .catch((err) => {
//     //     console.log("over view result error", err);
//     //     alert("Some error occured");
//     //   });
//   };
//   const handleInput = (e) => {
//     // console.log(`onInput fired with value: '${e.currentTarget.value}'`);
//   };
//   const [state, setState] = useState(0);
//   return (
//     <div className="main-container">
//       <div className="DummyFileRight-date-recentcourse">
//         <div className="DummyFileRight-upload-container">
//           <form
//             action=""
//             className="TestDetail-formController"
//             onSubmit={(e) => {
//               questionHandler(e);
//             }}
//           >
//             <div className="">
//               <div className="">
//                 <span>Test Duration: </span>
//                 <input
//                   id="min"
//                   type={"number"}
//                   className=""
//                   placeholder="min"
//                   min={5}
//                   max={100}
//                   required
//                   step={5}
//                   value={testDuration}
//                   maxLength={2}
//                   onChange={(e) => {
//                     if (Number(e.target.value) > 100) {
//                       dispatch(setTestDuration(100));
//                       // setState(100);
//                     } else {
//                       dispatch(setTestDuration("" + Number(e.target.value)));
//                       // setState("" + Number(e.target.value));
//                     }
//                   }}
//                   // onKeyDown={(event) => {
//                   //   event.preventDefault();
//                   // }}
//                   style={{ width: "100px" }}
//                 />
//                 <label htmlFor="min">Minutes</label>
//               </div>

//               <div>
//                 <span>Passing Grade: </span>
//                 <input
//                   id="passingGrade"
//                   type={"number"}
//                   className=""
//                   // defaultValue={70}
//                   min={20}
//                   max={100}
//                   required
//                   step={5}
//                   value={passingGrade}
//                   maxLength={2}
//                   onChange={(e) => {
//                     if (Number(e.target.value) > 100) {
//                       dispatch(setPassingGrade(100));
//                       // setState(100)
//                     } else {
//                       dispatch(setPassingGrade("" + Number(e.target.value)));
//                       // setState("" + Number(e.target.value));
//                     }
//                   }}
//                   // onKeyDown={(event) => {
//                   //   event.preventDefault();
//                   // }}
//                   style={{ width: "100px" }}
//                 />
//                 <label htmlFor="passingGrade">Percentage</label>
//               </div>
//               <div className="TestDetail-accord-item-container ">
//                 {questionData && questionData.length > 0 ? (
//                   <>
//                     {questionData.map((item, index) => {
//                       return (
//                         <div className="TestDetail-accord-item-container ">
//                           <div className="TestDetail-QuestionContainer">
//                             <div className="TestDetail-QuestionNo">
//                               Question&nbsp;{index + 1}
//                             </div>

//                             <div className="TestDetail-containItem">
//                               {" "}
//                               <div className="TestDetail-head">
//                                 <textarea
//                                   onKeyDown={(e) => {
//                                     if (e.keyCode == 13 && !e.shiftKey) {
//                                       // prevent default behavior
//                                       e.preventDefault();
//                                     }
//                                     e.stopPropagation();
//                                   }}
//                                   multiple={true}
//                                   value={item?.question}
//                                   type="text"
//                                   placeholder="Question"
//                                   autoComplete="off"
//                                   className="TestDetail-inputText"
//                                   required
//                                   onChange={(e) => {
//                                     dispatch(
//                                       testQuestion({
//                                         index: index,
//                                         question: e.target.value,
//                                       })
//                                     );
//                                   }}
//                                 />
//                               </div>
//                               <div className="QandA-delete">
//                                     <button
//                                       type="button"
//                                       className="TestDetail-button"
//                                       onClick={() => {
//                                         alert("delete");
//                                         // dispatch(
//                                         // );
//                                       }}
//                                     >
//                                       <svg
//                                         width={37}
//                                         height={37}
//                                         fill="none"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                       >
//                                         <path
//                                           d="M24.296 13.5v15H12.148v-15h12.148zm-2.278-9h-7.593L12.907 6H7.592v3h21.259V6h-5.315l-1.518-1.5zm5.314 6H9.111v18c0 1.65 1.366 3 3.037 3h12.148c1.67 0 3.037-1.35 3.037-3v-18z"
//                                           fill="red"
//                                         />
//                                       </svg>
//                                       {/* {deleteRed("testDetail-deleteSvg")} */}
//                                     </button>
//                                   </div>
//                             </div>
//                           </div>
//                           <div className="TestDetail-question-container">
//                             {" "}
//                             <div className="TestDetail-options">
//                               <input
//                                 id="Option_1"
//                                 type="text"
//                                 className="TestDetail-question-options"
//                                 placeholder="Option 1"
//                                 required
//                                 value={item?.options[0].option}
//                                 autoComplete="off"
//                                 onChange={(e) => {
//                                   dispatch(
//                                     optionOne({
//                                       index: index,
//                                       option_1: e.target.value,
//                                     })
//                                   );
//                                   dispatch(
//                                     setToggleAndCorrAnsNull({ index: index })
//                                   );
//                                 }}
//                               />

//                               <ToggleSwitch
//                                 label="option_1"
//                                 index={index}
//                                 toggleState={item?.options[0].isAnswer}
//                                 value={item?.options[0].option}
//                               />
//                             </div>
//                             <div className="TestDetail-options">
//                               <input
//                                 id="Option_2"
//                                 type="text"
//                                 className="TestDetail-question-options"
//                                 placeholder="Option 2"
//                                 required
//                                 value={item?.options[1].option}
//                                 autoComplete="off"
//                                 onChange={(e) => {
//                                   dispatch(
//                                     optionTwo({
//                                       index: index,
//                                       option_2: e.target.value,
//                                     })
//                                   );
//                                   dispatch(
//                                     setToggleAndCorrAnsNull({ index: index })
//                                   );
//                                 }}
//                               />

//                               <ToggleSwitch
//                                 label="option_2"
//                                 index={index}
//                                 toggleState={item?.options[1].isAnswer}
//                                 value={item?.options[1].option}
//                               />
//                             </div>
//                             <div className="TestDetail-options">
//                               <input
//                                 id="Option_3"
//                                 type="text"
//                                 className="TestDetail-question-options"
//                                 placeholder="Option 3"
//                                 required
//                                 value={item?.options[2].option}
//                                 autoComplete="off"
//                                 onChange={(e) => {
//                                   dispatch(
//                                     optionThree({
//                                       index: index,
//                                       option_3: e.target.value,
//                                     })
//                                   );
//                                   dispatch(
//                                     setToggleAndCorrAnsNull({ index: index })
//                                   );
//                                 }}
//                               />

//                               <ToggleSwitch
//                                 label="option_3"
//                                 index={index}
//                                 toggleState={item?.options[2].isAnswer}
//                                 value={item?.options[2].option}
//                               />
//                             </div>
//                             <div className="TestDetail-options">
//                               <input
//                                 id="Option_4"
//                                 type="text"
//                                 className="TestDetail-question-options"
//                                 placeholder="Option 4"
//                                 required
//                                 value={item?.options[3].option}
//                                 autoComplete="off"
//                                 onChange={(e) => {
//                                   dispatch(
//                                     optionFour({
//                                       index: index,
//                                       option_4: e.target.value,
//                                     })
//                                   );
//                                   dispatch(
//                                     setToggleAndCorrAnsNull({ index: index })
//                                   );
//                                 }}
//                               />

//                               <ToggleSwitch
//                                 label="option_4"
//                                 index={index}
//                                 toggleState={item?.options[3].isAnswer}
//                                 value={item?.options[3].option}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </>
//                 ) : (
//                   <></>
//                 )}
//                 <div className="TestDetail-addNewContainer">
//                   <button
//                     className="TestDetail-addNewBtn"
//                     onClick={() => {
//                       addNewHAndler();
//                       // testName: ''

//                       // testDuration: '00:10:00',
//                       // passingGrade: '75',
//                       dispatch(
//                         storeTest({
//                           question: "",
//                           options: [
//                             {
//                               option: "",
//                               isAnswer: false,
//                             },
//                             {
//                               option: "",
//                               isAnswer: false,
//                             },
//                             {
//                               option: "",
//                               isAnswer: false,
//                             },
//                             {
//                               option: "",
//                               isAnswer: false,
//                             },
//                           ],
//                           answer: "",
//                         })
//                       );
//                     }}
//                   >
//                     Add&nbsp;New&nbsp;+
//                   </button>
//                 </div>
//                 {questionData && questionData.length > 0 && (
//                   <div className="TestDetail-buttonSave">
//                     <button
//                       type="submit"
//                       className="TestDetail-Button"
//                       id="QandASave"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestDetail;


import React from "react";
import "./TestDetail.css";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { useState, useEffect } from "react";
import "react-accessible-accordion/dist/fancy-example.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToggleSwitch from "../../../AddCoursesFolder/toggleSwitch/ToggleSwitch";
import { reset } from "../../../../redux/reducers/overViewSlice";
import {
  deleteStatus,
  optionFour,
  optionOne,
  optionThree,
  optionTwo,
  setPassingGrade,
  setTestDuration,
  setToggleAndCorrAnsNull,
  storeTest,
  testQuestion,
} from "../../../../redux/reducers/testSlice";
const TestDetail = () => {
  const [accordian, setAccordian] = useState(false);
  const [counter, setCounter] = useState(0);
  const [answer, setAnswer] = useState("");

  const [passing, setPassing] = useState("75");
  const [duration, setDuration] = useState("00:07:00");

  const dispatch = useDispatch();
  const questionData = useSelector((state) => state.test.Questions);
  const testId = useSelector((state) => state.test.testId);
  const testDuration = useSelector((state) => state.test.testDuration);
  const passingGrade = useSelector((state) => state.test.passingGrade);
  console.log("questionData", questionData);
  const addNewHAndler = () => {
    setCounter(counter + 1);
    // console.log(counter)
  };
  const childToParent = (childdata) => {
    setAnswer(childdata);
  };

  const courseID = useSelector((state) => state.courseId.courseId);

  // console.log("course Id new", courseID);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/chapterList?courseId=${courseID}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       // alert('data')
  //       // toast.info('Data is being fetched', {
  //       //   position: 'top-left',
  //       //   autoClose: 10,
  //       //   hideProgressBar: true,
  //       //   closeOnClick: true,
  //       //   pauseOnHover: true,
  //       //   draggable: true,
  //       //   progress: undefined,
  //       //   theme: 'colored',
  //       // })
  //       // console.log('data', res.data)
  //       setQandA(res.data);
  //       setChapterId(res.data[0].chapterId);
  //     });
  // }, []);
  // console.log("QandA", QandA);

  const questionHandler = (e) => {
    // axios
    //   .request(
    //     `http://virtuallearnadmin-env.eba-vvpawj4n.ap-south-1.elasticbeanstalk.com/admin/addTest`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //       },
    //       method: "post",
    //       data: {
    //         testDuration: duration,
    //         passingGrade: passing,
    //         chapterId,
    //         testName: chapterName,
    //         Questions: questionData.Questions,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     console.log("overview result success", res);
    //     // alert(res && res.data && res.data.message && res.data.message)
    //     toast.success("Test added successfully", {
    //       position: "top-center",
    //       autoClose: 5000,
    //       hideProgressBar: true,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //     });
    //     dispatch(reset());
    //   })
    //   .catch((err) => {
    //     console.log("over view result error", err);
    //     alert("Some error occured");
    //   });
  };
  const handleInput = (e) => {
    // console.log(`onInput fired with value: '${e.currentTarget.value}'`);
  };
  const [state, setState] = useState(0);
  return (
    <div className="main-container">
      <div className="DummyFileRight-date-recentcourse">
        <div className="DummyFileRight-upload-container">
          <form
            action=""
            className="TestDetail-formController"
            onSubmit={(e) => {
              questionHandler(e);
            }}
          >
            <div className="">
              <div className="">
                <span>Test Duration: </span>
                <input
                  id="min"
                  type={"number"}
                  className=""
                  placeholder="min"
                  min={5}
                  max={100}
                  required
                  step={5}
                  value={testDuration}
                  maxLength={2}
                  onChange={(e) => {
                    if (Number(e.target.value) > 100) {
                      dispatch(setTestDuration(100))
                      // setState(100);
                    } else {
                      dispatch(setTestDuration("" + Number(e.target.value)))
                      // setState("" + Number(e.target.value));
                    }
                  }}
                  // onKeyDown={(event) => {
                  //   event.preventDefault();
                  // }}
                  style={{ width: "100px" }}
                />
                <label htmlFor="min">Minutes</label>
              </div>

              <div>
                <span>Passing Grade: </span>
                <input
                  id="passingGrade"
                  type={"number"}
                  className=""
                  // defaultValue={70}
                  min={20}
                  max={100}
                  required
                  step={5}
                  value={passingGrade}
                  maxLength={2}
                  onChange={(e) => {
                    if (Number(e.target.value) > 100) {
                      dispatch(setPassingGrade(100))
                      // setState(100)
                    } else {
                      dispatch(setPassingGrade("" + Number(e.target.value)))
                      // setState("" + Number(e.target.value));
                    }
                  }}
                  // onKeyDown={(event) => {
                  //   event.preventDefault();
                  // }}
                  style={{ width: "100px" }}
                />
                <label htmlFor="passingGrade">Percentage</label>
              </div>
              <div className="TestDetail-accord-item-container ">
                {questionData && questionData.length > 0 ? (
                  <>
                    {questionData.map((item, index) => {
                      return (
                        <div className="TestDetail-accord-item-container ">
                          <div className="TestDetail-QuestionContainer">
                            <div className="TestDetail-QuestionNo">
                              Question&nbsp;{index + 1}
                            </div>

                            <div className="TestDetail-containItem">
                              {" "}
                              <div className="TestDetail-head">
                                <textarea
                                  onKeyDown={(e) => {
                                    if (e.keyCode == 13 && !e.shiftKey) {
                                      // prevent default behavior
                                      e.preventDefault();
                                    }
                                    e.stopPropagation();
                                  }}
                                  multiple={true}
                                  value={item?.questionName}
                                  type="text"
                                  placeholder="Question"
                                  autoComplete="off"
                                  className="TestDetail-inputText"
                                  required
                                  onChange={(e) => {
                                    dispatch(
                                      testQuestion({
                                        index: index,
                                        question: e.target.value,
                                      })
                                    );
                                  }}
                                />
                              </div>
                              <div className="QandA-delete">
                                    <button
                                      type="button"
                                      className="TestDetail-button"
                                      onClick={() => {
                                        alert("delete");
                                        // dispatch(
                                        // );
                                      }}
                                    >
                                      <svg
                                        width={37}
                                        height={37}
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M24.296 13.5v15H12.148v-15h12.148zm-2.278-9h-7.593L12.907 6H7.592v3h21.259V6h-5.315l-1.518-1.5zm5.314 6H9.111v18c0 1.65 1.366 3 3.037 3h12.148c1.67 0 3.037-1.35 3.037-3v-18z"
                                          fill="red"
                                        />
                                      </svg>
                                      {/* {deleteRed("testDetail-deleteSvg")} */}
                                    </button>
                                  </div>
                            </div>
                          </div>
                          <div className="TestDetail-question-container">
                            {" "}
                            <div className="TestDetail-options">
                              <input
                                type="text"
                                className="TestDetail-question-options"
                                placeholder="Option 1"
                                required
                                value={item?.option_1}
                                autoComplete="off"
                                onChange={(e) => {
                                  dispatch(
                                    optionOne({
                                      index: index,
                                      option_1: e.target.value,
                                    })
                                  );
                                  dispatch(
                                    setToggleAndCorrAnsNull({ index: index })
                                  );
                                }}
                              />

                              <ToggleSwitch
                                label="option_1"
                                index={index}
                                toggleState={item?.option1_State}
                                value={item?.option_1}
                              />
                            </div>
                            <div className="TestDetail-options">
                              <input
                                type="text"
                                className="TestDetail-question-options"
                                placeholder="Option 2"
                                required
                                value={item?.option_2}
                                autoComplete="off"
                                onChange={(e) => {
                                  dispatch(
                                    optionTwo({
                                      index: index,
                                      option_2: e.target.value,
                                    })
                                  );
                                  dispatch(
                                    setToggleAndCorrAnsNull({ index: index })
                                  );
                                }}
                              />

                              <ToggleSwitch
                                label="option_2"
                                index={index}
                                toggleState={item?.option2_State}
                                value={item?.option_2}
                              />
                            </div>
                            <div className="TestDetail-options">
                              <input
                                type="text"
                                className="TestDetail-question-options"
                                placeholder="Option 3"
                                required
                                value={item?.option_3}
                                autoComplete="off"
                                onChange={(e) => {
                                  dispatch(
                                    optionThree({
                                      index: index,
                                      option_3: e.target.value,
                                    })
                                  );
                                  dispatch(
                                    setToggleAndCorrAnsNull({ index: index })
                                  );
                                }}
                              />

                              <ToggleSwitch
                                label="option_3"
                                index={index}
                                toggleState={item?.option3_State}
                                value={item?.option_3}
                              />
                            </div>
                            <div className="TestDetail-options">
                              <input
                                id="Option_4"
                                type="text"
                                className="TestDetail-question-options"
                                placeholder="Option 4"
                                required
                                value={item?.option_4}
                                autoComplete="off"
                                onChange={(e) => {
                                  dispatch(
                                    optionFour({
                                      index: index,
                                      option_4: e.target.value,
                                    })
                                  );
                                  dispatch(
                                    setToggleAndCorrAnsNull({ index: index })
                                  );
                                }}
                              />

                              <ToggleSwitch
                                label="option_4"
                                index={index}
                                toggleState={item?.option4_State}
                                value={item?.option_4}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <></>
                )}
                <div className="TestDetail-addNewContainer">
                  <button
                    className="TestDetail-addNewBtn"
                    onClick={() => {
                      addNewHAndler();
                      // testName: ''

                      // testDuration: '00:10:00',
                      // passingGrade: '75',
                      dispatch(
                        storeTest({
                          questionName: "",
                          option_1: "",
                          option_2: "",
                          option_3: "",
                          option_4: "",
                          option1_State: false,
                          option2_State: false,
                          option3_State: false,
                          option4_State: false,
                          correctAnswer: "",
                          deleteStatus: false,
                        })
                      );
                    }}
                  >
                    Add&nbsp;New&nbsp;+
                  </button>
                </div>
                {questionData && questionData.length > 0 && (
                  <div className="TestDetail-buttonSave">
                    <button
                      type="submit"
                      className="TestDetail-Button"
                      id="QandASave"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TestDetail;