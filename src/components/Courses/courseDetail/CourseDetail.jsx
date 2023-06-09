import "./CourseDetail.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import DummyFileRight from "./rightCourseDetail/DummyFileRight";
import LeftCouseDetailList from "./leftCourseDetail/LeftCouseDetailList";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Base_Url } from "../../../utils/baseUrl";
import { reset } from "../../../redux/reducers/overViewSlice";
import TestDetail from "./rightCourseDetail/TestDetail";
import LessonDetails from "./rightCourseDetail/LessonDetails";
import ChapterTitleRight from "./rightCourseDetail/ChapterTitleRight";

const CourseDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const courseState = useSelector((state) => state.addCourseState.courseState);
  const lessonState = useSelector((state) => state.addCourseState.lessonState);
  const testState = useSelector((state) => state.addCourseState.testState);
  const courseId = useSelector((state) => state.addCourseState.courseId);

  const chapterState = useSelector(
    (state) => state.addCourseState.chapterState
  );
  const publishHandler = () => {
    axios(`${Base_Url}/api/v1/publish_web?_id=${courseId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        toast.info(res && res.data && res.data.message, {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "colored",
        });
        // console.log("publish", res);
        dispatch(reset());
        navigate("/dashBoard/MyCourses/PublishedCourses");
      })
      .catch((err) => {
        // alert(err.response.data)
        alert("Some error occured");
      });
  };
  // console.log('my course',props);
  return (
    <div className="studentList-container studentList-container-1">
      <div className="container-courseDetail">
        <div className="courseDetail-header">
          <div className="courseDetail-header-left">
            <NavLink to={-1} className="courseDetail-BackIcon">
              {" "}
              <svg
                width={26}
                height={26}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
                  fill="#000"
                />
              </svg>{" "}
            </NavLink>
            <span className="courseDetail-header-text">Course Details</span>
          </div>
          <div
            className="courseDetail-publish"
            onClick={() => {
              publishHandler();
            }}
          >
            <div className="courseDetail-publishText">Publish to web</div>
            <div className="courseDetail-publishIcon">
              <img
                src={require("../../../assets/icons/Web_upload.png")}
                alt=""
                className="courseDetail-publishImg"
              />
            </div>
          </div>
        </div>
        <div className="courseDetail-Conatiner">
          <div className="courseDetail-Conatiner-Left">
            <LeftCouseDetailList />
          </div>
          {courseState && (
            <div className="courseDetail-Conatiner-Right">
              <DummyFileRight />
            </div>
          )}
          {lessonState && (
            <div className="courseDetail-Conatiner-Right">
              <LessonDetails />
            </div>
          )}
          {chapterState && (
            <div className="courseDetail-Conatiner-Right">
              <ChapterTitleRight />
            </div>
          )}
          {testState && (
            <div className="courseDetail-Conatiner-Right">
              <TestDetail />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
