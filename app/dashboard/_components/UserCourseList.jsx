"use client";
import React, { useContext, useEffect, useState } from "react";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import CourseCard from './CourseCard.jsx'
import { UserCourseListContext } from "@/app/_context/UserCourseListContext.jsx";

function UserCourseList() {
  const { user } = useUser();
  const [courseList, setCourseList] = useState([]);
  const {userCourseList, setUserCourseList} = useContext(UserCourseListContext)


  useEffect(() => {
    user && getUserCourse();
  }, [user]);

  const getUserCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
      );
    setCourseList(result);
    setUserCourseList(result)
  };
  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl">My AI Course</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courseList?.map((course, index)=>(
          <CourseCard course={course} key={index} refreshData={getUserCourse}/>
        ))}
      </div>
    </div>
  );
}

export default UserCourseList;
