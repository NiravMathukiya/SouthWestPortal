"use client";

import ChannelsSection from "@/components/new-request/channels-section";
import GuidelinesSection from "@/components/new-request/guidelines-section";
import Header from "@/components/new-request/header";
import JamatAnnouncementSection from "@/components/new-request/jamat-announcement-section";
import JamatkhanaSection, {
  type Facility,
} from "@/components/new-request/jamatkhana-section";
import NewsletterSection from "@/components/new-request/newsletter-section";
import ProgramInfoSection from "@/components/new-request/program-info-section";
import type { FormDataState, PortfolioGroup } from "@/types/form-types";
import axios from "axios";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// Custom Skeleton Component
const SkeletonBox = ({
  className = "",
  width = "w-full",
  height = "h-4",
}: {
  className?: string;
  width?: string;
  height?: string;
}) => (
  <div
    className={`${width} ${height} bg-gray-200 rounded animate-pulse ${className}`}
  />
);

// Skeleton Components
const HeaderSkeleton = () => (
  <div className="bg-white shadow-sm border-b">
    <div className="max-w-7xl mx-auto px-4 py-6">
      <SkeletonBox width="w-64" height="h-8" className="mb-2" />
      <SkeletonBox width="w-96" height="h-4" />
    </div>
  </div>
);

const GuidelinesSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
    <SkeletonBox width="w-48" height="h-6" className="mb-4" />
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-start space-x-2">
          <SkeletonBox
            width="w-4"
            height="h-4"
            className="rounded-full mt-1 flex-shrink-0"
          />
          <SkeletonBox width="w-full" height="h-4" />
        </div>
      ))}
    </div>
  </div>
);

const ChannelsSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <div className="mb-4">
      <SkeletonBox width="w-64" height="h-6" className="mb-2" />
      <SkeletonBox width="w-96" height="h-4" />
    </div>
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center space-x-3">
          <SkeletonBox
            width="w-5"
            height="h-5"
            className="rounded flex-shrink-0"
          />
          <SkeletonBox width="w-48" height="h-5" />
        </div>
      ))}
    </div>
  </div>
);

const ProgramInfoSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <SkeletonBox width="w-48" height="h-6" className="mb-6" />
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-2">
            <SkeletonBox width="w-32" height="h-4" />
            <SkeletonBox width="w-full" height="h-10" className="rounded-md" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <SkeletonBox width="w-32" height="h-4" />
        <SkeletonBox width="w-full" height="h-24" className="rounded-md" />
      </div>
    </div>
  </div>
);

const ConditionalSectionSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <SkeletonBox width="w-48" height="h-6" className="mb-6" />
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <SkeletonBox width="w-32" height="h-4" />
          <SkeletonBox width="w-full" height="h-10" className="rounded-md" />
        </div>
      ))}
      <div className="space-y-2">
        <SkeletonBox width="w-40" height="h-4" />
        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8">
          <div className="text-center">
            <SkeletonBox
              width="w-16"
              height="h-16"
              className="mx-auto mb-4 rounded-lg"
            />
            <SkeletonBox width="w-48" height="h-4" className="mx-auto mb-2" />
            <SkeletonBox width="w-32" height="h-4" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const JamatkhanaSkeleton = () => (
  <div className="bg-white rounded-lg shadow-sm border p-6">
    <div className="mb-6">
      <SkeletonBox width="w-48" height="h-6" className="mb-2" />
      <SkeletonBox width="w-64" height="h-4" />
    </div>
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="flex items-center space-x-2">
            <SkeletonBox
              width="w-4"
              height="h-4"
              className="rounded flex-shrink-0"
            />
            <SkeletonBox width="w-full" height="h-4" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <SkeletonBox width="w-32" height="h-4" />
        <SkeletonBox width="w-full" height="h-20" className="rounded-md" />
      </div>
    </div>
  </div>
);

const FormActionsSkeleton = () => (
  <div className="flex justify-end space-x-4 pt-6">
    <SkeletonBox width="w-24" height="h-10" className="rounded-md" />
    <SkeletonBox width="w-32" height="h-10" className="rounded-md" />
  </div>
);

const FormSkeleton = () => (
  <div className="min-h-screen bg-gray-50 w-full">
    <HeaderSkeleton />
    <main className="md:mx-auto rounded-2xl py-8 px-4 max-w-4xl">
      <GuidelinesSkeleton />
      <div className="space-y-8">
        <ChannelsSkeleton />
        <ProgramInfoSkeleton />
        <ConditionalSectionSkeleton />
        <ConditionalSectionSkeleton />
        <JamatkhanaSkeleton />
        <FormActionsSkeleton />
      </div>
    </main>
  </div>
);

// Loading Spinner Component
// const LoadingSpinner = () => (
//   <div className="flex items-center justify-center min-h-screen bg-gray-50">
//     <div className="flex flex-col items-center space-y-4">
//       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       <p className="text-gray-600 text-sm">Loading form data...</p>
//     </div>
//   </div>
// )

const Form = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  // const id = params.id
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormDataState>({
    jamatAnnouncement: false,
    ismailiInsight: false,
    ismailiApp: false,
    socialMedia: false,
    other: false,
    channel: [],
    portfolio: { id: "", ref_category: "", portfolio_list: "", label: "" },
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
    jamatkhanas: [],
    ismailiInstraction: "",
    IsmailiImages: [],
    jamatkhanascomment: "",
  });

  const monthMap: { [key: string]: string } = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const [venues, setVenues] = useState<string[]>([]);
  const [portfoliogroups, setPortfoliogroups] = useState<PortfolioGroup[]>([]);
  const [jamatkhanas, setJamatkhanas] = useState<Facility[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Add a minimum loading time for better UX
        const [response] = await Promise.all([
          axios.get("/api/announcement?data_get=true"),
          new Promise((resolve) => setTimeout(resolve, 1500)), // Minimum 1.5 second loading
        ]);

        setVenues(response.data.data.portalupdates.addressNames);
        setPortfoliogroups(
          response.data.data.portalupdates.booking_portfolios_group
        );
        setJamatkhanas(response.data.data.portalupdates.facilities);

        // Now fetch form data after portfolioGroups is set
        const formResponse = await axios.get(
          `/api/announcement?form_id=${params.id}`
        );
        const data = formResponse.data.data.portalupdates.formData[0];
        const insightData =
          formResponse.data.data.portalupdates?.ismailiInsightData?.[0];

        const reverseMonthMap = Object.fromEntries(
          Object.entries(monthMap).map(([k, v]) => [v, k])
        );

        console.log(data?.committee?.split(","));

        // Find portfolio ID using the updated portfolioGroups data
        let portfolioId = "";
        response.data.data.portalupdates.booking_portfolios_group.forEach(
          (group: PortfolioGroup) => {
            if (group.ref_category === data.ref_portfolio_cat) {
              group.portfolio_list.split(",").forEach((item) => {
                const [id, label] = item.split(":");
                if (label.trim() === data.portfolio) {
                  portfolioId = id;
                }
              });
            }
          }
        );

        function convertTo24Hour(time12h: string): string {
          const [time, modifier] = time12h.split(" ");
          const times = time.split(":").map(Number);
          let hours = times[0];
          const minutes = times[1];

          if (modifier?.toLowerCase() === "pm" && hours < 12) {
            hours += 12;
          }
          if (modifier?.toLowerCase() === "am" && hours === 12) {
            hours = 0;
          }

          // Pad with leading zeros
          const formattedHours = hours?.toString()?.padStart(2, "0");
          const formattedMinutes = minutes?.toString()?.padStart(2, "0");

          return `${formattedHours}:${formattedMinutes}`;
        }

        setFormData((prev) => ({
          ...prev,
          submmitby: data?.SubmittedBy || "",
          phoneno: data?.contact || "",
          email: data?.email || "",
          nameOfPrograme: data?.program || "",
          dateOfProhgram: data?.dateprogram || "",
          timeofProgram: data?.timeprogram
            ? convertTo24Hour(data?.timeprogram)
            : "",
          numberofAttendences: data?.chkAttendees || 0,
          InsertRegistertionLink: data?.txtRegistrationLink || "",
          isReistrerstionLink: data?.registration === 1,
          ProgramVenueLocation: data?.venue || "",
          jamatAnnouncement: data?.channel_requested?.includes("announcement"),
          ismailiApp: data?.channel_requested?.includes("ismaili-app"),
          ismailiInsight: data?.channel_requested?.includes("ismaili-insight"),
          socialMedia: data?.channel_requested?.includes("social-media"),
          programVenue: data?.venue?.split(","),
          jamatkhanas: data?.committee?.split(",") ,

          ismailiStartDate:
            insightData?.ismaili_insight_txtDate1?.split("T")[0] || "",
          ismailiendDate:
            insightData?.ismaili_insight_txtDate2?.split("T")[0] || "",
          ismailitypeSubmission: insightData?.type_of_submission || "",
          ismailititle: insightData?.submission_title || "",
          ismailishoettext: insightData?.ismaili_insight_short_text || "",
          ismailiInstraction:
            insightData?.ismaili_insight_other_inststructions || "",
          dateOfAnnocument: {
            day: data.dateprogram.split("-")[2],
            month: reverseMonthMap[data.dateprogram.split("-")[1]],
            year: data.dateprogram.split("-")[0],
          },
          AnnocumnetVebiage: data.firstweek,
          jamatkhanascomment: data.comments,

          channel: data.channels,
          portfolio: {
            id: portfolioId,
            ref_category: data?.ref_portfolio_cat || "",
            portfolio_list: data?.portfolio || "",
            label: data?.portfolio || "",
          },
        }));
      } catch (error) {
        console.log("Error fetching data:", error);
        toast.error("Failed to load form data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    console.log("formData", formData);
    setIsSubmitting(true);

    try {
      const formDataObj = new FormData();

      // Only proceed if at least one channel is selected
      if (
        formData?.jamatAnnouncement ||
        formData?.ismailiInsight ||
        formData?.ismailiApp ||
        formData?.socialMedia ||
        formData?.other
      ) {
        formDataObj.append("txtSubmittedBy", formData.submmitby || "");
        formDataObj.append("txtContact", formData.phoneno || "");
        formDataObj.append("txtEmail", formData.email || "");
        formDataObj.append("txtProgram", formData.nameOfPrograme || "");
        formDataObj.append("txtDateProgram", formData.dateOfProhgram || "");
        formDataObj.append("txtTimeProgram", formData.timeofProgram || ""); // Fixed duplicate key
        formDataObj.append(
          "chkAttendees",
          formData.numberofAttendences?.toString() || ""
        );
        formDataObj.append(
          "InsertRegistertionLink",
          formData.InsertRegistertionLink || ""
        );
        formDataObj.append(
          "txtRegistrationLink",
          formData.isReistrerstionLink?.toString() || ""
        );

        const channelRequested: string[] = [];
        if (formData.jamatAnnouncement)
          channelRequested.push("jamati-announcement");
        if (formData.ismailiInsight) channelRequested.push("ismaili-insight");
        if (formData.ismailiApp) channelRequested.push("ismaili-app");
        if (formData.socialMedia) channelRequested.push("social-media");
        if (formData.other) channelRequested.push("graphic-request");

        formDataObj.append("channel_requested", channelRequested.join(","));
        formDataObj.append(
          "ProgramVenueLocation",
          formData.ProgramVenueLocation || ""
        );
        formDataObj.append("txtFirstWeek", formData.AnnocumnetVebiage || "");

        if (formData.ismailiInsight) {
          formDataObj.append(
            "ismaili_insight_txtDate1",
            formData.ismailiStartDate || ""
          );
          formDataObj.append(
            "ismaili_insight_txtDate2",
            formData.ismailiendDate || ""
          );
          formDataObj.append("submission_title", formData.ismailititle || "");
          formDataObj.append(
            "type_of_submission",
            formData.ismailitypeSubmission || ""
          );
          formDataObj.append(
            "ismaili_insight_short_text",
            formData.ismailishoettext || ""
          );
          formDataObj.append(
            "ismaili_insight_other_inststructions",
            formData.ismailiInstraction || ""
          );
        }

        if (formData.jamatAnnouncement) {
          if (formData.dateOfAnnocument) {
            const dateOfAnnocumenttemp =
              formData.dateOfAnnocument.year +
              "-" +
              monthMap[formData.dateOfAnnocument.month] +
              "-" +
              formData.dateOfAnnocument.day;
            formDataObj.append("txtDate1", dateOfAnnocumenttemp);
          }
        }

        formDataObj.append("txtComments", formData.jamatkhanascomment || "");

        formDataObj.append(
          "ref_portfolio_cat",
          formData.portfolio?.ref_category || ""
        );
        formDataObj.append(
          "drpBoard",
          formData.portfolio?.portfolio_list || ""
        );

        formData.channel?.forEach((item) =>
          formDataObj.append("channel[]", item)
        );
        formDataObj.append(
          "venue_addresses",
          formData.programVenue?.join(",") || ""
        );
        formDataObj.append(
          "chkCommittee",
          formData.jamatkhanas?.join(",") || ""
        );
        if (formData.personInfoImages) {
          formData.personInfoImages?.forEach((file) => {
            formDataObj.append(`images[]`, file);
          });
        }

        if (formData.ismailiInsight) {
          formData.IsmailiImages?.forEach((file) => {
            formDataObj.append("IsmailiImages[]", file);
          });
        }

        formDataObj.append("form_id", params.id || "");

        console.log("Submitting form data...");

        const response = await fetch(`/api/announcement`, {
          method: "POST",
          body: formDataObj,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Submission failed");
        }

        toast.success("Form submitted successfully");
        router.push("/admin/announcements");
      } else {
        toast.error("Please select at least one channel");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(error?.message || "Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  const guidelines: string[] = [
    "All submissions for communications to the Southwestern Jamat must be made through the Southwest Communications Portal.",
    "Please note that only one announcement per Friday is allowed.",
    "The Council Secretariat reserves the right to modify submissions.",
    "For more information view the Communication Policies for the Council.",
  ];

  // Show skeleton loading while data is being fetched
  if (isLoading) {
    return <FormSkeleton />;
  }

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
          />
          {formData.jamatAnnouncement && (
            <JamatAnnouncementSection
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {formData?.ismailiInsight && (
            <NewsletterSection formData={formData} setFormData={setFormData} />
          )}
          <JamatkhanaSection
            formData={formData}
            setFormData={setFormData}
            facilities={jamatkhanas}
          />

          {/* Form Actions with Loading State */}
          <div className="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isSubmitting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              <span>{isSubmitting ? "Submitting..." : "Submit Form"}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Form;
