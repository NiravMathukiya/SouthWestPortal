"use client";

import { FormDataState } from "@/types/form-types";
import Image from "next/image";
import React from "react";

interface PortfolioGroup {
  ref_category: string;
  portfolio_list: string;
}

interface ProgramInfoSectionProps {
  formData: FormDataState;
  setFormData: React.Dispatch<React.SetStateAction<FormDataState>>;
  venues: string[];
  portfolioGroups: PortfolioGroup[];
  // errors: { [key: string]: string };
}

const ProgramInfoSection: React.FC<ProgramInfoSectionProps> = ({
  formData,
  setFormData,
  venues,
  portfolioGroups,
  // errors,
}) => {
  return (
    <div className="   bg-white rounded space-y-6">
      {/* <div className="border w-full space-y-6 text-white bg-green-600 ">
      </div> */}

      <div className="bg-green-700 p-4 text-white rounded-t ">
        <h2 className="text-xl font-semibold  ">
          Please provide following information
        </h2>
        {/* <h3 className="font-semibold">Channels Requested</h3> */}
      </div>

      <div className=" px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Portfolio/Board/Member */}
        <div>
          <select
            id="portfolio"
            className="w-full border p-2 md:mt-6 rounded border-gray-300"
            value={formData.portfolio.id || ""} // use `id` to control selected option
            onChange={(e) => {
              const selectedId = e.target.value;
              let selectedRefCategory = "";
              let selectedLabel = "";

              portfolioGroups.forEach((group) => {
                group.portfolio_list.split(",").forEach((item) => {
                  const [id, label] = item.split(":");
                  if (id === selectedId) {
                    selectedRefCategory = group.ref_category;
                    selectedLabel = label;
                  }
                });
              });

              console.log(selectedLabel, "selected label", selectedRefCategory);

              setFormData((prev) => ({
                ...prev,
                portfolio: {
                  id: selectedId, // used for controlling the <select>
                  label: selectedLabel.trim(),
                  ref_category: selectedRefCategory,
                  portfolio_list: selectedLabel.trim(), // if needed elsewhere
                },
              }));
            }}
          >
            <option value="">Select a portfolio/member</option>
            {portfolioGroups.map((group, index) => {
              const portfolioItems = group.portfolio_list.split(",");

              return group.ref_category ? (
                <optgroup key={index} label={group.ref_category || "General"}>
                  {portfolioItems.map((item) => {
                    const [id, label] = item.split(":");
                    return (
                      <option key={id} value={id}>
                        {label.trim()}
                      </option>
                    );
                  })}
                </optgroup>
              ) : (
                portfolioItems.map((item) => {
                  const [id, label] = item.split(":");
                  return (
                    <option key={id} value={id}>
                      {label.trim()}
                    </option>
                  );
                })
              );
            })}
          </select>
        </div>


        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            className={`w-full border p-2 rounded ${formData.email === "" ? "border-gray-300" : "border-green-500"
              }`}
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            required
          />
        </div>

        <div>
          {/* Date of Program */}
          <label
            htmlFor="dateOfProhgram"
            className="block text-sm font-medium mb-1"
          >
            Date of Program
          </label>
          <input
            type="date"
            id="dateOfProhgram"
            className={`w-full border p-2 rounded "
            }`}
            value={formData.dateOfProhgram}
            // ${!formData.dateOfProhgram ? "border-red-500" : "border-gray-300
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                dateOfProhgram: e.target.value,
              }))
            }
            required
          />
          {/* {errors.dateOfProhgram && (
            <p className="text-red-500 text-sm">{errors.dateOfProhgram}</p>
          )} */}
        </div>

        <div>
          {/* Projected Number of Attendees */}
          <label
            htmlFor="numberofAttendences"
            className="block text-sm font-medium mb-1 "
          >
            Projected Number of Attendees
          </label>
          <input
            id="numberofAttendences"
            type="number"
            min="0"
            step="1"
            className={`w-full border p-2 rounded ${formData.numberofAttendences < 0
              ? "border-red-500"
              : "border-gray-300"
              }`}
            value={formData.numberofAttendences || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                numberofAttendences: parseInt(e.target.value) || 0,
              }))
            }
          />
          {/* {errors.numberofAttendences && (
            <p className="text-red-500 text-sm">{errors.numberofAttendences}</p>
          )} */}
        </div>

        {/* Submitted By */}
        <div>
          {/* Submitted By */}
          <label
            htmlFor="submittedBy"
            className="block text-sm font-medium mb-1"
          >
            Submitted By
          </label>
          <input
            id="submittedBy"
            className={`w-full border p-2 rounded "
              }`}
            value={formData.submmitby}
            // ${!formData.submmitby ? "border-red-500" : "border-gray-300
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, submmitby: e.target.value }))
            }
            required
          />
          {/* {errors.submmitby && (
            <p className="text-red-500 text-sm mt-1">This field is required</p>
          )} */}
        </div>

        <div>
          {/* Name of Program */}
          <label
            htmlFor="programName"
            className="block text-sm font-medium mb-1"
          >
            Name of Program
          </label>
          <input
            id="programName"
            className={`w-full border p-2 rounded "
              }`}
            value={formData.nameOfPrograme}
            // ${!formData.nameOfPrograme ? "border-red-500" : "border-gray-300
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                nameOfPrograme: e.target.value,
              }))
            }
            required
          />
          {/* {errors.nameOfPrograme && (
            <p className="text-red-500 text-sm">{errors.nameOfPrograme}</p>
          )} */}
        </div>

        <div>
          {/* Time of Program */}
          <label
            htmlFor="programTime"
            className="block text-sm font-medium mb-1"
          >
            Time of Program
          </label>
          <input
            type="time"
            id="programTime"
            className="w-full border p-2 rounded border-gray-300"
            value={formData.timeofProgram}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                timeofProgram: e.target.value,
              }))
            }
          />
          {/* {errors.timeofProgram && (
            <p className="text-red-500 text-sm">{errors.timeofProgram}</p>
          )} */}
        </div>
        {/* Registration Required */}
        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Does this program require registration?
          </label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={formData.isReistrerstionLink}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    isReistrerstionLink: true,
                  }))
                }
              />
              <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                checked={!formData.isReistrerstionLink}
                onChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    isReistrerstionLink: false,
                  }))
                }
              />
              <span className="ml-2">No</span>
            </label>
          </div>

          {/* Registration Link (Conditional) */}
          {formData.isReistrerstionLink && (
            <div className="mt-4">
              <label
                htmlFor="registrationLink"
                className="block text-sm font-medium mb-1"
              >
                Insert Registration Link
              </label>
              <input
                id="registrationLink"
                type="url"
                className="w-full border p-2 rounded border-gray-300"
                value={formData.InsertRegistertionLink}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    InsertRegistertionLink: e.target.value,
                  }))
                }
                required={formData.isReistrerstionLink}
              />
            </div>
          )}

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium mb-1 mt-4"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              className={`w-full border p-2 rounded 
                // ? "border-red-500"
                // : "border-gray-300"
              }`}
              // ${!/^[0-9]{7,15}$/.test(formData.phoneno)
              value={formData.phoneno}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phoneno: e.target.value }))
              }
              required
            />
            {/* {!/^[0-9]{7,15}$/.test(formData.phoneno) && (
              <p className="text-red-500 text-sm mt-1">
                Phone number must be digits only, 7-15 characters
              </p>
            )} */}
          </div>
        </div>

        {/* Location of Program */}
        <div>
          <label
            htmlFor="ProgramVenueLocation"
            className="block text-sm font-medium mb-1"
          >
            Location of Program
          </label>
          <input
            id="ProgramVenueLocation"
            type="text"
            className="w-full border p-2 rounded border-gray-300"
            value={formData.ProgramVenueLocation}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                ProgramVenueLocation: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="mt-6 px-6">
        <label className="block text-sm font-medium mb-2">Program Venue</label>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          {venues.map((venue) => (
            <div key={venue} className="flex items-center">
              <input
                type="checkbox"
                id={venue}
                checked={formData.programVenue.includes(venue)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFormData((prev) => ({
                      ...prev,
                      programVenue: [...prev.programVenue, venue],
                    }));
                  } else {
                    setFormData((prev) => ({
                      ...prev,
                      programVenue: prev.programVenue.filter(
                        (v) => v !== venue
                      ),
                    }));
                  }
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor={venue}
                className="ml-2 block text-sm text-gray-700"
              >
                {venue}
              </label>
            </div>
          ))}
        </div>

        {/* Add Other Venue */}
        <div className="mt-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="addOther"
              checked={formData.programVenue.some((v) => !venues.includes(v))}
              onChange={(e) => {
                if (!e.target.checked) {
                  setFormData((prev) => ({
                    ...prev,
                    programVenue: prev.programVenue.filter((v) =>
                      venues.includes(v)
                    ),
                  }));
                }
              }}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="addOther"
              className="ml-2 block text-sm text-gray-700"
            >
              + Add Other
            </label>
          </div>

          {formData.programVenue.some((v) => !venues.includes(v)) && (
            <div className="ml-6 mt-2 flex items-center">
              <input
                type="text"
                placeholder="Enter custom venue"
                className="border p-2 rounded text-sm w-full max-w-xs"
                value={
                  formData.programVenue.find((v) => !venues.includes(v)) || ""
                }
                onChange={(e) => {
                  const customVenue = e.target.value;
                  const selectedVenues = formData.programVenue.filter((v) =>
                    venues.includes(v)
                  );

                  setFormData((prev) => ({
                    ...prev,
                    programVenue: customVenue
                      ? [...selectedVenues, customVenue]
                      : selectedVenues,
                  }));
                }}
              />
            </div>
          )}
        </div>

        {/* Error Display */}
        {/* {errors.programVenue && (
          <p className="text-red-500 text-sm mt-2">{errors.programVenue}</p>
        )} */}
      </div>

      {/* Flyer Upload */}
      <div className="mt-6 px-6">
        <label className="block text-sm font-medium mb-2">
          Upload Images (Max 5 files)
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            const newImages = files.slice(
              0,
              5 - formData.personInfoImages.length
            );

            setFormData((prev) => ({
              ...prev,
              personInfoImages: [...prev.personInfoImages, ...newImages],
            }));
          }}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer flex items-center justify-center px-4 py-6 border-2 border-dashed rounded-md"
        >
          <span className="text-gray-600">Click to upload images</span>
        </label>

        {/* Display selected images */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {formData.personInfoImages.map((file, index) => (
            <div key={index} className="relative group">
              <Image
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="h-24 w-full object-cover rounded"
                height={96}
                width={96}
              />
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    personInfoImages: prev.personInfoImages.filter(
                      (_, i) => i !== index
                    ),
                  }));
                }}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Validation messages */}
        {formData.personInfoImages.length >= 5 && (
          <p className="text-red-500 text-sm mt-2">Maximum 5 images reached</p>
        )}
        {formData.personInfoImages.some(
          (file) => !file.type.startsWith("image/")
        ) && (
            <p className="text-red-500 text-sm mt-2">
              Only image files are allowed
            </p>
          )}
      </div>
    </div>
  );
};

export default ProgramInfoSection;
