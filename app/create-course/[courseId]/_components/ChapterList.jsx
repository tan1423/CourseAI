import React from "react";
import { HiOutlineClock, HiOutlineCheckCircle } from "react-icons/hi";
import EditChapter from './EditChapters.jsx'

function ChapterList({ course, refreshData }) {
  return (
    <div className="mt-5">
      <h2 className="font-medium text-xl">Chapters</h2>
      <div className="mt-3 space-y-2">
        {course?.courseOutput?.course?.chapters.map((chapter, index) => (
          <div key={index} className="border p-4 rounded-lg flex items-center justify-between shadow-sm">
            <div className="flex gap-5 items-start">
              {/* Chapter Number */}
              <h2 className="bg-primary h-10 w-10 flex-none text-white rounded-full flex items-center justify-center font-bold">
                {index + 1}
              </h2>

              {/* Chapter Details */}
              <div>
                <h2 className="font-semibold text-lg">{chapter?.name} <EditChapter index={index} course={course} refreshData={()=>refreshData(true)}/></h2>
                <p className="text-sm text-gray-500">{chapter?.about}</p>
                <p className="flex items-center gap-2 text-primary mt-1">
                  <HiOutlineClock className="text-lg" /> {chapter?.duration}
                </p>
              </div>
            </div>

            {/* Completion Icon */}
            <HiOutlineCheckCircle className="text-3xl text-gray-300 flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterList;
