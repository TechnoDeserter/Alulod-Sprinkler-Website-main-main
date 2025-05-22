import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionDiv } from "@/types/framer_motion_types";

interface MyButtonProps {
  onClick?: MouseEventHandler;
  label: string;
  type?: "button" | "submit" | "reset";
  pX?: number;
  pY?: number;
  disabled?: boolean;
  className?: string;
  classNameBtn?: string;
  classNameText?: string;
  outlined?: boolean;
  dashed?: boolean;
}

const MyButton: React.FC<MyButtonProps> = ({
  onClick,
  label,
  type,
  pX = 3,
  pY = 0.6,
  disabled,
  className,
  classNameBtn,
  classNameText,
  outlined = false,
  dashed = false,
}) => {
  return (
    <MotionDiv
      className={twMerge(
        "tc max-w-sm rounded-full bg-button t-gray m-0 shadow-none outline-none select-none tf3",
        outlined && "bg-transparent b b-zinc-600",
        dashed && "b-dashed",
        disabled && "cursor-default o-50",
        className
      )}
      onContextMenu={(e) => e.preventDefault()}
      onClick={onClick}
      whileTap={{ scale: disabled ? 1.0 : 0.9 }}
    >
      <button
        type={type}
        disabled={disabled}
        className={twMerge(
          "m-auto min-wf min-hf rounded-lg",
          classNameBtn,
          disabled ? "cursor-default" : "cp"
        )}
      >
        <p
          className={twMerge(
            "w-max m-auto t-inherit t46",
            // outlined && "t-black",
            classNameText
          )}
          style={{ padding: `${pY}rem ${pX}rem` }}
        >
          {label}
        </p>
      </button>
    </MotionDiv>
  );
};

export default MyButton;
