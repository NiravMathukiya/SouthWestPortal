import { NextRequest, NextResponse } from "next/server";
import { sendResponse } from "@/utils/sendResponse";
import { sendErrorResponse } from "@/utils/sendErrorResponse";
import {
  create_role,
  delete_role,
  find_one,
  find_role,
  get_all_role,
  update_role,
} from "../repositories/role";

export const createRole = async (
  request: Request,
  model: string
): Promise<NextResponse> => {
  try {
    const { role_name , date_added } = await request.json();
    if (!role_name || !date_added) {
      return sendErrorResponse(
        { error: "Role Name and Date are required" },
        400
      );
    }

    const existingRole = await find_one({ role_name });

    if (existingRole) {
      return sendErrorResponse(
        { error: `role with this name already exists` },
        409
      );
    }

    const role = await create_role({
      role_name,
      date_added
    });
    return sendResponse({ data: role }, 201);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "Forbidden error" }, { status: 501 });
  }
};

export const updateRole = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const idParam = searchParams.get("id");

    if (!idParam) {
      return sendErrorResponse({ message: "Missing id parameter" }, 400);
    }

    const id = parseInt(idParam);
    if (isNaN(id)) {
      return sendErrorResponse({ message: "Invalid id parameter" }, 400);
    }

    const { role_name , date_added } = await request.json();

    if (!role_name || !date_added) {
      return sendErrorResponse(
        { error: "Role Name and Date are required" },
        400
      );
    }

    // Check if the name already exists in another role
    const existingRole = await find_one({ role_name });

    // If role with this name exists AND is NOT the same as the current role, reject
    if (existingRole && existingRole.admin_role_id !== id) {
      return sendErrorResponse(
        { error: `Role with this name already exists` },
        409
      );
    }

    // Update the role
    const role = await update_role({
      id,
      role_name,
      date_added,
    });

    return sendResponse({ data: role }, 200);
  } catch (error) {
    console.error(error);
    return sendErrorResponse({ error: "Internal Server Error" }, 500);
  }
};

export const deleteRole = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;

    console.log(searchParams);

    const idParam = searchParams.get("id");

    if (!idParam) {
      return sendErrorResponse({ message: "Missing id parameter" }, 400);
    }

    const id = parseInt(idParam);
    if (isNaN(id)) {
      return sendErrorResponse({ message: "Invalid id parameter" }, 400);
    }
    const role = await delete_role({ id });
    return sendResponse({ data: role }, 200);
  } catch (error) {
    return sendErrorResponse({ error: "Forbidden Error" }, 400);
  }
};

export const getRole = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;

    console.log(searchParams);

    const idParam = searchParams.get("id");

    if (!idParam) {
      return sendErrorResponse({ message: "Missing id parameter" }, 400);
    }

    const id = parseInt(idParam);
    if (isNaN(id)) {
      return sendErrorResponse({ message: "Invalid id parameter" }, 400);
    }

    const role = await find_role({ id });
    return sendResponse({ data: role }, 200);
  } catch (error) {
    return sendErrorResponse({ error: "Forbidden Error" }, 400);
  }
};

export const getAllRole = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = searchParams.get("page") || 1;
    const pageSize = searchParams.get("pageSize") || 10;
    const searchTerm = searchParams.get("searchTerm") || "";

    const skip = (Number(page) - 1) * Number(pageSize);
    const whereClause = searchTerm
      ? {
          OR: [{ name: { contains: searchTerm } }],
        }
      : {};
    const { roles, total } = await get_all_role({
      where: whereClause,
      skip,
      take: Number(pageSize),
    });

    return sendResponse({ roles, totalCount: total }, 200);
  } catch (error) {
    return sendErrorResponse({ error: "Forbidden Error" }, 400);
  }
};
