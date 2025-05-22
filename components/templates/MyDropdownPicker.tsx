import type { CSSObjectWithLabel } from "react-select";
import Select from "react-select";
import { twMerge } from "tailwind-merge";

import { outfitFont } from "@/styles/fonts";

interface MyDropDownPickerProps {
  value: string | undefined;
  setValue: (value: string | undefined) => void;
  options: { value: string; label: string }[];
  error?: boolean;
  onChange?: () => void;
  placeholder?: string;
  darkMode?: boolean;
  width?: string;
  className?: string;
  label?: string;
  divClassname?: string;
}

const MyDropDownPicker: React.FC<MyDropDownPickerProps> = ({
  value,
  setValue,
  options,
  error,
  onChange,
  placeholder,
  darkMode = false,
  width,
  className,
  label,
  divClassname,
}) => {
  return (
    <div className={twMerge("wf", divClassname)}>
      {label && (
        <p className="-translate-y-1 translate-x-3 o-50 t33">{label}</p>
      )}
      <Select
        value={options.find((option) => option.value === value)}
        options={options}
        isSearchable={false}
        className={twMerge(className, outfitFont)}
        onChange={(newValue: any) => {
          onChange?.();
          setValue(newValue?.value);
        }}
        placeholder={placeholder}
        styles={{
          container: (baseStyles: any, state: any) =>
            ({
              ...baseStyles,
              width,
            } as CSSObjectWithLabel),
          control: (baseStyles: any, state: any) =>
            ({
              ...baseStyles,
              borderColor: error ? "red" : "#6CE841",
              backgroundColor: "transparent",
              cursor: "pointer",
              userSelect: "none",
            } as CSSObjectWithLabel),
          placeholder: (baseStyles: any, state: any) =>
            ({
              ...baseStyles,
              color: darkMode ? "#8D8E8F" : "black",
              fontSize: "1.5rem",
              cursor: "pointer",
              userSelect: "none",
            } as CSSObjectWithLabel),

          singleValue: (baseStyles: any, state: any) =>
            ({
              ...baseStyles,
              color: darkMode ? "#FFF" : "black",
              fontSize: "1.2rem",
              padding: "0.4rem",
              cursor: "pointer",
              userSelect: "none",
            } as CSSObjectWithLabel),
          menuList: (baseStyles: any, state: any) =>
            ({
              ...baseStyles,
              cursor: "pointer",
              userSelect: "none",
              color: darkMode ? "#8D8E8F" : "black",
              backgroundColor: "#2B2F31",
            } as CSSObjectWithLabel),
        }}
      />
    </div>
  );
};

export default MyDropDownPicker;
