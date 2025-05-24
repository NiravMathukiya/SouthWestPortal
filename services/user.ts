import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { sendResponse } from "@/utils/sendResponse";
import { sendErrorResponse } from "@/utils/sendErrorResponse";
import md5 from "md5";
import {
  create_user,
  delete_user,
  find_user,
  get_all_user,
  update_user,
  check_role_id
} from "../repositories/user";

export const createUser = async (request: NextRequest, user: any) => {
  try {
    const reqBody = await request.json();

    const existingUser = await prisma.ur_admin_user.findFirst({
      where: { email: reqBody.email },
    });

    if (existingUser) {
      return sendErrorResponse({ error: `User already exists` }, 409);
    }

    const hashedPassword = md5(reqBody.password)

    console.log(reqBody.role_id)

    const checkRoleId = await check_role_id(reqBody.role_id)
    if(!checkRoleId)
    {
      return sendErrorResponse({ error: `Invalide Role Id` }, 409);
    }

    const users = await create_user({ ...reqBody, password: hashedPassword });

    return sendResponse({ data: users }, 201);
  } catch (err) {
    console.log(err);
    return sendErrorResponse({ error: "Internal server error" }, 400);
  }
};

export const updateUser = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const reqBody = await request.json();
    
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

    // const hashedPassword = await bcrypt.hash(password, 10);
    // const hashedPassword = md5(reqBody.password)

    const user = await update_user({ ...reqBody, id });

    return sendResponse({ data: user }, 200);
  } catch (error) {
    console.log(error);

    return sendErrorResponse({ error: error}, 400);
  }
};

export const deleteUser = async (
  request: NextRequest,
  model: string
): Promise<NextResponse> => {
  try {
    const searchParams = request.nextUrl.searchParams;

    console.log(searchParams);

    const idParam = searchParams.get("id");

    if (!idParam) {
      return sendErrorResponse({ message: "IMissing id parameter" }, 400);
    }

    const id = parseInt(idParam);
    if (isNaN(id)) {
      return sendErrorResponse({ message: "Invalid id parameter" }, 400);
    }

    const user = await delete_user({ id });
    return sendResponse({ data: user }, 200);
  } catch (error) {
    return sendErrorResponse({ error: "Forbidden Error" }, 400);
  }
};

export const getUser = async (
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

    const user = await find_user({ id });
    return sendResponse({ data: user }, 200);
  } catch (error) {

    return sendErrorResponse({ error: error }, 400);
  }
};

export const getAllUser = async (
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
          OR: [
            { first_name: { contains: searchTerm } },
            { username: { contains: searchTerm } },
            { email: { contains: searchTerm } },
            { Phone: { contains: searchTerm } },
          ],
        }
      : {};
    const { users, total } = await get_all_user({
      where: whereClause,
      skip,
      take: Number(pageSize),
    });

    return sendResponse({ users, totalCount: total }, 200);
  } catch (error) {
    return sendErrorResponse({ error: error }, 400);
  }
};
