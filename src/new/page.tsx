// "use client";

// import { useState, DragEvent, ChangeEvent, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import {
//   useForm,
//   FieldErrors,
//   UseFormRegister,
//   UseFormWatch,
//   UseFormSetValue,
// } from "react-hook-form";
// import Header from "@/components/new-request/header";
// import GuidelinesSection from "@/components/new-request/guidelines-section";
// import ChannelsSection from "@/components/new-request/channels-section";
// import ProgramInfoSection from "@/components/new-request/program-info-section";
// import JamatAnnouncementSection from "@/components/new-request/jamat-announcement-section";
// import NewsletterSection from "@/components/new-request/newsletter-section";
// import JamatkhanaSection from "@/components/new-request/jamatkhana-section";
// import FormActions from "@/components/new-request/form-actions";
// import axios from "axios";

// // import Header from "../../../components/new-request/header";
// // import GuidelinesSection from "../../../components/new-request/guidelines-section";
// // import ChannelsSection from "../../../components/new-request/channels-section";
// // import ProgramInfoSection from "../../../components/new-request/program-info-section";
// // import JamatAnnouncementSection from "../../../components/new-request/jamat-announcement-section";
// // import NewsletterSection from "../../../components/new-request/newsletter-section";
// // import JamatkhanaSection from "../../../components/new-request/jamatkhana-section";
// // import FormActions from "../../../components/new-request/form-actions";

// // Form input structure
// export type FormData = {
//   email: string;
//   programLocation: string,
//   phoneNumber: string,
//   programTime: string,
//   programName: string,
//   submittedBy: string,
//   attendees: string,
//   programDate: string,
//   portfolioMember: string,
//   registration: boolean,
//   publicationEndDate: string,
//   channels: {
//     jamatAnnouncement: boolean;
//     ismailiInsight: boolean;
//     ismailiApp: boolean;
//     socialMedia: boolean;
//     graphicRequest: boolean;
//   };
//   // programVenue: {
//   //   austin: boolean;
//   //   austinDowntown: boolean;
//   //   austinSouth: boolean;
//   //   beaumont: boolean;
//   //   houstonHq: boolean;
//   //   houstonPrincipal: boolean;
//   //   katy: boolean;
//   //   sanAntonio: boolean;
//   //   spring: boolean;
//   //   sugarLand: boolean;
//   //   clearLake: boolean;
//   //   collegeStation: boolean;
//   //   corpusChristi: boolean;
//   //   harvestGreen: boolean;
//   // };

//   programVenue: string[];
//   customVenues: string[];
//   jamatkhanas: {
//     acstCorpusChristi: boolean;
//     acstSanAntonio: boolean;
//     acctCollegeStation: boolean;
//     acctAustinSouth: boolean;
//     acctAustin: boolean;
//     ghClearLake: boolean;
//     ghKaty: boolean;
//     ghHeadquarters: boolean;
//     ghPrincipal: boolean;
//     ghHarvestGreen: boolean;
//     ghSugarLand: boolean;
//     ghBeaumont: boolean;
//     ghSpring: boolean;
//   };
//   firstAnnouncement: {
//     day: string;
//     month: string;
//     year: string;
//     text: string;
//   };
//   noProgramDate: boolean;
//   noProgramTime: boolean;
//   noAttendeesNumber: boolean;
//   requiresRegistration: "yes" | "no";
//   files: File[];
//   newsletterFiles: File[];
// };

// // Props shared with children
// type FormProps = {
//   register: UseFormRegister<FormData>;
//   errors: FieldErrors<FormData>;
//   watch: UseFormWatch<FormData>;
//   setValue: UseFormSetValue<FormData>;
//   newVenue: string;
//   setNewVenue: React.Dispatch<React.SetStateAction<string>>;
//   showInput: boolean;
//   setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
//   files: File[];
//   newsletterFiles: File[];
//   handleFileDrop: (e: DragEvent<HTMLDivElement>) => void;
//   handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
//   handleNewsletterFileDrop: (e: DragEvent<HTMLDivElement>) => void;
//   handleNewsletterFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
//   handleAddVenue: (venue: string) => void;
//   watchChannels: FormData["channels"];
//   watchProgramVenue: FormData["programVenue"];
//   watchCustomVenues: string[];
// };

// export default function NewRequestPage() {
//   const router = useRouter();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     formState: { errors },
//   } = useForm<FormData>({
//     defaultValues: {

//       email: "",
//       programLocation: "",
//       phoneNumber: "",
//       programTime: "",
//       programName: "",
//       submittedBy: "",
//       attendees: "",
//       programDate: "",
//       portfolioMember: "",
//       publicationEndDate: "",
//       registration: false,
//       channels: {
//         jamatAnnouncement: false,
//         ismailiInsight: false,
//         ismailiApp: false,
//         socialMedia: false,
//         graphicRequest: false,
//       },
//       // programVenue: {
//       //   austin: false,
//       //   austinDowntown: false,
//       //   austinSouth: false,
//       //   beaumont: false,
//       //   houstonHq: false,
//       //   houstonPrincipal: false,
//       //   katy: false,
//       //   sanAntonio: false,
//       //   spring: false,
//       //   sugarLand: false,
//       //   clearLake: false,
//       //   collegeStation: false,
//       //   corpusChristi: false,
//       //   harvestGreen: false,
//       // },
//       programVenue: [],
//       customVenues: [],
//       jamatkhanas: {
//         acstCorpusChristi: false,
//         acstSanAntonio: false,
//         acctCollegeStation: false,
//         acctAustinSouth: false,
//         acctAustin: false,
//         ghClearLake: false,
//         ghKaty: false,
//         ghHeadquarters: false,
//         ghPrincipal: false,
//         ghHarvestGreen: false,
//         ghSugarLand: false,
//         ghBeaumont: false,
//         ghSpring: false,
//       },
//       firstAnnouncement: {
//         day: "21",
//         month: "May",
//         year: "2024",
//         text: "",
//       },
//       noProgramDate: false,
//       noProgramTime: false,
//       noAttendeesNumber: false,
//       requiresRegistration: "no",
//       files: [],
//       newsletterFiles: [],
//     },
//   });

//   const [newVenue, setNewVenue] = useState<string>("");
//   const [showInput, setShowInput] = useState<boolean>(false);
//   const [files, setFiles] = useState<File[]>([]);
//   const [newsletterFiles, setNewsletterFiles] = useState<File[]>([]);

//   const [portfolioGroups, setPortfolioOptions] = useState<object[]>([]);
//   const [facilities, setFacilities] = useState<object[]>([]);
//   const [addressNames, setAddressNames] = useState<string[]>([]);

//   const watchChannels = watch("channels");
//   const watchProgramVenue = watch("programVenue");
//   const watchCustomVenues = watch("customVenues");

//   const handleAddVenue = (venue: string) => {
//     if (venue.trim()) {
//       const updatedVenues = [...watchCustomVenues, venue];
//       setValue("customVenues", updatedVenues);
//       setNewVenue("");
//       setShowInput(false);
//     }
//   };

//   useEffect(() => {
//     const fetchPortfolioMembers = async () => {
//       try {
//         const res = await axios.get("/api/announcement?data_get=true")
//         const options = res.data.data.portalupdates.booking_portfolios_group || []
//         console.log(res.data.data.portalupdates.addressNames, "aaaaaaaaaaaaa")
//         setAddressNames(res.data.data.portalupdates.addressNames || [])
//         setFacilities(res.data.data.portalupdates.facilities)
//         setPortfolioOptions(options)
//       } catch (error) {
//         console.error("Failed to fetch portfolio members", error)
//       }
//     }

//     fetchPortfolioMembers()
//   }, [])

//   const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     const updatedFiles = [...files, ...droppedFiles];
//     setFiles(updatedFiles);
//     setValue("files", updatedFiles);
//   };

//   const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(e.target.files || []);
//     const updatedFiles = [...files, ...selectedFiles];
//     setFiles(updatedFiles);
//     setValue("files", updatedFiles);
//   };

//   const handleNewsletterFileDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     const droppedFiles = Array.from(e.dataTransfer.files);
//     const updatedFiles = [...newsletterFiles, ...droppedFiles];
//     setNewsletterFiles(updatedFiles);
//     setValue("newsletterFiles", updatedFiles);
//   };

//   const handleNewsletterFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(e.target.files || []);
//     const updatedFiles = [...newsletterFiles, ...selectedFiles];
//     setNewsletterFiles(updatedFiles);
//     setValue("newsletterFiles", updatedFiles);
//   };

//   const onSubmit = async (data: FormData) => {
//     try {
//       const formDataToSend = new FormData();
//       formDataToSend.append("drpBoard", data.portfolioMember);
//       formDataToSend.append("txtSubmittedBy", data.submittedBy);
//       formDataToSend.append("txtEmail", data.email);
//       formDataToSend.append("txtContact", data.phoneNumber);
//       formDataToSend.append("txtProgram", data.programName);
//       formDataToSend.append("txtDateProgram", data.programDate);
//       formDataToSend.append("txtTimeProgram", data.programTime);
//       formDataToSend.append("chkAttendees", data.attendees);


//       formDataToSend.append("venue_addresses", data.programVenue.join(","));
//       formDataToSend.append("txtRegistrationLink", String(data.registration));
//       formDataToSend.append("flpFlyerNew", data.files[0]);
//       formDataToSend.append("txtDate1", String(new Date(parseInt(data.firstAnnouncement.year), parseInt(data.firstAnnouncement.month) - 1, parseInt(data.firstAnnouncement.day)).getTime()));
//       // formDataToSend.append("txtFirstWeek", data.);

//       const result = Object.entries(data.jamatkhanas)
//         .filter(([key, value]) => value === true)
//         .map(([key]) => key)
//         .join(", ");
//       formDataToSend.append("chkCommittee", result);
//       // formDataToSend.append("txtComments", );

//       formDataToSend.append("ismaili_insight_txtDate1", String(new Date(parseInt(data.firstAnnouncement.year), parseInt(data.firstAnnouncement.month) - 1, parseInt(data.firstAnnouncement.day)).getTime())));
//       formDataToSend.append("ismaili_insight_txtDate2", data.publicationEndDate);
//       // formDataToSend.append("type_of_submission",data.t);





//       const payload = {
//         ...data,
//         files,
//         newsletterFiles,
//       };



//       // Optional: use FormData for file uploads

//       // Append text data
//       formDataToSend.append("payload", JSON.stringify(payload));

//       // Append file data
//       files.forEach((file, index) => {
//         formDataToSend.append(`files[${index}]`, file);
//       });

//       newsletterFiles.forEach((file, index) => {
//         formDataToSend.append(`newsletterFiles[${index}]`, file);
//       });

//       console.log(payload)

//       await axios.post("/api/new-request", formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("Form submitted successfully!");
//       router.push("/");
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Error submitting form. Please try again.");
//     }
//   };

//   const formProps: FormProps = {
//     register,
//     errors,
//     watch,
//     setValue,
//     newVenue,
//     setNewVenue,
//     showInput,
//     setShowInput,
//     files,
//     newsletterFiles,
//     handleFileDrop,
//     handleFileSelect,
//     handleNewsletterFileDrop,
//     handleNewsletterFileSelect,
//     handleAddVenue,
//     watchChannels,
//     watchProgramVenue,
//     watchCustomVenues,
//   };

//   const guidelines: string[] = [
//     "All submissions for communications to the Southwestern Jamat must be made through the Southwest Communications Portal.",
//     "Please note that only one announcement per Friday is allowed. For additional announcement requests, please contact the Council Secretariat.",
//     "The Council Secretariat and Institutional Communications Portfolio reserves the right to modify any submissions to align with the Council and The Ismaili Digital Communication Guidelines.",
//     "For more information and guidance on how to submit your communication requests, view the Communication Policies for The Ismaili Council for The Southwestern United States",
//   ];
//   console.log(`formPropsformPropsformPropsformPropsformPropsformProps`, formProps)
//   return (
//     <div className="min-h-screen bg-gray-50 w-full">
//       <Header />

//       <main className="md:mx-auto rounded-2xl py-8 px-4">
//         <GuidelinesSection guidelines={guidelines} />

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//           <ChannelsSection formProps={formProps} />
//           <ProgramInfoSection addressNames={addressNames} formProps={formProps} portfolioGroups={portfolioGroups} />
//           {watchChannels?.jamatAnnouncement && (
//             <JamatAnnouncementSection formProps={formProps} />
//           )}
//           {watchChannels?.ismailiInsight && (
//             <NewsletterSection formProps={formProps} />
//           )}
//           <JamatkhanaSection formProps={formProps} facilities={facilities} />
//           <FormActions router={router} />
//         </form>
//       </main>
//     </div>
//   );
// }
