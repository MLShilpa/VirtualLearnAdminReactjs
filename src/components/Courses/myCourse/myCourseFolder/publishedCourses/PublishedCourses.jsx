import './PublishedCourses.css';
import { NavLink, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const PublishedCourses = () => {
  console.log('my course');
  const navigate = useNavigate();

  return (
    <div >PublishedCourses
      <p onClick={() => { navigate("/dashBoard/MyCourses/CourseDetail/RightDetailList") }}>
        Publish Details
      </p>
    </div>
  );
};

export default PublishedCourses;
