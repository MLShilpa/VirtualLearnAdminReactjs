import "./MyCourse.css";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

const MyCourse = () => {
  const [state, setState] = useState(1);
  //   console.log('my course');
  return (
    <div className="studentList-containermyCourse">
      <div className="myCourse-container">
        <NavLink
          to={"DraftCourses"}
          
          className={({ isActive })=>
            state === 1 ? "active-myCourse-navLink color" : "myCourse-navLink "
          }
          onClick={() => setState(1)}
        >
            <span className={state === 1 ? "myCourse-color":""}>
            Draft&nbsp;Courses
            </span>

        </NavLink>

        <NavLink
          to="PublishedCourses"
          onClick={() => setState(2)}
          className={ ({ isActive })=>
          isActive ? "active-myCourse-navLink color" : "myCourse-navLink"
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
  );
};

export default MyCourse;
