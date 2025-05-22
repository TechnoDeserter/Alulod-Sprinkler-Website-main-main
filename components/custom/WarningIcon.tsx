import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface WarningIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const WarningIcon: React.FC<WarningIconProps> = ({
  onClick,
  size = 48,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.5001 8.38L5.26011 36C4.90748 36.6107 4.72257 37.3038 4.72413 38.009C4.72569 38.7142 4.91367 39.4065 5.26901 40.0156C5.62434 40.6248 6.13441 41.1292 6.7475 41.4777C7.3606 41.8261 8.05493 42.0063 8.76011 42H39.2401C39.9453 42.0063 40.6396 41.8261 41.2527 41.4777C41.8658 41.1292 42.3759 40.6248 42.7312 40.0156C43.0866 39.4065 43.2745 38.7142 43.2761 38.009C43.2777 37.3038 43.0927 36.6107 42.7401 36L27.5001 8.38C27.1542 7.75479 26.6471 7.23366 26.0316 6.87077C25.4161 6.50788 24.7146 6.31649 24.0001 6.31649C23.2856 6.31649 22.5841 6.50788 21.9686 6.87077C21.3531 7.23366 20.846 7.75479 20.5001 8.38Z"
        fill="white"
        stroke="#EA0000"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 18V26"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24.0999 34H23.8999"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </MotionSvg>
  );
};

export default WarningIcon;
