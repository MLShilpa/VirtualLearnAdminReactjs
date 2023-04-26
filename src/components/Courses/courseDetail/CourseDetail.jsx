import './CourseDetail.css';
import { NavLink, Outlet } from 'react-router-dom';
import DummyFileRight from './rightCourseDetail/DummyFileRight';

const CourseDetail = () => {
  // console.log('my course');
  return (
    <div className="container-courseDetail">
      {/* <Outlet /> */}
      <DummyFileRight />
    </div>
  );
};

export default CourseDetail;
