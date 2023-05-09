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
  const [languages, setLanguages] = useState(
    chapterResponses?.data?.chapterResponses
  );
  function handleDragEnd(event) {
    // console.log("Drag end called");
    const { active, over } = event;
    console.log("ACTIVE: " + active.id);
    console.log("OVER :" + over.id);

    if (active.id !== over.id) {
      setLanguages((items) => {
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
  return (
    <div className="container-LeftCouseDetailList">
      {courseId ? (
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={
                // e.stopPropagation()
                handleDragEnd
              }
            >
              <Container
                className="p-3"
                // style={{ width: "50%" }}
                align="center"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <SortableContext
                  items={languages.map((item) => item._id)}
                  strategy={verticalListSortingStrategy}
                >
                  {languages.map((ele, id) => (
                    <SortableItem
                      key={ele._id}
                      id={ele._id}
                      items={ele}
                      id1={id}
                    />
                  ))}
                </SortableContext>
              </Container>
            </DndContext>
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
