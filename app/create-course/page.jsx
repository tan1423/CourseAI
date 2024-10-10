"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import {
  HiMiniSquares2X2,
  HiLightBulb,
  HiClipboardDocumentCheck,
} from "react-icons/hi2";
import { useState } from "react";

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

        {/* Next Previous Button */}

        <div className="flex justify-between mt-10">
          <Button
            disabled={activeindex === 0}
            variant='outline'
            onClick={() => setActiveindex(activeindex - 1)}
          >
            Previous
          </Button>
          {activeindex < 2 && (
            <Button onClick={() => setActiveindex(activeindex + 1)}>
              Next
            </Button>
          )}
          {activeindex == 2 && (
            <Button onClick={() => setActiveindex(activeindex + 1)}>
              Generate Course Layout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
