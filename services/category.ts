import { NextRequest, NextResponse } from "next/server";
import { sendResponse } from "@/utils/sendResponse";
import { sendErrorResponse } from "@/utils/sendErrorResponse";
import {
  create,
  delete_recode,
  find_by_name,
  find_one,
  get_all_category,
  update,
} from "../repositories/category";
import { boolean } from "joi";

export const createCategory = async (
  request: Request,
  model: string
): Promise<NextResponse> => {
  try {
    const { category_name, status } = await request.json();
    if (!category_name || !String(status)) {
      return sendErrorResponse(
        { error: "Name, permission, and redirect_url are required" },
        400
      );
    }
    const existingcategory = await find_by_name({ category_name });
    if (existingcategory) {
      return sendErrorResponse({ error: `category name already exists` }, 409);
    }
    const category = await create({
      category_name,
      status,
    });
    return sendResponse({ data: category }, 201);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Forbidden error" }, { status: 501 });
  }
};

export const updateCategory = async (
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

    const { category_name, sort_order, status } = await request.json();

    if (!category_name || !String(status)) {
      return sendErrorResponse(
        { error: "Name, permission, and redirect_url are required" },
        400
      );
    }

    const existingcategory = await find_by_name({ category_name, id });

    if (existingcategory) {
      return sendErrorResponse(
        { error: `category with this name already exists` },
        409
      );
    }

    const category = await update({
      id,
      category_name,
      sort_order,
      status,
    });
    return sendResponse({ data: category }, 200);
  } catch (error) {
    console.log(error);

    return sendErrorResponse({ error: "Forbidden Error" }, 400);
  }
};

export const deleteCategory = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const body = await request.json();
    const { id } = body;

    if (!Array.isArray(id) || id.some((item) => typeof item !== "number")) {
      return sendErrorResponse(
        { message: "Invalid or missing 'id' array" },
        400
      );
    }

    const result = await delete_recode(id);
    return sendResponse({ data: result }, 200);
  } catch (error) {
    return sendErrorResponse({ error: "Invalid request body" }, 400);
  }
};

export const getCategory = async (
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
    const category = await find_one({ id });
    return sendResponse({ data: category }, 200);
  } catch (error) {
    return sendErrorResponse({ error: "Forbidden Error" }, 400);
  }
};

export const getAllCategory = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page") || 1;
    const pageSize = parseInt(searchParams.get("limit") || "20");
    const skip = (Number(page) - 1) * Number(pageSize);
    const filter_category_name = searchParams.get("filter_category_name") || "";
    const filter_status = Boolean(searchParams.get("filter_status")) === true;

    console.log(filter_status);
    let whereClause = {};
    if (filter_category_name) {
      whereClause = {
        ...whereClause,
        category_name: {
          contains: filter_category_name,
        },
      };
    }
    if (filter_status) {
      whereClause = {
        ...whereClause,
        status: Boolean(filter_status),
      };
    }
    const { category, total } = await get_all_category({
      where: whereClause,
      skip,
      take: Number(pageSize),
    });
    const pages = Math.ceil(total / pageSize);
    const pagination = { page, pages, total };
    return sendResponse({ category, pagination }, 200);
  } catch (error) {
    console.log(error);
    return sendErrorResponse({ error: error }, 400);
  }
};
