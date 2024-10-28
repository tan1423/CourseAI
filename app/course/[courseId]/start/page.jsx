"use client";
import { db } from "@/config/db";
import { Chapters, CourseList } from "@/config/schema";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import ChapterListCard from "./_component/ChapterListCard";
import ChapterContent from "./_component/ChapterContent";

function CourseStart({ params }) {
  const [course, setCourse] = useState();
  const [selectedChapter, setSelectedChapter] = useState();
  const [chapterContent, setChapterContent] = useState();

  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(eq(CourseList?.courseId, params?.courseId));
    setCourse(result[0]);
  };

  const GetSelectedChapterContent = async (chapterId) => {
    if (!course?.courseId) return;

    const result = await db
      .select()
      .from(Chapters)
      .where(
        and(
          eq(Chapters.chapterId, chapterId),
          eq(Chapters.courseId, course.courseId)
        )
      );

    if (result.length > 0) {
      console.log("Setting chapter content:", result[0]);
      setChapterContent(result[0]);
    } else {
      console.warn("No content found for this chapter.");
      setChapterContent(null);
    }
  };

  return (
    <div className="flex">
      {/* Chapter List sidebar with hover-scrollbar */}
      <div className="fixed md:w-64 hidden md:flex flex-col h-screen border-r shadow-lg bg-gradient-to-b">
        <h2 className="font-medium text-lg bg-primary p-4 text-white">
          {course?.courseOutput?.course?.name}
        </h2>
        <div className="overflow-y-hidden hover:overflow-y-auto h-full scrollbar-hidden scrollbar-hover">
          {course?.courseOutput?.course?.chapters.map((chapter, index) => (
            <div
              key={index}
              className={`cursor-pointer hover:bg-purple-50 transition duration-200 ease-in ${
                selectedChapter?.name === chapter?.name ? "bg-purple-200" : ""
              }`}
              onClick={() => {
                setSelectedChapter(chapter);
                GetSelectedChapterContent(chapter.chapterId); // Use chapterId instead of index
              }}
            >
              <ChapterListCard chapter={chapter} index={index} />
            </div>
          ))}
        </div>
      </div>
      {/* Content area */}
      <div className="md:ml-64 w-full">
        <ChapterContent chapter={selectedChapter} content={chapterContent} />
      </div>
    </div>
  );
}

export default CourseStart;
