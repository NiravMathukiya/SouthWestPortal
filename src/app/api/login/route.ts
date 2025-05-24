import { NextRequest } from "next/server";
import prisma from "../../../lib/prisma";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { sendErrorResponse } from "@/utils/sendErrorResponse";
import { sendResponse } from "@/utils/sendResponse";
import md5 from "md5";
export async function POST(request: NextRequest) {
  try {
    const { user_name, password } = await request.json();

    const existing = await prisma.ur_admin_user.findFirst({
      where: {
        username: user_name,
      },
    });

    if (!existing) return sendErrorResponse({ message: "User not found" }, 404);
    const hashedPassword = md5(password);

    if (existing.password != hashedPassword)
      return sendErrorResponse(
        { message: "user_name or password may be wrong" },
        404
      );

    const findRoleId = await prisma.ur_admin_user_role.findMany({
      where: {
        user_id: existing.admin_id,
      },
      select: {
        role_id: true,
      },
    });

    const roleIds: number[] = [];
    findRoleId.map((item) => {
      roleIds.push(item.role_id);
    });

    const token = jwt.sign(
      {
        id: existing.admin_id,
        email: existing.email,
        user_name: existing.username,
        name: existing.first_name,
        roles: roleIds,
      },
      process.env.JWT_SECRET_TOKEN!,
      {
        expiresIn: "1d",
      }
    );

    cookies().set({
      name: "loginuser",
      httpOnly: true,
      value: token,
      path: "/",
      maxAge: 24 * 24 * 60,
    });

    return sendResponse({ message: "user logged in successfully" }, 200);
  } catch (error: any) {
    console.log(error);
    return sendErrorResponse({ error: "Forbidden Error" }, 400);
  }
}
