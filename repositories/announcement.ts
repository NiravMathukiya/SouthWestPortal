import prisma from "@/lib/prisma";
import {
  addDraft,
  changeDate,
  checkBookingPortfolio,
  decrypt,
  encrypt,
  getAddresses,
  getAllPortfolios,
  getAnnouncementFiles,
  getChannelsRequestedTitle,
  getData,
  getDataIsmailiInsight,
  getFacilities,
  getIsmailiFiles,
  getLanguages,
  getNotifications,
  getOtherPortfolios,
  getPortfolio,
  getPortfolioBigRocks,
  getPortfolios,
  getPortfoliosCategories,
  getTranslators,
} from "./common_function";
// import { sendErrorResponse } from "@/utils/sendErrorResponse";
// import { user } from "@prisma/client";
// import { number } from "joi";
import { email_send } from "@/utils/senEmail";
import { uploadMultipleFilesToS3 } from "@/utils/s3client";
import { NextRequest } from "next/server";

interface GetPortalUpdatesInput {
  searchParams: URLSearchParams;
  limit: number;
  offset: number;
}

export async function ge_all_announcement(input: GetPortalUpdatesInput) {
  const { searchParams, limit, offset } = input;
  const { filterSql, filterString } = await buildFilters(searchParams);
  const sqlOrder = await buildOrder(searchParams);
  // console.log(filterSql, "filterSql")
  const baseTable = "ur_announcement";
  let countSql = `SELECT COUNT(*) as total FROM ${baseTable} WHERE 1=1 ${filterSql}`;
  // console.log(countSql)
  const countResult = await prisma.$queryRawUnsafe(countSql);
  const total = (countResult as any)[0]?.total ?? 0;
  const sql = `
  SELECT 
    a.form_id,
    a.ref_portfolio_cat,
    a.portfolio,
    a.txtPortfolio,
    a.drpBigRock,
    a.SubmittedBy,
    a.contact,
    a.email,
    a.program,
    a.dateprogram,
    a.chkDateProgram,
    a.chkUpcomingEvent,
    a.ongoingdate,
    a.timeprogram,
    a.ongoingtime,
    CAST(a.date1 AS CHAR) AS date1,
    CAST(a.date2 AS CHAR) AS date2,
    CAST(a.date3 AS CHAR) AS date3,
    a.venue,
    a.chkProgramVenue,
    a.chkAttendees,
    a.insurance,
    a.reviewed,
    a.rSpaceNeeded,
    a.translated,
    a.translatedF,
    a.translatedFF,
    a.language,
    a.languageF,
    a.languageFF,
    a.registration,
    a.txtRegistrationLink,
    a.registration_fields,
    a.registration_selected_options,
    a.committee,
    a.firstweek,
    a.rFirstWeekLanguage,
    a.firstweek_translated,
    a.twoweeks,
    a.txtTwoWeeks3,
    a.rFollowWeekLanguage,
    a.rFollowWeekLanguage3,
    a.twoweeks_translated,
    a.twoweeks_translated2,
    a.comments,
    CAST(a.date_added AS CHAR) AS date_added,
    CAST(a.date_modified AS CHAR) AS date_modified,
    a.ip_address,
    a.forwarded_ip,
    a.user_agent,
    a.admin_id,
    a.status,
    a.editable,
     a.channel_requested,
(
  SELECT JSON_ARRAYAGG(
    JSON_OBJECT(
      'new_filename', c.new_filename,
      'real_filename', c.real_filename
    )
  )
  FROM ur_announcement_files c 
  WHERE c.ref_id = a.form_id
) as files
  FROM ur_announcement a
  WHERE 1=1
    ${filterSql}
    ${sqlOrder}
  LIMIT ${input.limit} OFFSET ${input.offset};
`;

  const results = await prisma.$queryRawUnsafe(sql);
  const data = {
    results: results,
    facilities: await getFacilities(),
    getOtherPortfolios: getOtherPortfolios(),
    booking_portfolios_group: await getPortfolio(),
    booking_portfolios: await getAllPortfolios(),
    booking_portfolio_users: await getPortfoliosCategories(),
    boards: getPortfolios(),
    portfolioBigRocks: getPortfolioBigRocks(),
  };
  return {
    updates: data,
    total: Number(total),
  };
}

function buildFilters(query: URLSearchParams) {
  let filterSql = "";
  let filterString = "";

  const txtPortfolio = query.get("txtPortfolio");
  if (txtPortfolio) {
    filterSql += ` AND txtPortfolio LIKE '%${txtPortfolio}%'`;
    filterString += `&txtPortfolio=${encodeURIComponent(txtPortfolio)}`;
  }
  const drpBoard = query.get("drpBoard");
  if (drpBoard && drpBoard !== "") {
    filterSql += ` AND portfolio LIKE '%${drpBoard}%'`;
    filterString += `&drpBoard=${encodeURIComponent(drpBoard)}`;
  }

  const filter_chkCommittee = query.get("filter_chkCommittee");
  if (filter_chkCommittee) {
    // The PHP logic explodes by comma and does AND FIND_IN_SET for each
    const committees = filter_chkCommittee.split(",");
    filterSql += " AND (1=1";
    committees.forEach((c) => {
      filterSql += ` AND FIND_IN_SET('${c}', committee) <> 0`;
    });
    filterSql += ")";
    filterString += `&filter_chkCommittee=${encodeURIComponent(
      filter_chkCommittee
    )}`;
  }

  const filter_channel_requested = query.get("filter_channel_requested");
  if (filter_channel_requested) {
    filterSql += ` AND FIND_IN_SET('${filter_channel_requested}', channel_requested)`;
    filterString += `&filter_channel_requested=${encodeURIComponent(
      filter_channel_requested
    )}`;
  }

  const filter_program = query.get("filter_program");
  if (filter_program) {
    filterSql += ` AND program LIKE '%${filter_program}%'`;
    filterString += `&filter_program=${encodeURIComponent(filter_program)}`;
  }

  const filter_email = query.get("filter_email");
  if (filter_email) {
    filterSql += ` AND email LIKE '%${filter_email}%'`;
    filterString += `&filter_email=${encodeURIComponent(filter_email)}`;
  }

  const filter_from_dateprogram = query.get("filter_from_dateprogram");
  const filter_to_dateprogram = query.get("filter_to_dateprogram");
  if (filter_from_dateprogram && filter_to_dateprogram) {
    filterSql += ` AND dateprogram BETWEEN DATE('${filter_from_dateprogram}') AND DATE('${filter_to_dateprogram}')`;
    filterString += `&filter_from_dateprogram=${encodeURIComponent(
      filter_from_dateprogram
    )}&filter_to_dateprogram=${encodeURIComponent(filter_to_dateprogram)}`;
  }

  const filter_date1 = query.get("filter_date1");
  if (filter_date1) {
    filterSql += ` AND date1 LIKE '%${filter_date1}%'`;
    filterString += `&filter_date1=${encodeURIComponent(filter_date1)}`;
  }

  const filter_status = query.get("filter_status");
  if (filter_status) {
    filterSql += ` AND status = '${filter_status}'`;
    filterString += `&filter_status=${encodeURIComponent(filter_status)}`;
  }

  const filter_date_added = query.get("filter_date_added");
  if (filter_date_added) {
    filterSql += ` AND date_added LIKE '%${filter_date_added}%'`;
    filterString += `&filter_date_added=${encodeURIComponent(
      filter_date_added
    )}`;
  }

  return { filterSql, filterString };
}

function buildOrder(query: URLSearchParams): string {
  let sqlOrder = " ORDER BY form_id DESC ";
  const filter_channel_requested = query.get("filter_channel_requested");
  if (filter_channel_requested === "social-media") {
    sqlOrder = " ORDER BY dateprogram DESC ";
  }
  const sort = query.get("sort");
  const order = query.get("order");
  if (sort && order) {
    // sanitize sort column if necessary here to avoid injection
    sqlOrder = ` ORDER BY ${sort} ${order.toUpperCase()} `;
  }
  return sqlOrder;
}
interface userInput {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  name: string;
  isSuperAdmin: boolean;
  password: string;
  roles?: number[];
}

interface readInput {
  searchParams: URLSearchParams;
  user: userInput;
}

export async function read(input: readInput) {
  const { searchParams, user } = input;
  const encid = searchParams.get("encid");
  const formId = searchParams.get("form_id");
  try {
    let data: any = {
      disabledALL: false,
      disabled: false,
      isAdmin: false,
      isLateSubmission: false,
    };
    if (encid) {
      const decryptedId = decrypt(encid);
      data.formId = parseInt(decryptedId);
      data.disabledALL = true;
      data.disabled = true;
    } else if (formId) {
      data.formId = parseInt(formId);
    }
    console.log(user);
    // Check if user is admin
    if (user?.roles?.includes(1) || user?.roles?.includes(2)) {
      data.isAdmin = true;
    }

    // Setup Friday dates array
    const currentDay = new Date().getDay(); // 0 = Sunday, 6 = Saturday
    const defaultDate =
      currentDay === 5
        ? new Date().toISOString().split("T")[0] // If Friday, use today
        : new Date(Date.now() + ((5 - currentDay + 7) % 7) * 86400000)
            .toISOString()
            .split("T")[0]; // Next Friday

    const arrFridays = [defaultDate];
    for (let i = 1; i <= 16; i++) {
      const prevFriday = new Date(arrFridays[i - 1]);
      prevFriday.setDate(prevFriday.getDate() + 7);
      arrFridays.push(prevFriday.toISOString().split("T")[0]);
    }
    data.arrFridays = arrFridays;

    // Calculate time-based conditions
    const curTimeStamp = Date.now();
    let sundayNoon, mondayMidnight, lastFriday;

    // Get last Sunday noon
    const now = new Date();
    const lastSunday = new Date(now);
    lastSunday.setDate(now.getDate() - now.getDay());
    lastSunday.setHours(12, 0, 0, 0);
    sundayNoon = lastSunday.getTime();

    // Get last Monday midnight
    const lastMonday = new Date(now);
    const daysFromMonday = (now.getDay() + 6) % 7;
    lastMonday.setDate(now.getDate() - daysFromMonday);
    lastMonday.setHours(23, 59, 59, 0);
    mondayMidnight = lastMonday.getTime();

    // Get last Friday
    const lastFridayDate = new Date(lastMonday);
    lastFridayDate.setDate(lastFridayDate.getDate() - 3);
    lastFridayDate.setHours(23, 59, 59, 0);
    lastFriday = lastFridayDate.getTime();

    const date_diff = Math.ceil(
      (curTimeStamp - lastFriday) / (1000 * 60 * 60 * 24)
    );

    // Adjust dates based on current day
    const currentDayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
      now.getDay()
    ];

    if (currentDayName === "Sun") {
      const today = new Date();
      today.setHours(12, 0, 0, 0);
      sundayNoon = today.getTime();

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(23, 59, 59, 0);
      mondayMidnight = tomorrow.getTime();
    }

    if (currentDayName === "Mon") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(12, 0, 0, 0);
      sundayNoon = yesterday.getTime();

      const today = new Date();
      today.setHours(23, 59, 59, 0);
      mondayMidnight = today.getTime();
    }

    if (currentDayName === "Fri") {
      const today = new Date();
      today.setHours(23, 59, 59, 0);
      lastFriday = today.getTime();
    }

    // Set late submission flag
    if (curTimeStamp >= sundayNoon && curTimeStamp <= mondayMidnight) {
      data.isLateSubmission = true;
    }

    // Adjust Friday array if needed
    if (
      (curTimeStamp >= mondayMidnight && curTimeStamp <= lastFriday) ||
      (date_diff >= 4 && date_diff <= 7)
    ) {
      arrFridays.shift();
    }
    // Get supporting data
    data.portfolios = await getAllPortfolios();
    data.portfolioCategories = await getPortfoliosCategories();
    data.booking_portfolios_group = await getPortfolio();
    data.facilities = await getFacilities();
    data.addresses = await getAddresses();
    data.languages = await getLanguages();

    // Prepare address names array
    data.addressNames = data.addresses.map((addr: any) => addr.facility_name);

    data.username = user.first_name + " " + user.last_name || "";
    data.txtEmail = user.email;
    data.username_exists = await checkBookingPortfolio(
      data.portfolios,
      data.username
    );

    // If formId is provided, get form data
    if (data.formId) {
      data.messages = await getNotifications(data.formId);
      // console.log(formId, data.formId, "formIdformIdformIdformId")
      data.formData = await getData(data.formId);
      data.ismailiInsightData = await getDataIsmailiInsight(data.formId);
      data.announcementFiles = await getAnnouncementFiles(data.formId);
      data.ismailiFiles = await getIsmailiFiles(data.formId);
      // console.log(data.messages)
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

interface create_and_update_input {
  request: NextRequest;
  user: userInput;
}

export async function create_and_update(input: create_and_update_input) {
  try {
    const { request, user } = input;
    const formData = await request.formData();
    const all_data: Record<string, any> = {};
    formData.forEach((value, key) => {
      all_data[key] = value;
    });
    const { form_id, isNewSubmission, ...data } = all_data;
    const portfolio =
      data.drpBoard === "OTHER" ? data.txtPortfolio : data.drpBoard;
    const bigRock =
      data.drpBigRock === "OTHER" ? data.txtBigRock : data.drpBigRock;
    data.isAdmin = false;
    if (user?.roles?.includes(1) || user?.roles?.includes(2)) {
      data.isAdmin = true;
    }
    const dbData = {
      channel_requested: data.channel_requested,
      portfolio: data.drpBoard,
      txtPortfolio: data.txtPortfolio || "",
      drpBigRock: "OTHER",
      ref_portfolio_cat: data.ref_portfolio_cat || "",
      contact: data.txtContact || "",
      SubmittedBy: data.txtSubmittedBy || "",
      email: data.txtEmail || "",
      program: data.txtProgram || "",
      txtRegistrationLink: data.txtRegistrationLink || "",
      dateprogram: data.txtDateProgram || "",
      ongoingdate: Number(data.chkOnGoingDate) || 0,
      chkDateProgram: Number(data.chkDateProgram) || 0,
      chkProgramVenue: Number(data.chkProgramVenue) || 0,
      chkAttendees: Number(data.chkAttendees) || 0,
      timeprogram: data.txtTimeProgram || "",
      ongoingtime: Number(data.chkOnGoingTime) || 0,
      chkUpcomingEvent: Number(data.chkUpcomingEvent) || 0,
      date1: data.txtDate1
        ? new Date(await changeDate(data.txtDate1, true))
        : new Date("1970-01-01"),
      date2: data.txtDate2
        ? new Date(await changeDate(data.txtDate2, true))
        : new Date("1970-01-01"),
      date3: data.txtDate3
        ? new Date(await changeDate(data.txtDate3, true))
        : new Date("1970-01-01"),
      insurance: data.rInsurance || "0",
      reviewed: Number(data.rReviewed) || 0,
      rSpaceNeeded: Number(data.rSpaceNeeded) || 0,
      translated: Number(data.rTranslated) || 0,
      firstweek_translated: data.txtTranslated || "",
      language: data.txtLanguage || "",
      translatedF: Number(data.rTranslatedF) || 0,
      twoweeks_translated: data.txtTranslatedF || "",
      languageF: data.txtLanguageF || "",
      translatedFF: Number(data.rTranslatedFF) || 0,
      twoweeks_translated2: String(data.txtTranslatedFF) || "",
      languageFF: data.txtLanguageFF || "",
      registration: Number(data.rRegistration) || 0,
      registration_selected_options: data.registration_selected_options || "",
      registration_fields: data.registration_fields || "",
      committee: data.chkCommittee || "",
      firstweek: data.txtFirstWeek || "",
      rFirstWeekLanguage: data.rFirstWeekLanguage || "English",
      twoweeks: data.txtTwoWeeks || "",
      rFollowWeekLanguage: data.rFollowWeekLanguage || "English",
      rFollowWeekLanguage3: data.rFollowWeekLanguage3 || "English",
      txtTwoWeeks3: data.txtTwoWeeks3 || "",
      comments: data.txtComments || "",
      status: data.rStatus || 0,
    };
    if (!data.drpBoard || !data.txtProgram) {
      return {
        success: false,
        message: "provide the drpBoard and txtProgram",
      };
    }
    let formId = form_id ? parseInt(form_id) : null;
    if (formId) {
      await prisma.ur_announcement.update({
        where: { form_id: formId },
        data: {
          ...dbData,
          date_modified: new Date(),
        },
      });
      if (data.channel_requested.includes("ismaili-insight")) {
        const existing = await prisma.ur_ismaili_insight.findFirst({
          where: { ref_number: formId },
        });
        if (existing) {
          await prisma.ur_ismaili_insight.update({
            where: { form_id: existing.form_id },
            data: {
              ismaili_insight_txtDate1:
                new Date(data.ismaili_insight_txtDate1) || "",
              ismaili_insight_txtDate2:
                new Date(data.ismaili_insight_txtDate2) || "",
              type_of_submission: data.type_of_submission || "",
              submission_title: data.submission_title || "",
              ismaili_insight_short_text: data.ismaili_insight_short_text || "",
              ismaili_insight_other_inststructions:
                data.ismaili_insight_other_inststructions || "",
            },
          });
        } else {
          await prisma.ur_ismaili_insight.create({
            data: {
              ref_number: formId,
              ismaili_insight_txtDate1:
                new Date(data.ismaili_insight_txtDate1) || "",
              ismaili_insight_txtDate2:
                new Date(data.ismaili_insight_txtDate2) || "",
              type_of_submission: data.type_of_submission || "",
              submission_title: data.submission_title || "",
              ismaili_insight_short_text: data.ismaili_insight_short_text || "",
              ismaili_insight_other_inststructions:
                data.ismaili_insight_other_inststructions || "",
            },
          });
        }
      }
    } else {
      let rStatus = "0";
      const now = new Date();
      const dayOfWeek = now.getDay();

      // Calculate Tuesday 9:00 AM
      let tuesdayDate = new Date();
      const daysToTuesday = (2 - dayOfWeek + 7) % 7;
      tuesdayDate.setDate(tuesdayDate.getDate() + daysToTuesday);
      tuesdayDate.setHours(9, 0, 0, 0);

      // Calculate next Friday
      let fridayDate = new Date();
      const daysToFriday = (5 - dayOfWeek + 7) % 7;
      fridayDate.setDate(fridayDate.getDate() + daysToFriday);
      fridayDate.setHours(0, 0, 0, 0);

      // Set status based on timing rules
      if (now < tuesdayDate) {
        rStatus = "1";
      }

      if (now > tuesdayDate) {
        const date1 = data.txtDate1
          ? new Date(changeDate(data.txtDate1))
          : null;
        const date2 = data.txtDate2
          ? new Date(changeDate(data.txtDate2))
          : null;
        const date3 = data.txtDate3
          ? new Date(changeDate(data.txtDate3))
          : null;

        if (
          (date1 && fridayDate.getTime() === date1.getTime()) ||
          (date2 && fridayDate.getTime() === date2.getTime()) ||
          (date3 && fridayDate.getTime() === date3.getTime())
        ) {
          rStatus = "0";
        } else if (
          (date1 && fridayDate < date1) ||
          (date2 && fridayDate < date2) ||
          (date3 && fridayDate < date3)
        ) {
          rStatus = "1";
        }
      }
      if (data.isAdmin) {
        rStatus = "1";
      }
      const newAnnouncement = await prisma.ur_announcement.create({
        data: {
          ...dbData,
          date_added: new Date(),
          date_modified: new Date(),
          ip_address: request.headers.get("x-real-ip") || "",
          forwarded_ip: request.headers.get("x-forwarded-for") || "",
          user_agent: request.headers.get("user-agent") || "",
          admin_id: user?.user_id || 0,
          status: parseInt(rStatus),
        },
      });
      formId = newAnnouncement.form_id;
      console.log(
        dbData.date3.toISOString() === new Date("1970-01-01").toISOString()
      );
      await prisma.$executeRawUnsafe(
        `SET SESSION sql_mode = REPLACE(@@sql_mode, 'STRICT_TRANS_TABLES', '')`
      );
      let fields = [];
      let values = [];
      let updates = [];
      if (dbData.date1.toISOString() === new Date("1970-01-01").toISOString()) {
        fields.push("date1");
        values.push("0000-00-00");
        updates.push(`date1 = ?`);
      }
      if (dbData.date2.toISOString() === new Date("1970-01-01").toISOString()) {
        fields.push("date2");
        values.push("0000-00-00");
        updates.push(`date2 = ?`);
      }
      if (dbData.date3.toISOString() === new Date("1970-01-01").toISOString()) {
        fields.push("date3");
        values.push("0000-00-00");
        updates.push(`date3 = ?`);
      }

      if (updates.length > 0) {
        values.push(formId);
        const query = `
    UPDATE ur_announcement
    SET ${updates.join(", ")}
    WHERE form_id = ?
  `;
        await prisma.$executeRawUnsafe(query, ...values);
      }

      if (data.channel_requested.includes("ismaili-insight")) {
        await prisma.ur_ismaili_insight.create({
          data: {
            ref_number: formId,
            ismaili_insight_txtDate1:
              new Date(data.ismaili_insight_txtDate1) || "",
            ismaili_insight_txtDate2:
              new Date(data.ismaili_insight_txtDate2) || "",
            type_of_submission: data.type_of_submission || "",
            submission_title: data.submission_title || "",
            ismaili_insight_short_text: data.ismaili_insight_short_text || "",
            ismaili_insight_other_inststructions:
              data.ismaili_insight_other_inststructions || "",
          },
        });
      }

      // if (data.txtDate1 || data.txtDate2 || data.txtDate3) {
      //   const nextFriday = new Date();
      //   const daysToFriday = (5 - nextFriday.getDay() + 7) % 7;
      //   nextFriday.setDate(nextFriday.getDate() + daysToFriday);
      //   nextFriday.setHours(0, 0, 0, 0);
      //   const fridayNextWeek = new Date(nextFriday);
      //   fridayNextWeek.setDate(fridayNextWeek.getDate() + 7);
      //   const dateArr: { [key: number]: Date | null } = {
      //     1: data.txtDate1 ? new Date(changeDate(data.txtDate1)) : null,
      //     2: data.txtDate2 ? new Date(changeDate(data.txtDate2)) : null,
      //     3: data.txtDate3 ? new Date(changeDate(data.txtDate3)) : null
      //   };
      //   const draftData = {
      //     date_from: '',
      //     date_to: '',
      //     ip_address: request.headers.get('x-real-ip') || '',
      //     forwarded_ip: request.headers.get('x-forwarded-for') || '',
      //     user_agent: request.headers.get('user-agent') || '',
      //     admin_user: '1',
      //     receiver_email: ' ',
      //     sequence: '',
      //     status: 0,
      //     adminStatus: 0
      //   };
      //   for (const key of [1, 2, 3]) {
      //     if (dateArr[key] && fridayNextWeek <= dateArr[key]) {
      //       const draftStartDate = dateArr[key]?.toISOString().split('T')[0] || '';

      //       if (draftStartDate) {
      //         const draftEndDate = new Date(dateArr[key] as Date);
      //         draftEndDate.setDate(draftEndDate.getDate() + 14);
      //         await addDraft({
      //           ...draftData,
      //           date_from: draftStartDate,
      //           date_to: draftEndDate.toISOString().split('T')[0]
      //         });
      //       }
      //     }
      //   }
      // }
      // await handleSubmission(data, user);
    }

    const uploadResult = (await uploadMultipleFilesToS3(formData)) || {
      flpFlyerNew: [],
    };
    if (Object.keys(uploadResult).length != 0) {
      let { flpFlyerNew, flpIsmailiNew } = uploadResult;
      if (Array.isArray(flpFlyerNew)) {
        for (let i = 0; i < flpFlyerNew.length; i++) {
          await prisma.ur_announcement_files.create({
            data: {
              ref_id: formId,
              new_filename: flpFlyerNew[i].uploadedName,
              real_filename: flpFlyerNew[i].originalName,
              date_added: new Date(),
            },
          });
        }
      }
      if (Array.isArray(flpIsmailiNew)) {
        for (let i = 0; i < flpIsmailiNew.length; i++) {
          await prisma.ur_ismaili_insight_files.create({
            data: {
              ref_id: formId,
              new_filename: flpIsmailiNew[i].uploadedName,
              real_filename: flpIsmailiNew[i].originalName,
              date_added: new Date(),
            },
          });
        }
      }
    }

    return {
      success: true,
      message: "Form submitted successfully",
      formId,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function handleSubmission(
  form: any,
  user: any // express-session
) {
  const {
    ref_number,
    txtSubmittedBy,
    txtEmail,
    txtLanguage,
    txtLanguageF,
    txtLanguageFF,
    channel_requested,
    venue_addresses,
    type_of_submission,
    txtFirstWeek,
    ismaili_insight_txtDate1,
    ismaili_insight_txtDate2,
    form_id,
    rTranslated,
    rTranslatedF,
    rTranslatedFF,
  } = form;

  const enc_link = `${
    process.env.HTTP_ADMIN
  }/announcement/index.php?encid=${encrypt(ref_number)}`;

  // Send to translators if required
  if (!form_id && (rTranslated || rTranslatedF || rTranslatedFF)) {
    const translators = await getTranslators();

    for (const translator of translators) {
      const languages = [txtLanguage, txtLanguageF, txtLanguageFF].filter(
        Boolean
      );

      const html = `
        <html><body style="font-family: arial; font-size: 14px; color: #444;">
        <p>Hi ${translator.first_name},</p>
        <p>Please translate announcement text into following language(s):</p>
        <ol>${languages.map((lang) => `<li>${lang}</li>`).join("")}</ol>
        <p><a href="${
          process.env.HTTP_ADMIN
        }/announcement/index.php?form_id=${ref_number}">Click Here</a></p>
        <p>Thanks</p></body></html>
      `;
      await email_send({
        ToEmail: translator.email,
        Subject: `Announcement Translation Required - ${ref_number}`,
        emailBody: html,
      });
    }
  }

  // Send confirmation to submitter
  const tableRows = [
    ["Submitted By", txtSubmittedBy],
    channel_requested && [
      "Channels Requested",
      getChannelsRequestedTitle(channel_requested),
    ],
    venue_addresses?.length && [
      "Program Venue",
      `Various locations including ${venue_addresses.join(", ")}`,
    ],
    type_of_submission && ["Type of Submission", type_of_submission],
    txtFirstWeek && ["Announcement Verbiage", txtFirstWeek],
    ismaili_insight_txtDate1 && [
      "Publication Start Date",
      ismaili_insight_txtDate1,
    ],
    ismaili_insight_txtDate2 && [
      "Publication End Date",
      ismaili_insight_txtDate2,
    ],
  ]
    .filter(Boolean)
    .map(
      ([label, value]) => `
      <tr><td><strong>${label}</strong></td><td>${value}</td></tr>
    `
    )
    .join("");

  const htmlToSubmitter = `
    <p>Dear ${txtSubmittedBy},</p>
    <p>Thank you for submitting your communication request form through the Southwest Communications Portal. We have received your submission, and it is currently under review.</p>
    <p><strong>Details of Your Submission:</strong></p>
    <table border="1" cellpadding="4" cellspacing="0" style="border-collapse: collapse;">
      <tr style="background-color: #ccc;"><th>Details</th><th>Information</th></tr>
      ${tableRows}
    </table>
    <p>Our team will review the information and get back to you if any additional details or modifications are required. Please note that all submissions are subject to alignment with the Council and The Ismaili Digital Communication Guidelines.</p>
    <p>Thank you!</p>
    <p>Best regards,<br>Institutional Communications | Ismaili Council for the Southwestern USA</p>
  `;

  await email_send({
    ToEmail: txtEmail,
    Subject: `Communication Request Form Submission Received - ${ref_number}`,
    emailBody: htmlToSubmitter,
  });

  // Notify admin (if exists)
  if (user?.email) {
    const htmlToAdmin = `
      <html><body style="font-family: arial; font-size: 14px; color: #444;">
      <p>${txtSubmittedBy},</p>
      <p>Your communication request (${getChannelsRequestedTitle(
        channel_requested
      )}) has been submitted. We will proceed with publishing in the channels requested.</p>
      <p>Kindly note that once it is reviewed and up on the Jamati Events Calendar, Social Media, and/or the Ismaili App, you may proceed with publication via WhatsApp.</p>
      <p><a href="${enc_link}">Click Here</a></p>
      <p>Thank you,<br>Institutional Communications Team</p>
      </body></html>
    `;
    await email_send({
      ToEmail: user.email,
      Subject: `Announcement Submitted - ${ref_number}`,
      emailBody: htmlToAdmin,
    });
    if (
      channel_requested.includes("ismaili-insight") ||
      channel_requested.includes("social-media")
    ) {
      await email_send({
        ToEmail: "icsouthwestusa@gmail.com",
        Subject: `Announcement Submitted - ${ref_number}`,
        emailBody: htmlToAdmin,
      });
    }
  }
}

// if (formId && data.txtNotify) {
//   let edit_link = '';
//   if (data.rEditLink) {
//     edit_link = `${process.env.NEXT_PUBLIC_URL}/admin/announcement?encid=${encrypt(formId.toString())}`;
//   }

//   // Save notification
//   await prisma.ur_announcement_notice.create({
//     data: {
//       ref_id: formId,
//       message: data.txtNotify,
//       edit_link,
//       editable: parseInt(data.rEditLink || '0'),
//       date_added: new Date(),
//       admin_id: user?.id || 0
//     }
//   });
//   // await sendEmail(
//   //   data.txtEmail,
//   //   process.env.SUPPORT_EMAIL || '',
//   //   `${process.env.WEBSITE_NAME} | notification - ${formId}`,
//   //   `<p>${data.txtNotify}</p>${edit_link ? `<p><a href="${edit_link}">Click here for editing announcement text</a></p>` : ''}`
//   // );
// }
