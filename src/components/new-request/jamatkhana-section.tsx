"use client";

import { FormDataState } from "@/types/form-types";
import { FC } from "react";


export type Facility = {
  booking_address: string;
  facility_type: number;
};

interface JamatkhanaSectionProps {
  formData: FormDataState;
  setFormData: React.Dispatch<React.SetStateAction<FormDataState>>;
  facilities: Facility[];
}

const facilityTypeLabels: Record<number, string> = {
  1: "ACST",
  2: "ACCT",
  3: "DISTRICT",
  4: "GREATER HOUSTON",
};

const JamatkhanaSection: FC<JamatkhanaSectionProps> = ({
  formData,
  setFormData,
  facilities,
}) => {
  const handleCheckboxChange = (label: string) => {
    setFormData((prev: any) => {
      const newJamatkhanas = prev.jamatkhanas.includes(label)
        ? prev.jamatkhanas.filter((item: any) => item !== label)
        : [...prev.jamatkhanas, label];

      return {
        ...prev,
        jamatkhanas: newJamatkhanas,
      };
    });
  };

  const handleSelectAll = (addresses: { label: string }[]) => {
    const labels = addresses.map((addr) => addr.label);
    setFormData((prev: any) => ({
      ...prev,
      jamatkhanas: Array.from(new Set([...prev.jamatkhanas, ...labels])),
    }));
  };

  return (
    <div className="form-section visible">
      <div className="bg-green-700 p-4 rounded text-white">
        <h3 className="font-semibold">Select Jamatkhanas</h3>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {facilities.map((group, index) => {
            const addresses = group?.booking_address
              .split(",")
              .map((item: string) => {
                const [id, label] = item.split(":").map((str) => str.trim());
                return { id, label };
              });

            return (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <h4 className="font-semibold">
                    {facilityTypeLabels[group?.facility_type] ||
                      `Facility Group ${group?.facility_type}`}
                  </h4>
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => handleSelectAll(addresses)}
                  >
                    Select All
                  </button>
                </div>
                <div className="border border-gray-300 rounded p-2">
                  <div className="grid grid-cols-1 gap-2">
                    {addresses.map(
                      ({ id, label }: { id: string; label: string }) => (
                        <div key={id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`jamatkhanas-${id}`}
                            className="mr-2"
                            checked={formData.jamatkhanas.includes(label)}
                            onChange={() => handleCheckboxChange(label)}
                          />
                          <label htmlFor={`jamatkhanas-${id}`}>{label}</label>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Comment
          </label>
          <textarea
            id="comment"
            rows={3}
            className="w-full p-2 border border-gray-300 rounded"
            value={formData.jamatkhanascomment}
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                jamatkhanascomment: e.target.value,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default JamatkhanaSection;
