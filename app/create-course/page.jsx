"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect} from "react";
import {
  HiMiniSquares2X2,
  HiLightBulb,
  HiClipboardDocumentCheck,
} from "react-icons/hi2";
import { useState, useContext } from "react";
import TopicDescription from "./_components/TopicDescription";
import SelectCategory from "./_components/SelectCategory";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "@/app/_context/UserInputContext";
import { GenerateCourseLayout_AI } from "../../config/Aimodel";
import LoadingDialog from "./_components/LoadingDialog"
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { CourseList } from '../../config/schema'
import { db } from '../../config/db'
import { useRouter} from 'next/navigation'

function CreateCourse() {
  const StepperOption = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ];
  const [activeindex, setActiveindex] = useState(0);
  const {user} = useUser()
  const router = useRouter()

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading , setLoading] = useState(false)

  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  // used to check Next Button enable or disable Status

  const checkstatus = () => {
    if (userCourseInput?.length == 0) {
      return true;
    }
    if (
      activeindex == 0 &&
      (userCourseInput?.category == undefined ||
        userCourseInput?.category?.length == 0)
    ) {
      return true;
    }
    if (
      activeindex == 1 &&
      (userCourseInput?.topic?.length == 0 ||
        userCourseInput?.topic == undefined)
    ) {
      return true;
    } else if (
      activeindex == 2 &&
      (userCourseInput?.level == undefined ||
        userCourseInput?.Duration == undefined ||
        userCourseInput?.displayVideo == undefined ||
        userCourseInput?.noOfChapter == undefined)
    ) {
      return true;
    }
    return false;
  };

  const GenerateCourseLayout = async () => {
    setLoading(true)
    const BASIC_PROMPT =
      "Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration: ";
    const USER_INPUT_PROMPT =
      " Category: " +
      userCourseInput?.category +
      ", Topic: " +
      userCourseInput?.topic +
      ", Level:" +
      userCourseInput?.level +
      ", Duration:" +
      userCourseInput?.Duration +
      ", NoOf Chapters:" +
      userCourseInput?.noOfChapter +
      ", in JSON format";
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
    console.log(FINAL_PROMPT);
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
    console.log(result.response?.text())
    console.log(JSON.parse(result.response?.text()))
    setLoading(false)
    saveCourseLayoutIndb(JSON.parse(result.response?.text()))
  };

  const saveCourseLayoutIndb = async(courseLayout) =>{
    var id = uuid4();
    setLoading(true)
    console.log(db);
    const result = await db.insert(CourseList).values({
      courseId: id,
      name: userCourseInput?.topic,
      level: userCourseInput?.level,
      category: userCourseInput?.category,
      courseOutput: courseLayout,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      userProfileImage: user?.imageUrl
    });  

    console.log("Finish")
    setLoading(false)
    router.replace('/create-course/'+id)
  }

  return (
    <div>
      {/* Stepper */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex">
          {StepperOption.map((item, index) => (
            <div className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${
                    activeindex >= index && "bg-purple-500"
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index != StepperOption?.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${
                    activeindex - 1 >= index && "bg-purple-500"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {/* Component */}
        {activeindex == 0 ? (
          <SelectCategory />
        ) : activeindex == 1 ? (
          <TopicDescription />
        ) : (
          <SelectOption />
        )}

        {/* Next Previous Button */}
        <div className="flex justify-between mt-10">
          <Button
            disabled={activeindex === 0}
            variant="outline"
            onClick={() => setActiveindex(activeindex - 1)}
          >
            Previous
          </Button>
          {activeindex < 2 && (
            <Button
              disabled={checkstatus()}
              onClick={() => setActiveindex(activeindex + 1)}
            >
              Next
            </Button>
          )}
          {activeindex == 2 && (
            <Button
              disabled={checkstatus()}
              onClick={() => GenerateCourseLayout()}
            >
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading}/>
    </div>
  );
}

export default CreateCourse;
