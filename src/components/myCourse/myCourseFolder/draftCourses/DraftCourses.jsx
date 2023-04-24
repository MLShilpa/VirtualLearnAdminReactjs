import './DraftCourses.css';
import { NavLink, Outlet } from 'react-router-dom';

const DraftCourses = () => {

  console.log('my course');

  return (

    <NavLink to="DummyRight" className="draftHead">
      DraftCourses
    </NavLink>
  );
};

export default DraftCourses;
