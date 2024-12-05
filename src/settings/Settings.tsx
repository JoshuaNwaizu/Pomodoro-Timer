import { usePomodoro } from "../contexts/PomoContext";

const Settings = () => {
  const { dispatch } = usePomodoro();

  return (
    <div
      className="flex w-full items-center justify-center"
      onClick={() => dispatch({ type: "TOGGLE_MODAL" })}
    >
      <img src="/assets/icon-settings.svg" alt="settings" />
    </div>
  );
};

export default Settings;
