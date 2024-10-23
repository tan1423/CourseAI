import React, { useState, useEffect } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";
import { db } from "@/config/db"; // Make sure db is imported here

function CourseBasicInfo({ course, refreshData }) {
  const [selectedFile, setSelectedFile] = useState(null);

  // Set the initial banner when course loads
  useEffect(() => {
    if (course?.courseBanner) {
      setSelectedFile(course.courseBanner);
    }
  }, [course]);

  // Select file and upload to Firebase storage
  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (file) {
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

  return (
    <div className="p-6 md:p-10 border rounded-xl shadow-sm mt-5 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        {/* Course Info Section */}
        <div className="space-y-4">
          <h2 className="font-bold text-2xl md:text-3xl">
            {course?.courseOutput?.course?.name || "Course Name"}{" "}
            <EditCourseBasicInfo
              course={course}
              refreshData={() => refreshData(true)}
            />
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
          <Button className="w-full md:w-1/2 mt-4 md:mt-6">Start Course</Button>
        </div>

        {/* Course Image Section */}
        <div className="w-full">
          <label htmlFor="upload-image">
            <Image
              src={selectedFile ? selectedFile : "/placeholder.svg"}
              width={300}
              height={300}
              className="w-full rounded-xl h-[250px] md:h-[300px] object-cover shadow-sm cursor-pointer"
              alt="Course Banner"
            />
          </label>
          <input
            type="file"
            id="upload-image"
            className="opacity-0"
            onChange={onFileSelected}
          />
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
