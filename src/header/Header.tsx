import ActivityOption from "./ActivityOption";

const Header = () => {
  return (
    <div className="mt-5 flex flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-bold text-[#D7E0FF]">
        pomodoro
      </h1>
      <ActivityOption />
    </div>
  );
};

export default Header;
