import { withAuth } from "@/lib/withAuth";
import { NextRequest} from "next/server";
import roleController from "../../../../controllers/role";

const controller = roleController("role");

export const POST = withAuth(
  async (request: NextRequest) => {
    return await controller.createRole(request);
  },
  [1]
);

export const GET = withAuth(
  async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const idParam = searchParams.get("id");
    if (idParam) {
      return await controller.getRole(request);
    } else {
      return await controller.getAllRole(request);
    }
  },
  [1]
);

export const PUT = withAuth(
  async (request: NextRequest) => {
    return await controller.updateRole(request);
  },
  [1]
);

export const DELETE = withAuth(
  async (request: NextRequest) => {
    return await controller.deleteRole(request);
  },
  [1]
);
