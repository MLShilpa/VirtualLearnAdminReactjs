import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
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
import {
  setChapterState,
  setCourseState,
  setLessonState,
  setTestState,
} from "../../../../redux/reducers/addCourseState";
import { useDispatch } from "react-redux";
import { deleteWithoutFill } from "../../../../assets/icons/svgIcons";
import { setLessonData } from "../../../../redux/reducers/overViewSlice";
import { getChaptersLesonsApi } from "../../../autherisation/auth";
const SortableItemLesson = (props) => {
  const dispatch = useDispatch();
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

  const getlessonDetailApiCall = async (lessonId) => {
    // const response = await getChaptersLesonsApi(lessonId);
    // if (response) {
    //   dispatch(setLessonData(response));
    // } else {
    //   dispatch(setLessonData());
    // }
    dispatch(setLessonData());
  };
  return (
    <div>
      <div className="accordian-item" key={props.id2}>
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
        <div className="accordian-item-section-2" style={style}>
          <span className="accordian-item-chapter-number">
            {props.id2 + 1 <= 10 ? `0${props.id2 + 1}` : props.id2}
          </span>
          <div className="accordian-item-section-2-para">
            <span className="accordian-item-chapter-title">
              {props.items?.lessonName}
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
                  //   getlessonDetailApiCall(props.items._id);
                  // alert("edit arrow presed")
                }}
              >
                <i class="fa-solid fa-pen-to-square fa-lg"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortableItemLesson;
