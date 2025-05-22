import "react-datepicker/dist/react-datepicker.css";

import type { Dispatch, MouseEventHandler, SetStateAction } from "react";
import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import { twMerge } from "tailwind-merge";

interface MyDatePickerProps {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  className?: string;
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({
  date,
  setDate,
  className,
}) => {
  const ExampleCustomInput = forwardRef<
    HTMLButtonElement,
    { value: string; onClick: MouseEventHandler<HTMLButtonElement> }
  >(({ value, onClick }, ref) => (
    <button
      className={twMerge("bg-transparent px-4 py-2 b rounded-lg", className)}
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  ExampleCustomInput.displayName = "ExampleCustomInput";

  return (
    <DatePicker
      showMonthDropdown
      showYearDropdown
      selected={date}
      onChange={(date) => setDate(date ?? new Date(1995, 0, 1))}
      customInput={<ExampleCustomInput value="H" onClick={() => {}} />}
    />
  );
};
export default MyDatePicker;
