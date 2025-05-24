"use client";

import ChannelsSection from "@/components/new-request/channels-section";
import FormActions from "@/components/new-request/form-actions";
import GuidelinesSection from "@/components/new-request/guidelines-section";
import Header from "@/components/new-request/header";
import JamatAnnouncementSection from "@/components/new-request/jamat-announcement-section";
import JamatkhanaSection, {
  Facility,
} from "@/components/new-request/jamatkhana-section";
import NewsletterSection from "@/components/new-request/newsletter-section";
import ProgramInfoSection from "@/components/new-request/program-info-section";
import { FormDataState, Portfolio } from "@/types/form-types";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Form = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormDataState>({
    jamatAnnouncement: false,
    ismailiInsight: false,
    ismailiApp: false,
    socialMedia: false,
    other: false,
    channel: [],
    portfolio: { id: "", ref_category: "", portfolio_list: "" },
    submmitby: "",
    phoneno: "",
    email: "",
    nameOfPrograme: "",
    dateOfProhgram: "",
    timeofProgram: "",
    numberofAttendences: 0,
    InsertRegistertionLink: "",
    isReistrerstionLink: false,
    ProgramVenueLocation: "",
    personInfoImages: [],
    programVenue: [],
    dateOfAnnocument: {
      day: "",
      month: "",
      year: "",
    },
    AnnocumnetVebiage: "",
    ismailiStartDate: "",
    ismailiendDate: "",
    ismailititle: "",
    ismailitypeSubmission: "",
    ismailishoettext: "",
    ismailiInstraction: "",
    IsmailiImages: [],
    jamatkhanas: [],
    jamatkhanascomment: "",
  });

  // interface FormErrors {
  //   [key: string]: string | { [key: string]: string };
  // }

  const [venues, setVenues] = useState<string[]>([]);
  const [portfoliogroups, setPortfoliogroups] = useState<Portfolio[]>([]);
  const [jamatkhanas, setJamatkhanas] = useState<Facility[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  // // const [errors, setErrors] = useState<Record<string, string>>({});
  // const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // const [shouldValidate, setShouldValidate] = useState(false);

  useEffect(() => {
    const fetchAnnouncementData = async () => {
      try {
        const response = await axios.get("/api/announcement?data_get=true");

        setVenues(response.data.data.portalupdates.addressNames);
        setPortfoliogroups(
          response.data.data.portalupdates.booking_portfolios_group
        );
        setJamatkhanas(response.data.data.portalupdates.facilities);
        // setIsLoading(false);
      } catch (err) {
        toast.error("Failed to fetch announcement data");
        // setIsLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchAnnouncementData();
  }, []);

  // const validateForm = () => {
  //   const newErrors: Record<string, string> = {};

  //   if (!formData.submmitby.trim())
  //     newErrors.submmitby = "Submitter name is required.";
  //   if (!formData.email.trim()) newErrors.email = "Email is required.";
  //   if (!formData.phoneno.trim())
  //     newErrors.phoneno = "Phone number is required.";
  //   if (!formData.nameOfPrograme.trim())
  //     newErrors.nameOfPrograme = "Program name is required.";
  //   if (!formData.dateOfProhgram.trim())
  //     newErrors.dateOfProhgram = "Date of program is required.";
  //   if (!formData.timeofProgram.trim())
  //     newErrors.timeofProgram = "Time of program is required.";

  //   if (formData.jamatAnnouncement) {
  //     if (!formData.dateOfAnnocument.day.trim())
  //       newErrors["dateOfAnnocument.day"] = "Day is required";
  //     if (!formData.dateOfAnnocument.month.trim())
  //       newErrors["dateOfAnnocument.month"] = "Month is required";
  //     if (!formData.dateOfAnnocument.year.trim())
  //       newErrors["dateOfAnnocument.year"] = "Year is required";
  //     if (!formData.AnnocumnetVebiage.trim())
  //       newErrors.AnnocumnetVebiage = "Announcement text is required";
  //   }
  //   // In validateForm function:
  //   if (formData.ismailiInsight) {
  //     if (!formData.ismailiStartDate)
  //       newErrors.ismailiStartDate = "Start date required";
  //     if (!formData.ismailiendDate)
  //       newErrors.ismailiendDate = "End date required";
  //     if (!formData.ismailititle) newErrors.ismailititle = "Title required";
  //     if (!formData.ismailitypeSubmission)
  //       newErrors.ismailitypeSubmission = "Type required";
  //     if (!formData.ismailishoettext)
  //       newErrors.ismailishoettext = "Short text required";
  //     if (formData.IsmailiImages.length === 0)
  //       newErrors.IsmailiImages = "At least one image required";
  //   }

  //   return newErrors;
  // };

  const monthMap: { [key: string]: string } = {
    January: "01",
    February: "02",
    March: "03",
    April: '04',
    May: "05",
    June: "06",
    July: '07',
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12"
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("formData", formData);
    // const validationErrors = validateForm();
    // setShouldValidate(true);
    // setErrors(validationErrors);

    const formDataObj = new FormData();

    if (formData.jamatAnnouncement) {
      // if (Object.keys(validationErrors).length > 0) return;

      formDataObj.append("txtSubmittedBy", formData.submmitby);
      formDataObj.append("txtContact", formData.phoneno);
      formDataObj.append("txtEmail", formData.email);
      formDataObj.append("txtProgram", formData.nameOfPrograme);
      formDataObj.append("txtDateProgram", formData.dateOfProhgram);
      formDataObj.append("txtDateProgram", formData.timeofProgram);
      formDataObj.append(
        "chkAttendees",
        formData.numberofAttendences.toString()
      );
      formDataObj.append(
        "InsertRegistertionLink",
        formData.InsertRegistertionLink
      );
      formDataObj.append(
        "txtRegistrationLink",
        formData.isReistrerstionLink.toString()
      );
      // formDataObj.append("dateOfAnnocument", formData);
      const channelRequested: string[] = [];
      if (formData.jamatAnnouncement) {
        channelRequested.push("jamati-announcement");
      }
      if (formData.ismailiInsight) {
        channelRequested.push("ismaili-insight");
      }
      if (formData.ismailiApp) {
        channelRequested.push("ismaili-app");
      }
      if (formData.socialMedia) {
        channelRequested.push("social-media");
      }
      if (formData.other) {
        channelRequested.push("graphic-request");
      }

      formDataObj.append("channel_requested", channelRequested.join(","));
      formDataObj.append("ProgramVenueLocation", formData.ProgramVenueLocation);
      formDataObj.append("txtFirstWeek", formData.AnnocumnetVebiage);
      formDataObj.append("ismaili_insight_txtDate1", formData.ismailiStartDate);
      formDataObj.append("ismaili_insight_txtDate2", formData.ismailiendDate);
      // formDataObj.append("type_of_submission", formData.ismailitypeSubmission);
      formDataObj.append("submission_title", formData.ismailititle);
      formDataObj.append(
        "type_of_submission",
        formData.ismailitypeSubmission
      );
      console.log(monthMap[formData.dateOfAnnocument.month] + "this is upper ")
      const dateOfAnnocumenttemp = formData.dateOfAnnocument.year + "-" + monthMap[formData.dateOfAnnocument.month] + "-" + formData.dateOfAnnocument.day;
      formDataObj.append("txtDate1", dateOfAnnocumenttemp);
      formDataObj.append("ismaili_insight_short_text", formData.ismailishoettext);
      formDataObj.append("ismaili_insight_other_inststructions", formData.ismailiInstraction);
      formDataObj.append("txtComments", formData.jamatkhanascomment);

      formDataObj.append("ref_portfolio_cat", formData.portfolio.ref_category);
      formDataObj.append("drpBoard", formData.portfolio.portfolio_list);

      formData.channel.forEach((item) => formDataObj.append("channel[]", item));
      formDataObj.append("venue_addresses", formData.programVenue.join(","));
      // formData.programVenue.forEach((item) =>
      // );

      formDataObj.append("chkCommittee", formData.jamatkhanas.join(","))

      formData.personInfoImages.forEach((file) => {
        formDataObj.append(`images[]`, file);
      });
      formData.IsmailiImages.forEach((file) => {
        formDataObj.append("IsmailiImages[]", file);
      });

      console.log(formDataObj);

      try {
        const response = await fetch("/api/announcement", {
          method: "POST",
          body: formDataObj,
        });

        if (!response.ok) throw new Error("Submission failed");
        toast.success("Form submitted successfully");
        router.push("/admin/announcements");
        console.log("Form submitted successfully");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  };

  const guidelines: string[] = [
    "All submissions for communications to the Southwestern Jamat must be made through the Southwest Communications Portal.",
    "Please note that only one announcement per Friday is allowed.",
    "The Council Secretariat reserves the right to modify submissions.",
    "For more information view the Communication Policies for the Council.",
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Header />
      <main className="md:mx-auto rounded-2xl py-8 px-4">
        <GuidelinesSection guidelines={guidelines} />
        <form onSubmit={handleSubmit} className="space-y-8">
          <ChannelsSection formData={formData} setFormData={setFormData} />
          <ProgramInfoSection
            formData={formData}
            setFormData={setFormData}
            venues={venues}
            portfolioGroups={portfoliogroups}
            // errors={errors}
          // shouldValidate={shouldValidate}
          />
          {formData.jamatAnnouncement && (
            <JamatAnnouncementSection
              formData={formData}
              setFormData={setFormData}
              // errors={errors}
            />
          )}
          {formData?.ismailiInsight && (
            <NewsletterSection
              formData={formData}
              setFormData={setFormData}
              // errors={errors}
            />
          )}
          {/* 1 */}
          <JamatkhanaSection
            formData={formData}
            setFormData={setFormData}
            facilities={jamatkhanas}
          />
          <FormActions router={router} />
        </form>
      </main>
    </div>
  );
};

export default Form;
