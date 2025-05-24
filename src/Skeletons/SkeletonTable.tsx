import { FC } from "react";

interface SkeletonTableProps {
  rowCount?: number;
  rowHeight?: string;
  rowWidths?: string[];
  gap?: string;
  className?: string;
}

export const SkeletonTable: FC<SkeletonTableProps> = ({
  rowCount = 10,
  rowHeight = "h-4",
  rowWidths = ["w-6", "w-24", "w-32", "w-16", "w-20"],
  gap = "space-x-4",
  className = "",
}) => {
  return (
    <div className={`animate-pulse space-y-2 ${className}`}>
      {[...Array(rowCount)].map((_, index) => (
        <div
          key={index}
          className={`flex items-center ${gap} border p-4 rounded-md bg-white shadow-sm`}
        >
          {rowWidths.map((width, i) => (
            <div
              key={i}
              className={`${rowHeight} ${width} bg-gray-200 rounded`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};