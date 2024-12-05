import { useState } from "react";
import { usePomodoro } from "../contexts/PomoContext";

const options: string[] = ["pomodoro", "short break", "long break"];

const ActivityOption = () => {
  const { currentSession } = usePomodoro();
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const handleOptionClick = (index: number) => {
    setSelectedOption(index);
  };

  return (
    <div>
      <div className="flex h-[3.9375rem] w-[20.4375rem] items-center justify-between rounded-full bg-[#161932] px-1">
        {options.map((option, i) => (
          <p
            className={`flex h-[3rem] ${selectedOption === i && "bg-[#F87070] text-[#1E213F]"} ${currentSession === "shortBreak" || "longBreak"} w-[6.57506rem] items-center justify-center rounded-3xl text-xs font-bold text-[#D7E0FF]`}
            onClick={() => handleOptionClick(i)}
          >
            <span>{option}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default ActivityOption;
