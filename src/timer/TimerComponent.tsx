import { useEffect } from "react";
import { usePomodoro } from "../contexts/PomoContext";

interface CircularProgressBarProps {
  size?: number;
  strokeWidth?: number;
}

const TimerComponent: React.FC<CircularProgressBarProps> = ({
  size = 270,
  strokeWidth = 7,
}) => {
  const {
    dispatch,
    timeLeft,
    isRunning,
    pomodoro,
    completedSessions,
    currentSession,
    getFonts,
    shortBreak,
    longBreak,
    getColor,
  } = usePomodoro();
  const totalTime =
    currentSession === "work"
      ? pomodoro * 60
      : currentSession === "shortbreak"
        ? shortBreak * 60
        : longBreak * 60;

  const percentage = (timeLeft / totalTime) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);

  const handleStartTimer = () => {
    dispatch({ type: "START" });
  };

  const handlePauseTimer = () => {
    dispatch({ type: "PAUSE" });
  };
  const handleSwitchSessions = () => {
    if (currentSession === "work") {
      dispatch({
        type: "SET_SESSION",
        payload: { currentSession: "shortbreak", timeLeft: shortBreak * 60 },
      });
    } else if (currentSession === "shortbreak") {
      if (completedSessions < 2) {
        dispatch({
          type: "SET_SESSION",
          payload: { currentSession: "work", timeLeft: pomodoro * 60 },
        });
      } else {
        dispatch({
          type: "SET_SESSION",
          payload: { currentSession: "longbreak", timeLeft: longBreak * 60 },
        });
        dispatch({ type: "RESET_CYCLES" });
      }
    } else if (currentSession === "longbreak") {
      dispatch({
        type: "SET_SESSION",
        payload: { currentSession: "work", timeLeft: pomodoro * 60 },
      });
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(timeLeft / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer: any;
    if (isRunning) {
      timer = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    }
    if (isRunning && timeLeft === 0) {
      handleSwitchSessions();
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  return (
    <div
      className={`timer-background ${getFonts} relative flex h-[19.75rem] w-[19.75rem] cursor-pointer items-center justify-center rounded-full`}
      onClick={isRunning ? handlePauseTimer : handleStartTimer}
    >
      <svg width={size} height={size} className="rounded-full">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e6e6e634"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={timeLeft === 0 ? circumference : offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 0.5s ease" }}
        />
      </svg>

      <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col items-center justify-center">
        <div className="px-2 text-[5.2rem] font-bold tracking-[-0.3125rem]">
          {formatTime(timeLeft)}
        </div>
        <div className="ml-4 flex items-center justify-center text-center">
          {isRunning ? (
            <button className="text-center font-bold uppercase tracking-[0.7375rem]">
              Pause
            </button>
          ) : (
            <button className="font-bold uppercase tracking-[0.7375rem]">
              start
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimerComponent;
