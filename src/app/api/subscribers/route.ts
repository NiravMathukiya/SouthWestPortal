import { withAuth } from "@/lib/withAuth";
import { NextRequest } from "next/server";
import subscribersController from "../../../../controllers/subscribers";

const controller = subscribersController("role");

export const POST = withAuth(
  async (request: NextRequest) => {
    return await controller.create(request);
  },
  [1]
);

export const GET = withAuth(
  async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const idParam = searchParams.get("subscriber_id");
    if (idParam) {
      return await controller.read(request);
    } else {
      return await controller.list(request);
    }
  },
  [1]
);

export const PUT = withAuth(
  async (request: NextRequest) => {
    return await controller.update(request);
  },
  [1]
);

export const DELETE = withAuth(
  async (request: NextRequest) => {
    return await controller.delete(request);
  },
  [1]
);
