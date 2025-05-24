import { NextRequest, NextResponse } from "next/server";
import { sendResponse } from "@/utils/sendResponse";
import { sendErrorResponse } from "@/utils/sendErrorResponse";
import { category_find_one, create, delete_recode, find_by_name, find_one, ge_all_portal, update } from "../repositories/portalupdates";
import { email_send } from "../src/utils/senEmail"

export const create_portal = async (
  request: Request,
  model: string
): Promise<NextResponse> => {
  try {
    const {
      description,
      txtEmail,
      cost_per_person = 0,
      ref_restaurant_id = 0,
      ref_category_id,
      status,
      priority,
      txtSubmittedBy } = await request.json();
    console.log(ref_category_id)
    if (!txtEmail || !description || !ref_category_id) {
      return sendErrorResponse(
        { error: "txtEmail, description, and category are required" },
        400
      );
    }
    const category = await create({
      txtEmail,
      txtSubmittedBy,
      description,
      ref_category_id,
      priority,
      status,
      ref_restaurant_id,
      cost_per_person,
    });
    await sendNotificationEmail({
      action: "add",
      txtSubmittedBy,
      txtEmail,
      ref_category_id: Number(ref_category_id),
      description,
      priority: Number(priority),
      status: Number(status),
      update_id: 0
    });
    return sendResponse({ data: category }, 201);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Forbidden error" }, { status: 501 });
  }
};

export const update_portal = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const idParam = searchParams.get("update_id");

    if (!idParam) {
      return sendErrorResponse({ message: "Missing id parameter" }, 400);
    }

    const id = parseInt(idParam);
    if (isNaN(id)) {
      return sendErrorResponse({ message: "Invalid id parameter" }, 400);
    }
    const {
      description,
      txtEmail,
      cost_per_person = 0,
      ref_restaurant_id,
      ref_category_id,
      status,
      priority,
      txtSubmittedBy } = await request.json();
    if (!txtEmail || !description || !ref_category_id) {
      return sendErrorResponse(
        { error: "txtEmail, description, and category are required" },
        400
      );
    }
    const category = await update({
      update_id: id,
      description,
      txtEmail,
      cost_per_person,
      ref_restaurant_id,
      ref_category_id,
      status,
      priority,
      txtSubmittedBy
    });

    await sendNotificationEmail({
      action: "update",
      txtSubmittedBy,
      txtEmail,
      ref_category_id: Number(ref_category_id),
      description,
      priority: Number(priority),
      status: Number(status),
      update_id: id
    });
    return sendResponse({ data: category }, 200);
  } catch (error) {
    console.log(error);
    return sendErrorResponse({ error: "Forbidden Error" }, 400);
  }
};

export const delete_portal = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const idParam = searchParams.get("update_id");
    if (!idParam) {
      return sendErrorResponse({ message: "Missing id parameter" }, 400);
    }
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return sendErrorResponse({ message: "Invalid id parameter" }, 400);
    }
    const category = await delete_recode({ id });
    return sendResponse({ data: category }, 200);
  } catch (error) {
    return sendErrorResponse({ error: "Forbidden Error" }, 400);
  }
};

export const read_portal = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const idParam = searchParams.get("update_id");
    if (!idParam) {
      return sendErrorResponse({ message: "Missing id parameter" }, 400);
    }
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return sendErrorResponse({ message: "Invalid id parameter" }, 400);
    }
    const category = await find_one({ id });
    return sendResponse({ portalupdates: category }, 200);
  } catch (error) {
    return sendErrorResponse({ error: "Forbidden Error" }, 400);
  }
};

export const list_portal = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("limit") || "20");
    const order = searchParams.get("order") || "asc";
    const sort = searchParams.get("sort") || "status";
    const skip = (page - 1) * pageSize;
    const where: any = {};
    const filter_txtEmail = searchParams.get("filter_txtEmail");
    const filter_txtSubmittedBy = searchParams.get("filter_txtSubmittedBy");
    const filter_description = searchParams.get("filter_description");
    const filter_ref_category_id = searchParams.get("filter_ref_category_id");
    const filter_status = searchParams.get("filter_status");
    const filter_priority = searchParams.get("filter_priority");
    const filter_date_added_from = searchParams.get("filter_date_added_from");
    const filter_date_added_to = searchParams.get("filter_date_added_to");

    if (filter_txtEmail) {
      where.txtEmail = { contains: filter_txtEmail };
    }
    if (filter_txtSubmittedBy) {
      where.txtSubmittedBy = { contains: filter_txtSubmittedBy };
    }
    if (filter_description) {
      where.description = { contains: filter_description };
    }
    if (filter_ref_category_id) {
      where.ref_category_id = parseInt(filter_ref_category_id);
    }
    if (filter_status) {
      where.status = parseInt(filter_status);
    }
    if (filter_priority) {
      where.priority = parseInt(filter_priority);
    }
    if (filter_date_added_from && filter_date_added_to) {
      where.date_added = {
        gte: new Date(`${filter_date_added_from}T00:00:00Z`),
        lte: new Date(`${filter_date_added_to}T23:59:59Z`),
      };
    }
    const { updates, total } = await ge_all_portal({
      where,
      skip,
      take: pageSize,
      sort,
      order,
    });
    const pages = Math.ceil(total / pageSize);
    const pagination = { page, pages, total };
    return sendResponse({ data: updates, pagination }, 200);
  } catch (error) {
    console.log(error)
    return sendErrorResponse({ error: error }, 400);
  }
};

interface NotificationParams {
  action: 'add' | 'update';
  txtSubmittedBy: string;
  txtEmail: string;
  ref_category_id: number;
  description: string;
  priority: number;
  status: number;
  update_id: number;
}

export async function sendNotificationEmail(params: NotificationParams) {
  const {
    action,
    txtSubmittedBy,
    txtEmail,
    ref_category_id,
    description,
    priority,
    status,
    update_id,
  } = params;

  // Fetch category name
  const category = await category_find_one({ id: ref_category_id })
  const priorityText = ['Low', 'Medium', 'High'][priority] || 'Unknown';
  const statusText = status === 0 ? 'Pending' : 'Completed';
  const subject = `${priorityText}-${statusText} - Portal Update ${action === 'add' ? 'Added' : 'Completed'}: ${update_id}`;
  const emailBody = `
    <html>
      <head>
        <title>Portal Updates ${action === 'add' ? 'Added' : 'Completed'}</title>
      </head>
      <body style="font-family: arial; font-size: 14px; color: #444;">
        <p>Portal update details are :</p>
        <table border="1" cellpadding="4" cellspacing="0" style="border-collapse:collapse">
          <thead>
            <tr><th colspan="2" style="background-color:#f1f1f1">Portal Update Form Details</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Email Address</td>
              <td><b>${txtEmail}</b></td>
            </tr>
            <tr>
              <td>Submitted By</td>
              <td><b>${txtSubmittedBy}</b></td>
            </tr>
            <tr>
              <td>Category</td>
              <td><b>${category?.category_name || 'N/A'}</b></td>
            </tr>
            <tr>
              <td>Description</td>
              <td>${description}</td>
            </tr>
            <tr>
              <td>Priority</td>
              <td><b>${priorityText}</b></td>
            </tr>
            <tr>
              <td>Status</td>
              <td><b>${statusText}</b></td>
            </tr>
          </tbody>
        </table>
        <p><a href="${process.env.ADMIN_URL}/portalupdates/index_form.php?update_id=${update_id}">Click Here</a></p>
        <p>Thanks</p>
      </body>
    </html>
  `;

  // if (action !== 'add') {
  //   await email_send({
  //     from_email: `${process.env.store_name} <${txtEmail}>`,
  //     ToEmail: process.env.ROM_EMAIL || 'ashwani.k88@gmail.com',
  //     Subject: subject,
  //     emailBody: emailBody
  //   });
  // }

  await email_send({
    from_email: process.env.FROM_EMAIL || 'ashwani.k88@gmail.com',
    ToEmail: txtEmail,
    Subject: subject,
    emailBody,
  });
}