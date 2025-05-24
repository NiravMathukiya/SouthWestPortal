import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

interface Props {
  value: string | undefined;
  setValue: (name: "publicationDate", value: string) => void;
}

export default function DatePickerInput({ value, setValue }: Props) {
  const handleChange = (date: Date | null) => {
    if (!date) return;
    if (date.getDay() !== 1) return; // Only allow Mondays
    const iso = format(date, "yyyy-MM-dd");
    setValue("publicationDate", iso);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Publication Start Date
      </label>
      <DatePicker

        selected={value ? new Date(value) : null}
        onChange={handleChange}
        filterDate={(date) => date.getDay() === 1}
        className="w-full p-2 border border-gray-300 rounded "
        placeholderText="Select a Only"
        dateFormat="yyyy-MM-dd"
      />
    </div>
  );
}
