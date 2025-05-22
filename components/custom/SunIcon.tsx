import { MotionSvg } from "@/types/framer_motion_types";
import { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

interface SunIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  nonBouncing?: boolean;
}

const SunIcon: React.FC<SunIconProps> = ({
  onClick,
  size = 300,
  nonBouncing = false,
}) => {
  return (
    <MotionSvg
      onClick={onClick}
      className={twMerge("sn translate-x-6", !nonBouncing && onClick && "cp")}
      whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
      width={size}
      viewBox="0 0 341 330"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_2001_189)">
        <rect
          x="77.1793"
          y="77.1793"
          width="186.522"
          height="175.641"
          rx="87.6167"
          fill="#FFEF9A"
        />
      </g>
      <g filter="url(#filter1_i_2001_189)">
        <path
          d="M251.266 178.989C251.266 223.628 215.079 259.815 170.44 259.815C125.801 259.815 89.614 223.628 89.614 178.989C89.614 134.35 125.801 98.163 170.44 98.163C215.079 98.163 251.266 134.35 251.266 178.989Z"
          fill="url(#paint0_linear_2001_189)"
        />
      </g>
      <g filter="url(#filter3_i_2001_189)">
        <path
          d="M216.547 220.668C217.108 217.478 217.401 214.197 217.401 210.848C217.401 179.518 191.766 154.119 160.144 154.119C136.636 154.119 116.436 168.156 107.618 188.232C100.474 182.121 91.2047 178.432 81.0747 178.432C58.4873 178.432 40.1767 196.775 40.1767 219.402C40.1767 220.662 40.2335 221.909 40.3446 223.14C29.4805 228.412 21.9998 239.475 21.9998 252.269C21.9998 270.171 36.6483 284.685 54.7182 284.685H209.222C227.292 284.685 241.94 270.171 241.94 252.269C241.94 236.86 231.09 223.963 216.547 220.668Z"
          fill="url(#paint1_linear_2001_189)"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_2001_189"
          x="0"
          y="0"
          width="340.88"
          height="330"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="38.5"
            result="effect1_foregroundBlur_2001_189"
          />
        </filter>
        <filter
          id="filter1_i_2001_189"
          x="89.614"
          y="98.163"
          width="161.652"
          height="166.664"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="9" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.81 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_2001_189"
          />
        </filter>
        <filter
          id="filter3_i_2001_189"
          x="21.9998"
          y="154.119"
          width="219.94"
          height="140.589"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="11" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_2001_189"
          />
        </filter>
        <linearGradient
          id="paint0_linear_2001_189"
          x1="158.163"
          y1="222.983"
          x2="224.665"
          y2="106.348"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF9900" />
          <stop offset="1" stopColor="#FFEE94" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2001_189"
          x1="35.9889"
          y1="273.027"
          x2="257.872"
          y2="107.1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0.58" />
        </linearGradient>
      </defs>
    </MotionSvg>
  );
};

export default SunIcon;
