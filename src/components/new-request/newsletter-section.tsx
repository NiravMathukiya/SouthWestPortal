"use client";

import React, { useState, useCallback, useEffect } from "react";
import { FormDataState } from "@/types/form-types";

interface NewsletterSectionProps {
  formData: FormDataState;
  setFormData: React.Dispatch<React.SetStateAction<FormDataState>>;
  errors?: Record<string, string>;
}

export default function NewsletterSection({
  formData,
  setFormData,
  errors,
}: NewsletterSectionProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [nextMonday, setNextMonday] = useState("");

  // Get initial next Monday date
  useEffect(() => {
    const getNextMonday = () => {
      const today = new Date();
      const day = today.getDay();
      const diff = day <= 1 ? 1 - day : 8 - day;
      const nextMonday = new Date(today.setDate(today.getDate() + diff));
      return nextMonday.toISOString().split("T")[0];
    };
    setNextMonday(getNextMonday());
  }, []);

  const handleFileChange = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const validFiles = Array.from(files).filter((file) => file);

      setFormData((prev) => ({
        ...prev,
        IsmailiImages: [...prev.IsmailiImages, ...validFiles].slice(0, 5),
      }));
    },
    [setFormData]
  );

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileChange(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
    e.target.value = "";
  };

  const adjustToMonday = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    const diff = day <= 1 ? 1 - day : 8 - day;
    date.setDate(date.getDate() + diff);
    return date.toISOString().split("T")[0];
  };

  const handleStartDateChange = (selectedDate: string) => {
    const mondayDate = adjustToMonday(selectedDate);

    setFormData((prev) => ({
      ...prev,
      ismailiStartDate: mondayDate,
      errors: {
        // ...prev.errors,
        ismailiStartDate: "",
        ismailiendDate:
          prev.ismailiendDate &&
          new Date(prev.ismailiendDate) < new Date(mondayDate)
            ? "Must be after start date"
            : errors?.ismailiendDate,
      },
    }));
  };

  const handleEndDateChange = (selectedDate: string) => {
    const mondayDate = adjustToMonday(selectedDate);
    const startDate = new Date(formData.ismailiStartDate);
    const endDate = new Date(mondayDate);

    setFormData((prev) => ({
      ...prev,
      ismailiendDate: mondayDate,
      errors: {
        // ...prev.errors,
        ismailiendDate: endDate < startDate ? "Must be after start date" : "",
      },
    }));
  };

  return (
    <div className="form-section visible">
      <div className="bg-green-700 p-4 rounded text-white">
        <h3 className="font-semibold">
          Newsletter/ Events Calendar/ Ismaili App
        </h3>
      </div>

      <div className="bg-white p-6 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Publication Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Publication Start Date (Mondays only)
          </label>
          <input
            type="date"
            value={formData.ismailiStartDate}
            onChange={(e) => handleStartDateChange(e.target.value)}
            min={nextMonday}
            className={`w-full p-2 border rounded ${
              errors?.ismailiStartDate ? "border-red-500" : "border-gray-300"
            }`}
            onFocus={(e) => e.target.showPicker()}
          />
          {errors?.ismailiStartDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.ismailiStartDate}
            </p>
          )}
          {formData.ismailiStartDate && (
            <p className="text-sm text-gray-500 mt-1">
              Selected: {new Date(formData.ismailiStartDate).toDateString()}
            </p>
          )}
        </div>

        {/* Publication End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Publication End Date (Mondays only)
          </label>
          <input
            type="date"
            value={formData.ismailiendDate}
            onChange={(e) => handleEndDateChange(e.target.value)}
            min={formData.ismailiStartDate || nextMonday}
            className={`w-full p-2 border rounded ${
              errors?.ismailiendDate ? "border-red-500" : "border-gray-300"
            }`}
            disabled={!formData.ismailiStartDate}
            onFocus={(e) => e.target.showPicker()}
          />
          {errors?.ismailiendDate && (
            <p className="text-red-500 text-sm mt-1">{errors.ismailiendDate}</p>
          )}
          {formData.ismailiendDate && (
            <p className="text-sm text-gray-500 mt-1">
              Selected: {new Date(formData.ismailiendDate).toDateString()}
            </p>
          )}
        </div>

        {/* Submission Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select a title for your submission
          </label>
          <input
            type="text"
            value={formData.ismailititle}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                ismailititle: e.target.value,
              }))
            }
            className={`w-full p-2 border rounded ${
              errors?.ismailititle ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors?.ismailititle && (
            <p className="text-red-500 text-sm mt-1">{errors.ismailititle}</p>
          )}
        </div>

        {/* Submission Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select type of submission
          </label>
          <select
            value={formData.ismailitypeSubmission}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                ismailitypeSubmission: e.target.value,
              }))
            }
            className={`w-full p-2 border rounded ${
              errors?.ismailitypeSubmission
                ? "border-red-500"
                : "border-gray-300"
            }`}
          >
            <option value="">Select Type</option>
            <option value="article">Article</option>
            <option value="announcement">Announcement</option>
            <option value="event">Event</option>
            <option value="news">News</option>
          </select>
          {errors?.ismailitypeSubmission && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.ismailitypeSubmission}
            </p>
          )}
        </div>

        {/* Short Text */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Provide short text
          </label>
          <textarea
            value={formData.ismailishoettext}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                ismailishoettext: e.target.value,
              }))
            }
            rows={5}
            placeholder="Maximum 150 Characters"
            className={`w-full p-2 border rounded ${
              errors?.ismailishoettext ? "border-red-500" : "border-gray-300"
            }`}
            maxLength={150}
          />
          <div className="text-sm text-gray-500 mt-1 text-right">
            {formData.ismailishoettext.length}/150
          </div>
        </div>

        {/* File Upload */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload graphics (PNG format, square shape, 1080x1080)
          </label>
          <div
            onDrop={handleFileDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            className={`border-2 border-dashed rounded-md p-6 mt-2 flex flex-col items-center justify-center transition-colors ${
              isDragOver ? "border-blue-400 bg-blue-50" : "border-gray-300"
            }`}
          >
            <input
              type="file"
              multiple
              onChange={handleFileSelect}
              className="hidden"
              id="newsletterFileUpload"
            />
            <label
              htmlFor="newsletterFileUpload"
              className="text-blue-500 hover:underline cursor-pointer"
            >
              Browse files
            </label>
            <p className="text-xs text-gray-400 mt-1">
              (PNG format, 1080x1080)
            </p>
          </div>
          {formData.IsmailiImages.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium">
                Selected files ({formData.IsmailiImages.length}):
              </p>
              <ul className="text-xs text-gray-500 mt-1">
                {formData.IsmailiImages.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
          {errors?.IsmailiImages && (
            <p className="text-red-500 text-sm mt-1">{errors?.IsmailiImages}</p>
          )}
        </div>

        {/* Registration Link */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Please provide any other instructions or info relevant to the
            submission
          </label>
          <input
            type="text"
            value={formData.ismailiInstraction}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                ismailiInstraction: e.target.value,
              }))
            }
            placeholder="Maximum 150 Characters"
            className={`w-full p-2 border rounded ${
              errors?.ismailiInstraction ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors?.ismailiInstraction && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.ismailiInstraction}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
