// import React from 'react'

import { usePomodoro } from "../contexts/PomoContext";
// import { FaCheck } from "react-icons/fa6";

const fonts = [
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

const colors = [
  {
    name: "red",
    color: "bg-[#F87070]",
  },
  {
    name: "blue",
    color: "bg-[#70F3F8]",
  },
  {
    name: "purple",
    color: "bg-[#D881F8]",
  },
];

const FontAndColors = () => {
  const { dispatch, selectFonts, selectColor } = usePomodoro();

  const handleGetFonts = (num: number, fonts: string): void => {
    dispatch({ type: "GET_FONTS", payload: fonts });
    dispatch({ type: "SET_SELECT_FONTS", payload: num });

    console.log(`Font ${num}:  ${fonts}`);
  };

  const handleGetColor = (num: number, color: string) => {
    dispatch({ type: "SET_SELECT_COLOR", payload: num });
    dispatch({ type: "GET_COLOR", payload: color });
  };
  return (
    <section className="flex flex-col gap-5 px-5">
      {" "}
      <div className="mt-5 flex flex-col items-center justify-center gap-4 border-t border-t-[#E3E1E1] pt-5">
        <h1 className="text-[.6875rem] font-bold uppercase tracking-[0.26444rem] text-[#161932]">
          font
        </h1>
        <div className="flex gap-3">
          {fonts.map((font, i) => (
            <span
              onClick={() => handleGetFonts(i, font.font)}
              className={` ${font.font} ${selectFonts === i ? "bg-[#161932] font-bold text-white" : "bg-[#EFF1FA] text-[#1E213F]"} flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-full text-[.94rem]`}
            >
              {font.name}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-col items-center justify-center gap-4 border-t border-t-[#E3E1E1] pt-5">
        <h1 className="text-[.6875rem] font-bold uppercase tracking-[0.26444rem] text-[#161932]">
          color
        </h1>
        <div className="flex gap-3">
          {colors.map((color, i) => (
            <div
              onClick={() => handleGetColor(i, color.color)}
              className={`${color.color} h-[2.5rem] w-[2.5rem] rounded-full`}
            >
              {/* <FaCheck /> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FontAndColors;
