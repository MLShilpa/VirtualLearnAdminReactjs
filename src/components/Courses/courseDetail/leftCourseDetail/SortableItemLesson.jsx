import React, { useState } from "react";
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
  setEditState
} from "../../../../redux/reducers/addCourseState";
import { useDispatch, useSelector } from "react-redux";
import { deleteWithoutFill } from "../../../../assets/icons/svgIcons";
import { setLessonData } from "../../../../redux/reducers/overViewSlice";
import { getLesson, getCourseChaptersApi } from "../../../autherisation/auth";
import axios from 'axios'
import { Base_Url } from "../../../../utils/baseUrl";
import Modal from "react-modal";
import { setCourseChapterData, setOverViewDataADC } from "../../../../redux/reducers/addCourseState";
import { errorMessage, successfulMessage } from "../../../toastMesaage/ToastMessage";

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


  const getLessonDetailApiCall = async (ele, id) => {
    const response = await getLesson(ele._id);
    if (response) {
      dispatch(setLessonData(response));
    }
  };

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


  const [modalIsOpen, setIsOpen] = useState(false);
  const courseId = useSelector((state) => state.addCourseState.courseId);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  const deleteLesson = async (ele, id) => {
    axios
      .request(
        `${Base_Url}/api/v1/delete_lesson`,
        {
          method: 'delete',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          params: {
            lessonId: `${ele._id}`
          },
        },
      )
      .then((res) => {
        console.log(res.data)
        dispatch(setLessonData(null))
        getChaptersListApiCall();
        successfulMessage("Lesson deleted successfully")

      })
      .catch((err) => {
        console.log(err)
        errorMessage("Lesson deletion failed")
        // alert('Some error occured')
      })
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
                  openModal();

                }}
              >
                {deleteWithoutFill}
              </div>
              <div
                className="leftCourseDetail-edit"
                onClick={(e) => {
                  e.stopPropagation();
                  getLessonDetailApiCall(props.items, props.id2)
                  dispatch(setLessonState(true));
                  dispatch(setChapterState(false));
                  dispatch(setTestState(false));
                  dispatch(setCourseState(false));
                  dispatch(setEditState("edit"));
                  // deleteLesson(props.items, props.id2);
                  // alert("edit arrow presed")
                }}
              >
                <i class="fa-solid fa-pen-to-square fa-lg"></i>
              </div>
            </div>

            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
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
                  Delete Course
                </div>
                <div className="DraftCourses-deleteContent">
                  Are you sure you want to delete the course
                  <strong style={{ textTransform: "capitalize" }}>
                    {" "}
                    {props.items.chapterName}
                  </strong>{" "}
                  from the Draft Courses ?
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
                      deleteLesson(props.items, props.id2);
                      closeModal();
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
  );
};

export default SortableItemLesson;
