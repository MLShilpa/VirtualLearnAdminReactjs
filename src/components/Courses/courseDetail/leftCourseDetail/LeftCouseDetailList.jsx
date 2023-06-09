import "./LeftCouseDetailList.css";
import { NavLink, Outlet } from "react-router-dom";
import {
  deleteRed,
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
  setOverViewDataADC,
  setTestState,
  setCourseId,
  setEditState,
} from "../../../../redux/reducers/addCourseState";
import {
  getChaptersLesonsApi,
  getCourseChaptersApi,
  getParticularCourses,
  getCourseOverview,
} from "../../../autherisation/auth";
import {
  setChapterData,
  setLessonData,
  setOverViewData,
} from "../../../../redux/reducers/overViewSlice";
import LessonDetails from "../rightCourseDetail/LessonDetails";
import { resetTestData } from "../../../../redux/reducers/testSlice";
import { SortableItem } from "./SortableItem";
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
import Modal from "react-modal";
import axios from "axios";
import { Base_Url } from "../../../../utils/baseUrl";
import {
  errorMessage,
  successfulMessage,
} from "../../../toastMesaage/ToastMessage";

const LeftCouseDetailList = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const accState = useSelector((state) => state.addCourseState.accState);
  const courseId = useSelector((state) => state.addCourseState.courseId);

  const courseChapterData = useSelector(
    (state) => state.addCourseState.courseChapterData
  );
  const overViewData = useSelector(
    (state) => state.addCourseState.overViewData
  );

  useEffect(() => {
    getChaptersListApiCall();
    console.log("changed");
  }, [courseId]);

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

  const deleteCourse = (data) => {
    // alert(data);
    axios(`${Base_Url}/api/v1/delete_course?_id=${data}`, {
      method: "delete",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        // alert(res)
        dispatch(setChapterState(false));
        dispatch(setCourseState(false));
        dispatch(setLessonState(false));
        dispatch(setTestState(false));
        successfulMessage("Course deleted successfully");
        dispatch(setCourseId(""));
      })
      .catch((err) => {
        // alert(err.response.data)
        // alert('error')
        errorMessage("Course deletion failed");
        console.log(err);
      });
  };

  // const getCourseDetailApiCall = async () => {
  //   const response = await getParticularCourses(courseId);
  //   if (response) {
  //     dispatch(setOverViewData(response));
  //   } else {
  //     dispatch(setOverViewData());
  //   }
  // };

  const getCourseDetailApiCall = async () => {
    const response = await getCourseOverview(courseId);
    if (response) {
      dispatch(setOverViewData(response));
    } else {
      dispatch(setOverViewData());
    }
  };
  const getChapterDetailApiCall = (ele, id) => {
    // const response = await getParticularCourses(ele._id);
    // if (response) {
    //   dispatch(setChapterData(response));
    // }
    const data = {
      chapterId: ele._id,
      chapterName: ele.chapterTitle,
      chapterNumber: id + 1,
    };
    dispatch(setChapterData(data));
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
  // console.log("my course");
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  // const [chapters, setChapters] = useState(
  //   chapterResponses?.data?.chapterResponses
  // );
  const [chapters, setChapters] = useState(courseChapterData);
  useEffect(() => {
    setChapters(courseChapterData);
  }, [courseChapterData]);

  // console.log(chapterData);

  function handleDragEnd(event) {
    // console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      setChapters((items) => {
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

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="container-LeftCouseDetailList">
      {courseId ? (
        <>
          <div className="courseTitle">
            <div className="courseTitle-name">{overViewData?.title}</div>
            <div className="accordian-item-section-2-buttons">
              <div
                className="leftCourseDetail-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                  // alert("delete pressed")
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
                  <div className="DraftCourses-deleteCourse">Delete Course</div>
                  <div className="DraftCourses-deleteContent">
                    Are you sure you want to delete the course
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
                        deleteCourse(courseId);
                        dispatch(setCourseState(false));
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
                  dispatch(setCourseState(true));
                  dispatch(setLessonState(false));
                  dispatch(setChapterState(false));
                  dispatch(setTestState(false));
                  dispatch(setEditState("edit"));
                  getCourseDetailApiCall();
                  // alert("edit pressed")
                }}
              >
                <i class="fa-solid fa-pen-to-square fa-lg"></i>
              </div>
            </div>
          </div>
          {courseChapterData && courseChapterData.length > 0 && (
            <div className="course-sections">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={
                  // e.stopPropagation()
                  handleDragEnd
                }
              >
                <Container
                  // className="p-3"
                  // style={{ width: "50%" }}
                  style={{ marginRight: "0px", paddingRight: "0px" }}
                  // align="center"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  {/* {console.log(chapters)} */}
                  {chapters && chapters.length > 0 && (
                    <SortableContext
                      items={chapters?.map((item) => item._id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {chapters?.map((ele, id) => (
                        <SortableItem
                          key={ele._id}
                          id={ele._id}
                          items={ele}
                          id1={id}
                        />
                      ))}
                    </SortableContext>
                  )}
                </Container>
              </DndContext>
            </div>
          )}

          <div
            className="leftCourseDetail-addBtn"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setChapterState(true));
              dispatch(setLessonState(false));
              dispatch(setTestState(false));
              dispatch(setCourseState(false));
              dispatch(setChapterData(""));
              dispatch(setEditState("save"));
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
                dispatch(setEditState("save"));
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
