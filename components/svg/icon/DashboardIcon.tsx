import type { MouseEventHandler } from "react";
import { twMerge } from "tailwind-merge";

import { MotionSvg } from "@/types/framer_motion_types";

interface DashboardIconProps {
  onClick?: MouseEventHandler<SVGSVGElement>;
  size?: number;
  opacity?: number;
  nonBouncing?: boolean;
}

const DashboardIcon: React.FC<DashboardIconProps> = ({
  onClick,
  size = 25,
  opacity = 1,
  nonBouncing = false,
}) => (
  <MotionSvg
    onClick={onClick}
    className={twMerge("sn", !nonBouncing && onClick && "cp")}
    whileTap={{ scale: !nonBouncing && onClick ? 0.85 : 1 }}
    width={size}
    opacity={opacity}
    viewBox="0 0 34 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.3087 14.0001H4.69133C3.72036 13.9921 2.78596 14.3702 2.0937 15.051C1.40143 15.7319 1.008 16.6599 1 17.6307V31.3716C1.01797 33.3927 2.67029 35.0169 4.69133 34.9999H11.3087C12.2796 35.008 13.2141 34.63 13.9064 33.9492C14.5987 33.2683 14.9921 32.3404 15 31.3692V17.6307C14.9921 16.6599 14.5987 15.7319 13.9064 15.051C13.2141 14.3702 12.2796 13.9921 11.3087 14.0001Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.3087 1.00136H4.69133C2.71094 0.948409 1.05971 2.45064 1 4.35959V6.6404C1.05971 8.54938 2.71094 10.0516 4.69133 9.99864H11.3087C13.289 10.0516 14.9403 8.54938 15 6.6404V4.35959C14.9403 2.45064 13.289 0.948409 11.3087 1.00136Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.6913 20.9999H29.3063C30.2777 21.0081 31.2127 20.6483 31.9054 19.9999C32.5982 19.3512 32.9921 18.4672 33 17.5421V4.45784C32.9921 3.53314 32.5987 2.64934 31.9064 2.00088C31.2141 1.35243 30.2796 0.992432 29.3087 1.00012H22.6913C21.7204 0.992432 20.7859 1.35243 20.0936 2.00088C19.4013 2.64934 19.0079 3.53314 19 4.45784V17.5421C19.0079 18.4668 19.4013 19.3506 20.0936 19.999C20.7859 20.6474 21.7204 21.0074 22.6913 20.9999Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M22.6913 34.9986H29.3063C31.2876 35.0528 32.9403 33.5503 33 31.6404V29.3596C32.9403 27.4506 31.289 25.9485 29.3087 26.0014H22.6913C20.711 25.9485 19.0597 27.4506 19 29.3596V31.6381C19.0583 33.548 20.7101 35.0514 22.6913 34.9986Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </MotionSvg>
);

export default DashboardIcon;
