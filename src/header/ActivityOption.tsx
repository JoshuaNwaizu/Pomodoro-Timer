import { useEffect, useState } from "react";
import { usePomodoro } from "../contexts/PomoContext";

const ActivityOption = () => {
  const {
    currentSession,
    getFonts,
    getColor,
    pomodoro,
    shortBreak,
    longBreak,
    isRunning,
    dispatch,
  } = usePomodoro();
  const [selectedOption, setSelectedOption] = useState<number>(0);
  const bg = `bg-[${getColor}]`;

  const options: { label: string; session: string; time: number }[] = [
    { label: "pomodoro", session: "work", time: pomodoro * 60 },
    { label: "short break", session: "shortbreak", time: shortBreak * 60 },
    { label: "long break", session: "longbreak", time: longBreak * 60 },
  ];

  const handleOptionClick = (index: number) => {
    if (isRunning) {
      alert("pause the current session before switching");
      return;
    }
    setSelectedOption(index);

    const selected = options[index];
    dispatch({
      type: "SET_SESSION",
      payload: { currentSession: selected.session, timeLeft: selected.time },
    });
  };

  useEffect(() => {
    const sessionIndex = options.findIndex(
      (option) => option.session === currentSession.toLowerCase(),
    );
    if (sessionIndex !== -1) {
      setSelectedOption(sessionIndex);
    }
  }, [currentSession]);

  return (
    <div>
      <div className="flex h-[3.9375rem] w-[20.4375rem] items-center justify-between rounded-full bg-[#161932] px-1">
        {options.map((option, i) => (
          <p
            className={`flex h-[3rem] ${selectedOption === i && `text-black ${bg}`} ${currentSession === "shortBreak" || "longBreak"} w-[6.57506rem] ${getFonts} items-center justify-center rounded-3xl text-xs font-bold text-[#D7E0FF]`}
            onClick={() => handleOptionClick(i)}
          >
            <span className="px-1 overflow-hidden">{option.label}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

export default ActivityOption;
