import { twMerge } from "tailwind-merge";
import LowerRIghtIcon from "../custom/LowerRIghtIcon";

interface PageContainerProps {
  children?: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "relative z-0 csc-2 wf hf min-hs overflow-scroll-y pt-10 pb-20 px-8 bg-aspect-ratio",
        className
      )}
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}

      {/* <div className="fixed -z-10 bottom-12 right-8">
        <LowerRIghtIcon />
      </div> */}
    </div>
  );
};

export default PageContainer;
