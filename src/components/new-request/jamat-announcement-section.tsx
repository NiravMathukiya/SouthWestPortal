import { FormDataState } from "@/types/form-types";
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function JamatAnnouncementSection({
  formData,
  setFormData,
  // errors,
}: {
  formData: FormDataState;
  setFormData: React.Dispatch<React.SetStateAction<FormDataState>>;
  // errors: {
  //   dateOfAnnocument?: {
  //     day?: string;
  //     month?: string;
  //     year?: string;
  //   };
  //   AnnocumnetVebiage?: string;
  // };
}) {
  // Date options
  const days = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => String(currentYear + i));

  if (!formData.jamatAnnouncement) return null;

  return (
    <div className="w-full mx-auto mt-6">
      <div className="bg-green-700 p-4 rounded-t text-white">
        <h3 className="font-semibold text-lg">Jamatkhana Announcement</h3>
      </div>

      <div className="bg-white p-6 rounded-b shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of 1st Announcement
            </label>
            <div className="flex space-x-2">
              {/* Day Dropdown */}
              <div className="relative">
                <select
                  value={formData.dateOfAnnocument.day}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dateOfAnnocument: {
                        ...prev.dateOfAnnocument,
                        day: e.target.value,
                      },
                    }))
                  }
                  className="appearance-none w-16 md:w-20 py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">DD</option>
                  {days.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {/* {errors.dateOfAnnocument?.day && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dateOfAnnocument.day}
                  </p>
                )} */}
              </div>

              {/* Month Dropdown */}
              <div className="relative">
                <select
                  value={formData.dateOfAnnocument.month}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dateOfAnnocument: {
                        ...prev.dateOfAnnocument,
                        month: e.target.value,
                      },
                    }))
                  }
                  className="appearance-none w-24 md:w-28 py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">Month</option>
                  {months.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                {/* {errors.dateOfAnnocument?.day && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dateOfAnnocument.day}
                  </p>
                )} */}
              </div>

              {/* Year Dropdown */}
              <div className="relative">
                <select
                  value={formData.dateOfAnnocument.year}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dateOfAnnocument: {
                        ...prev.dateOfAnnocument,
                        year: e.target.value,
                      },
                    }))
                  }
                  className="appearance-none w-20 md:w-24 py-2 pl-3 pr-8 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="">YYYY</option>
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                {/* {errors.dateOfAnnocument?.day && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dateOfAnnocument.day}
                  </p>
                )} */}
              </div>
            </div>
          </div>

          {/* Announcement Text */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Announcement verbiage for 1st week
            </label>
            <textarea
              value={formData.AnnocumnetVebiage}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  AnnocumnetVebiage: e.target.value,
                }))
              }
              placeholder="Maximum 150 Characters"
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-green-500 focus:border-green-500
                 `}
              rows={4}
              maxLength={150}
            />
            {/* {errors.AnnocumnetVebiage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.AnnocumnetVebiage}
              </p>
            )} */}
            <div className="text-sm text-gray-500 mt-1 text-right">
              {formData.AnnocumnetVebiage.length}/150
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
