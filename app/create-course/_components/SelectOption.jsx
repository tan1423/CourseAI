import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { UserInputContext } from "@/app/_context/UserInputContext";

function SelectOption() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  return (
    <div className="px-10 md:px-20 lg:px-44">
      <div className="grid grid-cols-2 gap-10">
        <div>
          <label className="text-sm">🎓 Difficulty Level</label>
          <Select onValueChange={(value)=>handleInputChange('level',value)} defaultValue={userCourseInput?.level}>
            <SelectTrigger className="h-14 text-lg">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advance">Advance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">🕛 Course Duration</label>
          <Select onValueChange={(value)=>handleInputChange('Duration',value)} defaultValue={userCourseInput?.Duration}>
            <SelectTrigger className="h-14 text-lg">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1 Hours">1 Hours</SelectItem>
              <SelectItem value="5 Hours">5 Hours</SelectItem>
              <SelectItem value="12 Hours">12 Hours</SelectItem>
              <SelectItem value="1 day">1 day</SelectItem>
              <SelectItem value="10 day">10 day</SelectItem>
              <SelectItem value="20 day">20 day</SelectItem>
              <SelectItem value="1 month">1 month</SelectItem>
              <SelectItem value="2 month">2 month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">▶ Add Video</label>
          <Select onValueChange={(value)=>handleInputChange('displayVideo',value)} defaultValue={userCourseInput?.displayVideo}>
            <SelectTrigger className="h-14 text-lg">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm">📑 No of Chapter</label>
          <Input type="number" className="h-14 text-lg" 
          onChange={(e)=>handleInputChange('noOfChapter',e.target.value)}
          defaultValue={userCourseInput?.noOfChapter}
          />
        </div>
      </div>
    </div>
  );
}

export default SelectOption;
