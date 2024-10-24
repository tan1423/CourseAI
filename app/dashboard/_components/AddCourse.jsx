"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import React, { useContext } from "react";
import Link from "next/link";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

function AddCourse() {
  const { user } = useUser();
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl">
          Hello, <span className="font-bold">{user?.fullName}</span>
        </h2>
        <p>Create new course with AI, Share with friend and earn from it.</p>
      </div>
      <Link href={userCourseList?.length >= 5 ? '/dashboard/upgrade' : '/create-course'}>
        <Button>+ Create AI Course</Button>
      </Link>
    </div>
  );
}

export default AddCourse;
