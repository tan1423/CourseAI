import React from 'react';
import { HiOutlinePuzzle } from "react-icons/hi";
import Image from 'next/image';
import { Button } from '@/components/ui/button';

function CourseBasicInfo({ course }) {
  return (
    <div className='p-6 md:p-10 border rounded-xl shadow-sm mt-5 bg-white'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center'>
        {/* Course Info Section */}
        <div className='space-y-4'>
          <h2 className='font-bold text-2xl md:text-3xl'>{course?.courseOutput?.course?.name || "Course Name"}</h2>
          <p className='text-sm text-gray-500 mt-2'>{course?.courseOutput?.course?.description || "Course description goes here..."}</p>
          <h2 className='font-medium flex gap-2 items-center text-primary'>
            <HiOutlinePuzzle className='text-xl'/>
            {course?.category || "Category"}
          </h2>

          {/* Start Button */}
          <Button className="w-full md:w-1/2 mt-4 md:mt-6">Start Course</Button>
        </div>

        {/* Course Image Section */}
        <div className='w-full'>
          <Image 
            src={course?.courseOutput?.course?.image || '/placeholder.svg'} 
            width={300} 
            height={300} 
            className='w-full rounded-xl h-[250px] md:h-[300px] object-cover shadow-sm' 
            alt="Course Image" 
          />
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
