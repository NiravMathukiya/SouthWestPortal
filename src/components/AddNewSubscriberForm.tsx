"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { Mail, Phone } from "lucide-react";
import React from "react";

export const formSchema = z.object({
  institution: z.string({ required_error: "Please select a Jamatkhana" }),
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  role: z.string({ required_error: "Please select a subscriber role" }),
  attachments: z.string({
    required_error: "Please select an attachment option",
  }),
  status: z.string({ required_error: "Please select a status" }),
});

export type SubscriberFormValues = z.infer<typeof formSchema>;

export const jamatkhanaOptions = [
  { label: "All Jamatkhanas", value: "all" },
  { label: "Austin", value: "austin" },
  { label: "Austin Downtown", value: "austin_downtown" },
  { label: "Austin South", value: "austin_south" },
  { label: "Beaumont", value: "beaumont" },
  { label: "Clear Lake", value: "clear_lake" },
  { label: "College Station", value: "college_station" },
  { label: "Corpus Christi", value: "corpus_christi" },
  { label: "Harvest Green", value: "harvest_green" },
  { label: "Headquarters", value: "headquarters" },
  { label: "Katy", value: "katy" },
  { label: "Principal", value: "principal" },
  { label: "San Antonio", value: "san_antonio" },
  { label: "Spring", value: "spring" },
  { label: "Sugar Land", value: "sugar_land" },
];

export const roleOptions = [
  { label: "Makhi JK" },
  { label: "Council Corner" },
];

export const attachmentOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
];

export const statusOptions = [
  { value: "enabled", label: "Enabled" },
  { value: "disabled", label: "Disabled" },
];

interface SubscriberFormProps {
  form: UseFormReturn<SubscriberFormValues>;
  onSubmit: (data: SubscriberFormValues) => void;
  isSubmitting: boolean;
  formRef: React.RefObject<HTMLFormElement>;
}

export function AddNewSubscriberForm({
  form,
  onSubmit,

  formRef,
}: SubscriberFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mt-6 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Jamatkhana */}
        <div className="col-span-2">
          <label className="text-sm font-medium text-gray-700">
            Jamatkhana <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1">
            <select
              {...register("institution")}
              className={`block w-full rounded-md border ${errors.institution ? "border-red-500" : "border-gray-300"
                } px-3 py-2 text-gray-900 sm:text-sm`}
              defaultValue=""
            >
              <option value="" disabled>
                Select a Jamatkhana
              </option>
              {jamatkhanaOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

          </div>
          {errors.institution && (
            <p className="text-sm text-red-600 mt-1">
              {errors.institution.message}
            </p>
          )}
        </div>

        {/* First Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            {...register("first_name")}
            className={`mt-1 block w-full rounded-md border ${errors.first_name ? "border-red-500" : "border-gray-300"
              } px-3 py-2 text-gray-900 sm:text-sm`}
            placeholder="First Name"
          />
          {errors.first_name && (
            <p className="text-sm text-red-600 mt-1">
              {errors.first_name.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            {...register("last_name")}
            className={`mt-1 block w-full rounded-md border ${errors.last_name ? "border-red-500" : "border-gray-300"
              } px-3 py-2 text-gray-900 sm:text-sm`}
            placeholder="Last Name"
          />
          {errors.last_name && (
            <p className="text-sm text-red-600 mt-1">
              {errors.last_name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="email"
              {...register("email")}
              className={`pl-10 block w-full rounded-md border ${errors.email ? "border-red-500" : "border-gray-300"
                } px-3 py-2 text-gray-900 sm:text-sm`}
              placeholder="Email"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Phone className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="tel"
              {...register("phone")}
              className="pl-10 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 sm:text-sm"
              placeholder="Phone"
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Subscriber Role <span className="text-red-500">*</span>
          </label>
          <select
            {...register("role")}
            className={`mt-1 block w-full rounded-md border ${errors.role ? "border-red-500" : "border-gray-300"
              } px-3 py-2 text-gray-900 sm:text-sm`}
            defaultValue=""
          >
            <option value="" disabled>
              Select a Role
            </option>
            {roleOptions.map((option, index) => (
              <option key={index} value={index}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-sm text-red-600 mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attachments <span className="text-red-500">*</span>
          </label>
          <select
            {...register("attachments")}
            className={`mt-1 block w-full rounded-md border ${errors.attachments ? "border-red-500" : "border-gray-300"
              } px-3 py-2 text-gray-900 sm:text-sm`}
            defaultValue=""
          >
            <option value="" disabled>
              Select an option
            </option>
            {attachmentOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.attachments && (
            <p className="text-sm text-red-600 mt-1">{errors.attachments.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            {...register("status")}
            className={`mt-1 block w-full rounded-md border ${errors.status ? "border-red-500" : "border-gray-300"
              } px-3 py-2 text-gray-900 sm:text-sm`}
            defaultValue=""
          >
            <option value="" disabled>
              Select a status
            </option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-sm text-red-600 mt-1">{errors.status.message}</p>
          )}
        </div>
      </div>

      {/* <button
        type="submit"
        disabled={isSubmitting}
        className={`mt-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button> */}
    </form>
  );
}
