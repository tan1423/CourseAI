import Image from "next/image";
import React from "react";
import { HiOutlineBookOpen } from "react-icons/hi2";
import { HiMiniEllipsisVertical } from "react-icons/hi2";
import DropdownOption from "./DropdownOption.jsx";
import { db } from "@/config/db.jsx";
import { CourseList } from "@/config/schema.jsx";
import { eq } from "drizzle-orm";
import Link from "next/link.js";

function CourseCard({ course, refreshData, displayUser = false }) {
  const handleOnDelete = async () => {
    const resp = await db
      .delete(CourseList)
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList?.id });

    if (resp) {
      refreshData();
    }
  };

  return (
    <div className="shadow-sm rounded-lg border p-2 cursor-pointer mt-3 hover:border-primary">
      <Link href={course?.courseId ? `/course/${course.courseId}` : "#"}>
        <Image
          className="w-full h-[200px] object-cover rounded-lg"
          src={course?.courseBanner || "/placeholder.png"}
          alt="Course Banner"
          width={300}
          height={200}
        />
      </Link>
      <div className="p-2">
        <h2 className="font-medium text-lg flex items-center justify-between">
          {course?.courseOutput?.course?.name || "Untitled Course"}
          {!displayUser && (
            <DropdownOption handleOnDelete={() => handleOnDelete()}>
              <HiMiniEllipsisVertical />
            </DropdownOption>
          )}
        </h2>
        <p className="text-sm text-gray-400 my-1">{course?.category || "No Category"}</p>
        <div className="flex justify-between items-center">
          <h2 className="flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm rounded-sm">
            <HiOutlineBookOpen />
            {course?.courseOutput?.course?.noOfChapters || 0} Chapters
          </h2>
          <h2 className="text-sm bg-purple-50 text-primary p-1 rounded-sm">
            {course?.level || "Unknown Level"}
          </h2>
        </div>
        {displayUser && (
          <div className="flex gap-2 items-center mt-2">
            <Image
              src={course?.userProfileImage || "/placeholder-profile.png"}
              width={35}
              height={30}
              className="rounded-full"
              alt="User Profile"
            />
            <h2 className="text-sm">{course?.userName || "Anonymous User"}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;

