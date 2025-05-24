"use client";
import React, {
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";

export interface DynamicDataRef {
  handleSubmit: () => void;
}

const jkOptions = [
  "Austin",
  "Austin - Morning",
  "Austin Downtown",
  "Austin South",
  "Austin South - Morning",
  "Beaumont",
  "Beaumont - Morning",
  "Clear Lake",
  "Clear Lake - Morning",
  "College Station",
  "College Station - Morning",
  "Corpus Christi",
  "Corpus Christi - Morning",
  "Harvest Green",
  "Harvest Green - Morning",
  "Hou Principal",
  "Hou Principal - Morning",
];

const DynamicData = forwardRef<DynamicDataRef>((_, ref) => {
  const [rows, setRows] = useState([{ date: "", title: "" }]);
  const [timeToSend, setTimeToSend] = useState("18:00");

  const handleChange = (index: number, field: string, value: string) => {
    const updated = [...rows];
    updated[index][field as "date" | "title"] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([...rows, { date: "", title: "" }]);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log("Rows:", rows);
    console.log("Time to Send:", timeToSend);
  };


  useImperativeHandle(ref, () => ({
    handleSubmit,
  }));

  return (
    <div className="p-6 max-w-4xl mx-auto bg-blue-50 border rounded shadow">
      <table className="w-full table-fixed border border-collapse border-gray-300">
        <thead className="bg-blue-100">
          <tr>
            <th className="border px-4 py-2 w-1/3 text-left">Date</th>
            <th className="border px-4 py-2 w-1/2 text-left">Title</th>
            <th className="border px-4 py-2 w-1/6 text-center">
              <button
                onClick={addRow}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                +
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="bg-white">
              <td className="border px-2 py-2">
                <input
                  type="date"
                  value={row.date}
                  onChange={(e) => handleChange(index, "date", e.target.value)}
                  className="w-full border p-1 rounded"
                />
              </td>
              <td className="border px-2 py-2">
                <select
                  value={row.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className="w-full border p-1 rounded"
                >
                  <option value="">Select Title</option>
                  {jkOptions.map((title) => (
                    <option key={title} value={title}>
                      {title}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border px-2 py-2 text-center">
                <button
                  onClick={() => removeRow(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  –
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Time input */}
      <div className="flex items-center mt-6 space-x-4">
        <label className="font-bold w-1/3">Time to Send</label>
        <input
          type="time"
          value={timeToSend}
          onChange={(e) => setTimeToSend(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
      </div>
    </div>
  );
});
DynamicData.displayName = "DynamicData";

export default DynamicData;
