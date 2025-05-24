import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';


export function changeDate(date: string, reverse = false): string {
  try {
    if (!date) return '';

    const arrDate = date.split('-');
    if (arrDate.length !== 3) return '';

    return reverse
      ? `${arrDate[1]}-${arrDate[2]}-${arrDate[0]}` // MM-DD-YYYY
      : `${arrDate[2]}-${arrDate[0]}-${arrDate[1]}`; // DD-YYYY-MM
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}
// lib/encryption.ts
import crypto from 'crypto';
const algorithm = 'aes-256-cbc';
const key = process.env.ENCRYPTION_KEY!;
const iv = process.env.ENCRYPTION_IV!;
export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

export function decrypt(encryptedText: string): string {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}


export async function getAllPortfolios() {
  try {
    const result = await prisma.ur_portfolios.findMany({
      where: {
        status: 1,
      },
      orderBy: {
        txtPortfolio: 'asc',
      },
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}
export async function getOtherPortfolios() {
  try {
    return await prisma.ur_announcement.findMany({
      where: {
        portfolio: {
          startsWith: 'Other_'
        }
      },
      orderBy: {
        txtPortfolio: 'asc'
      },
      select: {
        txtPortfolio: true,
        portfolio: true
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}
export async function getPortfoliosCategories() {
  try {
    return await prisma.ur_portfolios_category.findMany({
      where: {
        status: 1,
      },
      orderBy: [
        { sort_order: 'asc' },
        { category_name: 'asc' },
      ],
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}
export async function getPortfolios() {
  try {
    const portfolios = await prisma.ur_portfolio.findMany({
      where: {
        status: 1,
      },
      orderBy: { title: 'asc' },
      select: { title: true },
    });
    return portfolios.map(p => p.title);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}
export async function getPortfolioBigRocks() {
  try {
    return await prisma.ur_portfolio.findMany({
      where: { status: 1 },
      orderBy: { title: 'asc' },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}
export async function getPortfolio() {
  try {
    const query = Prisma.sql`
      SELECT 
        GROUP_CONCAT(CONCAT(portfolio_id, ':', txtPortfolio, ':', ref_category)) AS portfolio_list,
        ref_category 
      FROM ur_portfolios
      WHERE status = 1
      GROUP BY ref_category
    `;

    const result = await prisma.$queryRaw<typeof query>(query);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function getFacilities() {
  try {
    const query = Prisma.sql`
     SELECT GROUP_CONCAT(address_id, ':', facility_name) AS booking_address,
            facility_type
     FROM ur_booking_address
     WHERE status = 1
     GROUP BY facility_type
     ORDER BY facility_type DESC
   `;
    const result = await prisma.$queryRaw<typeof query>(query);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function getAddresses() {
  try {
    const query = Prisma.sql`
     SELECT * FROM ur_booking_address
     WHERE status = 1
     ORDER BY facility_name ASC
   `;

    const result = await prisma.$queryRaw<typeof query>(query);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function getLanguages() {
  try {
    const query = Prisma.sql`
      SELECT * FROM ur_language
      WHERE status = 1
      ORDER BY sort_order ASC
    `;
    const result = await prisma.$queryRaw<typeof query>(query);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

type Translator = {
  first_name: string;
  email: string;
  // Add any other fields returned by your query
};

export async function getTranslators(): Promise<Translator[]> {
  try {
    const query = Prisma.sql`
      SELECT * FROM ur_admin_user
      WHERE admin_role = '4'
      ORDER BY first_name ASC
    `;

    const result = await prisma.$queryRaw<Translator[]>(query);
    return result || [];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}


export async function getNotifications(ref_id: number) {
  try {
    const query = Prisma.sql`
      SELECT * FROM ur_announcement_notice
      WHERE ref_id = ${ref_id}
      ORDER BY notice_id DESC
    `;

    const result = await prisma.$queryRaw<typeof query>(query);
    return result;
  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export function checkBookingPortfolio(
  portfolios: { txtPortfolio: string }[],
  username: string
): boolean {
  return portfolios.some((portfolio) => portfolio.txtPortfolio === username);
}

export async function getData(form_id: number) {
  try {

    const sql = Prisma.sql`
  SELECT 
    form_id,
    ref_portfolio_cat,
    portfolio,
    txtPortfolio,
    drpBigRock,
    SubmittedBy,
    contact,
    email,
    program,
    dateprogram,
    chkDateProgram,
    chkUpcomingEvent,
    ongoingdate,
    timeprogram,
    ongoingtime,
    CAST(date1 AS CHAR) AS date1,
    CAST(date2 AS CHAR) AS date2,
    CAST(date3 AS CHAR) AS date3,
    venue,
    chkProgramVenue,
    chkAttendees,
    insurance,
    reviewed,
    rSpaceNeeded,
    translated,
    translatedF,
    translatedFF,
    language,
    languageF,
    languageFF,
    registration,
    txtRegistrationLink,
    registration_fields,
    registration_selected_options,
    committee,
    firstweek,
    rFirstWeekLanguage,
    firstweek_translated,
    twoweeks,
    txtTwoWeeks3,
    rFollowWeekLanguage,
    rFollowWeekLanguage3,
    twoweeks_translated,
    twoweeks_translated2,
    comments,
    CAST(date_added AS CHAR) AS date_added,
    CAST(date_modified AS CHAR) AS date_modified,
    ip_address,
    forwarded_ip,
    user_agent,
    admin_id,
    status,
    editable,
    channel_requested
  FROM ur_announcement
  WHERE form_id= ${form_id}
`;
    return await prisma.$queryRaw(sql);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function getDataIsmailiInsight(ref_number: number) {
  try {
    const query = Prisma.sql`
     SELECT * FROM ur_ismaili_insight
     WHERE ref_number = ${ref_number}
     LIMIT 1
   `;
    const result = await prisma.$queryRaw<typeof query>(query);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function getAnnouncementFiles(ref_number: number) {
  try {
    return prisma.ur_announcement_files.findMany({
      where: {
        ref_id: ref_number,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

export async function getIsmailiFiles(ref_number: number) {
  try {
    return prisma.ur_ismaili_insight_files.findMany({
      where: {
        ref_id: ref_number,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}

interface DraftData {
  date_from: Date | string;
  date_to: Date | string;
  ip_address: string;
  forwarded_ip: string;
  user_agent: string;
  admin_user: string;
  receiver_email: string;
  status?: number;
  adminStatus?: number;
}

export async function addDraft(data: DraftData): Promise<number> {
  try {
    const dateFrom = data.date_from instanceof Date ? data.date_from : new Date(data.date_from);
    const dateTo = data.date_to instanceof Date ? data.date_to : new Date(data.date_to);
    const existingDraft = await prisma.ur_announcement_draft.findFirst({
      where: { date_from: dateFrom }
    });
    if (existingDraft) {
      return 0; // draft already exists with the given date_from
    }
    const newDraft = await prisma.ur_announcement_draft.create({
      data: {
        date_from: dateFrom,
        date_to: dateTo,
        date_added: new Date(),    // current timestamp
        date_modified: new Date(), // you may want to update this on edits
        ip_address: data.ip_address,
        forwarded_ip: data.forwarded_ip,
        user_agent: data.user_agent,
        admin_user: data.admin_user,
        receiver_email: data.receiver_email,
        status: data?.status,                   // defaults to false if not provided
        adminStatus: data?.adminStatus,
        editor_id1: 0,           // since no info in original PHP, default to 0
        editor_id2: 0,           // same as above
        draft_link_sent: 0,  // default false
        final_draft_link_sent: 0,
        sequence: null,
      }
    });

    return newDraft.draft_id;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}


export function getChannelsRequestedTitle(channels: string[]): string {
  try {
    const channelMapping: { [key: string]: string } = {
      'jamati-announcement': 'Jamati Announcement',
      'ismaili-insight': 'Ismaili Insight',
      'social-media': 'Social Media',
      'sms': 'SMS',
      'whatsapp': 'WhatsApp'
    };

    return channels.map(channel => channelMapping[channel] || channel).join(', ');
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(String(error));
  }
}