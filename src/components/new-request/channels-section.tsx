import { FormDataState } from "@/types/form-types";
import React from "react";

type ChannelsSectionProps = {
  formData: FormDataState;
  setFormData: React.Dispatch<React.SetStateAction<FormDataState>>;
};

const ChannelsSection: React.FC<ChannelsSectionProps> = ({
  formData,
  setFormData,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  return (
    <div className="rounded shadow overflow-hidden">
      <div className="bg-green-700 p-4 text-white rounded-t">
        <h3 className="font-semibold">Channels Requested</h3>
      </div>

      <div className="bg-white px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="jamatAnnouncement"
              className="accent-yellow-500 w-4 h-4"
              checked={formData.jamatAnnouncement}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="jamatAnnouncement"
              className="cursor-pointer text-sm"
            >
              Jamati Announcement
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="ismailiInsight"
              className="accent-yellow-500 w-4 h-4"
              checked={formData.ismailiInsight}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="ismailiInsight" className="cursor-pointer text-sm">
              Ismaili Insight Newsletter
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="ismailiApp"
              className="accent-yellow-500 w-4 h-4"
              checked={formData.ismailiApp}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="ismailiApp" className="cursor-pointer text-sm">
              The Ismaili App
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="socialMedia"
              className="accent-yellow-500 w-4 h-4"
              checked={formData.socialMedia}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="socialMedia" className="cursor-pointer text-sm">
              Social Media (Facebook & Instagram)
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="other"
              className="accent-yellow-500 w-4 h-4"
              checked={formData.other}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="other" className="cursor-pointer text-sm">
              Graphic Request
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelsSection;
