import "./MyCourse.css";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNavBarState } from "../../../redux/reducers/MyCourseStateSlice";
// import CourseDetail from "./courseDetail/CourseDetail";

const MyCourse = () => {
  // const [state, setState] = useState(1);
const dispatch = useDispatch();
  const state = useSelector(state => state.myCourseStateSlice.navBarState)
  const screenState = useSelector(state => state.myCourseStateSlice.myCourseScreenState);
  console.log('state:',state);
  return (
    <>
    {/* {screenState === 1 ? <> */}
      <div className="studentList-containermyCourse">
      <div className="myCourse-container">
        <NavLink
          to={"DraftCourses"}
          className={({ isActive })=>
          state === 1 ? "active-myCourse-navLink " : "myCourse-navLink "
          }
          onClick={() => dispatch(setNavBarState(1))}
        >
            <span className={state === 1 ? "myCourse-color":""}>
            Draft&nbsp;Courses
            </span>

        </NavLink>

        <NavLink
          to="PublishedCourses"
          onClick={() => dispatch(setNavBarState(2))}
          className={ ({ isActive })=>
          isActive ? "active-myCourse-navLink myCourse-color" : "myCourse-navLink"
          }
        >
            <span className={state === 2 ? "myCourse-color":""}>
          Published&nbsp;Courses
          </span>
        </NavLink>
        {/* <NavLink to="certificate" className="myCourse-navLink">
          Certificate&nbsp;Template
        </NavLink> */}
      </div>
      <div className="myCourse-body">
        <Outlet />
      </div>
    </div>
    {/* </>:<>
    </>} */}
   
    </>
   
  );
};

export default MyCourse;
