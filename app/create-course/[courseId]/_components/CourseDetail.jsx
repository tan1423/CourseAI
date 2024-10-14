import React from "react";
import {
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineBookOpen,
  HiOutlinePlay,
} from "react-icons/hi";

function CourseDetail({ course }) {
  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="flex gap-2">
          <HiOutlineChartBar className="text-primary text-4xl" />
          <div>
            <h2 className="text-xs test-gray-500">Skill Level</h2>
            <h2 className="font-medium text-lg">{course?.level}</h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlineClock className="text-primary text-4xl" />
          <div>
            <h2 className="text-xs test-gray-500">Duration</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.course?.duration}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlineBookOpen className="text-primary text-4xl" />
          <div>
            <h2 className="text-xs test-gray-500">No Of Chapter</h2>
            <h2 className="font-medium text-lg">
              {course?.courseOutput?.course?.noOfChapters}
            </h2>
          </div>
        </div>
        <div className="flex gap-2">
          <HiOutlinePlay className="text-primary text-4xl" />
          <div>
            <h2 className="text-xs test-gray-500">Video Included?</h2>
            <h2 className="font-medium text-lg">{course?.includeVideo}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
