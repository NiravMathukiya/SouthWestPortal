import { NextRequest, NextResponse } from "next/server";
import { senderror, sendResponse } from "@/utils/sendResponse";
import { sendErrorResponse } from "@/utils/sendErrorResponse";
import { ge_all_announcement, read, create_and_update } from "../repositories/announcement";
import { parseISO, endOfDay } from 'date-fns';
export const create_and_update_announcement = async (
  request: NextRequest,
  user: any
): Promise<NextResponse> => {
  try {
    const formId = await create_and_update({ request, user });
    if (formId.success)
      return sendResponse({ data: formId }, 201);
    return senderror({ data: formId }, 400);

  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Forbidden error" }, { status: 501 });
  }
};
import prisma from "@/lib/prisma";

export const draft_list = async (
  request: NextRequest,
  model?: string // Optional if you're passing different models
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = 50;
    const skip = (page - 1) * limit;

    const sortField = searchParams.get('sort') || 'date_from';
    const sortOrder = searchParams.get('order') === 'asc' ? 'ASC' : 'DESC';

    // Sanitize sort field to prevent SQL injection
    const sortableFields = ['date_from', 'date_to', 'date_modified', 'date_added', 'receiver_email'];
    const safeSortField = sortableFields.includes(sortField) ? sortField : 'date_from';
    const safeSortOrder = sortOrder === 'ASC' ? 'ASC' : 'DESC';

    // Build WHERE clause
    const whereClauses: string[] = [];
    const values: any[] = [];

    if (searchParams.get('filter_date_from')) {
      whereClauses.push(`a.date_from >= ?`);
      values.push(parseISO(searchParams.get('filter_date_from')!));
    }

    if (searchParams.get('filter_date_to')) {
      whereClauses.push(`a.date_to <= ?`);
      values.push(parseISO(searchParams.get('filter_date_to')!));
    }

    if (searchParams.get('filter_receiver_email')) {
      whereClauses.push(`LOWER(a.receiver_email) LIKE ?`);
      values.push(`%${searchParams.get('filter_receiver_email')!.toLowerCase()}%`);
    }

    if (searchParams.get('filter_date_modified')) {
      whereClauses.push(`a.date_modified >= ?`);
      values.push(parseISO(searchParams.get('filter_date_modified')!));
    }

    if (searchParams.get('filter_date_added')) {
      const date = parseISO(searchParams.get('filter_date_added')!);
      whereClauses.push(`a.date_added BETWEEN ? AND ?`);
      values.push(date, endOfDay(date));
    }

    if (searchParams.get('filter_status')) {
      whereClauses.push(`a.status = ?`);
      values.push(parseInt(searchParams.get('filter_status')!));
    }

    if (searchParams.get('filter_adminStatus')) {
      whereClauses.push(`a.adminStatus = ?`);
      values.push(parseInt(searchParams.get('filter_adminStatus')!));
    }

    const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Main data query
    interface AnnouncementDraft {
      id: number;
      date_from: Date;
      date_to: Date;
      receiver_email: string;
      date_modified: Date;
      date_added: Date;
      status: number;
      adminStatus: number;
      // add other columns you select here...
      comments_count: number;
    }

    const results = await prisma.$queryRawUnsafe<AnnouncementDraft[]>(`
  SELECT 
    a.draft_id,
    a.date_from,
    a.date_to,
    a.receiver_email,
    CAST(a.date_added AS CHAR) AS date_added,
    CAST(a.date_modified AS CHAR) AS date_modified,
    a.ip_address,
    a.forwarded_ip,
    a.user_agent,
    a.admin_user,
    a.status,
    a.adminStatus,
    a.editor_id1,
    a.editor_id2,
    a.draft_link_sent,
    a.final_draft_link_sent,
    a.sequence,
    (
      SELECT COUNT(*) 
      FROM ur_announcement_draft_comment c 
      WHERE c.draft_id = a.draft_id AND c.status = 0
    ) as comments_count
  FROM ur_announcement_draft a
  ${whereSQL}
  ORDER BY ${sortField} ${sortOrder.toUpperCase()}
  LIMIT ${limit} OFFSET ${skip}
`, ...values);


    // Count query
    const totalCount = await prisma.$queryRawUnsafe<{ count: number }[]>(
      `
  SELECT COUNT(*) as count
  FROM ur_announcement_draft a
  ${whereSQL}
  `,
      ...values
    );

    const total = totalCount[0]?.count ?? 0;


    const formattedResults = results.map((item: any) => ({
      ...item,
      num_comment: item.comments_count,
    }));

    return NextResponse.json({
      results: formattedResults,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error('Error in draft_list:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
};

// export const update_announcement = async (
//   request: NextRequest,
//   model: string
// ): Promise<NextResponse> => {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const idParam = searchParams.get("update_id");

//     if (!idParam) {
//       return sendErrorResponse({ message: "Missing id parameter" }, 400);
//     }

//     const id = parseInt(idParam);
//     if (isNaN(id)) {
//       return sendErrorResponse({ message: "Invalid id parameter" }, 400);
//     }
//     const {
//       description,
//       txtEmail,
//       cost_per_person,
//       ref_restaurant_id,
//       ref_category_id,
//       status,
//       priority,
//       txtSubmittedBy } = await request.json();
//     if (!txtEmail || !description || !ref_category_id) {
//       return sendErrorResponse(
//         { error: "txtEmail, description, and category are required" },
//         400
//       );
//     }
//     const category = await update({
//       update_id: id,
//       description,
//       txtEmail,
//       cost_per_person,
//       ref_restaurant_id,
//       ref_category_id,
//       status,
//       priority,
//       txtSubmittedBy
//     });

//     await sendNotificationEmail({
//       action: "update",
//       txtSubmittedBy,
//       txtEmail,
//       ref_category_id: Number(ref_category_id),
//       description,
//       priority: Number(priority),
//       status: Number(status),
//       update_id: id
//     });
//     return sendResponse({ data: category }, 200);
//   } catch (error) {
//     console.log(error);
//     return sendErrorResponse({ error: "Forbidden Error" }, 400);
//   }
// };

// export const delete_announcement = async (
//   request: NextRequest,
//   model: string
// ): Promise<NextResponse> => {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const idParam = searchParams.get("update_id");
//     if (!idParam) {
//       return sendErrorResponse({ message: "Missing id parameter" }, 400);
//     }
//     const id = parseInt(idParam);
//     if (isNaN(id)) {
//       return sendErrorResponse({ message: "Invalid id parameter" }, 400);
//     }
//     const category = await delete_recode({ id });
//     return sendResponse({ data: category }, 200);
//   } catch (error) {
//     return sendErrorResponse({ error: "Forbidden Error" }, 400);
//   }
// };

export const read_announcement = async (
  request: NextRequest,
  user: any
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const data = await read({ searchParams, user });
    return sendResponse({ portalupdates: data }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return sendErrorResponse({ error: error.message }, 400);
    }
    return sendErrorResponse({ error: String(error) }, 400);
  }
};

export const list_announcement = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageNum = parseInt(searchParams.get('page') || '1', 10);
    const limit = 50;
    const offset = (pageNum - 1) * limit;
    const { updates, total } = await ge_all_announcement({ searchParams, offset, limit });
    const pages = Math.ceil(total / limit);
    const pagination = { pageNum, pages, total };
    return sendResponse({ data: updates, pagination }, 200);
  } catch (error) {
    console.log(error)
    return sendErrorResponse({ error: error }, 400);
  }
};

// interface NotificationParams {
//   action: 'add' | 'update';
//   txtSubmittedBy: string;
//   txtEmail: string;
//   ref_category_id: number;
//   description: string;
//   priority: number;
//   status: number;
//   update_id: number;
// }

// export async function sendNotificationEmail(params: NotificationParams) {
//   const {
//     action,
//     txtSubmittedBy,
//     txtEmail,
//     ref_category_id,
//     description,
//     priority,
//     status,
//     update_id,
//   } = params;

//   // Fetch category name
//   const category = await category_find_one({ id: ref_category_id })
//   const priorityText = ['Low', 'Medium', 'High'][priority] || 'Unknown';
//   const statusText = status === 0 ? 'Pending' : 'Completed';
//   const subject = `${priorityText}-${statusText} - Portal Update ${action === 'add' ? 'Added' : 'Completed'}: ${update_id}`;
//   const emailBody = `
//     <html>
//       <head>
//         <title>Portal Updates ${action === 'add' ? 'Added' : 'Completed'}</title>
//       </head>
//       <body style="font-family: arial; font-size: 14px; color: #444;">
//         <p>Portal update details are :</p>
//         <table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse">
//           <thead>
//             <tr><th colspan="2" style="background-color:#f1f1f1">Portal Update Form Details</th></tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Email Address</td>
//               <td><b>${txtEmail}</b></td>
//             </tr>
//             <tr>
//               <td>Submitted By</td>
//               <td><b>${txtSubmittedBy}</b></td>
//             </tr>
//             <tr>
//               <td>Category</td>
//               <td><b>${category?.category_name || 'N/A'}</b></td>
//             </tr>
//             <tr>
//               <td>Description</td>
//               <td>${description}</td>
//             </tr>
//             <tr>
//               <td>Priority</td>
//               <td><b>${priorityText}</b></td>
//             </tr>
//             <tr>
//               <td>Status</td>
//               <td><b>${statusText}</b></td>
//             </tr>
//           </tbody>
//         </table>
//         <p><a href="${process.env.ADMIN_URL}/portalupdates/index_form.php?update_id=${update_id}">Click Here</a></p>
//         <p>Thanks</p>
//       </body>
//     </html>
//   `;
//   await sendEmail({
//     fromEmail: process.env.FROM_EMAIL || 'ashwani.k88@gmail.com',
//     toEmail: txtEmail,
//     subject,
//     emailBody,
//   });
// }


// // utils/filters.ts
export function parseFilters(searchParams: URLSearchParams) {
  const where: any = {};
  const orderBy: any = {};

  const txtPortfolio = searchParams.get("txtPortfolio");
  if (txtPortfolio) {
    where.txtPortfolio = { contains: txtPortfolio, mode: "insensitive" };
  }

  const drpBoard = searchParams.get("drpBoard");
  if (drpBoard) {
    where.portfolio = { contains: drpBoard, mode: "insensitive" };
  }

  const filter_chkCommittee = searchParams.get("filter_chkCommittee");
  console.log(filter_chkCommittee,"filter_chkCommitteefilter_chkCommitteefilter_chkCommitteefilter_chkCommittee")
  if (filter_chkCommittee) {
    const committees = filter_chkCommittee.split(",");
    where.AND = committees.map((committee) => ({
      committee: {
        contains: committee, // Assumes `committee` is a CSV string field
        mode: "insensitive",
      },
    }));
  }

  const filter_channel_requested = searchParams.get("filter_channel_requested");
  if (filter_channel_requested) {
    where.channel_requested = {
      contains: filter_channel_requested,
      mode: "insensitive",
    };
  }

  const filter_program = searchParams.get("filter_program");
  if (filter_program) {
    where.program = { contains: filter_program, mode: "insensitive" };
  }

  const filter_email = searchParams.get("filter_email");
  if (filter_email) {
    where.email = { contains: filter_email, mode: "insensitive" };
  }

  const filter_from_dateprogram = searchParams.get("filter_from_dateprogram");
  const filter_to_dateprogram = searchParams.get("filter_to_dateprogram");
  if (filter_from_dateprogram || filter_to_dateprogram) {
    where.dateprogram = {};
    if (filter_from_dateprogram) {
      where.dateprogram.gte = new Date(filter_from_dateprogram);
    }
    if (filter_to_dateprogram) {
      where.dateprogram.lte = new Date(filter_to_dateprogram);
    }
  }

  const filter_date1 = searchParams.get("filter_date1");
  if (filter_date1) {
    where.date1 = { contains: filter_date1, mode: "insensitive" };
  }

  const filter_status = searchParams.get("filter_status");
  if (filter_status) {
    where.status = isNaN(+filter_status)
      ? filter_status
      : parseInt(filter_status);
  }

  const filter_date_added = searchParams.get("filter_date_added");
  if (filter_date_added) {
    where.date_added = { contains: filter_date_added, mode: "insensitive" };
  }

  const sort = searchParams.get("sort") || "form_id";
  const order = searchParams.get("order") || "desc";
  orderBy[sort] = order;

  return { where, sort, order };
}
