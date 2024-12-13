import { useEffect } from "react";
import { usePomodoro } from "../contexts/PomoContext";
import { FaCheck } from "react-icons/fa6";

interface Fonts {
  name: string;
  font: string;
}
interface Colors {
  name: string;
  color: string;
  bg: string;
}

const fonts: Fonts[] = [
  {
    name: "Aa",
    font: "font-kumbh",
  },
  {
    name: "Aa",
    font: "font-roboto",
  },
  {
    name: "Aa",
    font: "font-space",
  },
];

const colors: Colors[] = [
  {
    name: "red",
    color: "#F87070",
    bg: "bg-[#F87070]",
  },
  {
    name: "blue",
    color: "#70F3F8",
    bg: "bg-[#70F3F8]",
  },
  {
    name: "purple",
    color: "#D881F8",
    bg: "bg-[#D881F8]",
  },
];

const FontAndColors = () => {
  const { dispatch, selectFonts, selectColor } = usePomodoro();

  const saveToLocalStorage = (key: string, value: any): void => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  const handleGetFonts = (num: number, fonts: string): void => {
    dispatch({ type: "GET_FONTS", payload: fonts });
    dispatch({ type: "SET_SELECT_FONTS", payload: num });
    saveToLocalStorage("selectFonts", { num, fonts });
  };

  const handleGetColor = (num: number, color?: string) => {
    dispatch({ type: "SET_SELECT_COLOR", payload: num });
    dispatch({ type: "GET_COLOR", payload: color });
    saveToLocalStorage("selectColor", { num, color });
  };

  useEffect(() => {
    const storedFonts = localStorage.getItem("selectFonts");
    const storedColor = localStorage.getItem("selectColor");

    if (storedFonts) {
      const { num, fonts } = JSON.parse(storedFonts);
      dispatch({ type: "GET_FONTS", payload: fonts });
      dispatch({ type: "SET_SELECT_FONTS", payload: num });
    }

    if (storedColor) {
      const { num, color } = JSON.parse(storedColor);
      dispatch({ type: "SET_SELECT_COLOR", payload: num });
      dispatch({ type: "GET_COLOR", payload: color });
    }
  }, [dispatch]);
  return (
    <section className="flex flex-col gap-5 px-5 lg:px-[2rem]">
      {" "}
      <div className="mt-5 flex flex-col items-center justify-center gap-4 border-t border-t-[#E3E1E1] pt-5 lg:flex-row lg:justify-between">
        <h1 className="text-[.6875rem] font-bold uppercase tracking-[0.26444rem] text-[#161932]">
          font
        </h1>
        <div className="flex gap-3">
          {fonts.map((font, i) => (
            <span
              key={font.font}
              onClick={() => handleGetFonts(i, font.font)}
              className={` ${font.font} ${selectFonts === i ? "cursor-pointer bg-[#161932] font-bold text-white" : "bg-[#EFF1FA] text-[#1E213F]"} flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full text-[.94rem]`}
            >
              {font.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-col items-center justify-center gap-4 border-t border-t-[#E3E1E1] pt-5 lg:flex-row lg:justify-between">
        <h1 className="text-[.6875rem] font-bold uppercase tracking-[0.26444rem] text-[#161932]">
          color
        </h1>
        <div className="flex gap-3">
          {colors.map((color, i) => (
            <div
              key={color.bg}
              onClick={() => handleGetColor(i, color.color)}
              className={`${color.bg} flex h-[2.5rem] w-[2.5rem] cursor-pointer items-center justify-center rounded-full text-[#1E213F]`}
            >
              {selectColor === i ? <FaCheck /> : ""}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FontAndColors;
