import "./LeftCouseDetailList.css";
import { NavLink, Outlet } from "react-router-dom";
import {
  deleteWithoutFill,
  inactiveIcon,
  testImage,
  videoPlayActive,
} from "../../../../assets/icons/svgIcons";
import { chapterResponses } from "../../../../utils/Data";
import { useEffect, useState } from "react";
import { green } from "@mui/material/colors";
import { addIcon, addIconWhite } from "../../../../utils/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccState,
  setChapterState,
  setCourseChapterData,
  setCourseState,
  setLessonState,
  setTestState,
} from "../../../../redux/reducers/addCourseState";
import {
  getChaptersLesonsApi,
  getCourseChaptersApi,
  getParticularCourses,
} from "../../../autherisation/auth";
import {
  setChapterData,
  setLessonData,
  setOverViewData,
} from "../../../../redux/reducers/overViewSlice";
import LessonDetails from "../rightCourseDetail/LessonDetails";

const LeftCouseDetailList = () => {
  const accState = useSelector((state) => state.addCourseState.accState);
  const courseId = useSelector((state) => state.addCourseState.courseId);
  // console.log("courseId",courseId)
  useEffect(() => {
    getChaptersListApiCall();
  }, [courseId]);

  const getChaptersListApiCall = async () => {
    const response = await getCourseChaptersApi(courseId);
    if (response) {
      dispatch(setCourseChapterData(response));
    }
  };
  const getCourseDetailApiCall = async () => {
    const response = await getParticularCourses(courseId);
    if (response) {
      dispatch(setOverViewData(response));
    } else {
      dispatch(setOverViewData());
    }
  };
  const getChapterDetailApiCall = (ele, id) => {
    // const response = await getParticularCourses(chapterId);
    // if (response) {
    //   dispatch(setChapterData(response));
    // }
    const data = {
      chapterId: ele._id,
      chapterName: ele.chapterTitle,
      chapterNumber: id+1,
    };
    dispatch(setChapterData(data))
  };
  const getlessonDetailApiCall = async (lessonId) => {
    // const response = await getChaptersLesonsApi(lessonId);
    // if (response) {
    //   dispatch(setLessonData(response));
    // } else {
    //   dispatch(setLessonData());
    // }
    dispatch(setLessonData());
  };

  const chapterData = useSelector((state) => state.addCourseState.chapterData);
  const [courseIdState, setCourseIdState] = useState(true);
  const dispatch = useDispatch();
  const convertMinute = (time) => {
    var arrTime = time?.split(":");
    var a = arrTime[1];
    var b = arrTime[2];
    var res = a + "." + b;
    return <span>{res} mins</span>;
  };
  console.log("my course");
  return (
    <div className="container-LeftCouseDetailList">
      {courseIdState ? (
        <>
          <div className="courseTitle">
            <div className="courseTitle-name">
              {chapterResponses?.data?.courseName}
            </div>
            <div className="accordian-item-section-2-buttons">
              <div
                className="leftCourseDetail-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  // alert("delete pressed")
                }}
              >
                {deleteWithoutFill}
              </div>
              <div
                className="leftCourseDetail-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setCourseState(true));
                  dispatch(setLessonState(false));
                  dispatch(setChapterState(false));
                  dispatch(setTestState(false));
                  getCourseDetailApiCall();
                  // alert("edit pressed")
                }}
              >
                <i class="fa-solid fa-pen-to-square fa-lg"></i>
              </div>
            </div>
          </div>

          <div className="course-sections">
            {chapterResponses?.data?.chapterResponses.map((ele, id) => {
              return (
                <>
                  <div
                    key={id}
                    className="course-accordian"
                    onClick={(e) => {
                      e.stopPropagation();
                      // alert("dropDown arrow presed")
                      dispatch(setAccState(id));
                    }}
                  >
                    <div className="course-accordian-heading">
                      <div className="course-accordian-container">
                        <span className="course-accordian-container-title">
                          Chapter {id + 1} - {ele.chapterTitle}{" "}
                        </span>
                        {accState === id ? (
                          <>
                            {/* <p className="course-accordian-container-state">
                              ^
                            </p> */}
                          </>
                        ) : (
                          <>
                            <img
                              src={require("../../../../assets/DropdownArrow.png")}
                              className="course-accordian-container-state"
                            />
                          </>
                        )}
                      </div>
                      <div className="accordian-item-section-2-buttons">
                        <div
                          className="leftCourseDetail-delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            // alert("delete arrow presed")
                          }}
                        >
                          {deleteWithoutFill}
                        </div>
                        <div
                          className="leftCourseDetail-edit"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(setChapterState(true));
                            dispatch(setTestState(false));
                            dispatch(setLessonState(false));
                            dispatch(setCourseState(false));
                            getChapterDetailApiCall(ele, id);
                            // alert("edit arrow presed")
                          }}
                        >
                          <i class="fa-solid fa-pen-to-square fa-lg"></i>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        (accState === id ? "accordian-show" : "") +
                        "course-accordian-content"
                      }
                    >
                      <div className="course-accordian-container-body">
                        <div className="accordian-items">
                          {ele.lessonResponses.map((itemele, id2) => {
                            return (
                              <>
                                <div className="accordian-item" key={id2}>
                                  {/* <div className="accordian-item-icon">
                                    {inactiveIcon("green")}
                                  </div> */}
                                  <div className="accordian-item-section-2">
                                    <span className="accordian-item-chapter-number">
                                      {id2 + 1 <= 10 ? `0${id2 + 1}` : id2}
                                    </span>
                                    <div className="accordian-item-section-2-para">
                                      <span className="accordian-item-chapter-title">
                                        {itemele.title}
                                      </span>
                                      <div className="accordian-item-section-2-buttons">
                                        <div
                                          className="leftCourseDetail-delete"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            // alert("delete arrow presed")
                                          }}
                                        >
                                          {deleteWithoutFill}
                                        </div>
                                        <div
                                          className="leftCourseDetail-edit"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            dispatch(setLessonState(true));
                                            dispatch(setChapterState(false));
                                            dispatch(setTestState(false));
                                            dispatch(setCourseState(false));
                                            getlessonDetailApiCall(itemele._id);
                                            // alert("edit arrow presed")
                                          }}
                                        >
                                          <i class="fa-solid fa-pen-to-square fa-lg"></i>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                          <div className="leftCourseDetail-lessons-buttons">
                            <div
                              className="leftCourseDetail-addBtn"
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(setLessonData());
                                dispatch(setLessonState(true));
                                dispatch(setChapterState(false));
                                dispatch(setTestState(false));
                                dispatch(setCourseState(false));
                                // alert("edit arrow presed")
                              }}
                            >
                              <div className="myCourse-addBtn-icon">
                                {addIconWhite}
                              </div>
                              Add Lesson
                            </div>
                            {ele.test ? null : (
                              <>
                                <div
                                  className="leftCourseDetail-addBtn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dispatch(setTestState(true));
                                    dispatch(setLessonState(false));
                                    dispatch(setChapterState(false));
                                    dispatch(setCourseState(false));
                                    // alert("edit arrow presed")
                                  }}
                                >
                                  <div className="myCourse-addBtn-icon">
                                    {addIconWhite}
                                  </div>
                                  Add Test
                                </div>
                              </>
                            )}
                          </div>

                          {ele.test && ele.test.testId && (
                            <div className="accordian-item-test">
                              <div
                                className="accordian-item-section-2-test"
                                onClick={() => {}}
                              >
                                <div className="accordian-item-chapter-number">
                                  {testImage}
                                </div>

                                <div className="accordian-item-section-2-para-test">
                                  <span className="accordian-item-chapter-title">
                                    {ele.test.testTitle} bcju biew biweu iqb bci
                                    bciqa kquwB
                                  </span>

                                  <div className="accordian-item-section-2-buttons-test">
                                    <span className="accordian-item-chapter-duration">
                                      {ele.test.totalQuestions} questions
                                    </span>
                                    <div className="accordian-item-section-2-buttons">
                                      <div
                                        className="leftCourseDetail-delete"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          // alert("delete  presed");
                                        }}
                                      >
                                        {deleteWithoutFill}
                                      </div>
                                      <div
                                        className="leftCourseDetail-edit"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          dispatch(setTestState(true));
                                          dispatch(setLessonState(false));
                                          dispatch(setChapterState(false));
                                          dispatch(setCourseState(false));
                                          // alert("edit presed");
                                        }}
                                      >
                                        <i class="fa-solid fa-pen-to-square fa-lg"></i>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div
            className="leftCourseDetail-addBtn"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setChapterData());
              dispatch(setChapterState(true));
              dispatch(setLessonState(false));
              dispatch(setTestState(false));
              dispatch(setCourseState(false));
              // alert("edit arrow presed")
            }}
          >
            <div className="myCourse-addBtn-icon">{addIconWhite}</div>
            Add Chapter
          </div>
        </>
      ) : (
        <>
          <div className="courseTitleSection-empty">
            <div className="courseTitle-empty">Course Title</div>
            <div
              className="leftCourseDetail-addBtn"
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setCourseState(true));
                dispatch(setLessonState(false));
                dispatch(setChapterState(false));
                dispatch(setTestState(false));
                dispatch(setOverViewData());
                // alert("edit arrow presed")
              }}
            >
              <div className="myCourse-addBtn-icon">{addIconWhite}</div>
              Add Course
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LeftCouseDetailList;
