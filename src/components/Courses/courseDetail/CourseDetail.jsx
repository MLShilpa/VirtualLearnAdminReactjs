import './CourseDetail.css';
import { NavLink, Outlet } from 'react-router-dom';
import LeftCouseDetailList from './leftCourseDetail/LeftCouseDetailList';

const CourseDetail = () => {
  // console.log('my course');
  return (
    <div className="container-courseDetail">
      {/* <Outlet /> */}
      <LeftCouseDetailList />
    </div>
  );
};

export default CourseDetail;
