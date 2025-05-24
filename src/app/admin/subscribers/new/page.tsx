"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SideBarWrapper from "@/layouts/SidebarWrapper";
import AddNewSubscriberHeader from "@/components/Headers/AddNewSubscriberHeader";
import {
  AddNewSubscriberForm,
  formSchema,
  SubscriberFormValues,
} from "@/components/AddNewSubscriberForm";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddNewSubscriber() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<SubscriberFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      institution: "",
      role: "",
      attachments: "yes",
      status: "enabled",
    },
  });

  const handleSubmit = async (data: SubscriberFormValues) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      const payload = {
        institution: data.institution,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        attachments: Boolean(data.attachments === "yes" ? 1 : 0),
        status: Boolean(data.status === "enabled" ? 1 : 0),
        sub_role: Boolean(data.role),
      };

      await axios.post("/api/subscribers", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("New subscriber added successfully!");
      router.push("/admin/subscribers");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was a problem adding the subscriber.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const triggerFormSubmit = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <SideBarWrapper>
      <div className="flex flex-col h-full">
        <AddNewSubscriberHeader
          title="Add New Subscriber"
          isSubmitting={isSubmitting}
          onSubmit={triggerFormSubmit}
        />

        <div className="max-w-5xl mx-auto w-full">
          <AddNewSubscriberForm
            form={form}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            formRef={formRef}
          />
        </div>
      </div>
    </SideBarWrapper>
  );
}

// All jamatkhanas
// Austin
// Austin Downtown
// Austin South
// Beaumont
// Clear Lake
// College Station
// Corpus Christi
// Harvest Green
// Headquarters
// Katy
// Principal
// San Antonio
// Spring
// Sugar Land
