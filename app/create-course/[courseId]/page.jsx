"use client";
import { db } from "@/config/db";
import { Chapters, CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import CourseDetail from "./_components/CourseDetail";
import ChapterList from "./_components/ChapterList";
import { useRouter } from "next/navigation";
import LoadingDialog from "../_components/LoadingDialog";

const courseLayout = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCourseValid, setIsCourseValid] = useState(false);
  const router =  useRouter();

  useEffect(() => {
    if (params?.courseId) {
      GetCourse();
    } else {
      setIsCourseValid(false);
    }
    
  }, [params, user]);

  const GetCourse = async () => {
    if (!params?.courseId || !user?.primaryEmailAddress?.emailAddress) {
      console.error("Course ID or User email is missing");
      setIsCourseValid(false);
      return;
    }
    try {
      
      const result = await db
        .select()
        .from(CourseList)
        .where(
          and(
            eq(CourseList.courseId, params?.courseId),
            eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress)
          )
        );
        if (result.length > 0) {
          setCourse(result[0]);
          setIsCourseValid(true);
        } else {
          setIsCourseValid(false);
        }
  
    } catch (error) {
      setIsCourseValid(false);
    } 
    // console.log(result);
    // setCourse(result[0]);
  };

  // const GenerateChapterContent = async () => {
  //   setLoading(true);
  //   const chapters = course?.courseOutput?.course?.chapters;
  //   chapters.forEach(async (chapter, index) => {
  //     const PROMPT = `
  //       Explain the concept in detail on Topic: ${course?.name}, Chapter: ${chapter?.name} in JSON format.
  //       The JSON should follow this structure:
  //       {
  //         "title": "<Chapter Title>",
  //         "explanation": "<Brief explanation of the chapter>",
  //         "chapter_details": [
  //           {
  //             "title": "<Sub-topic title>",
  //             "explanation": "<Detailed explanation>",
  //             "code_example": "<Code example in <precode> format, if applicable>"
  //           }
  //         ]
  //       }`;

  //     console.log(PROMPT);

  //     // if (index < 3) {
  //     try {
  //       let videoId = "";

  //       // Fetch video from YouTube
  //       service.getVideos(course?.name + ":" + chapter?.name).then((resp) => {
  //         console.log("this is resp:- ", resp);
  //         videoId = resp[0]?.id?.videoId;
  //       });

  //       //Generate Content Chapter
  //       const result = await GenerateChapterContent_AI.sendMessage(PROMPT);

  //       // console.log("the result is :-", result?.response?.text());
  //       const content = JSON.parse(result?.response?.text());

  //       // TODO: Save Chapter Content + Video URL
  //       await db.insert(Chapters).values({
  //         chapterId: index,
  //         courseId: course?.courseId,
  //         content: content,
  //         videoId: videoId,
  //       });
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error);
  //     }
  //     await db.update(CourseList).set({
  //       publish: true,
  //     });
  //     router.replace("/create-course/" + course?.courseId + "/finish");
  //     console.log("final");
  //   });
  // };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      <LoadingDialog loading={loading} />

      {/* Basic Info */}
      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />

      {/* Course Detail */}
      <CourseDetail course={course} />

      {/* List of Lessons */}
      <ChapterList course={course} refreshData={() => GetCourse()} />

      {/* <Button onClick={GenerateChapterContent} className="my-10">
        Generate Course Content
      </Button> */}
    </div>
  );
}

export default courseLayout;
