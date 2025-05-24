import { withAuth } from "@/lib/withAuth";
import { NextRequest } from "next/server";
import userController from "../../../../controllers/user";

const controller = userController("role");

export const POST = withAuth(
  async (request, user) => {
    return await controller.createUser(request, user);
  },
  [1, 2, 3, 6] 
);

export const GET = withAuth(
  async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const idParam = searchParams.get("id");
    if (idParam) {
      return await controller.getUser(request);
    } else {
      return await controller.getAllUser(request);
    }
  },
  [1]
);

export const PUT = withAuth(
  async (request: NextRequest) => {
    return await controller.updateUser(request);
  },
  [1]
);

export const DELETE = withAuth(
  async (request: NextRequest) => {
    return await controller.deleteUser(request);
  },
  [1]
);
