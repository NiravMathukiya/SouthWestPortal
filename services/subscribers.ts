import { NextRequest, NextResponse } from "next/server";
import { sendResponse } from "@/utils/sendResponse";
import { sendErrorResponse } from "@/utils/sendErrorResponse";
import {
  create,
  delete_recode,
  find_one,
  ge_all_subscribers,
  update,
} from "../repositories/subscribers";

export const create_subscribers = async (
  request: Request,
  model: string
): Promise<NextResponse> => {
  try {
    const {
      institution,
      first_name,
      last_name,
      email,
      phone,
      attachments = 1,
      status = 1,
      sub_role = 0,
    } = await request.json();

    if (!email || !institution) {
      return sendErrorResponse(
        { error: "email and institution are required" },
        400
      );
    }

    const subscriber = await create({
      institution,
      first_name,
      last_name,
      email,
      phone,
      sub_role,
      status,
      attachments,
    });
    return sendResponse({ subscriber }, 201);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Forbidden error" }, { status: 501 });
  }
};

export const update_subscribers = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const idParam = searchParams.get("subscriber_id");

    if (!idParam) {
      return sendErrorResponse({ message: "Missing id parameter" }, 400);
    }

    const id = parseInt(idParam);
    if (isNaN(id)) {
      return sendErrorResponse({ message: "Invalid id parameter" }, 400);
    }
    const {
      institution,
      first_name,
      last_name,
      email,
      phone,
      sub_role,
      status,
      attachments,
    } = await request.json();
    if (!email || !institution) {
      return sendErrorResponse(
        { error: "email and institution are required" },
        400
      );
    }
    const subscriber = await update({
      subscriber_id: id,
      institution,
      first_name,
      last_name,
      email,
      phone,
      sub_role,
      status,
      attachments,
    });
    return sendResponse({ subscriber }, 200);
  } catch (error) {
    console.log(error);
    return sendErrorResponse({ error: "Forbidden Error" }, 400);
  }
};

export const delete_subscribers = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const body = await request.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.some((item) => typeof item !== "number")) {
      return sendErrorResponse(
        { message: "Invalid or missing 'id' array" },
        400
      );
    }
    const category = await delete_recode(ids);
    return sendResponse({ data: category }, 200);
  } catch (error) {
    return sendErrorResponse({ error: "Forbidden Error" }, 400);
  }
};

export const read_subscribers = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const idParam = searchParams.get("subscriber_id");
    if (!idParam) {
      return sendErrorResponse({ message: "Missing id parameter" }, 400);
    }
    const id = parseInt(idParam);
    if (isNaN(id)) {
      return sendErrorResponse({ message: "Invalid id parameter" }, 400);
    }
    const subscribers = await find_one({ id });
    return sendResponse({ subscribers }, 200);
  } catch (error) {
    return sendErrorResponse({ error: "Forbidden Error" }, 400);
  }
};

export const list_subscribers = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const order = searchParams.get("order") || "desc";
    const sort = searchParams.get("sort") || "subscriber_id";

    const filters: any = {};

    if (searchParams.get("filter_username")) {
      filters.username = {
        contains: searchParams.get("filter_username") || "",
      };
    }
    if (searchParams.get("filter_first_name")) {
      filters.first_name = {
        contains: searchParams.get("filter_first_name") || "",
      };
    }
    if (searchParams.get("filter_last_name")) {
      filters.last_name = {
        contains: searchParams.get("filter_last_name") || "",
      };
    }
    if (searchParams.get("filter_email")) {
      filters.email = { contains: searchParams.get("filter_email") || "" };
    }

    if (searchParams.get("filter_phone")) {
      filters.phone = { contains: searchParams.get("filter_phone") || "" };
    }
    if (searchParams.get("filter_status")) {
      // console.log(searchParams.get("filter_status"));
      filters.status = Boolean(searchParams.get("filter_status")) || undefined;
    }
    if (searchParams.get("filter_sub_role")) {
      // console.log(searchParams.get("filter_sub_role"));
      filters.sub_role = parseInt(searchParams.get("filter_sub_role") || "");
    }
    if (searchParams.get("filter_attachments")) {
      const f1 = searchParams.get("filter_attachments");
      console.log(Boolean(f1));

      filters.attachments =        Boolean(searchParams.get("filter_attachments")) || undefined;
    }
    if (searchParams.get("filter_institution")) {
      filters.institution = searchParams.get("filter_institution") || undefined;
    }

    if (searchParams.get("filter_date_added")) {
      const date = new Date(searchParams.get("filter_date_added") as string);
      const nextDay = new Date(date);
      nextDay.setDate(date.getDate() + 1);
      filters.date_added = {
        gte: date,
        lt: nextDay,
      };
    }

    const { updates, total } = await ge_all_subscribers({
      where: filters,
      skip,
      take: limit,
      sort,
      order,
    });
    const pages = Math.ceil(total / limit);
    const pagination = { page, pages, total };
    return sendResponse({ data: updates, pagination }, 200);
  } catch (error) {
    console.log(error);
    return sendErrorResponse({ error: error }, 400);
  }
};
