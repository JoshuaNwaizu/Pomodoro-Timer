import { useEffect, useState } from "react";
import { usePomodoro } from "../contexts/PomoContext";
import FormComponent from "./FormComponent";
import FontAndColors from "./FontAndColors";

const SettingModal = () => {
  const {
    dispatch,
    closeModal,
    pomodoro,
    shortBreak,
    longBreak,
    getColor,
    getFonts,
    currentSession,
  } = usePomodoro();
  const [newPomodoro, setNewPomodoro] = useState<number | string>(pomodoro);
  const [newShortBreak, setNewShortBreak] = useState<number | string>(
    shortBreak,
  );
  const [newLongBreak, setNewLongBreak] = useState<number | string>(longBreak);

  const bg = `bg-[${getColor}]`;

  console.log(newPomodoro, newShortBreak, newLongBreak);
  const handleApplyChanges = () => {
    if (newPomodoro !== pomodoro) {
      dispatch({ type: "SET_POMODORO", payload: +newPomodoro });
    }
    if (newShortBreak !== shortBreak) {
      dispatch({ type: "SET_SHORT_BREAK", payload: +newShortBreak });
    }
    if (newLongBreak !== longBreak) {
      dispatch({ type: "SET_LONG_BREAK", payload: +newLongBreak });
    }
    dispatch({ type: "TOGGLE_MODAL" });
    // dispatch({ type: "SET_POMODORO", payload: +newPomodoro });
    // dispatch({ type: "SET_SHORT_BREAK", payload: +newShortBreak });
    // dispatch({ type: "SET_LONG_BREAK", payload: +newLongBreak });
    // dispatch({ type: "TOGGLE_MODAL" });
  };
  useEffect(() => {
    if (currentSession === "work") {
      setNewPomodoro(pomodoro);
    } else if (currentSession === "shortbreak") {
      setNewShortBreak(shortBreak);
    } else if (currentSession === "longbreak") {
      setNewLongBreak(longBreak);
    }
  }, [closeModal, pomodoro, shortBreak, longBreak, currentSession]);

  return (
    <div
      className={`inset-0 ${!closeModal ? "hidden" : "flex"} ${getFonts} fixed bottom-0 left-0 right-0 top-0 z-50 items-center justify-center bg-[#0000007b] lg:justify-center`}
    >
      <div
        className={`inset-0 bottom-[2.5rem] ${!closeModal ? "hidden" : "flex"} fixed left-[1.5rem] right-[1.5rem] top-[2.5rem] flex flex-col rounded-[.9rem] bg-white lg:absolute lg:left-1/2 lg:top-1/2 lg:h-[490px] lg:w-[540px] lg:translate-x-[-50%] lg:translate-y-[-50%]`}
      >
        <div className="flex items-center justify-between px-4">
          <h1 className="py-4 text-xl font-bold text-[#161932]">Settings</h1>
          <span onClick={() => dispatch({ type: "TOGGLE_MODAL" })}>
            <img src="/assets/icon-close.svg" alt="close" />
          </span>
        </div>
        <hr />

        <div className="flex w-full flex-col gap-3 px-4 py-3">
          <h1 className="text-center text-[.7rem] font-bold tracking-[0.26444rem] text-[#161932]">
            {" "}
            TIME (MINUTES)
          </h1>
          <div className="flex w-full flex-col gap-3 px-4 py-3 lg:flex-row">
            <FormComponent
              name="pomodoro"
              value={String(newPomodoro)}
              onChange={(e) => setNewPomodoro(+e.target.value)}
            />
            <FormComponent
              name="short break"
              value={String(newShortBreak)}
              onChange={(e) => setNewShortBreak(+e.target.value)}
            />
            <FormComponent
              name="long break"
              value={String(newLongBreak)}
              onChange={(e) => setNewLongBreak(+e.target.value)}
            />
          </div>
        </div>

        <FontAndColors />
      </div>{" "}
      <div className="flex flex-col items-center justify-center">
        <button
          className={`absolute bottom-0 h-[3.3125rem] w-[8.75rem] translate-y-[-1rem] rounded-3xl ${bg} p-3 font-bold capitalize text-white lg:bottom-[6%]`}
          onClick={handleApplyChanges}
        >
          apply
        </button>
      </div>
    </div>
  );
};

export default SettingModal;
