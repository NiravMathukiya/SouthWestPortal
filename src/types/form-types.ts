export interface Portfolio {
  id:string;
  ref_category: string;
  portfolio_list: string;
}

export interface FormDataState {
  channel: string[];
  portfolio: Portfolio;
  submmitby: string;
  phoneno: string;
  email: string;
  nameOfPrograme: string;
  dateOfProhgram: string;
  timeofProgram: string;
  numberofAttendences: number;
  InsertRegistertionLink: string;
  isReistrerstionLink: boolean;
  personInfoImages: File[];
  programVenue: string[];
  dateOfAnnocument: { day: string; month: string; year: string };
  AnnocumnetVebiage: string;
  ismailiStartDate: string;
  ismailiendDate: string;
  ProgramVenueLocation: string;
  ismailititle: string;
  ismailitypeSubmission: string;
  ismailishoettext: string;
  ismailiInstraction: string;
  IsmailiImages: File[];
  jamatkhanas: string[];
  jamatkhanascomment: string;
  jamatAnnouncement: boolean;
  ismailiInsight: boolean;
  ismailiApp: boolean;
  socialMedia: boolean;
  other: boolean;
  // venues: string[];
  // portfoliogroups: Portfolio[];
  // jamatkhanasOpptions: string[];
}

export interface FormErrors {
  [key: string]: string | { [key: string]: string };
}
