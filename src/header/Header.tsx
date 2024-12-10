import ActivityOption from "./ActivityOption";

const Header = () => {
  return (
    <div className="z-20 mt-5 flex flex-col items-center justify-center gap-[3rem]">
      <h1 className="text-center text-2xl font-bold text-[#D7E0FF]">
        pomodoro
      </h1>
      <ActivityOption />
    </div>
  );
};

export default Header;
