import { NextRequest, NextResponse } from "next/server";
import { sendResponse } from "@/utils/sendResponse";
import { sendErrorResponse } from "@/utils/sendErrorResponse";
import { ge_all_graphics_request } from "../repositories/graphics_request";

// export const create_graphics_request = async (
//   request: Request,
//   model: string
// ): Promise<NextResponse> => {
//   try {
//     const {
//       institution,
//       first_name,
//       last_name,
//       email,
//       phone,
//       attachments = 1,
//       status = 1,
//       sub_role = 0,
//     } = await request.json();

//     if (!email || !institution) {
//       return sendErrorResponse(
//         { error: "email and institution are required" },
//         400
//       );
//     }
//     const subscriber = await create({
//       institution,
//       first_name,
//       last_name,
//       email,
//       phone,
//       sub_role,
//       status,
//       attachments
//     });
//     return sendResponse({ subscriber }, 201);
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "Forbidden error" }, { status: 501 });
//   }
// };

// export const update_graphics_request = async (
//   request: NextRequest,
//   model: string
// ): Promise<NextResponse> => {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const idParam = searchParams.get("subscriber_id");

//     if (!idParam) {
//       return sendErrorResponse({ message: "Missing id parameter" }, 400);
//     }

//     const id = parseInt(idParam);
//     if (isNaN(id)) {
//       return sendErrorResponse({ message: "Invalid id parameter" }, 400);
//     }
//     const {
//       institution,
//       first_name,
//       last_name,
//       email,
//       phone,
//       sub_role,
//       status,
//       attachments } = await request.json();
//     if (!email || !institution) {
//       return sendErrorResponse(
//         { error: "email and institution are required" },
//         400
//       );
//     }
//     const subscriber = await update({
//       subscriber_id: id,
//       institution,
//       first_name,
//       last_name,
//       email,
//       phone,
//       sub_role,
//       status,
//       attachments,
//     });
//     return sendResponse({ subscriber }, 200);
//   } catch (error) {
//     console.log(error);
//     return sendErrorResponse({ error: "Forbidden Error" }, 400);
//   }
// };

// export const delete_graphics_request = async (
//   request: NextRequest,
//   model: string
// ): Promise<NextResponse> => {
//   try {
//     const body = await request.json();
//     const { ids } = body;

//     if (!Array.isArray(ids) || ids.some((item) => typeof item !== "number")) {
//       return sendErrorResponse({ message: "Invalid or missing 'id' array" }, 400);
//     }
//     const category = await delete_recode(ids);
//     return sendResponse({ data: category }, 200);
//   } catch (error) {
//     return sendErrorResponse({ error: "Forbidden Error" }, 400);
//   }
// };

// export const read_graphics_request = async (
//   request: NextRequest,
//   model: string
// ): Promise<NextResponse> => {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const idParam = searchParams.get("subscriber_id");
//     if (!idParam) {
//       return sendErrorResponse({ message: "Missing id parameter" }, 400);
//     }
//     const id = parseInt(idParam);
//     if (isNaN(id)) {
//       return sendErrorResponse({ message: "Invalid id parameter" }, 400);
//     }
//     const subscribers = await find_one({ id });
//     return sendResponse({ subscribers }, 200);
//   } catch (error) {
//     return sendErrorResponse({ error: "Forbidden Error" }, 400);
//   }
// };

export const list_graphics_request = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const filterStatus = searchParams.get('filter_status') ?? '0';
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;
    const order = searchParams.get("order") === 'desc' ? 'desc' : 'asc';
    const sort = searchParams.get("sort") || 'status';

    const { updates, total } = await ge_all_graphics_request({
      where: {
        status: parseInt(filterStatus as string)
      },
      skip,
      take: limit,
      sort,
      order
    });
    const pages = Math.ceil(total / limit);
    const pagination = { page, pages, total };
    return sendResponse({ data: updates, pagination }, 200);
  } catch (error) {
    console.log(error)
    return sendErrorResponse({ error: error }, 400);
  }
};


