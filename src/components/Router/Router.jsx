import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "../../views/dashBoard/DashBoard";
import Home from "../../views/home/Home";
import SuperAdminDashBoard from "../../views/superAdminDashboard/SuperAdminDashBoard";
import AddCourse from "../addCourse/AddCourse";
import Certificate from "../AddCoursesFolder/certificate/Certificate";
import QandA from "../AddCoursesFolder/QandA/QandA";
import Upload from "../AddCoursesFolder/uploadVideos/Upload";
import AdminPassword from "../adminPassword/AdminPassword";
import Courses from "../Courses/Courses";
import ForgotPassword from "../forgotPassword/ForgotPassword";
import Login from "../login/Login";
import MainBoard from "../mainBoard/MainBoard";
import CourseDetail from "../Courses/courseDetail/CourseDetail";
import LeftCouseDetailList from "../Courses/courseDetail/leftCourseDetail/LeftCouseDetailList";
import DraftCourses from "../Courses/myCourse/myCourseFolder/draftCourses/DraftCourses";
import PublishedCourses from "../Courses/myCourse/myCourseFolder/publishedCourses/PublishedCourses";
import MyCourse from "../Courses/myCourse/MyCourse";
import NewPassword from "../newPassword/NewPassword";
import OtpVerification from "../otpVerification/OtpVerification";
import ChangePassword from "../profileDrawer/changePassword/ChangePassword";
import EditProfile from "../profileDrawer/editProfile/EditProfile";
import Profile from "../profileDrawer/profile/Profile";
import SignUp from "../signUp/SignUp";
import StudentList from "../studentList/StudentList";

import SupermainBoard from "../superAdmin/SupermainBoard/SupermainBoard";
import SuperRequests from "../superAdmin/SuperRequests/SuperRequests";
import ViewAll from "../viewAllHomePage/ViewAll";
import ProtectedRoute from "./protecteRoute";
import DummyFileRight from "../Courses/courseDetail/rightCourseDetail/DummyFileRight";
import AddCategory from "../addCategory/AddCategory";

const Router = () => {
  const authicate = localStorage.getItem("auth");
  // console.log('auth', authicate);
  const showOtp = useSelector((state) => state.showOtp.showOtp);
  const showNewPW = useSelector((state) => state.showNewPW.showNewPW);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            sessionStorage.getItem("login") ? (
              sessionStorage.getItem("login") === "admin" ? (
                <Navigate to="dashBoard" />
              ) : sessionStorage.getItem("login") === "superAdmin" ? (
                <Navigate to="/superAdminDashBoard" />
              ) : (
                <Home />
              )
            ) : (
              <Home />
            )
          }
        >
          <Route path="" element={<Login />} />
          <Route path="signUp" element={<SignUp />} />
          <Route
            path="otp"
            element={
              <ProtectedRoute redirectTo="/" condition={showOtp}>
                <OtpVerification />
              </ProtectedRoute>
            }
          />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route
            path="newPassword"
            element={
              <ProtectedRoute redirectTo="/" condition={showNewPW}>
                <NewPassword />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* SuperAdminDashboard */}
        <Route
          path="/superAdminDashBoard"
          element={
            sessionStorage.getItem("login") === "superAdmin" ? (
              <SuperAdminDashBoard />
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route path="" element={<SupermainBoard />}></Route>
          <Route path="SupermainBoard" element={<SupermainBoard />}></Route>
          <Route path="SuperRequests" element={<SuperRequests />} />
        </Route>

        {/* dashBoard */}
        <Route
          path="/dashBoard"
          element={
            sessionStorage.getItem("login") === "admin" ? (
              <DashBoard />
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route exact path="" element={<MainBoard />}></Route>
          <Route path="main" element={<MainBoard />}></Route>
          <Route path="viewAll" element={<ViewAll />} />
          {/* <Route path="addCourses" element={<AddCourse />}>
            <Route path="" element={<Upload />} />
            <Route path="upload" element={<Upload />} />
            <Route path="QandA" element={<QandA />} />
            <Route path="certificate" element={<Certificate />} />
          </Route> */}
          <Route path="MyCourses" element={<Courses />}>
            <Route path="" element={<MyCourse />}>
              {/* <Route index element={<DraftCourses />} /> */}
              <Route exact path="" element={<DraftCourses />} />
              <Route path="PublishedCourses" element={<PublishedCourses />} />
            </Route>
            <Route path="myCourses" element={<MyCourse />}>
              <Route path="" element={<DraftCourses />} />
              {/* <Route path="DraftCourses" element={<DraftCourses />} /> */}
              <Route path="PublishedCourses" element={<PublishedCourses />} />
            </Route>

            <Route path="CourseDetail" element={<CourseDetail />}>
              <Route
                path="LeftCouseDetailList"
                element={<LeftCouseDetailList />}
              />
              <Route path="RightDetailList" element={<DummyFileRight />} />
            </Route>
          </Route>
          <Route path="addCategory" element={<AddCategory />} />
          {/* <Route path="studentList" element={<StudentList />} /> */}
          <Route path="settings" element={<AdminPassword />} />

          <Route path="profile" element={<Profile />}>
            <Route path="editProfile" element={<EditProfile />} />
            <Route path="changePassword" element={<ChangePassword />} />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            sessionStorage.getItem("login") ? (
              sessionStorage.getItem("login") === "admin" ? (
                <Navigate to="/dashBoard" />
              ) : sessionStorage.getItem("login") === "superAdmin" ? (
                <Navigate to="/superAdminDashBoard" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default Router;
