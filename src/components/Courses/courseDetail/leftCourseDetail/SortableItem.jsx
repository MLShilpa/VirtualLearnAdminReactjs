import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRed, testImage } from "../../../../assets/icons/svgIcons";
import {
  setAccState,
  setChapterState,
  setCourseChapterData,
  setCourseId,
  setCourseState,
  setLessonState,
  setOverViewDataADC,
  setTestState,
  setEditState,
  setSelectedChapterId,
} from "../../../../redux/reducers/addCourseState";
import { setChapter, testStatus } from "../../../../redux/reducers/testSlice";
import {
  setChapterData,
  setLessonData,
} from "../../../../redux/reducers/overViewSlice";
import { addIconWhite } from "../../../../utils/icons";
import Modal from "react-modal";
import axios from "axios";
import {
  errorMessage,
  successfulMessage,
} from "../../../toastMesaage/ToastMessage";
import Container from "react-bootstrap/Container";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableItemLesson from "./SortableItemLesson";
import {
  getParticularCourses,
  getChapterName,
  getCourseChaptersApi,
} from "../../../autherisation/auth";
import {
  resetTestData,
  storeTests,
} from "../../../../redux/reducers/testSlice";
import { Base_Url } from "../../../../utils/baseUrl";
import { getQuestions } from "../../../autherisation/auth";
import ModalContainer from "../../../modalContainer/ModalContainer";

export const SortableItem = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenTest, setIsOpenTest] = useState(false);

  function openModalTest() {
    setIsOpenTest(true);
  }

  function closeModalTest() {
    setIsOpenTest(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });
  // const [accState,setAccState]= useState(0);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };
  const dispatch = useDispatch();
  const accState = useSelector((state) => state.addCourseState.accState);
  const courseId = useSelector((state) => state.addCourseState.courseId);
  const chapterData = useSelector((state) => state.overViewData.chapterData);
  const courseChapterData = useSelector(
    (state) => state.addCourseState.courseChapterData
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  const [lessons, setLessons] = useState(props.items.lesson);

  // console.log(lessons);
  useEffect(() => {
    setLessons(props.items.lesson);
  }, [props && props.items && props.items.lesson]);
  // }, []);

  function handleDragEndLesson(event) {
    // console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      setLessons((items) => {
        console.log("items", items);
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        console.log("oldIndex: " + oldIndex);
        console.log("newIndex :" + newIndex);
        // console.log(arrayMove(items, activeIndex, overIndex));
        // return arrayMove(items, activeIndex, overIndex);
        console.log(arrayMove(items, oldIndex, newIndex));
        return arrayMove(items, oldIndex, newIndex);

        // items: [2, 3, 1]   0  -> 2
        // [1, 2, 3] oldIndex: 0 newIndex: 2  -> [2, 3, 1]
      });
    }
  }

  // const getChapterDetailApiCall = async (ele, id) => {
  //   const response = await getParticularCourses(ele._id);
  //   // if (response) {
  //   //   dispatch(setChapterData(response));
  //   // }
  //   const data = {
  //     chapterId: ele._id,
  //     chapterName: ele.chapterName,
  //     chapterNumber: id + 1,
  //   };
  //   dispatch(setChapterData(data));
  // };

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

  const getChapterDetailApiCall = async (ele, id) => {
    const response = await getChapterName(ele._id);
    if (response) {
      dispatch(setChapterData(response));
    }
  };

  const getQuestionDetailApiCall = async (ele) => {
    const response = await getQuestions(ele);
    if (response) {
      dispatch(storeTests(response));
    }
  };

  const deleteChapter = async (ele, id) => {
    axios
      .request(`${Base_Url}/api/v1/delete_chapter`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        params: {
          _id: `${ele._id}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        getChaptersListApiCall();
        dispatch(setChapterData(null));
        dispatch(setChapterState(false));
        dispatch(setCourseState(false));
        dispatch(setLessonState(false));
        dispatch(setTestState(false));
        successfulMessage("Chapter deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        errorMessage("Chapter deletion failed");
        // alert('Some error occured')
      });
  };

  const deleteTest = async (ele) => {
    axios
      .request(`${Base_Url}/api/v1/delete_test`, {
        method: "delete",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        params: {
          chapterId: `${ele}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        getChaptersListApiCall();
        dispatch(setChapterData(null));
        dispatch(setChapterState(false));
        dispatch(setCourseState(false));
        dispatch(setLessonState(false));
        dispatch(setTestState(false));
        successfulMessage("Chapter deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        errorMessage("Chapter deletion failed");
        // alert('Some error occured')
      });
  };

  return (
    <div className="Sortable-container">
      <>
        <button
          className="DragHandle"
          {...attributes}
          {...listeners}
          ref={setNodeRef}
          style={style}
        >
          <svg viewBox="0 0 20 20" width="12" className="drag">
            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z"></path>
          </svg>
        </button>
        <div
          //   ref={setNodeRef}
          style={style}
          {...attributes}
          key={props.id1}
          className="course-accordian"
          onClick={(e) => {
            e.stopPropagation();
            // alert("dropDown arrow presed")
            dispatch(setAccState(props.id1));
          }}
        >
          <div
            className="course-accordian-heading"
            onClick={() => {
              dispatch(setSelectedChapterId(props.items?._id));
              dispatch(setCourseState(false));
              dispatch(setLessonState(false));
              dispatch(setChapterState(false));
              dispatch(setTestState(false));
              // console.log(props.items?._id);
            }}
          >
            <div className="course-accordian-container">
              <span className="course-accordian-container-title">
                Chapter {props.id1 + 1} - {props.items.chapterName}{" "}
              </span>
              {accState === props.id1 ? (
                <>
                  {/* <p className="course-accordian-container-state">
                              ^
                            </p> */}
                </>
              ) : (
                <>
                  <image
                    src={require("../../../../assets/DropdownArrow.png")}
                    className="course-accordian-container-state"
                    alt="image"
                  />
                </>
              )}
            </div>
            <div className="accordian-item-section-2-buttons">
              <div
                className="leftCourseDetail-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  // getChapterDetailApiCall(props.items, props.id1);
                  openModal();
                  // deleteChapter(props.items, props.id1);

                  // alert("delete arrow presed")
                }}
              >
                {deleteRed("deleteSvg")}
              </div>

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
                    Delete Chapter
                  </div>
                  <div className="DraftCourses-deleteContent">
                    Are you sure you want to delete the chapter
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
                        deleteChapter(props.items, props.id1);
                        closeModal();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Modal>

              <div
                className="leftCourseDetail-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(setChapterState(true));
                  dispatch(setTestState(false));
                  dispatch(setLessonState(false));
                  dispatch(setCourseState(false));
                  dispatch(setEditState("edit"));
                  getChapterDetailApiCall(props.items, props.id1);
                  // alert("edit presed")
                }}
              >
                <i class="fa-solid fa-pen-to-square fa-lg"></i>
              </div>
            </div>
          </div>
          <div
            className={
              (accState === props.id1 ? "accordian-show" : "") +
              "course-accordian-content"
            }
          >
            <div className="course-accordian-container-body">
              <div className="accordian-items">
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEndLesson}
                >
                  <Container
                    // className="p-3"
                    style={{ marginRight: "0px", paddingRight: "0px" }}
                    align="center"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    {lessons && lessons.length > 0 && (
                      <SortableContext
                        items={lessons?.map((item) => item._id)}
                        strategy={verticalListSortingStrategy}
                      >
                        {lessons?.map((ele, id) => (
                          <SortableItemLesson
                            key={ele._id}
                            id={ele._id}
                            items={ele}
                            id2={id}
                          />
                        ))}
                      </SortableContext>
                    )}
                  </Container>
                </DndContext>
                {props.items && (
                  <div
                    className="leftCourseDetail-lessons-buttons"
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(setLessonData());
                      dispatch(setLessonState(true));
                      dispatch(setChapterState(false));
                      dispatch(setTestState(false));
                      dispatch(setLessonData(""));
                      dispatch(setEditState("save"));
                      dispatch(setCourseState(false));
                      // dispatch(setSelectedChapterId(courseChapterData[0]?._id));
                      dispatch(setSelectedChapterId(props.items?._id));

                      // alert("edit arrow presed")
                    }}
                  >
                    <div className="leftCourseDetail-addBtn">
                      <div className="myCourse-addBtn-icon">{addIconWhite}</div>
                      Add Lesson
                    </div>
                    {props.items?.testName && props.items?.testName ? null : (
                      <>
                        <div
                          className="leftCourseDetail-addBtn"
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(resetTestData());
                            dispatch(setTestState(true));
                            dispatch(setLessonState(false));
                            dispatch(setChapterState(false));
                            dispatch(setCourseState(false));
                            dispatch(setChapter(props.items?._id));
                            dispatch(testStatus(false));
                            // console.log(props.items?._id);
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
                )}
                {/* {console.log(props?.items)} */}

                {props.items?.testName && props.items?.testName !== "" && (
                  <div className="accordian-item-test">
                    <div
                      className="accordian-item-section-2-test"
                      onClick={() => {}}
                    >
                      <div className="accordian-item-chapter-number">
                        {testImage}
                      </div>

                      <div className="accordian-item-section-2-para-test">
                        {/* <span className="accordian-item-chapter-title">
                            {props.items?.testName}
                          </span> */}

                        <div className="accordian-item-section-2-buttons-test">
                          <span className="accordian-item-chapter-duration">
                            {/* {props.items?.Questions?.totalQuestions}{" "}
                              questions */}
                            {props.items?.testName}
                          </span>

                          <div className="accordian-item-section-2-buttons">
                            <div
                              className="leftCourseDetail-delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                openModalTest();
                                // alert("delete  presed");
                              }}
                            >
                              {deleteRed("deleteSvg")}
                            </div>
                            <div
                              className="leftCourseDetail-edit"
                              onClick={(e) => {
                                e.stopPropagation();
                                dispatch(setTestState(true));
                                dispatch(setLessonState(false));
                                dispatch(setChapterState(false));
                                dispatch(setCourseState(false));
                                getQuestionDetailApiCall(props.items?._id);
                                dispatch(setChapter(props.items?._id));
                                dispatch(testStatus(true));
                                // console.log(props.items?._id);
                                // alert("edit presed");
                              }}
                            >
                              <i class="fa-solid fa-pen-to-square fa-lg"></i>
                            </div>

                            <Modal
                              isOpen={modalIsOpenTest}
                              onRequestClose={closeModalTest}
                              contentLabel="Example Modal"
                              ariaHideApp={false}
                              className="DraftCourses-delete-course-modal"
                              // overlayClassName="Overlay"
                              parentSelector={() =>
                                document.querySelector("#root")
                              }
                            >
                              <div className="DraftCourses-delete-course-modal-content">
                                <div className="DraftCourses-deleteCourse">
                                  Delete Test
                                </div>
                                <div className="DraftCourses-deleteContent">
                                  Are you sure you want to delete the test
                                </div>
                                <div className="DraftCourses-buttons">
                                  <button
                                    onClick={closeModalTest}
                                    className="DraftCourses-cancel"
                                  >
                                    Cancel
                                  </button>

                                  <button
                                    className="DraftCourses-delete"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteTest(props.items?._id);
                                      closeModalTest();
                                    }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </Modal>
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
    </div>
  );
};
