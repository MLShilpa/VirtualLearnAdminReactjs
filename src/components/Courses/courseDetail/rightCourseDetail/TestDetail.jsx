import React from "react";
import "./TestDetail.css";
import { useState, useEffect } from "react";
import "react-accessible-accordion/dist/fancy-example.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "../../../AddCoursesFolder/toggleSwitch/ToggleSwitch.css";
import { reset } from "../../../../redux/reducers/overViewSlice";
import {
  deleteStatus,
  setPassingGrade,
  setTestDuration,
  storeTests,
  setQuestion,
  setOption,
} from "../../../../redux/reducers/testSlice";
import { Base_Url } from "../../../../utils/baseUrl";
import { getQuestions } from "../../../autherisation/auth";
import {
  errorMessage,
  successfulMessage,
} from "../../../toastMesaage/ToastMessage";
import Modal from "react-modal";
import { prepareDataForValidation } from "formik";
import { getCourseChaptersApi } from "../../../autherisation/auth";
import {
  setCourseChapterData,
  setOverViewDataADC,
} from "../../../../redux/reducers/addCourseState";

const TestDetail = () => {
  const questionData = useSelector((state) => state.test.Questions);
  const chapterId = useSelector((state) => state.test.chapter);
  const courseId = useSelector((state) => state.addCourseState.courseId);

  console.log(questionData);
  const [openModal, setOpenModal] = useState(false);

  function open() {
    setOpenModal(true);
  }

  function close() {
    setOpenModal(false);
  }

  const dispatch = useDispatch();
  const testDuration = useSelector((state) => state.test.testDuration);
  const passingGrade = useSelector((state) => state.test.passingGrade);
  const questionText = useSelector((state) => state.test.questionText);
  const options = useSelector((state) => state.test.options);

  const getChaptersListApiCall = async () => {
    const response = await getCourseChaptersApi(courseId);
    if (response) {
      if (response && response.overview) {
        dispatch(setOverViewDataADC(response.overview));
      }
      if (response && response.courseChapters) {
        dispatch(setCourseChapterData(response.courseChapters));
      }
    }
  };

  const getQuestionsListApiCall = async () => {
    const response = await getQuestions(chapterId);
    if (response) {
      dispatch(storeTests(response));
    }
  };

  const checkValidity = (e) => {
    e.preventDefault();

    const addQuestion = [
      {
        question: questionText,
        options: options,
      },
    ];
    console.log(addQuestion);

    if (questionText === undefined || options === undefined) {
      errorMessage("Enter Complete Details");
    } else {
      const isEmptyOptionPresent = options.some(
        (option) => option.option.trim() === ""
      );
      const isAnyAnswerTrue = options.some((option) => option.isAnswer);
      // console.log(isEmptyOptionPresent);
      // console.log(isAnyAnswerTrue);
      !isEmptyOptionPresent && isAnyAnswerTrue && questionText !== ""
        ? handleAddQuestion()
        : errorMessage("Enter Complete Details");
    }
  };

  const handleAddQuestion = async () => {
    const addQuestion = [
      {
        question: questionText,
        options: options,
      },
    ];

    await axios
      .request({
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        method: "patch",
        url: `${Base_Url}/api/v1/add_questions`,
        data: {
          _id: chapterId,
          Questions: addQuestion,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          getQuestionsListApiCall();
          getChaptersListApiCall();
          // console.log("overview result success", res);
          close();
          successfulMessage("Question added Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        errorMessage("Something went wrong");
        // alert('Some error occured')
      });
  };
  return (
    <div className="main-container">
      <div className="DummyFileRight-date-recentcourse">
        <div className="DummyFileRight-upload-container">
          <form
            action=""
            className="TestDetail-formController"
            onSubmit={(e) => {
              // questionHandler(e);
              e.preventDefault();
            }}
          >
            {/* <div>
              <span>Passing Grade: </span>
              <input
                id="passingGrade"
                type={"number"}
                className=""
                min={20}
                max={100}
                required
                step={5}
                value={passingGrade}
                maxLength={2}
                onChange={(e) => {
                  if (Number(e.target.value) > 100) {
                    dispatch(setPassingGrade(100));
                  } else {
                    dispatch(setPassingGrade("" + Number(e.target.value)));
                  }
                }}
                style={{ width: "100px" }}
              />
              <label htmlFor="passingGrade">Percentage</label>
            </div> */}

            {/* <span>Test Duration: </span>
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
                    dispatch(setTestDuration(100));
                  } else {
                    dispatch(setTestDuration("" + Number(e.target.value)));
                  }
                }}
                style={{ width: "100px" }}
              />
              <label htmlFor="min">Minutes</label> */}

            <div className="upload-videoTitleee">
              <input
                type="text"
                placeholder="Test Title"
                name="TestName"
                className="upload-inputField title"
                onChange={(e) => {}}
              />
            </div>
            <div className="MandatoryTest">
              <input
                type="checkbox"
                // checked={option.isAnswer}
                // onChange={() => handleToggleOption(i)}
              />
              <div className="">Make this test mandatory</div>
            </div>

            <div className="TestDetail-accord-item-container ">
              {questionData &&
                questionData.question &&
                questionData.question.Questions.map((question, index) => (
                  <QuestionComponent
                    key={question._id}
                    question={question}
                    index={index}
                  />
                ))}

              <div className="TestDetail-addNewContainer">
                <button
                  className="TestDetail-addNewBtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(setQuestion());
                    dispatch(setOption());
                    open();
                  }}
                >
                  Add&nbsp;New&nbsp;+
                </button>
              </div>
              <Modal
                isOpen={openModal}
                onRequestClose={close}
                contentLabel="Example Modal"
                ariaHideApp={false}
                className="DraftCourses-delete-padding"
                parentSelector={() => document.querySelector("#root")}
              >
                <QuestionComponent question={""} modal={true} />
                <div className="DraftCourses-delete-course-modal-content">
                  <div className="DraftCourses-buttons">
                    <button onClick={close} className="DraftCourses-cancel">
                      Cancel
                    </button>

                    <button
                      className="TestDetail-Button"
                      onClick={(e) => {
                        checkValidity(e);
                        // close();
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const QuestionComponent = ({ question, index, modal }) => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState(
    question?.options
      ? question?.options
      : Array(4).fill({ option: "", isAnswer: false })
  );
  const [questionText, setQuestionText] = useState(question?.question);
  const [questionId, setQuestionId] = useState(question?._id);
  const chapterId = useSelector((state) => state.test.chapter);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  // const handleOptionChange = (index, value) => {
  //   const updatedOptions = [...options];
  //   updatedOptions[index].option = value;
  //   setOptions(updatedOptions);
  // };

  // const handleToggleOption = (index) => {
  //   const updatedOptions = options.map((option, i) => {
  //     if (i === index) {
  //       return { ...option, isAnswer: !option.isAnswer };
  //     }
  //     return option;
  //   });
  //   setOptions(updatedOptions);
  // };

  const handleOptionChange = (index, value) => {
    const updatedOptions = options.map((option, i) => {
      if (i === index) {
        return { ...option, option: value };
      }
      return option;
    });
    setOptions(updatedOptions);
    dispatch(setOption(updatedOptions));
  };

  const handleToggleOption = (index) => {
    const updatedOptions = options.map((option, i) => ({
      ...option,
      isAnswer: i === index,
    }));
    setOptions(updatedOptions);
    dispatch(setOption(updatedOptions));
  };

  const getQuestionsListApiCall = async () => {
    const response = await getQuestions(chapterId);
    if (response) {
      dispatch(storeTests(response));
    }
  };

  const checkValidity = (e) => {
    e.preventDefault();

    if (questionText === undefined || options === undefined) {
      errorMessage("Enter Complete Details");
    } else {
      const isEmptyOptionPresent = options.some(
        (option) => option.option.trim() === ""
      );
      const isAnyAnswerTrue = options.some((option) => option.isAnswer);
      // console.log(isEmptyOptionPresent);
      // console.log(isAnyAnswerTrue);
      !isEmptyOptionPresent && isAnyAnswerTrue && questionText !== ""
        ? handleQuestionEdit()
        : errorMessage("Enter Complete Details");
    }
  };

  const handleQuestionEdit = async () => {
    await axios
      .request({
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        method: "patch",
        url: `${Base_Url}/api/v1/edit_questions`,
        data: {
          question: questionText,
          questionId: questionId,
          options: options,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          getQuestionsListApiCall();
          console.log("overview result success", res);
          successfulMessage("Question edited Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        errorMessage("Something went wrong");
        // alert('Some error occured')
      });
  };

  const handleQuestionDelete = async (e) => {
    e.preventDefault();

    await axios
      .request({
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        method: "delete",
        url: `${Base_Url}/api/v1/delete_questions`,
        data: {
          questionId: questionId,
          chapterId: chapterId,
        },
      })
      .then((res) => {
        if (res?.status === 200) {
          getQuestionsListApiCall();
          console.log("overview result success", res);
          successfulMessage("Question deleted Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        errorMessage("Something went wrong");
        // alert('Some error occured')
      });
  };

  return (
    <div className="TestDetail-accord-item-container">
      <div className="TestDetail-QuestionContainer">
        {!modal ? (
          <div className="TestDetail-QuestionNo">Question&nbsp;{index + 1}</div>
        ) : (
          ""
        )}

        <div className="TestDetail-containItem">
          {" "}
          <div
            className="TestDetail-head"
            style={{ width: !modal ? "80%" : "97%" }}
          >
            <textarea
              value={questionText}
              type="text"
              placeholder="Enter question here"
              autoComplete="off"
              className="TestDetail-inputText"
              required
              onChange={(e) => {
                // handleQuestionTextChange(e);
                setQuestionText(e.target.value);
                dispatch(setQuestion(e.target.value));
              }}
            />
          </div>
          {!modal ? (
            <div className="QandA-delete">
              <button
                className="QandA-EditQuestion"
                id="edit"
                onClick={(e) => {
                  checkValidity(e);
                }}
              >
                Edit
              </button>
              <button
                type="button"
                className="TestDetail-button"
                onClick={() => {
                  // alert("delete");
                  openModal();
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
              </button>

              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                ariaHideApp={false}
                className="DraftCourses-delete-course-modal"
                // overlayClassName="Overlay"
                parentSelector={() => document.querySelector("#root")}
              >
                <div className="DraftCourses-delete-course-modal-content">
                  <div className="DraftCourses-deleteCourse">
                    Delete Question
                  </div>
                  <div className="DraftCourses-deleteContent">
                    Are you sure you want to delete the Question
                  </div>
                  <div className="DraftCourses-buttons">
                    <button
                      onClick={closeModal}
                      className="DraftCourses-cancel"
                    >
                      Cancel
                    </button>

                    <button
                      className="DraftCourses-delete"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleQuestionDelete(e);
                        closeModal();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="optionContainer">
        {options.map((option, i) => (
          <div className="TestDetail-options" key={i}>
            <input
              type="text"
              value={option.option}
              className="TestDetail-question-options"
              placeholder={`Option ${i + 1}`}
              required
              autoComplete="off"
              onChange={(e) => handleOptionChange(i, e.target.value)}
            />

            <label
              className={`toggle-switch ${option.isAnswer ? "active" : ""}`}
            >
              <input
                type="checkbox"
                checked={option.isAnswer}
                onChange={() => handleToggleOption(i)}
              />
              <span className="switch" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestDetail;
