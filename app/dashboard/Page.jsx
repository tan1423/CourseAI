import React from 'react';
import { UserButton } from '@clerk/nextjs';
import AddCourse from './_components/AddCourse.jsx'
import UserCourseList from './_components/UserCourseList.jsx'

function Dashboard() {
  return (
    <div>
      <AddCourse/>
      {/* Display List of Course */}
      <UserCourseList/>
    </div>
  );
}

export default Dashboard;
