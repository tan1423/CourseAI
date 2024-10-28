"use client";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import React, { useEffect, useState } from "react";
import CourseCard from "../_components/CourseCard";
import { Button } from "@/components/ui/button";

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);

  const GetAllCourse = async () => {
    try {
      const result = await db.select().from(CourseList).limit(9).offset(pageIndex * 9);
      setCourseList(result);
      setHasMore(result.length === 9); // Check if there are more courses to display
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <div>
      <h2 className="font-bold text-3xl">Explore More Projects</h2>
      <p>Explore more projects built with AI by other users.</p>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {courseList?.map((course, index) => (
          <div key={course.id || index}>
            <CourseCard course={course} displayUser={true} />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-5">
        {pageIndex > 0 && (
          <Button onClick={() => setPageIndex(pageIndex - 1)}>Previous Page</Button>
        )}
        {hasMore && (
          <Button onClick={() => setPageIndex(pageIndex + 1)}>Next Page</Button>
        )}
      </div>
    </div>
  );
}

export default Explore;
