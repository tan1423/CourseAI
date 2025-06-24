import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { HiOutlinePuzzlePiece } from "react-icons/hi2";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import Link from "next/link";

const CourseBasicInfo = ({ course, refreshData,edit=true }) => {

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-5">
      <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.course?.name}{" "}
            <span>
              {" "}
          {edit &&<EditCourseBasicInfo
                course={course}
                refreshData={() => refreshData(true)}
              />}
            </span>{" "}
          </h2>
          <p className="text-sm text-gray-400 mt-3">
            {course?.courseOutput?.course?.description}
          </p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            {" "}
            <HiOutlinePuzzlePiece /> {course?.category}
          </h2>
         {!edit &&<Link href={'/course/'+course?.courseId+'/start'}>
          <Button className="w-full mt-5 cursor-pointer">Start</Button>
          </Link>}
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;