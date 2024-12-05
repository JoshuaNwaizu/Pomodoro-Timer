import Header from "./header/Header";
import SettingModal from "./settings/SettingModal";

import Settings from "./settings/Settings";
import TimerComponent from "./timer/TimerComponent";

const App = () => {
  return (
    <div className="relative h-svh overflow-y-hidden">
      <Header />
      <TimerComponent />
      <div className="absolute bottom-[4rem] w-full">
        <Settings />
      </div>
      <SettingModal />
    </div>
  );
};

export default App;
