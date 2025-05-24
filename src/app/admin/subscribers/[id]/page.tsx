"use client";

import AddNewSubscriberHeader from "@/components/Headers/AddNewSubscriberHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Mail, Phone } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

// Define the form schema with proper types
 const formSchema = z.object({
  institution: z.string({ required_error: "Please select a Jamatkhana" }),
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  role: z.enum(["Makhi JK", "Council Corner"], {
    required_error: "Please select a subscriber role",
  }),
  attachments: z.enum(["true", "false"], {
    required_error: "Please select an attachment option",
  }),
  status: z.enum(["true", "false"], {
    required_error: "Please select a status",
  }),
});

type SubscriberFormValues = z.infer<typeof formSchema>;

const jamatkhanaOptions = [
  { label: "All Jamatkhanas", value: "all" },
  { label: "Austin", value: "austin" },
  // ... rest of the options
];

const roleOptions = [
  { label: "Makhi JK", value: "Makhi JK" },
  { label: "Council Corner", value: "Council Corner" },
];

const attachmentOptions = [
  { value: "true", label: "Yes" },
  { value: "false", label: "No" },
];

const statusOptions = [
  { value: "true", label: "Enabled" },
  { value: "false", label: "Disabled" },
];

export default function EditSubscriber() {
  const router = useRouter();
  const params = useParams() as { id: string };
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<SubscriberFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      institution: "",
      role: "Makhi JK", // Default value should match one of the enum values
      attachments: "true", // Default value should match one of the enum values
      status: "true", // Default value should match one of the enum values
    },
  });

  // Fetch existing subscriber data
  useEffect(() => {
    if (!params?.id) return;

    const fetchSubscriber = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/subscribers?subscriber_id=${params.id}`);
        const data = await res.json();
        const subscriber = data.data.subscribers;

        form.reset({
          institution: subscriber.institution,
          first_name: subscriber.first_name,
          last_name: subscriber.last_name,
          email: subscriber.email,
          phone: subscriber.phone || "",
          role: subscriber.sub_role ? "Council Corner" : "Makhi JK",
          attachments: subscriber.attachments ? "true" : "false",
          status: subscriber.status ? "true" : "false",
        });
      } catch (error) {
        console.error("Failed to fetch subscriber", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriber();
  }, [params?.id, form]);

  const handleSubmit = async (data: SubscriberFormValues) => {
    try {
      const payload = {
        institution: data.institution,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        attachments: data.attachments === "true",
        status: data.status === "true",
        sub_role: data.role === "Council Corner",
      };

      setIsSubmitting(true);

      if (!params?.id) throw new Error("No subscriber ID provided");

      await axios.put(`/api/subscribers?subscriber_id=${params.id}`, payload);

      toast.success("Subscriber updated successfully!");
      router.push("/admin/subscribers");
    } catch (error: any) {
      console.error("Error updating subscriber:", error);
      const message =
        error.response?.data?.message || "Failed to update subscriber.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFormSubmit = () => {
    formRef.current?.requestSubmit();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-12 h-12 text-gray-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <AddNewSubscriberHeader
        title="Edit Subscriber"
        isSubmitting={isSubmitting}
        onSubmit={triggerFormSubmit}
      />

      <div className="max-w-5xl mx-auto w-full">
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(handleSubmit)}
          className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mt-6 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Jamatkhana */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Jamatkhana <span className="text-red-500">*</span>
              </label>
              <select
                {...form.register("institution")}
                className={`block w-full rounded-md border ${form.formState.errors.institution ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 text-gray-900 sm:text-sm`}
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
              {form.formState.errors.institution && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.institution.message}
                </p>
              )}
            </div>

            {/* First Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                {...form.register("first_name")}
                className={`mt-1 block w-full rounded-md border ${form.formState.errors.first_name ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 text-gray-900 sm:text-sm`}
                placeholder="First Name"
              />
              {form.formState.errors.first_name && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.first_name.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                {...form.register("last_name")}
                className={`mt-1 block w-full rounded-md border ${form.formState.errors.last_name ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 text-gray-900 sm:text-sm`}
                placeholder="Last Name"
              />
              {form.formState.errors.last_name && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.last_name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  {...form.register("email")}
                  className={`pl-10 block w-full rounded-md border ${form.formState.errors.email ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 text-gray-900 sm:text-sm`}
                  placeholder="Email"
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Phone
              </label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  {...form.register("phone")}
                  className="pl-10 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 sm:text-sm"
                  placeholder="Phone"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Subscriber Role <span className="text-red-500">*</span>
              </label>
              <select
                {...form.register("role")}
                className={`mt-1 block w-full rounded-md border ${form.formState.errors.role ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 text-gray-900 sm:text-sm`}
              >
                <option value="" disabled>
                  Select a Role
                </option>
                {roleOptions.map((option, index) => (
                  <option key={index} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
              {form.formState.errors.role && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.role.message}
                </p>
              )}
            </div>

            {/* Attachments */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Attachments <span className="text-red-500">*</span>
              </label>
              <select
                {...form.register("attachments")}
                className={`mt-1 block w-full rounded-md border ${form.formState.errors.attachments ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 text-gray-900 sm:text-sm`}
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
              {form.formState.errors.attachments && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.attachments.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                {...form.register("status")}
                className={`mt-1 block w-full rounded-md border ${form.formState.errors.status ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 text-gray-900 sm:text-sm`}
              >
                <option value="" disabled>
                  Select status
                </option>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {form.formState.errors.status && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Update Subscriber"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
