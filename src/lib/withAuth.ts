import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { sendErrorResponse } from "@/utils/sendErrorResponse";

type Handler = (request: NextRequest, user: any) => Promise<NextResponse> | NextResponse;

interface CustomJwtPayload extends JwtPayload {
  id: number; // admin_id from ur_admin_user
  isSuperAdmin?: boolean;
}

export function withAuth(handler: Handler, requiredRoleIds: number[]) {
  return async (request: NextRequest) => {
    const token = request.cookies.get("loginuser")?.value;

    if (!token) {
      return sendErrorResponse({ error: "Unauthorized: Missing token" }, 401);
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN!) as CustomJwtPayload;

      if (typeof decoded === "string" || !decoded.id) {
        return sendErrorResponse({ error: "Invalid token payload" }, 401);
      }

      // 1. Fetch user
      const user = await prisma.ur_admin_user.findUnique({
        where: { admin_id: decoded.id },
      });

      if (!user) {
        return sendErrorResponse({ error: "User not found" }, 404);
      }

      // 2. Get all role IDs assigned to the user
      const roles = await prisma.ur_admin_user_role.findMany({
        where: { user_id: decoded.id },
        select: { role_id: true },
      });

      const userRoleIds = roles.map(r => r.role_id);

      // 3. Check for super admin or matching role
      const hasPermission =
        decoded.isSuperAdmin || userRoleIds.some(id => requiredRoleIds.includes(id));

      if (!hasPermission) {
        return sendErrorResponse({ error: "Forbidden: Insufficient role access" }, 403);
      }

      // 4. Pass request and user info to handler
      return handler(request, {
        ...user,
        roles: userRoleIds,
        isSuperAdmin: decoded.isSuperAdmin || false,
      });

    } catch (error) {
      console.error("Auth Error:", error);
      return sendErrorResponse({ error: "Unauthorized: Invalid or expired token" }, 401);
    }
  };
}
