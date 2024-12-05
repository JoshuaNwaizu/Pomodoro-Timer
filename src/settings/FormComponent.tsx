import React from "react";

interface FormProps {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormComponent: React.FC<FormProps> = ({ name, value, onChange }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold text-[#1E213F]">{name}</span>
      <input
        type="number"
        min="1"
        max="60"
        value={value}
        className="h-[2.5rem] w-[8.75rem] rounded-[0.625rem] bg-[#EFF1FA] px-3 font-bold text-[#1E213F]"
        onChange={onChange}
      />
    </div>
  );
};

export default FormComponent;
