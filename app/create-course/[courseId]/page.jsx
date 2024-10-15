"use client";
import { CourseList } from "@/config/schema";
import React, { useEffect, useState } from "react";
import { db } from "@/config/db";
import { and, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";

function courseLayout({ params }) {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  useEffect(() => {
    params && GetCourse();
  }, [params, user]);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    setCourse(result[0]);
    console.log(result);
  };
  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      {/* basic Info */}
      <CourseBasicInfo course={course} refreshData={()=>GetCourse()} />
      {/* Course Detail */}
      <CourseDetail course={course} />
      {/* List of Lesson */}
      <ChapterList course={course} refreshData={()=>GetCourse()}/>
    </div>
  );
}

export default courseLayout;
