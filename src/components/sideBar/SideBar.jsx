import "./SideBar.css";
import { NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { Base_Url } from "../../utils/baseUrl";

const SideBar = () => {
  const location = useLocation();
  console.log("djfb ", location.pathname);
  return (
    <div>
      <div className="sideBarContainer">
        <div className="sideBar-imageContainer">
          <img
            src={require("../../assets/VL logo.png")}
            alt=""
            className="sideBarImg"
          />
        </div>

        <div className="sideBar-dashBoard">
          <NavLink to="main" className="sideBar-linkNames">
            <div className="sideBar-DashBoardContainer">
              <div className="sideBar-Item">
                <img
                  src={require("../../assets/icons/dashboard_black_24dp 1.png")}
                  alt=""
                  className="sideBar-navTools"
                />
              </div>
              <div className="sideBar-Text">DashBoard</div>
            </div>
          </NavLink>
          <NavLink to="addCourses" className="sideBar-linkNames">
            <div className="sideBar-DashBoardContainer">
              <div className="sideBar-Item">
                <img
                  src={require("../../assets/icons/add video.png")}
                  alt=""
                  className="sideBar-navTools"
                />
              </div>
              <div className="sideBar-Text">Add Courses</div>
            </div>
          </NavLink>
          <NavLink to="myCourses" className="sideBar-linkNames">
            <div className="sideBar-DashBoardContainer">
              <div className="sideBar-Item">
                <img
                  src={require("../../assets/icons/add video.png")}
                  alt=""
                  className="sideBar-navTools"
                />
              </div>
              <div className="sideBar-Text">My Courses</div>
            </div>
          </NavLink>
          <NavLink to="studentList" className="sideBar-linkNames">
            <div className="sideBar-DashBoardContainer">
              <div className="sideBar-Item">
                <img
                  src={require("../../assets/icons/list.png")}
                  alt=""
                  className="sideBar-navTools"
                />
              </div>
              <div className="sideBar-Text">Student List</div>
            </div>
          </NavLink>
          <NavLink to="settings" className="sideBar-linkNames">
            <div className="sideBar-DashBoardContainer">
              <div className="sideBar-Item">
                <img
                  src={require("../../assets/icons/settings.png")}
                  alt=""
                  className="sideBar-navTools"
                />
              </div>
              <div className="sideBar-Text">Settings</div>
            </div>
          </NavLink>
          <div className="sideBar-DashBoardContainer">
            <button
              className="sideBar-linkNames btn-links"
              onClick={async () => {
                const logout = await axios(`${Base_Url}/api/v1/admin_logout`, {
                  method: "post",
                  headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                  },
                  data: {},
                });
                // console.log(logout)
                sessionStorage.clear();
                window.location.reload();
              }}
            >
              <img
                src={require("../../assets/logout.png")}
                alt=""
                className="sideBar-navTools"
              />
              <div className="sideBar-Text">Logout</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
