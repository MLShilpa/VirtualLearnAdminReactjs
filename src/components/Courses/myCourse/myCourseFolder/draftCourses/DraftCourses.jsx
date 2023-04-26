import './DraftCourses.css';
import { useDispatch } from 'react-redux';
import { setMyCourseScreenState } from '../../../../../redux/reducers/MyCourseStateSlice';
import { useNavigate } from 'react-router-dom';

const DraftCourses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log('my course');
  return (
    <div >
      DraftCourses
      <p onClick={() => { navigate("/dashBoard/MyCourses/CourseDetail") }}>
        Course Details
      </p>
    </div>
  );
};

export default DraftCourses;
