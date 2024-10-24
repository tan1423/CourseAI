import React from "react";
import {
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlinePlay,
} from "react-icons/hi";

function SkeletonLoader() {
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="flex gap-2 animate-pulse">
            <div className="bg-gray-200 rounded-full h-10 w-10 flex-none" />
            <div className="flex flex-col gap-2">
              <div className="bg-gray-200 h-4 w-24 rounded" />
              <div className="bg-gray-200 h-4 w-16 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CourseDetail({ course, isLoading }) {
  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="flex gap-2">
          <HiOutlineChartBar className="text-primary text-4xl" />
          <div>
            <h2 className="text-xs text-gray-500">Skill Level</h2>
            <h2 className="font-medium text-lg">{course?.level || "N/A"}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlineClock className="text-primary text-4xl" />
          <div>
            <h2 className="text-xs text-gray-500">Duration</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.course?.duration || "N/A"}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlineBookOpen className="text-primary text-4xl" />
          <div>
            <h2 className="text-xs text-gray-500">No Of Chapters</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.course?.noOfChapters || "N/A"}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlinePlay className="text-primary text-4xl" />
          <div>
            <h2 className="text-xs text-gray-500">Video Included?</h2>
            <h2 className="font-medium text-lg">
              {course?.includeVideo ? "Yes" : "No"}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
