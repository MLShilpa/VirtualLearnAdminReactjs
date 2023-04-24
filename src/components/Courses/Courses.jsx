// import './DraftCourses.css';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
// import { setMyCourseScreenState } from '../../../../redux/reducers/MyCourseStateSlice';

const Courses = () => {
  const dispatch = useDispatch();
//   console.log('my course');
  return (
    <div >
      <Outlet />
    </div>
  );
};

export default Courses;
