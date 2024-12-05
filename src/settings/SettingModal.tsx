import { useState } from "react";
import { usePomodoro } from "../contexts/PomoContext";
import FormComponent from "./FormComponent";
import FontAndColors from "./FontAndColors";

const SettingModal = () => {
  const { dispatch, closeModal, pomodoro, shortBreak, longBreak } =
    usePomodoro();
  const [newPomodoro, setNewPomodoro] = useState<number | string>(pomodoro);
  const [newShortBreak, setNewShortBreak] = useState<number | string>(
    shortBreak,
  );
  const [newLongBreak, setNewLongBreak] = useState<number | string>(longBreak);

  const handleApplyChanges = () => {
    dispatch({ type: "SET_POMODORO", payload: newPomodoro });
    dispatch({ type: "SET_SHORT_BREAK", payload: newShortBreak });
    dispatch({ type: "SET_LONG_BREAK", payload: newLongBreak });
    dispatch({ type: "TOGGLE_MODAL" });
  };

  return (
    <div
      className={`inset-0 ${!closeModal ? "hidden" : "flex"} fixed bottom-0 left-0 right-0 top-0 flex flex-col bg-[#0000007b]`}
    >
      <div
        className={`inset-0 bottom-[2.5rem] ${!closeModal ? "hidden" : "flex"} fixed left-[1.5rem] right-[1.5rem] top-[2.5rem] flex flex-col rounded-[.9rem] bg-white`}
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

        <FontAndColors />
      </div>{" "}
      <div className="flex flex-col items-center justify-center">
        <button
          className="absolute bottom-0 h-[3.3125rem] w-[8.75rem] translate-y-[-1rem] rounded-3xl bg-[#F87070] p-3 font-bold capitalize text-white"
          onClick={handleApplyChanges}
        >
          apply
        </button>
      </div>
    </div>
  );
};

export default SettingModal;
