import Header from "./header/Header";
import SettingModal from "./settings/SettingModal";

import Settings from "./settings/Settings";
import TimerComponent from "./timer/TimerComponent";

const App = () => {
  return (
    <div className="relative flex flex-col items-center gap-10 overflow-y-hidden h-svh">
      <Header />

      <TimerComponent />

      <div className="absolute bottom-[3rem] w-full">
        <Settings />
      </div>
      <SettingModal />
    </div>
  );
};

export default App;
