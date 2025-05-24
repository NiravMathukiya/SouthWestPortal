"use client";
import React, {
    forwardRef,
    useImperativeHandle,
} from "react";
import { useForm } from "react-hook-form";

export type FormContentRef = {
    submitForm: () => void;
};

type FormData = {
    name: string;
    dob: string;
    phone: string;
    email: string;
    jamatkhana: string;
    education: string;
    occupation?: string;
    linkedin?: string;
    institutionOfInterest?: string;
};

const FormContent = forwardRef<FormContentRef>((props, ref) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log("Form submitted!", data);
    };

    useImperativeHandle(ref, () => ({
        submitForm: () => {
            handleSubmit(onSubmit)();
        },
    }));

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 space-y-4 bg-white shadow rounded w-full mx-auto"
        >
            <h2 className="text-2xl font-bold mb-4">General</h2>

            {/** Form Group Component */}
            <div className="flex  items-center space-x-4">
                <label className="w-1/4 text-sm font-medium text-gray-700">
                    <span className="text-red-600">*</span> Name
                </label>
                <input
                    {...register("name", { required: true })}
                    className="w-3/4 border rounded p-2"
                    placeholder="Name"
                />
            </div>
            {errors.name && <p className="text-red-500 text-sm ml-[25%]">This field is required</p>}

            <div className="flex items-center space-x-4">
                <label className="w-1/4 text-sm font-medium text-gray-700">
                    <span className="text-red-600">*</span>Date of Birth
                </label>
                <input
                    type="date"
                    {...register("dob", { required: true })}
                    className="w-3/4 border rounded p-2"
                />
            </div>
            {errors.dob && <p className="text-red-500 text-sm ml-[25%]">This field is required</p>}

            <div className="flex items-center space-x-4">
                <label className="w-1/4 text-sm font-medium text-gray-700">
                    <span className="text-red-600">*</span>Phone Number
                </label>
                <input
                    type="tel"
                    {...register("phone", { required: true })}
                    className="w-3/4 border rounded p-2"
                    placeholder="Phone"
                />
            </div>
            {errors.phone && <p className="text-red-500 text-sm ml-[25%]">This field is required</p>}

            <div className="flex items-center space-x-4">
                <label className="w-1/4 text-sm font-medium text-gray-700">
                    <span className="text-red-600">*</span>Email Address
                </label>
                <input
                    type="email"
                    {...register("email", { required: true })}
                    className="w-3/4 border rounded p-2"
                    placeholder="Email"
                />
            </div>
            {errors.email && <p className="text-red-500 text-sm ml-[25%]">This field is required</p>}

            <div className="flex items-center space-x-4">
                <label className="w-1/4 text-sm font-medium text-gray-700">
                    <span className="text-red-600">*</span>Primary Jamatkhana
                </label>
                <select
                    {...register("jamatkhana", { required: true })}
                    className="w-3/4 border rounded p-2"
                >
                    <option value="">Select</option>
                    <option value="Jamatkhana 1">Jamatkhana 1</option>
                    <option value="Jamatkhana 2">Jamatkhana 2</option>
                </select>
            </div>
            {errors.jamatkhana && <p className="text-red-500 text-sm ml-[25%]">This field is required</p>}

            <div className="flex items-center space-x-4">
                <label className="w-1/4 text-sm font-medium text-gray-700">
                    Highest Level of Education
                </label>
                <select
                    {...register("education")}
                    className="w-3/4 border rounded p-2"
                >
                    <option value="">Select</option>
                    <option value="Some High School">Some High School</option>
                    <option value="Bachelor's Degree">Bachelor ${`&apos`} s Degree</option>
                    <option value="Master's Degree">Master${`&apos`}s Degree</option>
                </select>
            </div>

            <div className="flex items-center space-x-4">
                <label className="w-1/4 text-sm font-medium text-gray-700">
                    Occupation
                </label>
                <input
                    {...register("occupation")}
                    className="w-3/4 border rounded p-2"
                    placeholder="Occupation"
                />
            </div>

            <div className="flex items-center space-x-4">
                <label className="w-1/4 text-sm font-medium text-gray-700">
                    LinkedIn Profile Link
                </label>
                <input
                    type="url"
                    {...register("linkedin")}
                    className="w-3/4 border rounded p-2"
                    placeholder="LinkedIn Profile Link"
                />
            </div>

            <div className="flex items-center space-x-4">
                <label className="w-1/4 text-sm font-medium text-gray-700">
                    Institution of Interest
                </label>
                <select
                    {...register("institutionOfInterest")}
                    className="w-3/4 border rounded p-2"
                >
                    <option value="">Select</option>
                    <option value="Institution 1">Institution 1</option>
                    <option value="Institution 2">Institution 2</option>
                </select>
            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="mt-6 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
                >
                    Submit
                </button>
            </div>
        </form>
    );
});

FormContent.displayName = "FormContent";
export default FormContent;
