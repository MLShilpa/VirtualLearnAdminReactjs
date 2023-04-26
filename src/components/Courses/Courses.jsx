// import './DraftCourses.css';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import "./Courses.css"
// import { setMyCourseScreenState } from '../../../../redux/reducers/MyCourseStateSlice';

const Courses = () => {
  const dispatch = useDispatch();
//   console.log('my course');
  return (
    <div className='Courses-container' >
      <Outlet />
    </div>
  );
};

export default Courses;
