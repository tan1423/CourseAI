import React, { useState, useEffect } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import { db } from "@/config/db"; // Ensure db is imported
import Link from 'next/link'

function CourseBasicInfo({ course, refreshData, edit = true }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state
  const [uploading, setUploading] = useState(false); // Track image upload

  // Set the initial banner when course loads
  useEffect(() => {
    if (course?.courseBanner) {
      setSelectedFile(course.courseBanner);
    }
    setLoading(false); // Stop loading when course data is available
  }, [course]);

  // Select file and upload to Firebase storage
  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploading(true); // Start uploading state
      const objectUrl = URL.createObjectURL(file);
      setSelectedFile(objectUrl);

      const fileName = Date.now() + ".jpg";
      const storageRef = ref(storage, "ai-course/" + fileName);

      try {
        await uploadBytes(storageRef, file);
        console.log("Upload successful");

        // Fetch download URL after successful upload
        const downloadUrl = await getDownloadURL(storageRef);
        await db
          .update(CourseList)
          .set({
            courseBanner: downloadUrl,
          })
          .where(eq(CourseList.id, course?.id));

        console.log("File available at:", downloadUrl);
        refreshData(); // Trigger data refresh after the update
      } catch (error) {
        console.error("Upload failed", error);
      } finally {
        setUploading(false); // Stop uploading state after completion
      }
    }
  };

  // Revoke the object URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (selectedFile && selectedFile.startsWith("blob:")) {
        URL.revokeObjectURL(selectedFile);
      }
    };
  }, [selectedFile]);

  if (loading) {
    // Show skeleton loader while course data is loading
    return (
      <div className="p-6 md:p-10 border rounded-xl shadow-sm mt-5 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
          <div className="space-y-4">
            {/* Skeleton for title */}
            <div className="h-8 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
            {/* Skeleton for description */}
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
            <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
            {/* Skeleton for category */}
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-1/2"></div>
            {/* Skeleton for button */}
            <div className="h-10 bg-gray-200 rounded-md animate-pulse w-1/2 mt-4 md:mt-6"></div>
          </div>
          {/* Skeleton for image */}
          <div className="w-full h-[250px] md:h-[300px] bg-gray-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 border rounded-xl shadow-sm mt-5 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        {/* Course Info Section */}
        <div className="space-y-4">
          <h2 className="font-bold text-2xl md:text-3xl">
            {course?.courseOutput?.course?.name || "Course Name"}{" "}
            {edit && (
              <EditCourseBasicInfo
                course={course}
                refreshData={() => refreshData(true)}
              />
            )}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {course?.courseOutput?.course?.description ||
              "Course description goes here..."}
          </p>
          <h2 className="font-medium flex gap-2 items-center text-primary">
            <HiOutlinePuzzle className="text-xl" />
            {course?.category || "Category"}
          </h2>

          {/* Start Button */}
          {!edit && <Link href={'/course/'+course?.courseId+'/start'}>
          <Button className="w-full md:w-1/2 mt-4 md:mt-6">
            Start Course
          </Button>
          </Link>}
        </div>

        {/* Course Image Section */}
        <div className="w-full">
          <label htmlFor="upload-image">
            {uploading ? (
              // Show a loader while the image is being uploaded
              <div className="w-full h-[250px] md:h-[300px] bg-gray-200 rounded-xl animate-pulse"></div>
            ) : (
              <Image
                src={selectedFile ? selectedFile : "/placeholder.svg"}
                width={300}
                height={300}
                className="w-full rounded-xl h-[250px] md:h-[300px] object-cover shadow-sm cursor-pointer"
                alt="Course Banner"
              />
            )}
          </label>
          {edit && (
            <input
              type="file"
              id="upload-image"
              className="opacity-0"
              onChange={onFileSelected}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
