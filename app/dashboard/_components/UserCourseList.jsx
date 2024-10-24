"use client";
import React, { useContext, useEffect, useState } from "react";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import CourseCard from "./CourseCard";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

function UserCourseList() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true); // Track loading state
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);

  useEffect(() => {
    if (user) {
      getUserCourse();
    }
  }, [user]);

  const getUserCourse = async () => {
    setLoading(true); // Start loading before fetching data
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress));

    setUserCourseList(result);
    setLoading(false); // Stop loading once data is fetched
  };

  return (
    <div className="mt-10">
      <h2 className="font-medium text-xl">My AI Courses</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          // Render loading skeletons while data is being fetched
          [1, 2, 3, 4, 5].map((_, index) => (
            <div
              key={index}
              className="w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[270px]"
            ></div>
          ))
        ) : userCourseList?.length > 0 ? (
          // Render courses once data is available
          userCourseList.map((course, index) => (
            <CourseCard
              course={course}
              key={index}
              refreshData={getUserCourse}
            />
          ))
        ) : (
          // Handle empty course list scenario
          <p>No courses found. Start creating your first course!</p>
        )}
      </div>
    </div>
  );
}

export default UserCourseList;
